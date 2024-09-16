import React, { useEffect, useState } from "react";
import Input from "../../formComponent/Input";
import ReactSelect from "../../formComponent/ReactSelect";
import axios from "axios";
import { headers } from "../../../utils/apitools";
import { toast } from "react-toastify";
import Loading from "../../loader/Loading";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const EscalationModal = (showData, tableData) => {
  console.log(showData, tableData);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    AllowSecEmail: "",
    AllowEscMatrix: "",
    Level1Employee1: "",
    Level2Employee1: "",
    Level3Employee1: "",
    Level1Employee2: "",
    Level2Employee2: "",
    Level3Employee2: "",
    Engineer1: "",
    Engineer2: "",
  });
  const [user, setUser] = useState([]);
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const getReporter = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
          apiUrls?.Reporter_Select,
          form,
          { headers }
        )
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setUser(reporters);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateEscalation = () => {
    if (formData?.AllowEscMatrix == "") {
      toast.error("Please Select Allowesclationmatrix.");
    } else if (formData?.AllowSecEmail == "") {
      toast.error("Please Select AllowSecEmail.");
    } else if (formData?.Level1Employee1 == "") {
      toast.error("Please Select Level1Employee1.");
    } else if (formData?.Level2Employee1 == "") {
      toast.error("Please Select Level2Employee1.");
    } else if (formData?.Level3Employee1 == "") {
      toast.error("Please Select Level3Employee1.");
    } else {
      setLoading(true);
      let form = new FormData();
      form.append("ID", localStorage.getItem("ID")),
        form.append("LoginName", localStorage.getItem("realname")),
        form.append("ProjectID", formData?.ProjectID);
      form.append("Allowesclationmatrix", formData?.AllowEscMatrix);
      form.append("AllowEngeenermail", formData?.AllowSecEmail);
      form.append("Engineer1", formData?.Engineer1);
      form.append("Engineer2", formData?.Engineer2);
      form.append("level1employee_1", formData?.Level1Employee1);
      form.append("level2employee_1", formData?.Level2Employee1);
      form.append("level3employee_1", formData?.Level3Employee1);
      form.append("level1employee_2", formData?.Level1Employee2);
      form.append("level2employee_2", formData?.Level2Employee2);
      form.append("level3employee_2", formData?.Level3Employee2);
      axios
        .post(
         apiUrls?.UpdateEscalation,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
          setFormData({
            ...formData,
            AllowSecEmail: "",
            AllowEscMatrix: "",
            Level1Employee1: "",
            Level2Employee1: "",
            Level3Employee1: "",
            Level1Employee2: "",
            Level2Employee2: "",
            Level3Employee2: "",
            Engineer1: "",
            Engineer2: "",
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const filldetails = () => {
    setFormData({
      ...formData,
      AllowSecEmail: showData?.tableData?.AllowEngeenermail,
      AllowEscMatrix: showData?.tableData?.Allowesclationmatrix,
      Level1Employee1: showData?.tableData?.level1employee_1,
      Level2Employee1: showData?.tableData?.level2employee_1,
      Level3Employee1: showData?.tableData?.level3employee_1,
      Level1Employee2: showData?.tableData?.level1employee_2,
      Level2Employee2: showData?.tableData?.level2employee_2,
      Level3Employee2: showData?.tableData?.level3employee_2,
      Engineer1: showData?.tableData?.Engineer1,
      Engineer2: showData?.tableData?.Engineer2,
      ProjectID: showData?.tableData?.Id,
    });
  };
  useEffect(() => {
    filldetails();
  }, []);

  useEffect(() => {
    getReporter();
  }, []);
  return (
    <>
      <div className="card border p-2">
        <div className="row">
          <div className="col-3">
            <div
              className="search-col"
              style={{
                display: "flex",
                marginRight: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name="AllowSecEmail"
                    checked={formData?.AllowSecEmail == "1" ? true : false}
                    onChange={handleSelectChange}
                  />
                  <span className="slider"></span>
                </label>
                <span
                  className="sec-email-text"
                  style={{
                    marginLeft: "3px",
                    marginRight: "5px",
                    fontSize: "12px",
                  }}
                >
                  Allow Sec_Email
                </span>
              </div>
            </div>
          </div>
          <div className="col-9">
            {formData?.AllowSecEmail == true && (
              <>
                <div className="row">
                  <ReactSelect
                    name="Engineer1"
                    respclass="col-md-6 col-12 col-sm-12"
                    placeholderName="Level 1"
                    dynamicOptions={user}
                    value={formData?.Engineer1}
                    handleChange={handleDeliveryChange}
                  />
                  <ReactSelect
                    name="Engineer2"
                    respclass="col-md-6 col-12 col-sm-12"
                    placeholderName="Level 2"
                    dynamicOptions={user}
                    value={formData?.Engineer2}
                    handleChange={handleDeliveryChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div
              className="search-col"
              style={{
                display: "flex",
                marginRight: "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name="AllowEscMatrix"
                    checked={formData?.AllowEscMatrix == "1" ? true : false}
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
                  Allow Esc_Matrix
                </span>
              </div>
            </div>
          </div>
          <div className="col-9">
            {formData?.AllowEscMatrix == true && (
              <>
                <div className="row">
                  <ReactSelect
                    style={{ marginLeft: "20px" }}
                    name="Level1Employee1"
                    respclass="col-md-6 col-12 col-sm-12"
                    placeholderName="Level 1"
                    dynamicOptions={user}
                    value={formData?.Level1Employee1}
                    handleChange={handleDeliveryChange}
                  />
                  <ReactSelect
                    name="Level1Employee2"
                    respclass="col-md-6 col-12 col-sm-12"
                    placeholderName="Level 1"
                    dynamicOptions={user}
                    value={formData?.Level1Employee2}
                    handleChange={handleDeliveryChange}
                  />
                </div>
                <div className="row">
                  <ReactSelect
                    style={{ marginLeft: "20px" }}
                    name="Level2Employee1"
                    respclass="col-md-6 col-12 col-sm-12"
                    placeholderName="Level 2"
                    dynamicOptions={user}
                    value={formData?.Level2Employee1}
                    handleChange={handleDeliveryChange}
                  />
                  <ReactSelect
                    name="Level2Employee2"
                    respclass="col-md-6 col-12 col-sm-12"
                    placeholderName="Level 2"
                    dynamicOptions={user}
                    value={formData?.Level2Employee2}
                    handleChange={handleDeliveryChange}
                  />
                </div>
                <div className="row">
                  <ReactSelect
                    style={{ marginLeft: "20px" }}
                    name="Level3Employee1"
                    respclass="col-md-6 col-12 col-sm-12"
                    placeholderName="Level 3"
                    dynamicOptions={user}
                    value={formData?.Level3Employee1}
                    handleChange={handleDeliveryChange}
                  />
                  <ReactSelect
                    name="Level3Employee2"
                    respclass="col-md-6 col-12 col-sm-12"
                    placeholderName="Level 3"
                    dynamicOptions={user}
                    value={formData?.Level3Employee2}
                    handleChange={handleDeliveryChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="ml-auto mt-1">
            <button
              className="btn btn-sm btn-success"
              onClick={handleUpdateEscalation}
            >
              Update
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default EscalationModal;
