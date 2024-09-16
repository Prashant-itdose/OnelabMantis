import React, { useState } from "react";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import { headers } from "../../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";

const ConnectorApproveModal = (visible) => {
  console.log(visible);
  const handleSave = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ConnectorID", visible?.data?.ID),
      form.append("Status", "Approve"),
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
        <div className="row m-2 g-4">
          <label>Do you want to Approve this IssueNo :- {visible?.data?.IssueNo}</label>
          <div className="col-2">
            <button className="btn btn-sm btn-success ml-2" onClick={handleSave}>
              Yes
            </button>
          </div>
        </div>
    </>
  );
};
export default ConnectorApproveModal;
