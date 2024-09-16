import React, { useEffect, useState } from "react";
import ReactSelect from "../../formComponent/ReactSelect";
import Input from "../../formComponent/Input";
import { moduleTHEAD } from "../../modalComponent/Utils/HealperThead";
import Heading from "../Heading";
import Tables from ".";
import { headers } from "../../../utils/apitools";

import DatePicker from "../../formComponent/DatePicker";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../loader/Loading";
import moment from "moment";
import { toast } from "react-toastify";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const ModuleTabModal = (visible, tableDataa) => {
  console.log(tableDataa);
  console.log(visible);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState([]);
  const [module, setModule] = useState([]);
  const [tableData, setTableData] = useState([]);
  const[phaseState,setPhaseState]=useState([])
  const [formData, setFormData] = useState({
    Modules: "",
    ModuleName: "",
    LiveDate: "",
    Phase: "",
    DeliveryStatus: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
   getPhase(value);
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const [visibles, setVisibles] = useState({
    showVisible: false,
  });
  const getModuleList = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      axios
        .post(
          apiUrls?.GetClientModuleList,
          form,
          { headers }
        )
        .then((res) => {
          const taxes = res?.data?.data?.map((item) => {
            return { label: item?.ModuleName, value: item?.ID };
          });
          setModule(taxes);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  
  console.log(phaseState)



  const getPhase = (value) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", visible?.showData?.ProjectID),
      form.append("ModuleID", value),
      form.append("ProductID", visible?.tableDataa?.productid),
      axios
        .post(
         apiUrls?.GetPhaseID,
          form,
          { headers }
        )
        .then((res) => {
          const phases = res?.data?.data?.map((item) => {
            return { label: item?.ModuleName, value: item?.ID };
          });
          setPhase(phases);
          setPhaseState(res?.data?.data)
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
  const handleCreateModule = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", visible?.showData?.ProjectID),
      form.append("ModuleID", formData?.Modules),
      form.append("ModuleName", getlabel(formData?.Modules, module)),
      form.append("LiveStatus", "0"),
      form.append("DeliveryStatus", formData?.DeliveryStatus),
      form.append("AfterLiveStatus", "0"),
      form.append("PhaseID", formData?.Phase),
      form.append("Phase1Days", phaseState[0]?.Phase1Days),
      form.append("Phase2Days", phaseState[0]?.Phase2Days),
      form.append("Phase3Days", phaseState[0]?.Phase3Days),
      form.append("LiveDate",formatDate(formData?.LiveDate)),
      axios
        .post(
          apiUrls?.CreateClientModule,
          form,
          { headers }
        )
        .then((res) => {
        toast.success(res?.data?.message) 
        setTableData([...tableData])
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleUpdateModule = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", visible?.showData?.ProjectID),
      form.append("ModuleID", formData?.Modules),
      form.append("LiveStatus", "0"),
      form.append("DeliveryStatus", formData?.DeliveryStatus),
      form.append("AfterLiveStatus", "0"),
      form.append("LiveDate",formatDate(formData?.LiveDate)),
      form.append("ClientModuleID",formData?.ClientModuleID),
      axios
        .post(
        apiUrls?.UpdateClientModule,
          form,
          { headers }
        )
        .then((res) => {
        toast.success(res?.data?.message)
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    setTableData([...tableData, ...visible?.showData?.showData]);
  }, []);

  console.log(visible?.showData?.showData);

  useEffect(() => {
    getModuleList();
  }, []);

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
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBillingEdit = (ele) => {
    console.log("editdetails", ele);
    setFormData({
      ...formData,
      ModuleName: ele?.ModuleName,
      ProjectID: ele?.ProjectID,
      Modules: ele?.ModuleID,
      LiveDate: ele?.Livedate
        ? moment(ele?.Livedate, "YYYY-MM-DD").toDate()
        : new Date(),
      Phase: ele?.PhaseID,
      ClientModuleID:ele?.ClientModuleID,
      DeliveryStatus:ele?.DeliveryStatus,
      LiveStatus:ele?.LiveStatus,
      AfterLiveStatus:ele?.AfterLiveStatus
    });
    setEditMode(true);
  };

  const handleRemove=(ele)=>{
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", visible?.showData?.ProjectID),
      form.append("ClientModuleID",ele),
      axios
        .post(
         apiUrls?.DeleteClientModule,
          form,
          { headers }
        )
        .then((res) => {
        toast.success(res?.data?.message)
        })
        .catch((err) => {
          console.log(err);
        });
  }
  return (
    <>
      <div className="card LocalityCard border p-2">
        <div className="row">
          <ReactSelect
            respclass="col-md-4 col-12 col-sm-12"
            name="Modules"
            placeholderName="Module"
            dynamicOptions={module}
            optionLabel="Modules"
            className="Modules"
            handleChange={handleDeliveryChange}
            value={formData.Modules}
          />
          <DatePicker
            className="custom-calendar"
            id="LiveDate"
            name="LiveDate"
            lable="LiveDate"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.LiveDate}
            respclass="col-md-4 col-12 col-sm-12"
            handleChange={searchHandleChange}
          />
          <ReactSelect
            style={{ marginLeft: "20px" }}
            name="Phase"
            respclass="col-md-4 col-12 col-sm-12"
            placeholderName="Phase"
            dynamicOptions={[
              { label: "Select", value: "0" },
              { label: "PH1", value: "1" },
              { label: "PH2", value: "2" },
              { label: "PH3", value: "3" },
            ]}
            value={formData?.Phase}
            handleChange={handleDeliveryChange}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <label
              className="switch"
              style={{ marginTop: "7px", marginLeft: "10px" }}
            >
              <input
                type="checkbox"
                name="DeliveryStatus"
                checked={formData?.DeliveryStatus == "1" ? true : false}
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
              DeliveryStatus
            </span>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="col-2">
              {editMode ? (
                <button
                  className="btn btn-sm btn-info"
                   onClick={handleUpdateModule}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-info"
                  onClick={handleCreateModule}
                >
                  Save
                </button>
              )}
            </div>
          )}
          <div className="col-2">
            <button
              className="btn btn-sm btn-success"
              onClick={() => {
                setVisibles({ showVisible: !visibles?.showVisible });
              }}
            >
              Create New Module
            </button>
          </div>

          {visibles?.showVisible && (
            <>
              <Input
                type="text"
                className="form-control"
                id="ModuleName"
                name="ModuleName"
                lable="Module Name"
                max={20}
                onChange={handleSelectChange}
                value={formData?.ModuleName}
                respclass="col-md-4 col-12 col-sm-12"
              />

              <button className="btn btn-sm btn-success">Save</button>
            </>
          )}
        </div>
        <div className="patient_registration_card mt-2 my-2">
          <Heading
            title="Module Status"
            secondTitle={
              <div className="row g-4">
                <div
                  className="d-flex flex-wrap align-items-center"
                  style={{ marginRight: "0px" }}
                >
                  <div
                    className="d-flex "
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="legend-circle"
                      style={{
                        backgroundColor: "#04ff02",
                        cursor: "pointer",
                        height: "10px",
                        width: "36px",
                        borderRadius: "50%",
                      }}
                      //   onClick={() => getUploadSearch("2")}
                    ></div>
                    <span
                      className="legend-label"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      Yes
                    </span>
                    <div
                      className="legend-circle"
                      style={{
                        backgroundColor: "orange",
                        cursor: "pointer",
                        height: "10px",
                        width: "36px",
                        borderRadius: "50%",
                      }}
                      //   onClick={() => getUploadSearch("1")}
                    ></div>
                    <span
                      className="legend-label"
                      style={{ width: "100%", textAlign: "left" }}
                    >
                      No
                    </span>
                  </div>
                </div>
              </div>
            }
          />
          <Tables
            thead={moduleTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              "Module Name": ele?.ModuleName,
              DeliveryStatus: ele?.DeliveryStatus,
              LiveDate: ele?.Livedate,
              Phase: ele?.PhaseID,
              Remove: (
                <i className="fa fa-trash" style={{ color: "red" }} onClick={()=>handleRemove(ele?.ClientModuleID)}>
                  
                </i>
              ),
              Action: (
                <i
                  style={{ cursor: "pointer" }}
                  className="fa fa-edit"
                  onClick={() => handleBillingEdit(ele)}
                >
                  
                </i>
              ),
            }))}
            tableHeight={"tableHeight"}
          />
          <div className="pagination ml-auto" style={{ float: "right" }}>
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
          </div>
        </div>
        {/* <div className="mt-1 ml-auto">
          <button className="btn btn-sm btn-success">Update</button>
        </div> */}
      </div>
    </>
  );
};
export default ModuleTabModal;
