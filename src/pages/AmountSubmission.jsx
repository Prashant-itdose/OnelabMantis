import React, { useEffect, useState } from "react";
import ReactSelect from "../components/formComponent/ReactSelect";
import DatePicker from "../components/formComponent/DatePicker";
import Input from "../components/formComponent/Input";
import axios from "axios";
import { headers } from "../utils/apitools";
import Heading from "../components/UI/Heading";
import { Link } from "react-router-dom";
import BrowseButton from "../components/formComponent/BrowseButton";
import { apiUrls } from "../networkServices/apiEndpoints";
import { toast } from "react-toastify";
const AmountSubmission = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [project, setProject] = useState([]);
  const [formData, setFormData] = useState({
    Project: "",
    ReceiveDate: new Date(),
    ReceivedBy: "",
    UTRNO: "",
    BankNeft: "",
    ChequeNumber: "",
    BankName: "",
    ChequeDate: new Date(),
    PaymentMode: "",
    Amount: "",
    Remarks: "",
    Documents: "",
    DocumentType: "",
    SelectFile: "",
    Document_Base64: "",
    FileExtension: "",
  });

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
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
          setProject(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : "";
  }
  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
  const handleSave = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", formData?.Project),
      form.append("ProjectName", getlabel(formData?.Project, project)),
      form.append("ReceivedDate", formatDate(formData?.ReceiveDate)),
      form.append(
        "ReceivedBy",
        formData?.ReceivedBy ? formData?.ReceivedBy : ""
      ),
      form.append("PaymentMode", formData?.PaymentMode),
      form.append("Amount", formData?.Amount),
      form.append("Document_Base64", formData?.Document_Base64),
      form.append("Document_FormatType", formData?.FileExtension),
      axios
        .post(apiUrls?.AmountSubmission_ByAccounts, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  // const handleImageChange = (e) => {
  //   const file = e?.target?.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader?.result.split(",")[1];
  //       const fileExtension = file?.name.split(".").pop();
  //       setFormData({
  //         ...formData,
  //         SelectFile: file,
  //         Document_Base64: base64String,
  //         FileExtension: fileExtension,
  //       });
  //     };
  //     reader.readAsDataURL(file); // Convert file to base64
  //   }
  // };

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

  useEffect(() => {
    getProject();
  }, []);
  return (
    <>
      <div className="card border">
        <Heading title={"Amount Submission"} />
        <div className="row g-4 m-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Project"
            placeholderName="Project"
            dynamicOptions={project}
            handleChange={handleDeliveryChange}
            value={formData.Project}
          />
          <DatePicker
            className="custom-calendar"
            id="ReceiveDate"
            name="ReceiveDate"
            lable="Receive Date"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.ReceiveDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          {/* <div className="d-flex">
            <label>Type :</label>
            <div
              className="search-col"
              style={{
                marginLeft: "8px",
                display: "flex",
                marginRight: "auto",
              }}
            >
              {[
                { name: "Deposit", label: "Deposit" },
                { name: "CreditNote", label: "CreditNote" },
                { name: "DebitNote", label: "DebitNote" },
                { name: "TDS", label: "TDS" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: idx !== 0 ? "28px" : "0px",
                  }}
                >
                  <label className="switch" style={{ marginTop: "3px" }}>
                    <input
                      type="checkbox"
                      name={item.name}
                      checked={formData[item.name] === "1"}
                      onChange={handleSelectChange}
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
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="PaymentMode"
            placeholderName="Payment Mode"
            dynamicOptions={[
              { label: "Cash", value: "Cash" },
              { label: "NEFT", value: "NEFT" },
              { label: "Cheque", value: "Cheque" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.PaymentMode}
          />
          <Input
            type="text"
            className="form-control"
            id="Amount"
            name="Amount"
            lable="Amount"
            onChange={handleSelectChange}
            value={formData?.Amount}
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          />
          {formData?.PaymentMode == "Cash" && (
            <Input
              type="text"
              className="form-control"
              id="ReceivedBy"
              name="ReceivedBy"
              lable="ReceivedBy"
              onChange={handleSelectChange}
              value={formData?.ReceivedBy}
              respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            />
          )}
          {formData?.PaymentMode == "NEFT" && (
            <>
              <Input
                type="text"
                className="form-control"
                id="UTRNO"
                name="UTRNO"
                lable="UTRNO"
                onChange={handleSelectChange}
                value={formData?.UTRNO}
                respclass="col-xl-2 col-md-3 col-sm-4 col-12"
              />
              <ReactSelect
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="BankNeft"
                placeholderName="Bank"
                dynamicOptions={[
                  { label: "ICICI", value: "ICICI" },
                  { label: "Kotak", value: "Kotak" },
                ]}
                handleChange={handleDeliveryChange}
                value={formData.BankNeft}
              />
            </>
          )}
          {formData?.PaymentMode == "Cheque" && (
            <>
              <Input
                type="text"
                className="form-control"
                id="ChequeNumber"
                name="ChequeNumber"
                lable="Cheque Number"
                onChange={handleSelectChange}
                value={formData?.ChequeNumber}
                respclass="col-xl-2 col-md-3 col-sm-4 col-12"
              />
              <Input
                type="text"
                className="form-control"
                id="BankName"
                name="BankName"
                lable="Bank Name"
                onChange={handleSelectChange}
                value={formData?.BankName}
                respclass="col-xl-2 col-md-3 col-sm-4 col-12"
              />
              <DatePicker
                className="custom-calendar"
                id="ChequeDate"
                name="ChequeDate"
                lable="ChequeDate"
                placeholder={VITE_DATE_FORMAT}
                value={formData?.ChequeDate}
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                handleChange={searchHandleChange}
              />
            </>
          )}

          <Input
            type="text"
            className="form-control"
            id="Remarks"
            name="Remarks"
            lable="Remarks"
            onChange={handleSelectChange}
            value={formData?.Remarks}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          {/* <Input
            type="file"
            id="Documents"
            name="Documents"
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            style={{ width: "100%", marginLeft: "5px" }}
            // onChange={handleFileChange}
          /> */}
          <div className="col-2">
            <BrowseButton handleImageChange={handleImageChange} />

            <button
              className="btn btn-sm btn-success ml-3"
              onClick={handleSave}
            >
              Save
            </button>
            <Link to="/SearchAmountSubmission" className="ml-3">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default AmountSubmission;
