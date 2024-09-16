import React, { useEffect, useState } from "react";
import Input from "../../formComponent/Input";
import ReactSelect from "../../formComponent/ReactSelect";
import axios from "axios";
import { toast } from "react-toastify";
import { headers } from "../../../utils/apitools";
import { machineTHEAD } from "../../modalComponent/Utils/HealperThead";
import Tables from ".";
import { Link } from "react-router-dom";
import Loading from "../../loader/Loading";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const MachineModuleModal = (visible, showData,apicall) => {
  console.log(visible);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [interFace, setInterFace] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    MachineName: "",
    InterfaceType: "",
    LiveStatus: "",
    AfterLiveStatus: "",
    MIType: "",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const AddMachine = () => {
    if (formData?.MachineName == "") {
      toast.error("Please Enter Machine Name.");
    } else {
      setLoading(true);
      let form = new FormData();
      form.append("ID", localStorage?.getItem("ID")),
        form.append("LoginName", localStorage?.getItem("realname")),
        form.append("ProjectID", visible?.showData?.ProjectID),
        form.append("MachineName", formData?.MachineName),
        form.append("InterfaceType", formData?.InterfaceType),
        form.append("LiveStatus", formData?.LiveStatus),
        form.append("AfterLiveStatus", formData?.AfterLiveStatus),
        form.append("MIType", formData?.MIType),
        axios
          .post(
            apiUrls?.SaveMachineList,
            form,
            { headers }
          )
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
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", formData?.ProjectID),
      form.append("MachineName", formData?.MachineName),
      form.append("MachineID", formData?.MachineID),
      form.append("InterfaceType", formData?.InterfaceType),
      form.append("LiveStatus", formData?.LiveStatus),
      form.append("AfterLiveStatus", formData?.AfterLiveStatus),
      form.append("MIType", formData?.MIType),
      axios
        .post(
         apiUrls?.UpdateMachineList,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  useEffect(() => {
    setTableData([...tableData, ...visible?.showData?.showData]);
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

  const handleEditMachine = (ele) => {
    console.log("ele", ele);
    setFormData({
      ...formData,
      MachineName: ele?.MachineName,
      InterfaceType: ele?.InterfaceType,
      LiveStatus: ele?.LiveStatus,
      AfterLiveStatus: ele?.AfterLiveStatus,
      MIType: ele?.MIType,
      MachineID: ele?.ClientMachineID,
      ProjectID: ele?.ProjectID,
    });
    setEditMode(true);
  };

  const handleRemove = (ele) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", visible?.showData?.ProjectID),
      form.append("ClientMachineID", ele),
      axios
        .post(
          apiUrls?.DeleteClientMachineList,
          form,
          { headers }
        )
        .then((res) => {
          console.log(apicall)
          toast.success(res?.data?.message);
          visible?.apicall(visible?.showData?.ProjectID)

        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <>
      <div className="card border p-2">
        <div className="row">
          <Input
            type="text"
            className="form-control"
            id="MachineName"
            name="MachineName"
            lable="Machine Name"
            max={20}
            onChange={handleSelectChange}
            value={formData?.MachineName}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <ReactSelect
            name="InterfaceType"
            respclass="col-md-4 col-12 col-sm-12"
            placeholderName="Interface Type"
            dynamicOptions={[
              { label: "Bi-Directional", value: "1" },
              { label: "Uni-Directional", value: "2" },
            ]}
            value={formData?.InterfaceType}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            name="MIType"
            respclass="col-md-4 col-12 col-sm-12"
            placeholderName="QT Type"
            dynamicOptions={[
              { label: "Against Quotation", value: "AgainstQuotation" },
              { label: "Against PO", value: "Against PO" },
            ]}
            value={formData?.MIType}
            handleChange={handleDeliveryChange}
          />
          <div
            className="search-col"
            style={{ marginLeft: "8px", display: "flex", marginRight: "auto" }}
          >
            {[
              { name: "LiveStatus", label: "LiveStatus" },
              { name: "AfterLiveStatus", label: "AfterLiveStatus" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: idx !== 0 ? "30px" : "0px",
                }}
              >
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name={item?.name}
                    checked={formData[item?.name]}
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
                  {item?.label}
                </span>
              </div>
            ))}
            {loading ? (
              <Loading />
            ) : (
              <div className="col-2">
                {editMode ? (
                  <button
                    className="btn btn-sm btn-info ml-2"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-info ml-2"
                    onClick={AddMachine}
                  >
                    Create
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <Tables
          thead={machineTHEAD}
          tbody={currentData?.map((ele, index) => ({
            "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
            "Machine Name": ele?.MachineName,
            InterfaceType:
              ele?.InterfaceType == 1 ? "Bi-Directional" : "Uni-Directional",
            Date: ele?.Livedate,
            LiveStatus: (
              <div style={{ display: "flex", alignItems: "center" }}>
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name="LiveStatus"
                    checked={ele?.LiveStatus == "1" ? true : false}
                    onChange={handleSelectChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ),
            AfterLiveStatus: (
              <div style={{ display: "flex", alignItems: "center" }}>
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name="AfterLiveStatus"
                    checked={ele?.AfterLiveStatus == "1" ? true : false}
                    onChange={handleSelectChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ),
            QtType: ele?.MIType,
            Remove: (
              <a
                className="fa fa-trash"
                style={{
                  cursor: "pointer",
                  color: "red",
                  justifyItems: "center",
                  fontWeight: "800",
                }}
                onClick={() => {
                  handleRemove(ele?.ClientMachineID);
                }}
              ></a>
            ),
            Action: (
              <i
                className="fa fa-edit"
                style={{ cursor: "pointer" }}
                onClick={() => handleEditMachine(ele)}
              ></i>
            ),
          }))}
          tableHeight={"tableHeight"}
        />
        <div className="pagination ml-auto">
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
    </>
  );
};

export default MachineModuleModal;
