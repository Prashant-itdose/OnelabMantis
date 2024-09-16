import React, { useEffect, useState } from "react";
import { headers } from "../utils/apitools";
import axios from "axios";
import { apiUrls } from "../networkServices/apiEndpoints";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import DatePicker from "../components/formComponent/DatePicker";
import { Link, useNavigate } from "react-router-dom";
import Tables from "../components/UI/customTable";
import { connectorSearchTHEAD } from "../components/modalComponent/Utils/HealperThead";
import { toast } from "react-toastify";
import ConnectorSettlementModal from "../components/UI/customTable/ConnectorSettlementModal";
import Modal from "../components/modalComponent/Modal";
import ConnectorDiscountModal from "../components/UI/customTable/ConnectorDiscountModal";
import ConnectorApproveModal from "../components/UI/customTable/ConnectorApproveModal";
import ConnectorIssueModal from "../components/UI/customTable/ConnectorIssueModal";
import ConnectorRejectModal from "../components/UI/customTable/ConnectorRejectModal";
import Loading from "../components/loader/Loading";
const SearchConnectorRequest = () => {
  const navigate = useNavigate();
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [users, setUsers] = useState([]);
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [poc1, setPoc1] = useState([]);
  const [poc2, setPoc2] = useState([]);
  const [project, setProject] = useState([]);
  const [poc3, setPoc3] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionChangeDetail, setActionChangeDetail] = useState({
    showVisible: false,
    discountVisible: false,
    editVisible: false,
    approveVisible: false,
    issueVisible: false,
    rejectVisible: false,
    receiptVisible: false,
    data: "",
  });
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: [],
    VerticalID: [],
    TeamID: [],
    WingID: [],
    Users: [],
    POC1: [],
    POC2: [],
    POC3: [],
    Status: "",
    DateType: "",
    FromDate: new Date(),
    ToDate: new Date(),
    ActionChange: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const searchHandleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const getMultiReporter = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Reporter_Select, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { name: item?.NAME, code: item?.ID };
          });
          setUsers(reporters);
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

  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  const handleSearch = () => {
    if (formData?.DateType == "") {
      toast.error("Please Select DateType.");
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
        form.append("ConnectorID", ""),
        axios
          .post(apiUrls?.Connector_Search, form, { headers })
          .then((res) => {
            const data = res?.data?.data;
            if (data?.length == 0) {
              setShownodata(true);
            }
            const updatedData = data?.map((ele, index) => {
              return {
                ...ele,
                index: index,
                edit: true,
                url: `${res?.data.Url}${ele?.ID}`,
              };
            });
            setTableData(updatedData);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
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

  const handleDeliveryChangeValue = (name, value, index, ele) => {
    if (name === "ActionChange") {
      const data = [...tableData];
      data[index]["ActionChange"] = value;
      setTableData(data);

      if (value === "Settlement") {
        setActionChangeDetail({
          showVisible: true,
          discountVisible: false,
          data: data[index],
        });
      } else if (value === "Discount") {
        setActionChangeDetail({
          showVisible: false,
          discountVisible: true,
          data: data[index],
        });
      } else if (value === "Edit") {
        setActionChangeDetail({
          showVisible: false,
          discountVisible: false,
          editVisible: true,
          data: data[index],
          ele: ele?.ID,
        });
        navigate("/ConnectorRequest", {
          state: { data: data[index], ele: ele?.ID, edit: true },
        });
      } else if (value === "Approve") {
        setActionChangeDetail({
          showVisible: false,
          discountVisible: false,
          editVisible: false,
          approveVisible: true,
          data: data[index],
        });
      } else if (value === "Issue") {
        setActionChangeDetail({
          showVisible: false,
          discountVisible: false,
          editVisible: false,
          approveVisible: false,
          issueVisible: true,
          data: data[index],
        });
      } else if (value === "Reject") {
        setActionChangeDetail({
          showVisible: false,
          discountVisible: false,
          editVisible: false,
          approveVisible: false,
          issueVisible: false,
          rejectVisible: true,
          data: data[index],
        });
      } else if (value === "Receipt") {
        setActionChangeDetail({
          showVisible: false,
          discountVisible: false,
          editVisible: false,
          approveVisible: false,
          issueVisible: false,
          rejectVisible: false,
          receiptVisible: true,
          data: data[index],
          ele: ele,
        });
        window.open(ele?.url);
      } else {
        setActionChangeDetail({
          showVisible: false,
          discountVisible: false,
          editVisible: false,
          approveVisible: false,
          issueVisible: false,
          rejectVisible: false,
          receiptVisible: false,
        });
      }
    }
  }; 


  useEffect(() => {
    getVertical();
    getTeam();
    getWing();
    getMultiReporter();
    getPOC1();
    getPOC2();
    getPOC3();
    getProject();
  }, []);

  const shortenName = (name) => {
    return name.length > 20 ? name.substring(0, 35) + "..." : name;
  };
  return (
    <>
      {actionChangeDetail?.showVisible && (
        <Modal
          modalWidth={"800px"}
          visible={actionChangeDetail}
          setVisible={setActionChangeDetail}
          Header={"Settlement Details"}
        >
          <ConnectorSettlementModal
            visible={actionChangeDetail}
            setVisible={setActionChangeDetail}
            data={actionChangeDetail?.data}
          />
        </Modal>
      )}

      {actionChangeDetail?.discountVisible && (
        <Modal
          modalWidth={"800px"}
          visible={actionChangeDetail}
          setVisible={setActionChangeDetail}
          Header={"Discount Details"}
        >
          <ConnectorDiscountModal
            visible={actionChangeDetail}
            setVisible={setActionChangeDetail}
            data={actionChangeDetail?.data}
          />
        </Modal>
      )}
      {actionChangeDetail?.approveVisible && (
        <Modal
          modalWidth={"600px"}
          visible={actionChangeDetail}
          setVisible={setActionChangeDetail}
          Header={"Approve Request"}
        >
          <ConnectorApproveModal
            visible={actionChangeDetail}
            setVisible={setActionChangeDetail}
            data={actionChangeDetail?.data}
          />
        </Modal>
      )}
      {actionChangeDetail?.issueVisible && (
        <Modal
          modalWidth={"600px"}
          visible={actionChangeDetail}
          setVisible={setActionChangeDetail}
          Header={"Issue Request"}
        >
          <ConnectorIssueModal
            visible={actionChangeDetail}
            setVisible={setActionChangeDetail}
            data={actionChangeDetail?.data}
          />
        </Modal>
      )}
      {actionChangeDetail?.rejectVisible && (
        <Modal
          modalWidth={"600px"}
          visible={actionChangeDetail}
          setVisible={setActionChangeDetail}
          Header={"Reject Request"}
        >
          <ConnectorRejectModal
            visible={actionChangeDetail}
            setVisible={setActionChangeDetail}
            data={actionChangeDetail?.data}
          />
        </Modal>
      )}
      <div className="card">
        <Heading title="Search Connector Request" />
        <div className="row g-4 m-2">
          {/* <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Users"
            placeholderName="User"
            dynamicOptions={users}
            optionLabel="Users"
            className="Users"
            handleChange={handleMultiSelectChange}
            value={formData.Users.map((code) => ({
              code,
              name: users.find((item) => item.code === code)?.name,
            }))}
          /> */}
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
              { label: "IssueDate", value: "IssueDate" },
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
            maxDate={formData?.ToDate}
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
            minDate={formData?.FromDate}
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
                Search
              </button>
            )}
            <Link to="/ConnectorRequest" className="ml-3">
              Back To MainPage
            </Link>
          </div>
        </div>
      </div>
      {tableData?.length > 0 && (
        <div className="card mt-2">
          <Heading title={"Search Details"} />
          <Tables
            thead={connectorSearchTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              "Issue No": ele?.IssueNo,
              // IssueBy: ele?.IssueBy,
              ClientName: (
                <span
                  id={`projectName-${index}`}
                  targrt={`projectName-${index}`}
                  title={ele?.ProjectName}
                >
                  {shortenName(ele?.ProjectName)}
                </span>
              ),
              "Connector 25 Pin Male": ele?.Quantity25Male,
              "Connector 25 Pin Female": ele?.Quantity25Female,
              "Connector 9 Pin Male": ele?.Quantity9Male,
              "Connector 9 Pin Female": ele?.Quantity9Female,
              "Gross Amount": ele?.TotalAmount,
              "Discount Amount": ele?.DiscountOnTotal,
              "Net Amount": ele?.TotalAmount - ele?.DiscountOnTotal,
              "Paid Amount": ele?.ReceivedAmount,
              "Balance Amount": ele?.TotalAmount - ele?.DiscountOnTotal,
              "Action Change": (
                <div style={{ width: "130px" }}>
                  <ReactSelect
                    style={{ width: "100%", marginLeft: "10px" }}
                    // respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                    name="ActionChange"
                    dynamicOptions={[
                      { label: "Approve", value: "Approve" },
                      { label: "Issue", value: "Issue" },
                      { label: "Reject", value: "Reject" },
                      { label: "Receipt", value: "Receipt" },
                      { label: "Settlement", value: "Settlement" },
                      { label: "Discount", value: "Discount" },
                      { label: "Edit", value: "Edit" },
                    ]}
                    value={ele.ActionChange}
                    handleChange={(name, value) => {
                      const ind = (currentPage - 1) * rowsPerPage + index;
                      handleDeliveryChangeValue(name, value?.value, ind, ele);
                    }}
                  />
                </div>
              ),
            }))}
            tableHeight={"tableHeight"}
          />
          <div className="pagination ml-auto m-2">
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

export default SearchConnectorRequest;
