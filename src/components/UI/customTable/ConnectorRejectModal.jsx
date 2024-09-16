import React, { useState } from "react";
import Input from "../../formComponent/Input";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { headers } from "../../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
const ConnectorRejectModal = (visible) => {
  const [formData, setFormData] = useState({
    RejectReason: "",
  });
  const searchHandleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

  const handleSave = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ConnectorID", visible?.data?.ID),
      form.append("Status", "Reject"),
      form.append("RejectReason", formData?.RejectReason),

      axios
        .post(apiUrls?.Connector_Status_Update, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <>
      <div className="card">
        <div className="row g-4 m-2">
          <Input
            type="text"
            className="form-control"
            id="RejectReason"
            name="RejectReason"
            lable="Reject Reason"
            onChange={searchHandleChange}
            value={formData?.RejectReason}
            respclass="col-md-10 col-12 col-sm-12"
          />
          <div className="col-2">
            <button className="btn btn-sm btn-success" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ConnectorRejectModal;
