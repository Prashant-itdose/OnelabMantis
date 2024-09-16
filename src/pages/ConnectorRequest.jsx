import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import { headers } from "../utils/apitools";
import axios from "axios";
import DatePicker from "../components/formComponent/DatePicker";
import Input from "../components/formComponent/Input";
import Tables from "../components/UI/customTable";
import { showsearchTHEAD } from "../components/modalComponent/Utils/HealperThead";
import { apiUrls } from "../networkServices/apiEndpoints";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/loader/Loading";
import BrowseButton from "../components/formComponent/BrowseButton";
const ConnectorRequest = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { data, ele } = location.state || {};
  console.log(data);
  console.log(ele);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [tableData, setTableData] = useState([]);
  const [paymentmode, setPaymentMode] = useState([]);
  const [Courier, setCourier] = useState([]);
  const [project, setProject] = useState([]);
  const [formData, setFormData] = useState({
    PaymentType: "",
    IssueDate: new Date(),
    Address: "",
    Courier: "",
    CourierAddress: "",
    IsActive: "",
    Remarks: "",
    Project: "",
    TableQuantity: "",
    TableAmount: "",
    CourierCharges: "",
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
  });

  useState(() => {
    setFormData({
      PaymentType: data?.PaymentMode,
      IssueDate: data?.IssueDate,
      Address: data?.ClientAddress,
      Courier: data?.Courier,
      CourierAddress: data?.CourierAddress,
      IsActive: "",
      Remarks: data?.Remarks,
      Project: data?.ProjectID,
      TableQuantity: "",
      TableAmount: "",
      ConnectorID: data?.ID,
      ProjectName: data?.ProjectName,
      CourierCharges: data?.CourierCharges,
    });
  }, [location]);

  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name == "Project") {
      getProjectAddress(name, value, "Project");
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
          setProject(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPaymentMode = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("SearchType", "PaymentMode"),
      form.append("ProjectID", ""),
      form.append("IssueNo", ""),
      axios
        .post(apiUrls?.Connector_Select, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { label: item?.PaymentMode, value: item?.PaymentMode };
          });
          setPaymentMode(reporters);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const [projectaddress, setProjectAddress] = useState([]);
  console.log(projectaddress);

  const getProjectAddress = (name, value, type) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("SearchType", "GetProjectAddress"),
      form.append("ProjectID", type == "Project" ? value : formData?.Project),
      form.append("IssueNo", ""),
      axios
        .post(apiUrls?.Connector_Select, form, { headers })
        .then((res) => {
          const data = res?.data?.data;
          setProjectAddress(data);
          if (data && data[0]?.Address) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              [name]: value,
              Address: data[0]?.Address,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleImageChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      // Check if file size exceeds 5MB (5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size exceeds 5MB. Please choose a smaller file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader?.result.split(",")[1];
        const fileExtension = file?.name.split(".").pop();
        setFormData({
          ...formData,
          SelectFile: file,
          Document_Base64: base64String,
          FileExtension: fileExtension,
        });
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };
  const getConnectorCharges = (value, type) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("SearchType", "ConnectorCharges"),
      form.append("ProjectID", ""),
      form.append("IssueNo", ""),
      axios
        .post(apiUrls?.Connector_Select, form, { headers })
        .then((res) => {
          const data = res?.data?.data;
          const datacourier = data?.filter(
            (item) => item?.ConnectorName == "Courier Charges"
          );
          const filteredData = data?.filter(
            (item) => item?.ConnectorName !== "Courier Charges"
          );
          setCourier(datacourier);
          setTableData(filteredData);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : "";
  }
  const handleSave = () => {
    console.log(formData);
    if (formData?.Project == "" || "undefined") {
      toast.error("Please Select Project.");
    } else {
      setLoading(true);
      const form = new FormData();
      form.append("ID", localStorage?.getItem("ID"));
      form.append("LoginName", localStorage?.getItem("realname"));
      form.append("ProjectID", formData?.Project);
      form.append("ProjectName", getlabel(formData?.Project, project));
      form.append("ClientAddress", formData?.Address);
      form.append("Remarks", formData?.Remarks);
      form.append("CourierCharges", formData?.CourierCharges);
      form.append("DeliveryDate", formatDate(formData?.IssueDate));
      form.append("Document_Base64", formData?.Document_Base64);
      form.append("Document_FormatType", formData?.FileExtension);
      form.append("PaymentMode", formData?.PaymentType);
      // Initialize variables for male and female connectors
      let maleConnector_9 = { rate: "", qty: "", amount: "" };
      let femaleConnector_9 = { rate: "", qty: "", amount: "" };
      let maleConnector_25 = { rate: "", qty: "", amount: "" };
      let femaleConnector_25 = { rate: "", qty: "", amount: "" };
      // Loop through the array to map the fields
      tableData?.forEach((item) => {
        switch (item.ConnectorName) {
          case "9 Pin Male":
            maleConnector_9.rate = item.Rate || "";
            maleConnector_9.qty = item.TableQuantity || "";
            maleConnector_9.amount = item.TableAmount || "";
            break;
          case "9 Pin Female":
            femaleConnector_9.rate = item.Rate || "";
            femaleConnector_9.qty = item.TableQuantity || "";
            femaleConnector_9.amount = item.TableAmount || "";
            break;
          case "25 Pin Male":
            maleConnector_25.rate = item.Rate || "";
            maleConnector_25.qty = item.TableQuantity || "";
            maleConnector_25.amount = item.TableAmount || "";
            break;
          case "25 Pin Female":
            femaleConnector_25.rate = item.Rate || "";
            femaleConnector_25.qty = item.TableQuantity || "";
            femaleConnector_25.amount = item.TableAmount || "";
            break;
          default:
            break;
        }
      });

      // Add connector values to the form
      form.append("FemaleConnector_Rate_9", femaleConnector_9.rate);
      form.append("FemaleConnector_Qty_9", femaleConnector_9.qty);
      form.append("FemaleConnector_Amount_9", femaleConnector_9.amount);

      form.append("MaleConnector_Rate_9", maleConnector_9.rate);
      form.append("MaleConnector_Qty_9", maleConnector_9.qty);
      form.append("MaleConnector_Amount_9", maleConnector_9.amount);

      form.append("FemaleConnector_Rate_25", femaleConnector_25.rate);
      form.append("FemaleConnector_Qty_25", femaleConnector_25.qty);
      form.append("FemaleConnector_Amount_25", femaleConnector_25.amount);

      form.append("MaleConnector_Rate_25", maleConnector_25.rate);
      form.append("MaleConnector_Qty_25", maleConnector_25.qty);
      form.append("MaleConnector_Amount_25", maleConnector_25.amount);

      axios
        .post(apiUrls?.Connector_Insert, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };
  const handleUpdate = () => {
    setLoading(true);
    const form = new FormData();
    form.append("ID", localStorage?.getItem("ID"));
    form.append("LoginName", localStorage?.getItem("realname"));
    form.append("ProjectID", formData?.Project);
    form.append("ConnectorID", formData?.ConnectorID);
    form.append("ProjectName", formData?.ProjectName);
    form.append("ClientAddress", formData?.Address);
    form.append("CourierCharges", formData?.CourierCharges);
    form.append("Remarks", formData?.Remarks);
    form.append("DeliveryDate", formatDate(formData?.IssueDate));
    form.append("Document_Base64", formData?.Document_Base64);
    form.append("Document_FormatType", formData?.FileExtension);
    form.append("PaymentMode", formData?.PaymentType);
    // Initialize variables for male and female connectors
    let maleConnector_9 = { rate: "", qty: "", amount: "" };
    let femaleConnector_9 = { rate: "", qty: "", amount: "" };
    let maleConnector_25 = { rate: "", qty: "", amount: "" };
    let femaleConnector_25 = { rate: "", qty: "", amount: "" };
    // Loop through the array to map the fields
    tableData?.forEach((item) => {
      switch (item.ConnectorName) {
        case "9 Pin Male":
          maleConnector_9.rate = item.Rate || "";
          maleConnector_9.qty = item.TableQuantity || "";
          maleConnector_9.amount = item.TableAmount || "";
          break;
        case "9 Pin Female":
          femaleConnector_9.rate = item.Rate || "";
          femaleConnector_9.qty = item.TableQuantity || "";
          femaleConnector_9.amount = item.TableAmount || "";
          break;
        case "25 Pin Male":
          maleConnector_25.rate = item.Rate || "";
          maleConnector_25.qty = item.TableQuantity || "";
          maleConnector_25.amount = item.TableAmount || "";
          break;
        case "25 Pin Female":
          femaleConnector_25.rate = item.Rate || "";
          femaleConnector_25.qty = item.TableQuantity || "";
          femaleConnector_25.amount = item.TableAmount || "";
          break;
        default:
          break;
      }
    });

    // Add connector values to the form
    form.append("FemaleConnector_Rate_9", femaleConnector_9.rate);
    form.append("FemaleConnector_Qty_9", femaleConnector_9.qty);
    form.append("FemaleConnector_Amount_9", femaleConnector_9.amount);

    form.append("MaleConnector_Rate_9", maleConnector_9.rate);
    form.append("MaleConnector_Qty_9", maleConnector_9.qty);
    form.append("MaleConnector_Amount_9", maleConnector_9.amount);

    form.append("FemaleConnector_Rate_25", femaleConnector_25.rate);
    form.append("FemaleConnector_Qty_25", femaleConnector_25.qty);
    form.append("FemaleConnector_Amount_25", femaleConnector_25.amount);

    form.append("MaleConnector_Rate_25", maleConnector_25.rate);
    form.append("MaleConnector_Qty_25", maleConnector_25.qty);
    form.append("MaleConnector_Amount_25", maleConnector_25.amount);

    axios
      .post(apiUrls?.Connector_Update, form, { headers })
      .then((res) => {
        toast.success(res?.data?.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const searchHandleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  useEffect(() => {
    getPaymentMode();
    getProject();
    getConnectorCharges();
  }, []);
  console.log(ele);

  const handleTableChange = (value, index, name, type) => {
    let updatedTableData = [...tableData];
    let updatedRow = { ...updatedTableData[index] };
    updatedRow[name] = type === "checkbox" ? (checked ? "1" : "0") : value;
    if (name === "TableQuantity") {
      updatedRow.TableAmount = value * updatedRow.Rate;
    }
    updatedTableData[index] = updatedRow;
    setTableData(updatedTableData);
  };
  return (
    <>
      <div className="card mt-1">
        <Heading title="Save Connector Request" />
        <div className="row g-4 m-2">
          <ReactSelect
            name="Project"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Project"
            dynamicOptions={project}
            value={formData?.Project}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            name="PaymentType"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Type of Payment"
            dynamicOptions={paymentmode}
            value={formData?.PaymentType}
            handleChange={handleDeliveryChange}
          />
          <DatePicker
            className="custom-calendar"
            id="IssueDate"
            name="IssueDate"
            lable="Issue Date"
            placeholder={VITE_DATE_FORMAT}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={formData?.IssueDate}
            handleChange={searchHandleChange}
          />
          <Input
            type="text"
            className="form-control"
            id="Address"
            name="Address"
            lable="Address Of Client"
            placeholder=" "
            max={20}
            onChange={searchHandleChange}
            value={formData?.Address}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />

          <ReactSelect
            name="Courier"
            respclass="col-xl-1 col-md-4 col-sm-6 col-12"
            placeholderName="Courier"
            dynamicOptions={[
              { label: "No", value: "1" },
              { label: "Yes", value: "2" },
            ]}
            value={formData?.Courier}
            handleChange={handleDeliveryChange}
          />
          <Input
            type="text"
            className="form-control"
            id="CourierAddress"
            name="CourierAddress"
            lable="Courier Address"
            placeholder=" "
            max={20}
            onChange={searchHandleChange}
            value={formData?.CourierAddress}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            disabled={formData?.Courier == 1}
          />
          <div className="search-col" style={{ marginLeft: "0px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="IsActive"
                  checked={formData?.IsActive == "1" ? true : false}
                  onChange={(e) => {
                    // Update IsActive status
                    const isChecked = e.target.checked ? "1" : "0";

                    // If checked, copy the Address to CourierAddress
                    setFormData((prevData) => ({
                      ...prevData,
                      IsActive: isChecked,
                      CourierAddress:
                        isChecked === "1"
                          ? formData?.Address
                          : prevData?.CourierAddress, // Auto-fill only when checked
                    }));
                  }}
                  disabled={formData?.Courier == 1}
                />
                <span className="slider"></span>
              </label>
              <span
                style={{
                  marginLeft: "3px",
                  marginRight: "5px",
                  fontSize: "12px",
                }}
              >
                Same Address
              </span>
            </div>
          </div>
          <Input
            type="text"
            className="form-control border-red"
            id="CourierCharges"
            name="CourierCharges"
            lable="Courier Charges"
            placeholder=" "
            max={20}
            onChange={searchHandleChange}
            value={formData?.CourierCharges}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            disabled={formData?.Courier == 1}
          />
          <Input
            type="text"
            className="form-control"
            id="Remarks"
            name="Remarks"
            lable="Remarks"
            placeholder=" "
            max={20}
            onChange={searchHandleChange}
            value={formData?.Remarks}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <BrowseButton handleImageChange={handleImageChange} />
        </div>
        <div className="ml-0 mr-0">
          <Tables
            thead={showsearchTHEAD}
            tbody={tableData?.map((ele, index) => ({
              "S.No.": index + 1,
              Connector: ele?.ConnectorName,
              Rate: ele?.Rate,
              Quantity: (
                <Input
                  type="number"
                  className="form-control"
                  id="TableQuantity"
                  name="TableQuantity"
                  placeholder="Quantity"
                  onChange={(e) =>
                    handleTableChange(e.target.value, index, e.target.name)
                  }
                  value={ele?.TableQuantity}
                />
              ),
              Amount: (
                <Input
                  type="number"
                  className="form-control"
                  id="TableAmount"
                  name="TableAmount"
                  placeholder="Amount"
                  onChange={(e) =>
                    handleTableChange(e.target.value, index, e.target.name)
                  }
                  value={ele?.TableAmount}
                />
              ),
            }))}
            tableHeight={"tableHeight"}
          />
          <div className="row m-2">
            {loading ? (
              <Loading />
            ) : (
              <div>
                {data?.edit ? (
                  <button
                    className="btn btn-sm btn-info ml-2"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-info ml-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                )}
              </div>
            )}
            <Link to="/SearchConnectorRequest" className="ml-3">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConnectorRequest;
