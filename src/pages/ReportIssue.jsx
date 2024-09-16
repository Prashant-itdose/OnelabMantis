import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../components/UI/Heading";
import Input from "../components/formComponent/Input";
import { useFormik } from "formik";
import {
  MOBILE_NUMBER_VALIDATION_REGX,
  RECEIPT_REPRINT_PAYLOAD,
  SEARCHBY,
} from "../utils/constant";
import { ReceiptDetailnew } from "../networkServices/opdserviceAPI";
import moment from "moment";
import ReactSelect from "../components/formComponent/ReactSelect";
import TextEditor from "../components/formComponent/TextEditor";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import axios from "axios";
import { headers } from "../utils/apitools";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NewTicketModal from "../components/UI/customTable/NetTicketModal";
import Modal from "../components/modalComponent/Modal";
import { inputBoxValidation } from "../utils/utils";
import { apiUrls } from "../networkServices/apiEndpoints";

const ReportIssue = () => {
  const [errors, setErros] = useState({});
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [ticketid, setticketid] = useState("");
  console.log(ticketid);
  const [formData, setFormData] = useState({
    ProjectID: "",
    Category: "",
    AssignedTo: "",
    Priority: "",
    ReportedName: "",
    ReportedMobile: "",
    Description: "",
    Summary: "",
  });
  const [project, setProject] = useState([]);
  const [category, setCategory] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const [priority, setPriority] = useState([]);

  const [rowHandler, setRowHandler] = useState({
    SummaryShow: false,
    DateSubmittedShow: false,
    TextEditorShow: false,
  });

  const handleDeliveryButton2 = () => {
    setRowHandler({
      ...rowHandler,
      TextEditorShow: !rowHandler?.TextEditorShow,
    });
  };
  const handleSummaryShow = () => {
    setRowHandler({ ...rowHandler, SummaryShow: !rowHandler?.SummaryShow });
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
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
          // if (poc3s.length == 1)
          // setFormData({ ...formData, ProjectID: poc3s[0]?.value });
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function removeHtmlTags(text) {
    return text?.replace(/<[^>]*>?/gm, "");
  }

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
          // setFormData({ ...formData, Category: poc3s[0]?.value,ProjectID:proj });
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
  const getPriority = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Priority_Select, form, { headers })
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setPriority(assigntos);
          // setFormData({ ...formData, Priority: assigntos[0]?.value });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getReportNote = () => {
    if (formData?.ProjectID == "") {
      toast.error("Please Select Project.");
    } else if (formData?.Category == "") {
      toast.error("Please Select Category.");
    } else if (formData?.AssignedTo == "") {
      toast.error("Please Select AssignedTo.");
    } else if (formData?.Priority == "") {
      toast.error("Please Select Priority.");
    } else if (formData?.Summary == "") {
      toast.error("Please Select Summary");
    } else if (formData?.Description == "") {
      toast.error("Please Select Description");
    } else if (formData?.ReportedName == "") {
      toast.error("Please Select ReportedName.");
    } else if (formData?.ReportedMobile == "") {
      toast.error("Please Select Reported Mobile No.");
    } else {
      let form = new FormData();
      form.append("Id", localStorage?.getItem("ID")),
        form.append("ProjectID", formData?.ProjectID),
        form.append("CategoryID", formData?.Category),
        form.append("AssignTo", formData?.AssignedTo),
        form.append("Summary", formData?.Summary),
        form.append("ReporterMobileNo", formData?.ReportedMobile),
        form.append("ReporterName", formData?.ReportedName),
        form.append(
          "Description",
          formData?.Description != ""
            ? removeHtmlTags(formData?.Description)
            : ""
        ),
        form.append("PriorityID", formData?.Priority),
        axios
          .post(apiUrls?.NewTicket, form, { headers })
          .then((res) => {
            toast.success(res?.data?.message);
            if (res?.data.status == true) {
              setticketid(res?.data?.TicketID);
              console.log(res?.data?.data);
              setVisible({ showVisible: true, visible: res?.data?.data });
              setFormData({
                ProjectID: project[0]?.value,
                Category: category[0]?.value,
                AssignedTo: "",
                Priority: priority[0]?.value,
                ReportedName: "",
                ReportedMobile: "",
                Description: "",
                Summary: "",
              });
            }
            console.log(res?.data?.TicketID);
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  useEffect(() => {
    getProject();
    getAssignTo();
    getPriority();
  }, []);

  const ValidationForm = (formData) => {
    let err = "";
    if (formData?.ReportedName === "") {
      err = { ...err, ReportedName: "Please Enter ReportedName." };
    }

    if (
      formData?.ReportedMobile?.length >= 0 &&
      formData?.ReportedMobile.length < 10
    ) {
      err = {
        ...err,
        ReportedMobile: "Mobile No. Must be of 10 Digit",
      };
    }
    return err;
  };

  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Preview NewTicket Details"
        >
          <NewTicketModal
            visible={visible}
            id={ticketid}
            setVisible={setVisible}
          />
        </Modal>
      )}
      <div className="card patient_registration border">
        <Heading title={t("Report Issue")} isBreadcrumb={true} />
        <div className="row g-4 m-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ProjectID"
            placeholderName="Project"
            dynamicOptions={project}
            value={formData?.ProjectID}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Category"
            placeholderName="Category"
            dynamicOptions={category}
            value={formData?.Category}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="AssignedTo"
            placeholderName="AssignedTo"
            dynamicOptions={assignto}
            value={formData?.AssignedTo}
            handleChange={handleDeliveryChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Priority"
            placeholderName="Priority"
            dynamicOptions={priority}
            value={formData?.Priority}
            handleChange={handleDeliveryChange}
          />
          <textarea
            type="text"
            respclass="col-md-4 col-12 col-sm-12"
            className="form-control textArea"
            placeholder="Summary "
            id={"Summary"}
            name="Summary"
            value={formData?.Summary}
            onChange={handleChange}
            style={{ width: "16%", marginLeft: "7.5px" }}
          ></textarea>
          {/* <div className="col-sm-2 col-12">
            {fields.map((field, index) => (
              <div className="d-flex justify-content-between">
                <div
                  key={index}
                  className="input-group mb-1"
                  style={{ height: "auto" }}
                >
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder=" "
                    id={`summary-${index}`}
                    name="summary"
                    value={field.value}
                    onChange={(e) => handleInputChange(index, e)}
                  ></textarea>
                </div>
                <div className="input-group-append">
                  {index == 0 && (
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      onClick={handleAddField}
                    >
                      <i className="fa fa-plus-circle"></i>
                    </button>
                  )}
                  {index > 0 && (
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => handleRemoveField(index)}
                    >
                      <i className="fa fa-minus-circle"></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div> */}

          <div className="col-2" style={{ display: "flex" }}>
            <div style={{ width: "40%", marginRight: "3px" }}>
              <button className="btn btn-sm" onClick={handleDeliveryButton2}>
                Description
              </button>
            </div>
          </div>

          {rowHandler?.TextEditorShow && (
            <div className="col-12">
              <TextEditor
                value={formData?.Description}
                onChange={(value) =>
                  setFormData({ ...formData, Description: value })
                }
              />
              {/* <CKEditor initData={''} onChange={(value) => setFormData({...formData,'Description':value})}  /> */}
            </div>
          )}

          <Input
            type="text"
            className="form-control"
            id="ReportedName"
            name="ReportedName"
            lable="Reported By Name"
            placeholder=" "
            max={20}
            onChange={handleChange}
            value={formData?.ReportedName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            error={errors?.ReportedName ? errors?.ReportedName : ""}
          />
          <Input
            type="number"
            className="form-control"
            id="ReportedMobile"
            name="ReportedMobile"
            lable="Reported By Mobile"
            placeholder=" "
            onChange={(e) => {
              inputBoxValidation(
                MOBILE_NUMBER_VALIDATION_REGX,
                e,
                handleChange
              );
            }}
            value={formData?.ReportedMobile}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            error={errors?.ReportedMobile ? errors?.ReportedMobile : ""}
          />

          <div className="col-2">
            <button className="btn btn-sm btn-success" onClick={getReportNote}>
              Submit
            </button>
            {/* <button className="btn btn-sm btn-success ml-2"  onClick={() => {
                          setVisible({ showVisible: true,  });
                        }} >
              Preview
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportIssue;
