import React, { useState } from "react";
import Input from "../../formComponent/Input";
import { headers } from "../../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const RemoveAmountSubmissionModal = (visible) => {
    console.log(visible)
    console.log(visible?.visible?.showData)

  const [formData, setFormData] = useState({
    CancelReason: "",
  });
  const searchHandleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

  const handleRemove = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
    form.append("LoginName", localStorage?.getItem("realname")),
    form.append("OnAccount_Req_ID",visible?.visible?.showData),
    form.append("CancelReason", formData?.CancelReason),
      axios
        .post(apiUrls?.AmountSubmission_ByAccounts_IsCancel, form, { headers })
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
            id="CancelReason"
            name="CancelReason"
            lable="Cancel Reason"
            placeholder=" "
            max={20}
            onChange={searchHandleChange}
            value={formData?.CancelReason}
            respclass="col-10"
          />
          <div className="col-2">
            <button className="btn btn-sm btn-danger" onClick={handleRemove}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveAmountSubmissionModal;
