import React, { useState } from "react";
import Input from "../../formComponent/Input";
import ReactSelect from "../../formComponent/ReactSelect";
const SettlementAmountModal = () => {
  const [sale, setSale] = useState([]);
  const [formData, setFormData] = useState({
    ProjectName: "",
    BillingCompanyName: "",
    Address: "",
    GSTNumber: "",
    PanCardNo: "",
    Sale: "",
    NetAmount: 30000,
    TaxAmount: 5400,
    PayableAmount: 35400,
    PaidAmount: 10000,
    AdjustAmount: "",
    DueAmount: "",
  });

  const handleSelectChange = (e) => {
    const { name, value } = e?.target;
    const adjustedValue = value.trim() === "" ? 0 : Number(value);

    if (name == "AdjustAmount") {
      if (
        adjustedValue <= Number(formData?.NetAmount) &&
        adjustedValue <=
          Number(formData?.PayableAmount) - Number(formData?.PaidAmount)
      ) {
        setFormData({
          ...formData,
          [name]: value,
          DueAmount:
            Number(formData?.PayableAmount) -
            Number(formData?.PaidAmount) -
            adjustedValue,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <div className="card p-2">
        <div className="row g-4 ">
          <Input
            type="text"
            className="form-control"
            id="ProjectName"
            name="ProjectName"
            lable="Project Name"
            onChange={handleSelectChange}
            value={formData?.ProjectName}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="BillingCompanyName"
            name="BillingCompanyName"
            lable="Billing Company Name"
            onChange={handleSelectChange}
            value={formData?.BillingCompanyName}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="Address"
            name="Address"
            lable="Address"
            onChange={handleSelectChange}
            value={formData?.Address}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="GSTNumber"
            name="GSTNumber"
            lable="GST Number"
            onChange={handleSelectChange}
            value={formData?.GSTNumber}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="PanCardNo"
            name="PanCardNo"
            lable="PanCard No"
            onChange={handleSelectChange}
            value={formData?.PanCardNo}
            respclass="col-md-4 col-12 col-sm-12"
          />
        </div>
        <div className="row">
          <ReactSelect
            style={{ marginLeft: "20px" }}
            name="Sale"
            respclass="col-md-4 col-12 col-sm-12"
            placeholderName="Sale"
            dynamicOptions={[
              { label: "Sale-I", value: "SaleI" },
              { label: "Sale-II", value: "SaleII" },
            ]}
            value={formData?.Sale}
            handleChange={handleDeliveryChange}
          />
          {formData?.Sale == "SaleI" && (
            <>
              <Input
                type="text"
                className="form-control"
                id="NetAmount"
                name="NetAmount"
                lable="Net Amount"
                onChange={handleSelectChange}
                value={formData?.NetAmount}
                respclass="col-md-4 col-12 col-sm-12"
                disabled={true}
              />

              <Input
                type="text"
                className="form-control"
                id="TaxAmount"
                name="TaxAmount"
                lable="Tax Amount"
                onChange={handleSelectChange}
                value={formData?.TaxAmount}
                respclass="col-md-4 col-12 col-sm-12"
                disabled={true}
              />
              <Input
                type="text"
                className="form-control"
                id="PayableAmount"
                name="PayableAmount"
                lable="Payable Amount"
                onChange={handleSelectChange}
                value={formData?.PayableAmount}
                respclass="col-md-4 col-12 col-sm-12"
                disabled={true}
              />
              <Input
                type="text"
                className="form-control"
                id="PaidAmount"
                name="PaidAmount"
                lable="Paid Amount"
                onChange={handleSelectChange}
                value={formData?.PaidAmount}
                respclass="col-md-4 col-12 col-sm-12"
                disabled={true}
              />
              <Input
                type="text"
                className="form-control"
                id="AdjustAmount"
                name="AdjustAmount"
                lable="Adjust Amount"
                onChange={handleSelectChange}
                value={formData?.AdjustAmount}
                respclass="col-md-4 col-12 col-sm-12"
              />
              <Input
                type="text"
                className="form-control"
                id="DueAmount"
                name="DueAmount"
                lable="Due Amount"
                onChange={handleSelectChange}
                value={formData?.DueAmount}
                respclass="col-md-4 col-12 col-sm-12"
              />
            </>
          )}
          <div className="col-2">
            <button className="btn btn-sm btn-success"> Update</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettlementAmountModal;
