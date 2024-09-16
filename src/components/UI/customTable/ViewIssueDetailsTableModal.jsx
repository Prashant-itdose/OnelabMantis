import React, { useEffect, useState } from "react";
import Tables from ".";
import axios from "axios";
import { toast } from "react-toastify";
import { headers } from "../../../utils/apitools";
import Heading from "../Heading";
import {
  activityTHEAD,
  issueHistoryTHEAD,
  viewTHEAD,
} from "../../modalComponent/Utils/HealperThead";
import Modal from "../../modalComponent/Modal";
import UpdateViewIssueTableModal from "./UpdateViewIssueTableModal";
import Input from "../../formComponent/Input";
import { useTranslation } from "react-i18next";
import DatePicker from "../../formComponent/DatePicker";
import TextEditor from "../../formComponent/TextEditor";
import ReactSelect from "../../formComponent/ReactSelect";
import { inputBoxValidation } from "../../../utils/utils";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../../../utils/constant";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const ViewIssueDetailsTableModal = ({
  visible,
  setVisible,
  tableData,
  setTableData,
}) => {
  const [t] = useTranslation();
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [tableData2, setTableData2] = useState([]);
  const [tableData1, setTableData1] = useState([]);
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    TicketID: "",
    Project: "",
    Category: "",
    ViewStatus: "",
    DateSubmitted: "",
    LastUpdate: "",
    Reporter: "",
    AssignedTo: "",
    Priority: "",
    Status: "",
    ReportedByMobile: "",
    ReportedByName: "",
    Summary: "",
    Description: "",
    DeliveryDate: "",
    ManHours: "",
    ReferenceCode: "",
    Note: "",
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    Project: "",
    Category: "",
    AssignedTo: "",
    Priority: "",
    ReportedName: "",
    ReportedMobile: "",
    Description: "",
    Status: "",
    ReportedByName: "",
    ReportedByMobile: "",
    Note: "",
    ManHours: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormDataUpdate({
      ...formDataUpdate,
      [name]: value,
    });
  };

  const navigateTable = (type, id) => {
    let currentIndex = tableData.findIndex((ele) => ele?.TicketID === id);
    let updatedData = {};

    if (type === "pre" && currentIndex > 0) {
      let goToInd = currentIndex - 1;
      updatedData = tableData[goToInd];
    } else if (type === "next" && currentIndex < tableData.length - 1) {
      let goToInd = currentIndex + 1;
      updatedData = tableData[goToInd];
    }
    if (updatedData) {
      handleIssueSearch(updatedData?.TicketID);
    }
  };
  function removeHtmlTags(text) {
    return text.replace(/<[^>]*>?/gm, "");
  }
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormDataUpdate({ ...formDataUpdate, [name]: value });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "ReferenceCode") {
      if (value.length == 4) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleTableChange = () => {
    setTableData2({});
  };
  const THEAD = [
    "ID",
    "Project",
    "Category",
    "View Status",
    "Date Submitted",
    "Last Update",
    "Reporter",
    "AssignedTo",
    "Priority",
    "Status",
    "Reported By Mobile No",
    "Reported By Name",
    "Summary",
    "Description",
    "Delivery Date",
    "Man Hours",
  ];
  const handleSearchNote = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID")),
      form.append("TicketID", visible?.showData?.TicketID);
    axios
      .post(apiUrls?.ViewNote, form, {
        headers,
      })
      .then((res) => {
        const data = res?.data?.data;
        const updateddata = data?.map((ele, index) => {
          return {
            ...ele,
            IsUpdate: false,
          };
        });
        setTableData2(updateddata);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
        setLoading(false);
      });
  };

  const handleSearchHistory = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID")),
      form.append("TicketID", visible?.showData?.TicketID);
    axios
      .post(apiUrls?.ViewHistory, form, {
        headers,
      })
      .then((res) => {
        setTableData1(res?.data?.data);
        setLoading(false);
        console.log("manik", res?.data?.data);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
        setLoading(false);
      });
  };

  const handleIssueSearch = (ticket) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID"));
    form.append("TicketID", ticket);

    axios
      .post(apiUrls?.ViewTicket, form, {
        headers,
      })
      .then((res) => {
        if (res?.data?.status === true) {
          console.log(res?.data?.data);
          setFormData({
            TicketID: res?.data.data[0].Id,
            Project: res?.data.data[0].ProjectName,
            Category: res?.data.data[0].CategoryName,
            ViewStatus: res?.data.data[0]?.Status,
            DateSubmitted: res?.data.data[0]?.SubmittedDate,
            LastUpdate: res?.data.data[0]?.Updatedate,
            Reporter: res?.data.data[0]?.ReporterName,
            AssignedTo: res?.data.data[0]?.AssignedTo,
            Priority: res?.data.data[0]?.priority,
            Status: res?.data.data[0]?.Status,
            ReportedByMobile: res?.data.data[0]?.RepoterMobileNo,
            ReportedByName: res?.data.data[0]?.ReporterName,
            Summary: res?.data.data[0]?.summary,
            Description: removeHtmlTags(res?.data.data[0]?.description),
            DeliveryDate:
              res?.data.data[0]?.DeliveryDate != ""
                ? new Date(res?.data.data[0]?.DeliveryDate)
                : "",
            ManHours: res?.data.data[0]?.ManHour,
            Note: "",
            ReferenceCode: res?.data.data[0]?.ReferenceCode,
          });
          setFormDataUpdate({
            TicketID: res?.data.data[0].Id,
            Project: res?.data.data[0].project_id,
            Category: res?.data.data[0].category_id,
            DateSubmitted: res?.data.data[0]?.SubmittedDate,
            LastUpdate: res?.data.data[0]?.Updatedate,
            Reporter: res?.data.data[0]?.RepoterName,
            AssignedTo: res?.data.data[0]?.handler_id,
            Priority: res?.data.data[0]?.priority,
            Status: res?.data.data[0]?.StatusId,
            ReportedByMobile: res?.data.data[0]?.RepoterMobileNo,
            ReportedByName: res?.data.data[0]?.ReporterName,
            Summary: res?.data.data[0]?.summary,
            Description: removeHtmlTags(res?.data.data[0]?.description),
            DeliveryDate:
              res?.data.data[0]?.DeliveryDate != ""
                ? new Date(res?.data.data[0]?.DeliveryDate)
                : "",
            ManHours: res?.data.data[0]?.ManHour,
            ReferenceCode: res?.data.data[0]?.ReferenceCode,
            Note: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [edit, setEdit] = useState(false);
  const [edit1, setEdit1] = useState(false);
  const handleEdit = () => {
    if (edit) {
      let form = new FormData();
      form.append("ID", localStorage.getItem("ID")),
        form.append("LoginName", localStorage.getItem("realname"));
      form.append("TicketID", formDataUpdate?.TicketID);
      form.append("CategoryID", formDataUpdate?.Category);
      form.append("AssignToID", formDataUpdate?.AssignedTo);
      form.append("PriorityID", formDataUpdate?.Priority);
      form.append(
        "DeliveryDate",
        formDataUpdate?.DeliveryDate != ""
          ? new Date(formDataUpdate?.DeliveryDate)?.toISOString()?.split("T")[0]
          : ""
      );
      form.append("Manhour", formDataUpdate?.ManHours);
      form.append("Summary", formDataUpdate?.Summary);
      form.append("Note", formDataUpdate?.Note);
      form.append("Description", removeHtmlTags(formDataUpdate?.Description));
      form.append("ReportedByName", formDataUpdate?.ReportedByName);
      form.append("ReportedByMobileNo", formDataUpdate?.ReportedByMobile);
      axios
        .post(apiUrls?.UpdateTicket, form, {
          headers,
        })
        .then((res) => {
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : "Error Occured"
          );
          // setLoading(false);
        });
    } else {
      setEdit(true);
    }
  };
  const handleDeleteNote = (id) => {
    // Find the note with the specific ID
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID"));
    form.append("LoginName", localStorage.getItem("realname"));
    form.append("TicketID", formDataUpdate?.TicketID);
    form.append("NoteID", id); // Assuming NoteID is part of the note object

    axios
      .post(apiUrls?.DeleteNote, form, {
        headers,
      })
      .then((res) => {
        toast.success(res?.data?.message);

        // Optionally, remove the note from the tableData2 state after successful deletion
        // const updatedTableData = tableData2.filter((item) => item.id !== id);
        // setTableData2(updatedTableData);
        handleSearchNote();
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occurred"
        );
      });
  };

  const handleEditUpdate = (ele) => {
    // if (!IsUpdate) {
    //   const data = tableData2;
    //   data[index]["IsUpdate"] = true;
    //   setTableData2(data);
    // } else {
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID")),
      form.append("LoginName", localStorage.getItem("realname")),
      form.append("TicketID", formDataUpdate?.TicketID);
    form.append("NoteID", ele?.NoteId);
    form.append("NoteText", ele?.note);
    axios
      .post(apiUrls?.UpdateNote, form, {
        headers,
      })
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : "Error Occured"
        );
        // setLoading(false);
      });
  };
  const [rowHandler, setRowHandler] = useState({
    show: false,
    show1: false,
  });
  const handlerow = (row) => {
    let obj;
    if (!rowHandler[row]) {
      obj = { ...rowHandler, [row]: true };
    } else {
      obj = { ...rowHandler, [row]: false };
    }
    setRowHandler(obj);
  };
  const [project, setProject] = useState([]);
  const [category, setCategory] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const [priority, setPriority] = useState([]);
  const [status, setStatus] = useState([]);
  const getStatus = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Status_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.STATUS, value: item?.id };
          });
          setStatus(poc3s);
        })
        .catch((err) => {
          console.log(err);
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
          getCategory(poc3s[0]?.value);
          setProject(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPriority = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Priority_Select, form, { headers })
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.Id };
          });
          setPriority(assigntos);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getCategory = (proj) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("ProjectID", proj),
      axios
        .post(apiUrls?.Category_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setCategory(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getAssignTo = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.AssignTo_Select, form, { headers })
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setAssignedto(assigntos);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  console.log(visible?.showData);
  useEffect(() => {
    getProject();
    getAssignTo();
    getPriority();
    getStatus();
    handleSearchNote();
    handleSearchHistory();
    if (visible?.showData?.flag) {
      handleIssueSearch(visible?.showData?.Id);
    } else {
      handleIssueSearch(visible?.showData?.TicketID);
    }
  }, []);

  return (
    <>
      {/* {updatevisible?.updateShow && (
        <Modal
          visible={updatevisible}
          setVisible={setUpdateVisible}
          Header="Updating Issue Information"
        >
          <UpdateViewIssueTableModal
            visible={updatevisible}
            setVisible={setUpdateVisible}
          />
        </Modal>
      )} */}
      <div className="card">
        <Heading
          title={"View Issue Details"}
          secondTitle={
            <div className="col-sm-12 col-xs-12">
              {/* <button
              style={{background:"white" ,color:"black" ,border:"none"}}
                className="previous  btn-success mx-2"
                disabled={tableData[0]?.currentIndex === 0 ? true : false}
              >
                ‹
              </button> */}
              {visible.showData.flag == true ? (
                <></>
              ) : (
                <>
                  <i
                    className="fa fa-arrow-left"
                    style={{
                      fontSize: "15px",
                      marginRight: "6px",
                      marginLeft: "13px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigateTable("pre", formData?.TicketID)}
                  ></i>
                  <i
                    className="fa fa-arrow-right"
                    style={{
                      fontSize: "15px",
                      marginRight: "6px",
                      marginLeft: "13px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigateTable("next", formData?.TicketID)}
                  ></i>
                </>
              )}

              {/* <button
                className="next btn-success mx-2"
                disabled={
                  tableData[0]?.currentIndex === tableData.length - 1
                    ? true
                    : false
                }
              >
                ›
              </button> */}
            </div>
          }
        />
        {/* <Tables
          thead={viewTHEAD}
          tbody={daata?.map((ele, index) => ({
            ID: ele?.TicketID,
            Project: ele?.ProjectName,
            Category: ele?.Category,
            "View Status": ele?.Status,
            "Date Submitted": ele?.AssignedDate,
            "Last Update": ele?.ResolvedDate,
            Reporter: ele?.ReporterName,
            AssignedTo: ele?.AssignTo,
            Priority: ele?.Priority,
            Status: ele?.Status,
            "Reported By Mobile No": 9999999999,
            "Reported By Name": ele?.ReporterName,
            Summary: ele?.summary,
            Description: "aaaaaaaaaaaa",
            "Delivery Date": ele?.AssignedDate,
          }))}
          tableHeight={"tableHeight"}
        /> */}
        <div className="row m-2">
          <Input
            type="text"
            className="form-control"
            id="TickeID"
            name="TickeID"
            lable="TickeID"
            value={formData?.TicketID}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == false}
          />
          {edit == false ? (
            <Input
              type="text"
              className="form-control"
              id="Project"
              name="Project"
              lable="Project"
              value={formData?.Project}
              placeholder=" "
              respclass="col-md-4 col-12 col-sm-12"
              onChange={handleChange}
              disabled={edit == false}
            />
          ) : (
            <ReactSelect
              respclass="col-md-4 col-12 col-sm-12"
              name="Project"
              placeholderName="Project"
              dynamicOptions={project}
              value={formDataUpdate?.Project}
              handleChange={handleDeliveryChange}
            />
          )}
          {edit == false ? (
            <Input
              type="text"
              className="form-control"
              id="Category"
              name="Category"
              lable="Category"
              value={formData?.Category}
              placeholder=" "
              respclass="col-md-4 col-12 col-sm-12"
              onChange={handleChange}
              disabled={edit == false}
            />
          ) : (
            <ReactSelect
              respclass="col-md-4 col-12 col-sm-12"
              name="Category"
              placeholderName="Category"
              dynamicOptions={category}
              value={formDataUpdate?.Category}
              handleChange={handleDeliveryChange}
            />
          )}

          <Input
            type="text"
            className="form-control"
            id="DateSubmitted"
            name="DateSubmitted"
            lable="DateSubmitted"
            value={formData?.DateSubmitted}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == true || edit == false}
          />
          <Input
            type="text"
            className="form-control"
            id="LastUpdate"
            name="LastUpdate"
            lable="LastUpdate"
            value={formData?.LastUpdate}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == true || edit == false}
          />
          <Input
            type="text"
            className="form-control"
            id="Reporter"
            name="Reporter"
            lable="Reporter"
            value={formData?.Reporter}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == false}
          />
          {edit == false ? (
            <Input
              type="text"
              className="form-control"
              id="AssignedTo"
              name="AssignedTo"
              lable="AssignedTo"
              value={formData?.AssignedTo}
              placeholder=" "
              respclass="col-md-4 col-12 col-sm-12"
              onChange={handleChange}
              disabled={edit == false}
            />
          ) : (
            <ReactSelect
              respclass="col-md-4 col-12 col-sm-12"
              name="AssignedTo"
              placeholderName="AssignedTo"
              dynamicOptions={assignto}
              value={formDataUpdate?.AssignedTo}
              handleChange={handleDeliveryChange}
            />
          )}
          {edit == false ? (
            <Input
              type="text"
              className="form-control"
              id="Priority"
              name="Priority"
              lable="Priority"
              value={formData?.Priority}
              placeholder=" "
              respclass="col-md-4 col-12 col-sm-12"
              onChange={handleChange}
              disabled={edit == false}
            />
          ) : (
            <ReactSelect
              respclass="col-md-4 col-12 col-sm-12"
              name="Priority"
              placeholderName="Priority"
              dynamicOptions={priority}
              value={formDataUpdate?.Priority}
              handleChange={handleDeliveryChange}
            />
          )}
          {edit == false ? (
            <Input
              type="text"
              className="form-control"
              id="Status"
              name="Status"
              lable="Status"
              value={formData?.Status}
              placeholder=" "
              respclass="col-md-4 col-12 col-sm-12"
              onChange={handleChange}
              disabled={edit == false}
            />
          ) : (
            <ReactSelect
              respclass="col-md-4 col-12 col-sm-12"
              name="Status"
              placeholderName="Status"
              dynamicOptions={status}
              value={formDataUpdate?.Status}
              handleChange={handleDeliveryChange}
            />
          )}
          <Input
            type="number"
            className="form-control"
            id="ReportedByMobile"
            name="ReportedByMobile"
            lable="ReportedByMobile"
            value={formData?.ReportedByMobile}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
            onChange={(e) => {
              inputBoxValidation(
                MOBILE_NUMBER_VALIDATION_REGX,
                e,
                handleChange
              );
            }}
            disabled={edit == false}
          />
          <Input
            type="text"
            className="form-control"
            id="ReportedByName"
            name="ReportedByName"
            lable="ReportedByName"
            value={formData?.ReportedByName}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == false}
          />
          <Input
            type="text"
            className="form-control"
            id="Summary"
            name="Summary"
            lable="Summary"
            value={formData?.Summary}
            placeholder=" "
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == false}
          />
          {edit == false ? (
            <Input
              type="text"
              className="form-control"
              id="Description"
              name="Description"
              lable="Description"
              value={formData?.Description}
              placeholder=" "
              respclass="col-md-4 col-12 col-sm-12"
              onChange={handleChange}
              disabled={edit == false}
            />
          ) : (
            <div className="col-12">
              <TextEditor
                value={formDataUpdate?.Description}
                onChange={(value) =>
                  setFormDataUpdate({ ...formDataUpdate, Description: value })
                }
              />
            </div>
          )}
          {edit == false ? (
            <Input
              type="text"
              className="form-control"
              id="DeliveryDate"
              name="DeliveryDate"
              lable="DeliveryDate"
              value={formData?.DeliveryDate}
              placeholder=" "
              respclass="col-md-4 col-12 col-sm-12"
              onChange={handleChange}
              disabled={edit == false}
            />
          ) : (
            <DatePicker
              className="custom-calendar"
              id="DeliveryDate"
              name="DeliveryDate"
              placeholder={VITE_DATE_FORMAT}
              respclass="col-md-4 col-12 col-sm-12"
              value={formDataUpdate?.DeliveryDate}
              handleChange={searchHandleChange}
            />
          )}
          <textarea
            type="text"
            className="form-control"
            id="Note"
            name="Note"
            lable="Note"
            value={formData?.Note}
            placeholder="Note "
            //  respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == false}
            style={{ width: "32%", marginLeft: "7.5px" }}
          ></textarea>
          <Input
            type="number"
            className="form-control"
            id="ManHours"
            name="ManHours"
            lable="ManHours"
            value={formData?.ManHours}
            placeholder=""
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == false}
          />
          <Input
            type="text"
            className="form-control"
            id="ReferenceCode"
            name="ReferenceCode"
            lable="ReferenceCode"
            value={formData?.ReferenceCode}
            placeholder=""
            respclass="col-md-4 col-12 col-sm-12"
            onChange={handleChange}
            disabled={edit == false}
          />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-4 col-12">
          <div className="d-flex m-2">
            {/* <button className="btn btn-lg btn-info ">Reopen</button> */}
            {/* <button
              style={{ color: "white"}}
              className="btn btn-lg btn-info ml-2"
            >
              Status
            </button> */}
            <button className="btn btn-lg btn-info ml-2" onClick={handleEdit}>
              {edit ? "Update" : "Edit"}
            </button>
          </div>
        </div>
      </div>

      <div className="card patient_registration_card mt-3">
        <Heading
          title={"Actvities"}
          secondTitle={
            <div style={{ marginRight: "0px" }}>
              <button
                className={`fa ${rowHandler.show1 ? "fa-arrow-up" : "fa-arrow-down"}`}
                onClick={() => {
                  handlerow("show1");
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                  borderRadius: "2px",
                  background: "none",
                }}
              ></button>
            </div>
          }
        />
        {rowHandler.show1 && (
          <>
            {tableData2?.length > 0 ? (
              <Tables
                style={{ margin: "1px" }}
                thead={activityTHEAD}
                tbody={tableData2?.map((ele, index) => ({
                  Update: (
                    <>
                      <button
                        className="btn btn-lg btn-info ml-2"
                        onClick={() => {
                          const updatedData = [...tableData2]; // Create a copy of the state
                          updatedData[index]["IsUpdate"] = !ele?.IsUpdate; // Modify the copy
                          setTableData2(updatedData); // Set the state with the new array
                          if (!ele?.IsUpdate) handleEditUpdate(ele);
                        }}
                      >
                        {ele?.IsUpdate ? "Update" : "Edit"}
                      </button>
                      <button
                        className="btn btn-lg btn-info ml-2"
                        onClick={() => handleDeleteNote(ele?.NoteId)}
                      >
                        Delete
                      </button>
                    </>
                  ),
                  "User Name": (
                    <Input
                      value={ele?.RealName}
                      className="form-control"
                      disabled={true}
                    />
                  ),
                  DateSubmitted: (
                    <Input
                      value={ele?.dtEntry}
                      disabled={true}
                      className="form-control"
                    />
                  ),

                  NoteId: (
                    <Input
                      value={ele?.NoteId}
                      className="form-control"
                      disabled={true}
                    />
                  ),

                  Notes:
                    ele?.IsUpdate === false ? (
                      <Input
                        value={ele?.note}
                        className="form-control"
                        disabled={ele?.IsUpdate == false}
                      />
                    ) : (
                      <Input
                        name="Note"
                        className="form-control"
                        value={ele?.note}
                        onChange={(e) => {
                          const updatedData = [...tableData2];
                          updatedData[index]["note"] = e?.target.value;
                          setTableData2(updatedData);
                        }}
                      />
                    ),
                }))}
                tableHeight={"tableHeight"}
              />
            ) : (
              <span style={{ textAlign: "center" }}>
                There are no notes attached to this issue.
              </span>
            )}{" "}
          </>
        )}
      </div>

      <div className="card patient_registration_card mt-3">
        <Heading
          title={t("Search History")}
          secondTitle={
            <div style={{ marginRight: "0px" }}>
              <button
                className={`fa ${rowHandler.show ? "fa-arrow-up" : "fa-arrow-down"}`}
                onClick={() => {
                  handlerow("show");
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                  borderRadius: "2px",
                  background: "none",
                }}
              ></button>
            </div>
          }
        />
        {rowHandler.show && (
          <Tables
            thead={issueHistoryTHEAD}
            tbody={tableData1?.map((ele, index) => ({
              DateModified: ele?.Updatedate,
              "User Name": ele?.username,
              Field: ele?.field_name,
              Change: ele?.leble1,
            }))}
            tableHeight={"tableHeight"}
          />
        )}
      </div>
    </>
  );
};
export default ViewIssueDetailsTableModal;
