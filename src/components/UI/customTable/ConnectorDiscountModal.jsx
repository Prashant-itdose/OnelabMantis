import React, { useState } from "react";
import ReactSelect from "../../formComponent/ReactSelect";
import DatePicker from "../../formComponent/DatePicker";
import Input from "../../formComponent/Input";
import { headers } from "../../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import Tables from ".";
import { settlementTHAED } from "../../modalComponent/Utils/HealperThead";
const ConnectorDiscountModal = (visible) => {
  console.log(visible);
  console.log(visible?.data?.IssueNo);
  const [loading, setLoading] = useState(false);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    PaymentMode: "",
    ReceivedDate: new Date(),
    DiscountAmount: "",
    DiscountReason: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const searchHandleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  const handleSave = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("IssueNo", visible?.data?.IssueNo),
      form.append("ReceivedDate", formData?.ReceivedDate.toLocaleDateString()),
      form.append("DiscountAmount", formData?.DiscountAmount),
      form.append("DiscountReason", formData?.DiscountReason),
      form.append("PaymentMode", formData?.PaymentMode),
      axios
        .post(apiUrls?.Connector_Discount_Insert, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          setTableData([...tableData, formData]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="card">
        <div className="row g-4 m-2">
          {/* <ReactSelect
            respclass="col-md-4 col-12 col-sm-12"
            name="PaymentMode"
            placeholderName="Payment Mode"
            dynamicOptions={[
              { label: "Cash", value: "Cash" },
              { label: "NEFT", value: "NEFT" },
              { label: "Cheque", value: "Cheque" },
              { label: "Draft", value: "Draft" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.PaymentMode}
          /> */}
          <DatePicker
            className="custom-calendar"
            id="ReceivedDate"
            name="ReceivedDate"
            lable="Received Date"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.ReceivedDate}
            respclass="col-md-4 col-12 col-sm-12"
            handleChange={searchHandleChange}
          />
          <Input
            type="number"
            className="form-control"
            id="DiscountAmount"
            name="DiscountAmount"
            lable="Discount Amount"
            onChange={searchHandleChange}
            value={formData?.DiscountAmount}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="DiscountReason"
            name="DiscountReason"
            lable="Discount Reason"
            onChange={searchHandleChange}
            value={formData?.DiscountReason}c
            respclass="col-md-4 col-12 col-sm-12"
          />
          <div className="col-2">
            <button className="btn btn-sm btn-success" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>

      <Tables
        thead={settlementTHAED}
        tbody={tableData?.map((ele, index) => ({
          "S.No.": index + 1,
          "Issue No": "122323",
          PaymentMode: ele?.PaymentMode,
          ReceivedDate: ele?.ReceivedDate,
          Amount: ele?.Amount,
          EntryDate: "",
          CreatedBy: "",
        }))}
        tableHeight={"tableHeight"}
      />
      {/* <div className="pagination ml-auto">
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div> */}
    </>
  );
};
export default ConnectorDiscountModal;
