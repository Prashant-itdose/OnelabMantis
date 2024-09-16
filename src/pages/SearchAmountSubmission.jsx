import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Heading from "../components/UI/Heading";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import { useState } from "react";
import { headers } from "../utils/apitools";
import axios from "axios";
import ReactSelect from "../components/formComponent/ReactSelect";
import DatePicker from "../components/formComponent/DatePicker";
import Tables from "../components/UI/customTable";
import { amountTHEAD } from "../components/modalComponent/Utils/HealperThead";
import SettlementAmountModal from "../components/UI/customTable/SettlementAmountModal";
import Modal from "../components/modalComponent/Modal";
import { apiUrls } from "../networkServices/apiEndpoints";
import { toast } from "react-toastify";
import Loading from "../components/loader/Loading";
import { ExportToExcel } from "../networkServices/Tools";
import RemoveAmountSubmissionModal from "../components/UI/customTable/RemoveAmountSubmissionModal";

const SearchAmountSubmission = () => {
  const AmountCancel = localStorage.getItem("AmountSubmissionIsCancel");
  console.log(AmountCancel);

  const { VITE_DATE_FORMAT } = import.meta.env;
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [project, setProject] = useState([]);
  const [poc1, setPoc1] = useState([]);
  const [poc2, setPoc2] = useState([]);
  const [poc3, setPoc3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: [],
    VerticalID: [],
    TeamID: [],
    WingID: [],
    POC1: [],
    POC2: [],
    POC3: [],
    Status: "",
    DateType: "",
    FromDate: new Date(),
    ToDate: new Date(),
  });
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const searchHandleChange = (e) => {
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
            return { name: item?.Project, code: item?.ProjectId };
          });
          setProject(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getVertical = () => {
    let form = new FormData();
    form.append("Id", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Vertical_Select, form, { headers })
        .then((res) => {
          const verticals = res?.data.data.map((item) => {
            return { name: item?.Vertical, code: item?.verticalID };
          });
          setVertical(verticals);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getTeam = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Team_Select, form, { headers })
        .then((res) => {
          const teams = res?.data.data.map((item) => {
            return { name: item?.Team, code: item?.TeamID };
          });
          setTeam(teams);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getWing = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Wing_Select, form, { headers })
        .then((res) => {
          const wings = res?.data.data.map((item) => {
            return { name: item?.Wing, code: item?.WingID };
          });
          setWing(wings);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPOC1 = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.POC_1_Select, form, { headers })
        .then((res) => {
          const poc1s = res?.data.data.map((item) => {
            return { name: item?.POC_1_Name, code: item?.POC_1_ID };
          });
          setPoc1(poc1s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPOC2 = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.POC_2_Select, form, { headers })
        .then((res) => {
          const poc2s = res?.data.data.map((item) => {
            return { name: item?.POC_2_Name, code: item?.POC_2_ID };
          });
          setPoc2(poc2s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPOC3 = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.POC_3_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { name: item?.POC_3_Name, code: item?.POC_3_ID };
          });
          setPoc3(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const [visible, setVisible] = useState({
    showVisible: false,
    removeVisible: false,
    showData: {},
  });
  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
  const handleSearch = (code) => {
    if (formData?.DateType == "") {
      toast.error("Please Select DateType.");
    } else if (formData?.FromDate == "") {
      toast.error("Please Select FromDate.");
    } else if (formData?.Status == "") {
      toast.error("Please Select Status.");
    } else {
      setLoading(true);
      let form = new FormData();
      form.append("ID", localStorage?.getItem("ID")),
        form.append("LoginName", localStorage?.getItem("realname")),
        form.append("ProjectID", formData?.ProjectID),
        form.append("VerticalID", formData?.VerticalID),
        form.append("TeamID", formData?.TeamID),
        form.append("WingID", formData?.WingID),
        form.append("POC1", formData?.POC1),
        form.append("POC2", formData?.POC2),
        form.append("POC3", formData?.POC3),
        form.append("Status", formData?.Status),
        form.append("DateType", formData?.DateType),
        form.append("FromDate", formatDate(formData?.FromDate)),
        form.append("ToDate", formatDate(formData?.ToDate)),
        form.append("SearchType", "OnScreen"),
        form.append("colorcode", code ? code : ""),
        axios
          .post(apiUrls?.AmountSubmission_ByAccounts_Search, form, { headers })
          .then((res) => {
            console.log(res?.data?.data);
            const datas = res?.data?.data;
            setTableData(datas);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
    }
  };
  console.log(tableData);
  const handleViewImage = () => {
    alert("Waiting for Image Url.");
  };
  useEffect(() => {
    getProject();
    getVertical();
    getTeam();
    getWing();
    getPOC1();
    getPOC2();
    getPOC3();
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
  const getThead = () => {
    if (localStorage?.getItem("AmountSubmissionIsCancel") == 1) {
      return amountTHEAD.filter((key) => key !== "Cancel");
    } else {
      return amountTHEAD;
    }
  };
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Settlement Detail"
        >
          <SettlementAmountModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      {visible?.removeVisible && (
        <Modal
          modalWidth={"600px"}
          visible={visible}
          setVisible={setVisible}
          Header="Cancel AmountSubmission"
        >
          <RemoveAmountSubmissionModal
            visible={visible}
            setVisible={setVisible}
          />
        </Modal>
      )}

      <div className="card  border">
        <Heading
          title="Search AmountSubmission"
          secondTitle={
            <Link to="/AmountSubmission" style={{ float: "right" }}>
              {"Amount Submission"}
            </Link>
          }
        />
        <div className="row g-4 m-2">
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ProjectID"
            placeholderName="Project"
            dynamicOptions={project}
            handleChange={handleMultiSelectChange}
            value={formData.ProjectID.map((code) => ({
              code,
              name: project.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="VerticalID"
            placeholderName="Vertical"
            dynamicOptions={vertical}
            optionLabel="VerticalID"
            className="VerticalID"
            handleChange={handleMultiSelectChange}
            value={formData.VerticalID.map((code) => ({
              code,
              name: vertical.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TeamID"
            placeholderName="Team"
            dynamicOptions={team}
            handleChange={handleMultiSelectChange}
            value={formData.TeamID.map((code) => ({
              code,
              name: team.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="WingID"
            placeholderName="Wing"
            dynamicOptions={wing}
            handleChange={handleMultiSelectChange}
            value={formData.WingID.map((code) => ({
              code,
              name: wing.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="POC1"
            placeholderName="POC-I"
            dynamicOptions={poc1}
            handleChange={handleMultiSelectChange}
            value={formData.POC1.map((code) => ({
              code,
              name: poc1.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="POC2"
            placeholderName="POC-II"
            dynamicOptions={poc2}
            handleChange={handleMultiSelectChange}
            value={formData.POC2.map((code) => ({
              code,
              name: poc2.find((item) => item.code === code)?.name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="POC3"
            placeholderName="POC-III"
            dynamicOptions={poc3}
            handleChange={handleMultiSelectChange}
            value={formData.POC3.map((code) => ({
              code,
              name: poc3.find((item) => item.code === code)?.name,
            }))}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="DateType"
            placeholderName="Date Type"
            dynamicOptions={[
              { label: "ReceivedDate", value: "ReceivedDate" },
              { label: "EntryDate", value: "EntryDate" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.DateType}
          />
          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            lable="From Date"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.FromDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          <DatePicker
            className="custom-calendar"
            id="ToDate"
            name="ToDate"
            lable="To Date"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.ToDate}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            handleChange={searchHandleChange}
          />
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Status"
            placeholderName="Status"
            dynamicOptions={[
              { label: "Settled", value: "Settled" },
              { label: "Pending", value: "pending" },
              { label: "PartialSettled", value: "PartialSettled" },
            ]}
            handleChange={handleDeliveryChange}
            value={formData.Status}
          />
          <div className="col-2">
            {loading ? (
              <Loading />
            ) : (
              <button className="btn btn-sm btn-success" onClick={handleSearch}>
                Serach
              </button>
            )}
            <button
              className="btn btn-sm btn-success ml-2"
              onClick={() => ExportToExcel(tableData)}
            >
              Excel
            </button>
            <button className="btn btn-sm btn-success ml-2">
              InActiveExcel
            </button>
            {/* onClick={() => ExportToExcel(tableData)} */}
          </div>
        </div>
      </div>
      {tableData?.length > 0 && (
        <div className="card mt-2">
          <Heading
            title={"Details"}
            secondTitle={
              <div className="d-flex">
                <div className="row g-4">
                  <div
                    className="d-flex flex-wrap align-items-center"
                    style={{ marginRight: "0px" }}
                  >
                    <div
                      className="d-flex"
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
                          width: "45px",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleSearch("1")}
                      ></div>
                      <span
                        className="legend-label"
                        style={{ width: "100%", textAlign: "left" }}
                      >
                        Settled
                      </span>
                      <div
                        className="legend-circle"
                        style={{
                          backgroundColor: "orange",
                          cursor: "pointer",
                          height: "10px",
                          width: "45px",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleSearch("2")}
                      ></div>
                      <span
                        className="legend-label"
                        style={{ width: "100%", textAlign: "left" }}
                      >
                        PartialSettled
                      </span>
                      <div
                        className="legend-circle"
                        style={{
                          backgroundColor: "white",
                          cursor: "pointer",
                          height: "10px",
                          width: "40px",
                          borderRadius: "50%",
                          border: "1px solid grey",
                        }}
                        onClick={() => handleSearch("3")}
                      ></div>
                      <span
                        className="legend-label"
                        style={{ width: "100%", textAlign: "left" }}
                      >
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
                {/* Total Transaction: {tableData1?.length}
             <span className="ml-3"> Total Amount :{tableData1?.Amount}</span> */}
              </div>
            }
          />

          <Tables
            thead={getThead()}
            tbody={currentData?.map((ele, index) => {
              // Prepare the row data based on AmountCancel
              const rowData = {
                "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                Project: ele?.ProjectName,
                Vertical: ele?.Vertical,
                Team: ele?.Team,
                Wing: ele?.Wing,
                "POC-I": ele?.POC_1_Name,
                "POC-II": ele?.POC_2_Name,
                "POC-III": ele?.POC_3_Name,
                Amount: ele?.Amount,
                PaymentMode: ele?.PaymentMode,
                "Reference ID": ele?.OnAccount_Req_ID,
                "Deposite Date": ele?.ReceivedDate,
                "Entry Date": ele?.dtEntry,
                "Deposite By": ele?.ReceivedBy,
                Remarks: ele?.Remark,
                Settlement: (
                  <i
                    className="fa fa-share-square"
                    onClick={() => {
                      setVisible({ showVisible: true, showData: ele });
                    }}
                    style={{
                      marginLeft: "10px",
                      color: "#3d3c3a",
                      cursor: "pointer",
                    }}
                  ></i>
                ),
                "View Image": ele.FileName === "1" && (
                  <i
                    className="fa fa-eye"
                    onClick={() => handleViewImage(ele)}
                    style={{ cursor: "pointer" }}
                    title="Click to View Document."
                  ></i>
                ),
                colorcode: ele?.rowColor,
              };

              // Conditionally add the Cancel column
              if (AmountCancel !== "1") {
                rowData.Cancel = (
                  <i
                    className="fa fa-trash"
                    title="Click to Remove."
                    onClick={() => {
                      setVisible({
                        removeVisible: true,
                        showData: ele?.OnAccount_Req_ID,
                      });
                    }}
                    style={{
                      marginLeft: "10px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  ></i>
                );
              }

              return rowData;
            })}
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
      )}
    </>
  );
};
export default SearchAmountSubmission;
