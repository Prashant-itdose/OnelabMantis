import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { RECEIPT_REPRINT_PAYLOAD, SEARCHBY } from "../utils/constant";
import Heading from "../components/UI/Heading";
import { useTranslation } from "react-i18next";
import { headers } from "../utils/apitools";
import axios from "axios";
import Tables from "../components/UI/customTable";
import ViewIssueDetailsTableModal from "../components/UI/customTable/ViewIssueDetailsTableModal";
import Modal from "../components/modalComponent/Modal";
import { autoTHEAD } from "../components/modalComponent/Utils/HealperThead";
import { apiUrls } from "../networkServices/apiEndpoints";

const MyView = () => {
  const [t] = useTranslation();
  const rowConst = {
    show: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
  };
  const [rowHandler, setRowHandler] = useState(rowConst);
  const { handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: RECEIPT_REPRINT_PAYLOAD,
    onSubmit: async (values, { resetForm }) => {
      SearchBillPrintAPI();
    },
  });

  const handlerow = (row) => {
    let obj;
    if (row == "show") {
      getAssignewdToMe(
       apiUrls?.AssingedToMe,
        "assign"
      );
    }
    if (row == "show1") {
      getAssignewdToMe(
       apiUrls?.UnAssigned,
        "unassign"
      );
    }
    if (row == "show2") {
      getAssignewdToMe(
        apiUrls?.ReportedbyMe,
        "reportedbyme"
      );
    }
    if (row == "show3") {
      handleSearch("75");
    }
    if (row == "show4") {
      handleSearch("90");
    }
    if (!rowHandler[row]) {
      obj = { ...rowHandler, [row]: true };
    } else {
      obj = { ...rowHandler, [row]: false };
    }
    setRowHandler(obj);
  };

  const THEAD = [
    // "S.No.",
    "Ticket ID",
    "Project",
    "Summary",
    "Edit",
    "Priority",
    "Submit Date",
  ];
  const shortenName = (name) => {
    return name.length > 100 ? name.substring(0, 25) + "..." : name;
  };
  const handleSearch = (code) => {
    // setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID")),
      form.append("ProjectID", ""),
      form.append("VerticalID", ""),
      form.append("TeamID", ""),
      form.append("WingID", ""),
      form.append("POC1", ""),
      form.append("POC2", ""),
      form.append("POC3", ""),
      form.append("StatusCode", code ? code : "");
    axios
      .post(
        apiUrls?.AutobackupSearch,
        form,
        { headers }
      )
      .then((res) => {
        let arr = [];
        if (res?.data?.data?.length > 0) {
          if (code == "75")
            setData({ ...data, autoquery75days: res?.data?.data });
          if (code == "90")
            setData({ ...data, autoquery90days: res?.data?.data });
        }
        // setLoading(false);
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
  const [data, setData] = useState({
    assignedtome: [],
    unassigned: [],
    reportedbyme: [],
    autoquery75days: [],
    autoquery90days: [],
  });

  const getAssignewdToMe = (url, type) => {
    let form = new FormData();
    form.append("ID", 12),
      axios
        .post(url, form, { headers })
        .then((res) => {
          if (type == "assign") {
            setData({ ...data, assignedtome: res?.data?.data });
          }
          if (type == "unassign") {
            setData({ ...data, unassigned: res?.data?.data });
          }
          if (type == "reportedbyme") {
            setData({ ...data, reportedbyme: res?.data?.data });
          }
          if (type == "autoquery75days") {
            setData({ ...data, autoquery75days: res?.data?.data });
          }
          if (type == "autoquery90days") {
            setData({ ...data, autoquery90days: res?.data?.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };
  useEffect(() => {
    getAssignewdToMe();
  }, []);

  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.autoquery75days.length / rowsPerPage);
  const currentData = data.autoquery75days.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const [currentPage1, setCurrentPage1] = useState(1);
  const rowsPerPage1 = 10;
  const totalPages1 = Math.ceil(data.assignedtome.length / rowsPerPage1);
  const currentData1 = data.assignedtome.slice(
    (currentPage1 - 1) * rowsPerPage1,
    currentPage1 * rowsPerPage1
  );
  const handlePageChange1 = (newPage1) => {
    if (newPage1 > 0 && newPage1 <= totalPages1) {
      setCurrentPage1(newPage1);
    }
  };
  const [currentPage2, setCurrentPage2] = useState(1);
  const rowsPerPage2 = 10;
  const totalPages2 = Math.ceil(data.unassigned.length / rowsPerPage2);
  const currentData2 = data.unassigned.slice(
    (currentPage2 - 1) * rowsPerPage2,
    currentPage2 * rowsPerPage2
  );
  const handlePageChange2 = (newPage2) => {
    if (newPage2 > 0 && newPage2 <= totalPages2) {
      setCurrentPage2(newPage2);
    }
  };
  const [currentPage3, setCurrentPage3] = useState(1);
  const rowsPerPage3 = 10;
  const totalPages3 = Math.ceil(data.reportedbyme.length / rowsPerPage3);
  const currentData3 = data.reportedbyme.slice(
    (currentPage3 - 1) * rowsPerPage3,
    currentPage3 * rowsPerPage3
  );
  const handlePageChange3 = (newPage3) => {
    if (newPage3 > 0 && newPage3 <= totalPages3) {
      setCurrentPage3(newPage3);
    }
  };
  const [currentPage4, setCurrentPage4] = useState(1);
  const rowsPerPage4 = 10;
  const totalPages4 = Math.ceil(data.autoquery90days.length / rowsPerPage4);
  const currentData4 = data.autoquery90days.slice(
    (currentPage4 - 1) * rowsPerPage4,
    currentPage4 * rowsPerPage4
  );
  const handlePageChange4 = (newPage4) => {
    if (newPage4 > 0 && newPage4 <= totalPages4) {
      setCurrentPage4(newPage4);
    }
  };

  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"1000px"}
          visible={visible}
          setVisible={setVisible}
          Header="View Issues Detail"
        >
          <ViewIssueDetailsTableModal
            visible={visible}
            setVisible={setVisible}
          />
        </Modal>
      )}
      <div className="card ViewIssues border" style={{ marginBottom: "2px" }}>
        <Heading title="My View" isBreadcrumb={true} />
      </div>

      <div className="card ViewIssues " style={{ marginTop: "3px" }}>
        <div
          className="accordion"
          id="accordionExample"
          style={{ borderRadius: "3px", background: "white", border: "white" }}
        >
          <div
            className="accordion-item"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div>
              <i
                className="fa fa-list-alt"
                style={{
                  fontSize: "15px",
                  marginRight: "6px",
                  marginLeft: "13px",
                }}
              ></i>{" "}
              Assigned to Me (Unresolved)
            </div>
            <div style={{ marginRight: "13px" }}>
              {rowHandler.show && (
                <span style={{ fontWeight: "bold" }}>
                  Total Count : {data?.assignedtome?.length}
                </span>
              )}
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
                  background: "white",
                }}
                // style={{
                //   marginTop: "3px",
                //   transition: "transform 0.5s ease-in-out",
                //   transform: `rotate(${rowHandler?.show2 ? "180deg" : "0deg"})`,
                // }}
              ></button>
            </div>
          </div>
          {rowHandler.show && (
            <>
              <Tables
                thead={THEAD}
                tbody={currentData1?.map((ele, index) => ({
                  // "S.No.": index + 1,
                  "Ticket ID": ele?.TicketID,
                  Project: ( <span
                    id={`projectName-${index}`}
                    targrt={`projectName-${index}`}
                    title={ele?.ProjectName}
                  >
                    {shortenName(ele?.ProjectName)}
                  </span>),
                  Summary: ( <span
                    id={`Summary-${index}`}
                    targrt={`Summary-${index}`}
                    title={ele?.Summary}
                  >
                    {shortenName(ele?.Summary)}
                  </span>),
                  Edit: (
                    <i
                      className="fa fa-edit"
                      onClick={() => {
                        setVisible({ showVisible: true, showData: ele });
                      }}
                    ></i>
                  ),
                  Priority: ele?.Priority,
                  "Submit Date": ele?.TicketRaisedDate,
                  colorcode: ele?.colorcodenew,
                }))}
                tableHeight={"tableHeight"}
              />
              <div
                className="pagination"
                style={{ marginLeft: "auto", float: "right" }}
              >
                <button
                  onClick={() => handlePageChange1(currentPage1 - 1)}
                  disabled={currentPage1 === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage1} of {totalPages1}
                </span>
                <button
                  onClick={() => handlePageChange1(currentPage1 + 1)}
                  disabled={currentPage1 === totalPages1}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="card ViewIssues" style={{ marginTop: "3px" }}>
        <div
          className="accordion"
          id="accordionExample"
          style={{ borderRadius: "3px", background: "white", border: "white" }}
        >
          <div
            className="accordion-item"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div>
              <i
                className="fa fa-list-alt"
                style={{
                  fontSize: "15px",
                  marginRight: "6px",
                  marginLeft: "13px",
                }}
              ></i>{" "}
              Unassigned
            </div>
            <div style={{ marginRight: "13px" }}>
              {rowHandler.show1 && (
                <span style={{ fontWeight: "bold" }}>
                  Total Count : {data?.unassigned?.length}
                </span>
              )}
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
                  background: "white",
                }}
              ></button>
            </div>
          </div>
          {rowHandler.show1 && (
            <>
              <Tables
                thead={THEAD}
                tbody={currentData2?.map((ele, index) => ({
                  "Ticket ID": ele?.TicketID,
                  Project:  ( <span
                    id={`ProjectName-${index}`}
                    targrt={`ProjectName-${index}`}
                    title={ele?.ProjectName}
                  >
                    {shortenName(ele?.ProjectName)}
                  </span>),
                  Summary:  ( <span
                    id={`Summary-${index}`}
                    targrt={`Summary-${index}`}
                    title={ele?.Summary}
                  >
                    {shortenName(ele?.Summary)}
                  </span>),
                  Edit: (
                    <i
                      className="fa fa-edit"
                      onClick={() => {
                        setVisible({ showVisible: true, showData: ele });
                      }}
                    ></i>
                  ),
                  Priority: ele?.Priority,
                  "Submit Date": ele?.TicketRaisedDate,
                }))}
                tableHeight={"tableHeight"}
              />
              <div className="pagination" style={{ float: "right" }}>
                <button
                  onClick={() => handlePageChange2(currentPage2 - 1)}
                  disabled={currentPage2 === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage2} of {totalPages2}
                </span>
                <button
                  onClick={() => handlePageChange2(currentPage2 + 1)}
                  disabled={currentPage2 === totalPages2}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="card ViewIssues " style={{ marginTop: "3px" }}>
        <div
          className="accordion"
          id="accordionExample"
          style={{ borderRadius: "3px", background: "white", border: "white" }}
        >
          <div
            className="accordion-item"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div>
              <i
                className="fa fa-list-alt"
                style={{
                  fontSize: "15px",
                  marginRight: "6px",
                  marginLeft: "13px",
                }}
              ></i>{" "}
              Reported by Me
            </div>
            <div style={{ marginRight: "13px" }}>
              {rowHandler.show2 && (
                <span style={{ fontWeight: "bold" }}>
                  Total Count : {data?.reportedbyme?.length} 
                </span>
              )}
              <button
                className={`fa ${rowHandler.show2 ? "fa-arrow-up" : "fa-arrow-down"}`}
                onClick={() => {
                  handlerow("show2");
                }}
                // style={{
                //   marginTop: "3px",
                //   transition: "transform 0.5s ease-in-out",
                //   transform: `rotate(${rowHandler?.show2 ? "180deg" : "0deg"})`,
                // }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                  borderRadius: "2px",
                  background: "white",
                }}
              ></button>
            </div>
          </div>
          {rowHandler.show2 && (
            <>
              <Tables
                thead={THEAD}
                tbody={currentData3?.map((ele, index) => ({
                  "Ticket ID": ele?.TicketID,
                  Project: ele?.ProjectName,
                  Summary: ( <span
                    id={`Summary-${index}`}
                    targrt={`Summary-${index}`}
                    title={ele?.Summary}
                  >
                    {shortenName(ele?.Summary)}
                  </span>),
                  Edit: (
                    <i
                      className="fa fa-edit"
                      onClick={() => {
                        setVisible({ showVisible: true, showData: ele });
                      }}
                    ></i>
                  ),
                  Priority: ele?.Priority,
                  "Submit Date": ele?.TicketRaisedDate,
                }))}
                tableHeight={"tableHeight"}
              />
              <div className="pagination" style={{ float: "right" }}>
                <button
                  onClick={() => handlePageChange3(currentPage3 - 1)}
                  disabled={currentPage3 === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage3} of {totalPages3}
                </span>
                <button
                  onClick={() => handlePageChange3(currentPage3 + 1)}
                  disabled={currentPage3 === totalPages3}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="card ViewIssues" style={{ marginTop: "3px" }}>
        <div
          className="accordion"
          id="accordionExample"
          style={{ borderRadius: "3px", background: "white", border: "white" }}
        >
          <div
            className="accordion-item"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div>
              <i
                className="fa fa-list-alt"
                style={{
                  fontSize: "15px",
                  marginRight: "6px",
                  marginLeft: "13px",
                }}
              ></i>{" "}
              AutoQuery 75 Days
            </div>
            <div style={{ marginRight: "13px" }}>
              {rowHandler.show3 && (
                <span style={{ fontWeight: "bold" }}>
                  Total Count : {data?.autoquery75days?.length}
                </span>
              )}
              <button
                className={`fa ${rowHandler.show3 ? "fa-arrow-up" : "fa-arrow-down"}`}
                onClick={() => {
                  handlerow("show3");
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                  borderRadius: "2px",
                  background: "white",
                }}
              ></button>
            </div>
          </div>
          {rowHandler.show3 && (
            <>
              <Tables
                thead={autoTHEAD}
                tbody={currentData?.map((ele, index) => ({
                  "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                  Vertical: ele?.Vertical,
                  Team: ele?.Team,
                  Wing: ele.Wing,
                  "Project Name": (
                    <span
                      id={`projectName-${index}`}
                      targrt={`projectName-${index}`}
                      title={ele?.ProjectName}
                    >
                      {shortenName(ele?.ProjectName)}
                    </span>
                  ),
                  "Last AB Date": ele?.lastdate,
                  "Last AB Done By": ele?.username,
                  SPOC_Name: ele?.spoc_name,
                  SPOC_Email: ele?.SPOC_EmailID,
                  SPOC_Mobile: ele?.spoc_mobile,
                  Edit: <i className="fa fa-edit"></i>,
                  "Show Log": <i className="fa fa-book"></i>,
                  colorcode: ele?.colorcode,
                }))}
                tableHeight={"tableHeight"}
              />
              <div className="pagination" style={{ float: "right" }}>
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
            </>
          )}
        </div>
      </div>
      <div className="card ViewIssues " style={{ marginTop: "3px" }}>
        <div
          className="accordion"
          id="accordionExample"
          style={{ borderRadius: "3px", background: "white", border: "white" }}
        >
          <div
            className="accordion-item"
            style={{ justifyContent: "space-between", display: "flex" }}
          >
            <div>
              <i
                className="fa fa-list-alt"
                style={{
                  fontSize: "15px",
                  marginRight: "6px",
                  marginLeft: "13px",
                }}
              ></i>{" "}
              AutoQuery 90 Days
            </div>
            <div style={{ marginRight: "13px" }}>
              {rowHandler.show4 && (
                <span style={{ fontWeight: "bold" }}>
                  Total Count : {data?.autoquery90days?.length}
                </span>
              )}
              <button
                className={`fa ${rowHandler.show4 ? "fa-arrow-up" : "fa-arrow-down"}`}
                onClick={() => {
                  handlerow("show4");
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                  borderRadius: "2px",
                  background: "white",
                }}
              ></button>
            </div>
          </div>
          {rowHandler.show4 && (
            <>
              <Tables
                thead={autoTHEAD}
                tbody={currentData4?.map((ele, index) => ({
                  "S.No.": index + 1,
                  Vertical: ele?.Vertical,
                  Team: ele?.Team,
                  Wing: ele.Wing,
                  "Project Name": (
                    <span
                      id={`projectName-${index}`}
                      targrt={`projectName-${index}`}
                      title={ele?.ProjectName}
                    >
                      {shortenName(ele?.ProjectName)}
                    </span>
                  ),
                  "Last AB Date": ele?.lastdate,
                  "Last AB Done By": ele?.username,
                  SPOC_Name: ele?.spoc_name,
                  SPOC_Email: ele?.SPOC_EmailID,
                  SPOC_Mobile: ele?.spoc_mobile,
                  Edit: <i className="fa fa-edit"></i>,
                  "Show Log": <i className="fa fa-book"></i>,
                  colorcode: ele?.colorcode,
                }))}
                tableHeight={"tableHeight"}
              />
              <div className="pagination" style={{ float: "right" }}>
                <button
                  onClick={() => handlePageChange4(currentPage4 - 1)}
                  disabled={currentPage4 === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage4} of {totalPages4}
                </span>
                <button
                  onClick={() => handlePageChange4(currentPage4 + 1)}
                  disabled={currentPage4 === totalPages4}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default MyView;
