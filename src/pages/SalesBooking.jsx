import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import axios, { formToJSON } from "axios";
import { headers } from "../utils/apitools";
import Input from "../components/formComponent/Input";
import Tables from "../components/UI/customTable";
import { salesbookingTHEAD } from "../components/modalComponent/Utils/HealperThead";

import { inputBoxValidation } from "../utils/utils";
import { apiUrls } from "../networkServices/apiEndpoints";
import { AutoComplete } from "primereact/autocomplete";
import Heading from "../components/UI/Heading";
const SalesBooking = () => {
  const [value, setValue] = useState("");
  const [tableData, setTableData] = useState([
    {
      "S.No.": 1,
      Connector: "25 Pin Male",
      Rate: "1000",
      Quantity: "1",
      Amount: "1000",
      Tax: "180",
    },
    {
      "S.No.": 2,
      Connector: "26 Pin Male",
      Rate: "3250",
      Quantity: "1",
      Amount: "3250",
      Tax: "585",
    },
    {
      "S.No.": 3,
      Connector: "27 Pin Male",
      Rate: "1350",
      Quantity: "1",
      Amount: "1350",
      Tax: "243",
    },
  ]);
  const [project, setProject] = useState([]);
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    Project: "",
    Category: "",
    Items: "",
    Address: "",
    GstNumber: "",
    PanCardNo: "",
    TaxableAmount: "",
    SgstAmount: "",
    CgstAmount: "",
    RoundOff: "",
    TotalAmount: "",
    Rate: "",
    Quantity: 1,
    Discount: "",
    DiscountPercent: "",
    Tax: "",
    TaxPercent: "18%",
    Amount: "",
    Remark: "",
    TotalRate: "",
    TotalQuantity: "",
    TotalDiscount: "",
    TotalTax: "",
  });

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const getProject = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.ProjectSelect, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.Project, value: item?.ProjectId };
          });
          getCategory(poc3s[0]?.value);
          setProject(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getCategory = (proj) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("ProjectID", proj),
      axios
        .post(apiUrls?.Category_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setCategory(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleSelectChange = (e, index) => {
    const { name, value, checked, type } = e?.target;

    if (name === "DiscountPercent") {
      const regex = /^\d{0,2}(\.\d{0,2})?$/;
      if (!regex.test(value)) {
        return;
      }
    }
    if (name === "Amount") {
      const regex = /^\d*(\.\d{0,2})?$/;
      if (!regex.test(value)) {
        return;
      }
    }
    // Clone the formData array to avoid mutating the original state
    let updatedTableData = [...tableData];

    // Find the specific row to update using the index
    let updatedRow = { ...updatedTableData[index] };

    // Update the field in the selected row
    updatedRow[name] = type === "checkbox" ? (checked ? "1" : "0") : value;

    // Calculate Discount when DiscountPercent, Rate, or Quantity changes
    if (name === "DiscountPercent" || name === "Rate" || name === "Quantity") {
      const discountPercent =
        name === "DiscountPercent" ? value : updatedRow.DiscountPercent;
      const rate = name === "Rate" ? value : updatedRow.Rate;

      if (discountPercent && rate) {
        updatedRow.Discount =
          (rate * updatedRow?.Quantity * discountPercent) / 100;
        if (name == "DiscountPercent") {
          updatedRow.Amount =
            (updatedRow?.Rate * updatedRow?.Quantity * discountPercent) / 100;
        }
      } else {
        updatedRow.Discount = "";
      }
    }
    if (name == "Quantity") {
      updatedRow.Amount = Number(value * updatedRow?.Rate);
      updatedRow.Tax = (updatedRow.Amount * 18) / 100;
    }

    // Set Tax to 18% of Rate
    if (name === "Rate") {
      updatedRow.Tax = (value * updatedRow.Quantity * 18) / 100;
      updatedRow.Amount = value * updatedRow.Quantity;
    }

    // Handle RoundOff checkbox
    if (name === "RoundOff") {
      if (checked) {
        // When RoundOff is selected, round the Amount
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
          TotalAmount: Math.round(formData?.TotalAmount),
        });
        return;
      } else {
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
        });
      }
    }

    // Update the selected row in the table data
    updatedTableData[index] = updatedRow;

    // Set the updated table data in the state
    setTableData(updatedTableData);
  };

  const handleSelectChange1 = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      TotalAmount: tableData?.reduce(
        (accumulator, currentItem) =>
          Number(accumulator) + Number(currentItem.Amount || 0),
        0
      ),
    });
  }, [tableData]);

  return (
    <>
      <div className="card">
        <Heading title="Sales Register" />
        <div className="row g-4 m-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Project"
            placeholderName="Project"
            dynamicOptions={project}
            className="Project"
            handleChange={handleDeliveryChange}
            value={formData.Project}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Category"
            placeholderName="Billing Category"
            dynamicOptions={category}
            className="Category"
            handleChange={handleDeliveryChange}
            value={formData.Category}
          />
          <Input
            type="text"
            className="form-control"
            id="Address"
            name="Address"
            lable="Address"
            onChange={handleSelectChange}
            value={formData?.Address}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="GstNumber"
            name="GstNumber"
            lable="Gst Number"
            onChange={handleSelectChange}
            value={formData?.GstNumber}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="PanCardNo"
            name="PanCardNo"
            lable="PanCardNo"
            onChange={handleSelectChange}
            value={formData?.PanCardNo}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          {/* <Input
            type="text"
            className="form-control"
            id="Items"
            name="Items"
            lable="Items"
            onChange={handleSelectChange}
            value={formData?.Items}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          /> */}
          {/* <AutoComplete
                value={value}
                suggestions={items}
                // completeMethod={search}
                // className="w-100"
                  respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                // onSelect={(e) => validateInvestigation(e, 0, 0, 1, 0, 0)}
                id="searchtest"
                // onChange={(e) => {
                //   const data =
                //     typeof e.value === "object"
                //       ? e?.value?.autoCompleteItemName
                //       : e.value;
                //   setValue(data);
                // }}
                // itemTemplate={itemTemplate}
              /> */}
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Items"
            placeholderName="Item"
            dynamicOptions={items}
            className="Items"
            handleChange={handleDeliveryChange}
            value={formData.Items}
          />
        </div>
        <Tables
          thead={salesbookingTHEAD}
          tbody={tableData?.map((ele, index) => ({
            "S.No.": index + 1,
            Services: ele?.Connector,
            Rate: (
              <Input
                type="number"
                className="form-control"
                id="Rate"
                name="Rate"
                // lable="Rate"
                placeholder={"Rate"}
                onChange={(e) => handleSelectChange(e, index)}
                value={ele?.Rate}
              />
            ),
            Quantity: (
              <Input
                type="number"
                className="form-control"
                id="Quantity"
                name="Quantity"
                // lable="Quantity"
                placeholder={"Quantity"}
                onChange={(e) => handleSelectChange(e, index)}
                value={ele?.Quantity}
              />
            ),
            "Discount/%": (
              <>
                <div className="d-flex">
                  <Input
                    type="number"
                    className="form-control"
                    id="DiscountPercent"
                    name="DiscountPercent"
                    // lable="DiscountPercent"
                    placeholder={"% Discount"}
                    onChange={(e) => handleSelectChange(e, index)}
                    value={ele?.DiscountPercent}
                  />
                  {/* {ele?.DiscountPercent !== "" && ( */}
                  <Input
                    type="number"
                    className="form-control"
                    id="Discount"
                    name="Discount"
                    // lable="Discount"
                    placeholder={"₹ Discount"}
                    onChange={(e) => handleSelectChange(e, index)}
                    value={ele?.Discount}
                  />
                  {/* )} */}
                </div>
              </>
            ),
            "Tax%": (
              <>
                <div className="d-flex">
                  <Input
                    type="number"
                    className="form-control"
                    id="Tax"
                    name="Tax"
                    // lable="Tax"
                    placeholder={"₹ Tax"}
                    onChange={(e) => handleSelectChange(e, index)}
                    value={ele?.Tax}
                    disabled={true}
                  />
                  {/* {ele?.Tax !== "" && ( */}
                  <Input
                    type="number"
                    className="form-control"
                    id="TaxPercent"
                    name="TaxPercent"
                    // lable="TaxPercent"
                    placeholder={"18% Tax"}
                    onChange={(e) => handleSelectChange(e, index)}
                    disabled={true}
                    value={ele?.TaxPercent}
                  />
                  {/* )} */}
                </div>
              </>
            ),
            Amount: (
              <Input
                type="number"
                className="form-control"
                id="Amount"
                name="Amount"
                // lable="Amount"
                placeholder={"Amount"}
                onChange={(e) => handleSelectChange(e, index)}
                value={ele?.Amount}
              />
            ),
            Remark: (
              // <Input
              //   type="text"
              //   className="form-control"
              //   id="Remark"
              //   name="Remark"
              //   // lable="Remark"
              //   placeholder={"Remark"}
              //   onChange={(e) => handleSelectChange(e, index)}
              //   value={ele?.Remark}
              // />
              <textarea
                type="text"
                // respclass="col-md-4 col-12 col-sm-12"
                className="form-control textArea"
                placeholder="Remark "
                id={"Remark"}
                name="Remark"
                value={ele?.Remark}
                onChange={(e) => handleSelectChange(e, index)}
                // style={{ width: "16%", marginLeft: "7.5px" }}
              ></textarea>
            ),
            Remove: (
              <i
                className="fa fa-trash"
                style={{ cursor: "pointer", color: "red" ,marginLeft:"5px"}}
              ></i>
            ),
          }))}
          tableHeight={"tableHeight"}
        />
        <div className="row g-4 m-2">
          <div className="col-lg-10 col-md-12">
            <div className="row g-4 m-2">
              <div className="col-2" style={{ marginLeft: "30px" }}></div>
              <label style={{ marginRight: "25px" }}>SubTotal: </label>
              <div className="col-1.5">
                <Input
                  type="number"
                  className="form-control"
                  id="TotalRate"
                  name="TotalRate"
                  lable="Total Rate"
                  placeholder={"Total Rate"}
                  onChange={handleSelectChange}
                  value={tableData?.reduce(
                    (accumulator, currentItem) =>
                      Number(accumulator) + Number(currentItem.Rate || 0),
                    0
                  )}
                  respclass="w-67"
                  disabled={true}
                />
              </div>
              <div className="col-1.5" style={{ marginLeft: "5px" }}>
                <Input
                  type="number"
                  className="form-control"
                  id="TotalQuantity"
                  name="TotalQuantity"
                  lable="Total Quantity"
                  placeholder={"Total Quantity"}
                  onChange={handleSelectChange}
                  value={tableData?.reduce(
                    (accumulator, currentItem) =>
                      Number(accumulator) + Number(currentItem.Quantity || 0),
                    0
                  )}
                  respclass="w-70"
                  disabled={true}
                />
              </div>
              <div className="col-1.5" style={{ marginLeft: "4px" }}>
                <Input
                  type="number"
                  className="form-control"
                  id="TotalDiscount"
                  name="TotalDiscount"
                  lable="Total Discount"
                  placeholder={"Total Discount"}
                  onChange={handleSelectChange}
                  value={tableData?.reduce(
                    (accumulator, currentItem) =>
                      Number(accumulator) + Number(currentItem.Discount || 0),
                    0
                  )}
                  respclass="w-60"
                  disabled={true}
                />
              </div>
              <div className="col-1.5" style={{ marginLeft: "6px" }}>
                <Input
                  type="number"
                  className="form-control"
                  id="TotalTax"
                  name="TotalTax"
                  lable="Total Tax"
                  placeholder={"Total Tax"}
                  onChange={handleSelectChange}
                  value={tableData?.reduce(
                    (accumulator, currentItem) =>
                      Number(accumulator) + Number(currentItem.Tax || 0),
                    0
                  )}
                  respclass="w-60"
                  disabled={true}
                />
              </div>
              <div className="col-1.5" style={{ marginLeft: "7px" }}>
                <Input
                  type="number"
                  className="form-control"
                  id="TotalAmount"
                  name="TotalAmount"
                  lable="Total Amount"
                  placeholder={"Total Amount"}
                  onChange={handleSelectChange}
                  value={tableData?.reduce(
                    (accumulator, currentItem) =>
                      Number(accumulator) + Number(currentItem.Amount || 0),
                    0
                  )}
                  respclass="w-60"
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-12">
            <div className="row g-4 m-2">
              <div className="col-1.5 d-flex">
                <Input
                  type="number"
                  className="form-control"
                  id="TaxableAmount"
                  name="TaxableAmount"
                  placeholder="Taxable Amount"
                  lable="Taxable Amount"
                  onChange={handleSelectChange}
                  value={
                    tableData?.reduce(
                      (accumulator, currentItem) =>
                        Number(accumulator) + Number(currentItem.Amount || 0),
                      0
                    ) -
                    tableData?.reduce(
                      (accumulator, currentItem) =>
                        Number(accumulator) + Number(currentItem.Tax || 0),
                      0
                    )
                  }
                  respclass="w-50"
                  disabled={true}
                />

                <Input
                  type="number"
                  className="form-control ml-1"
                  id="SgstAmount"
                  name="SgstAmount"
                  placeholder="SGST@9"
                  lable="SGST@9"
                  onChange={handleSelectChange}
                  value={
                    tableData?.reduce(
                      (accumulator, currentItem) =>
                        Number(accumulator) + Number(currentItem.Tax || 0),
                      0
                    ) / 2
                  }
                  respclass="w-50"
                  disabled={true}
                />
              </div>
            </div>
            <div className="row g-4 m-2">
              <div className="col-1.5 d-flex">
                <Input
                  type="number"
                  className="form-control"
                  id="CgstAmount"
                  name="CgstAmount"
                  placeholder="CGST@9"
                  lable="CGST@9"
                  onChange={handleSelectChange}
                  value={
                    tableData?.reduce(
                      (accumulator, currentItem) =>
                        Number(accumulator) + Number(currentItem.Tax || 0),
                      0
                    ) / 2
                  }
                  respclass="w-50"
                  disabled={true}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "5px",
                  }}
                >
                  <label className="switch" style={{ marginTop: "7px" }}>
                    <input
                      type="checkbox"
                      name="RoundOff"
                      checked={formData?.RoundOff == "1" ? true : false}
                      // value={tableData?.RoundOff == "1" ? true : false}
                      onChange={handleSelectChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <span
                    style={{
                      marginLeft: "3px",
                      fontSize: "12px",
                    }}
                  >
                    AutoRoundOff
                  </span>
                </div>
              </div>
            </div>
            {console.log(tableData?.RoundOff == "checked")}
            <div className="row g-4 m-2">
              <div className="col-1.5 d-flex">
                <Input
                  type="text"
                  className="form-control"
                  id="TotalAmount"
                  name="TotalAmount"
                  placeholder="Total Amount"
                  lable="Total Amount"
                  onChange={handleSelectChange}
                  value={formData?.TotalAmount}
                  respclass="w-50"
                  disabled={true}
                />
                <button className="btn btn-sm btn-success ml-3">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SalesBooking;
