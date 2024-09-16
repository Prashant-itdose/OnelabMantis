import React, { useState } from "react";
import ReactSelect from "../../components/formComponent/ReactSelect";
import { apiUrls } from "../../networkServices/apiEndpoints";
import axios from "axios";
import { toast } from "react-toastify";
import { headers } from "../../utils/apitools";
const LeaveRequestModal = ({ visible }) => {
  const CRMID = localStorage.getItem("CrmEmployeeID");
  console.log(visible);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    LeaveType: "",
    Description: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
  const handleLeaveRequest_Save = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("CrmEmpID", CRMID),
      form.append("FromDate", formatDate(visible?.data)),
      form.append("LeaveType", formData?.LeaveType),
      form.append("Description", formData?.Description),
      form.append("StatusType", "Save"),
      axios
        .post(apiUrls?.LeaveRequest_Save, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  const handleLeaveRequest_Update = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("CrmEmpID", CRMID),
      form.append("FromDate", ""),
      form.append("LeaveType", formData?.LeaveType),
      form.append("Description", formData?.Description),
      form.append("StatusType", "Update"),
      axios
        .post(apiUrls?.LeaveRequest_Save, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  const handleLeaveRequest_Approve = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("CrmEmpID", CRMID),
      form.append("FromDate", ""),
      form.append("LeaveType", formData?.LeaveType),
      form.append("Description", formData?.Description),
      form.append("StatusType", "Approve"),
      axios
        .post(apiUrls?.LeaveRequest_Save, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  const handleLeaveRequest_Delete = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("CrmEmpID", CRMID),
      form.append("FromDate", ""),
      form.append("LeaveType", formData?.LeaveType),
      form.append("Description", formData?.Description),
      form.append("StatusType", "Delete"),
      axios
        .post(apiUrls?.LeaveRequest_Save, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };

  return (
    <>
      <div className="card">
        <div className="row g-4 m-2 d-flex">
          <div className="col-sm-6">
            <ReactSelect
              name="LeaveType"
              respclass="col-md-12 col-12 col-sm-12"
              placeholderName="Leave Type"
              dynamicOptions={[
                { label: "CL", value: "CL" },
                { label: "SL", value: "SL" },
                { label: "Week Off", value: "Week Off" },
                { label: "Comp Off", value: "Comp Off" },
                { label: "CL/CIR", value: "CL/CIR" },
                { label: "SL/CIR", value: "SL/CIR" },
                { label: "Optional", value: "Optional" },
                { label: "Leave Without Pay", value: "Leave Without Pay" },
              ]}
              value={formData?.LeaveType}
              handleChange={handleDeliveryChange}
            />

            <textarea
              type="text"
              respclass="col-md-12 col-12 col-sm-12"
              className=""
              placeholder="Description "
              id={"Description"}
              name="Description"
              value={formData?.Description}
              onChange={handleChange}
              style={{ width: "95%", marginLeft: "7.5px", height: "110px" }}
            ></textarea>
          </div>
          <div className="col-sm-6">
            <div style={{ padding: "10px" }}>
              <ul style={{ listStyleType: "none", padding: "0" }}>
                <li>
                  <strong>Pending CL</strong> : 6 (0 pending for approval)
                </li>
                <li>
                  <strong>Pending SL</strong> : 91 (0 pending for approval)
                </li>
              </ul>
              <p style={{ color: "red", fontWeight: "bold" }}>
                <span>Note:</span> Pending SL will carry forward in next
                financial year
              </p>
              <p style={{ color: "red", fontWeight: "bold" }}>
                <span>Note:</span> Maximum optional leave from January to
                December is 3
              </p>
            </div>
          </div>
          <div className="col-2 d-flex">
            <button
              className="btn btn-sm mb-2"
              style={{ background: "#0eb342", color: "white", border: "none" }}
              onClick={handleLeaveRequest_Save}
            >
              Apply
            </button>
            {/* <button
              className="btn btn-sm mb-2 ml-2"
              style={{ background: "#0eb342", color: "white", border: "none" }}
              onClick={handleLeaveRequest_Update}
            >
              Update
            </button> */}
            <button
              className="btn btn-sm mb-2 ml-2"
              style={{ background: "red", color: "white", border: "none" }}
              onClick={handleLeaveRequest_Delete}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default LeaveRequestModal;
