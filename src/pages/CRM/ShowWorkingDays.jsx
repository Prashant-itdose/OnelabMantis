import React, { useEffect, useState } from "react";
import MultiSelectComp from "../../components/formComponent/MultiSelectComp";
import { headers } from "../../utils/apitools";
import axios from "axios";
import { apiUrls } from "../../networkServices/apiEndpoints";
import Heading from "../../components/UI/Heading";
import DatePickerMonth from "../../components/formComponent/DatePickerMonth";
import Input from "../../components/formComponent/Input";
import Tables from "../../components/UI/customTable";
import { showWorkingDaysTHEAD } from "../../components/modalComponent/Utils/HealperThead";
import Loading from "../../components/loader/Loading";
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
const currentYear = currentDate.getFullYear();
const ShowWorkingDays = () => {
  const CRMID = localStorage.getItem("CrmEmployeeID");
  console.log(CRMID);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState([]);
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({
    EmployeeName: [],
    VerticalID: [],
    TeamID: [],
    WingID: [],
    ReportingPerson: "",
    Status: "",
    Year: "",
    currentMonth: currentMonth,
    currentYear: currentYear,
    Month: new Date(),
    Name: "",
  });
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
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
  const getReporter = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Reporter_Select, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { name: item?.NAME, code: item?.ID };
          });
          setEmployee(reporters);
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
  const handleMonthYearChange = (name, e) => {
    const { value } = e.target;
    const date = new Date(value);

 
    setFormData({
      ...formData,
      currentMonth: date.getMonth()+1,
      currentYear:date.getFullYear()
    });
  };
  const handleTableSearch = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("CrmID", CRMID),
      form.append("Month", formData?.currentMonth),
      form.append("Year", formData?.currentYear),
      form.append("VerticalID", formData?.VerticalID),
      form.append("TeamID", formData?.TeamID),
      form.append("WingID", formData?.WingID),
      axios
        .post(apiUrls?.ShowWorkingDays_Search, form, { headers })
        .then((res) => {
          setTableData(res?.data?.data);
          setFilteredData(res?.data?.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  const handleExport = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("CrmID", CRMID),
      form.append("AttendanceData", JSON.stringify(tableData)),
      console.log(tableData);
    axios
      .post(apiUrls?.UploadAttendanceExcel, form, { headers })
      .then((res) => {
        setTableData(res?.data?.data);
        setFilteredData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
  const currentData = filteredData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalEntries = filteredData.length;
  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      // If the search query is empty, reset the filtered data to the original table data
      setFilteredData([...tableData]);
    } else {
      const filtered = filteredData.filter((item) =>
        item.Name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to the first page after search
    }
  };
  useEffect(() => {
    getVertical();
    getTeam();
    getWing();
    getReporter();
  }, []);
  return (
    <>
      <div className="card">
        <Heading title={"Show Working Days"} />
        <div className="row g-4 m-2">
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
            name="EmployeeName"
            placeholderName="Employee"
            dynamicOptions={employee}
            optionLabel="EmployeeName"
            className="form-control"
            handleChange={handleMultiSelectChange}
            value={formData.EmployeeName.map((code) => ({
              code,
              name: employee.find((item) => item.code === code)?.name,
            }))}
          />
          <DatePickerMonth
            className="custom-calendar"
            id="Month"
            name="Month"
            lable="Month/Year"
            placeholder={"MM/YY"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={formData?.Month}
            handleChange={(e) => handleMonthYearChange("Month", e)}
          />
          <div className="col-2 d-flex">
            <button className="btn btn-sm btn-info" onClick={handleTableSearch}>
              Search
            </button>
            <button className="btn btn-sm btn-info ml-2" onClick={handleExport}>
              Export
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {tableData?.length > 0 && (
            <div className="card">
              <Heading
                title="Search Details"
                secondTitle={
                  <div className="d-flex">
                    <div className="">
                      Showing {startEntry} to {endEntry} of {totalEntries}{" "}
                      entries
                    </div>
                    <div
                      style={{ padding: "0px !important", marginLeft: "50px" }}
                    >
                      <Input
                        type="text"
                        className="form-control"
                        id="Name"
                        name="Name"
                        placeholder="Search By Name"
                        onChange={handleSearch}
                        value={searchQuery}
                        respclass="col-xl-12 col-md-4 col-sm-6 col-12"
                      />
                    </div>
                  </div>
                }
              />

              <Tables
                thead={showWorkingDaysTHEAD}
                tbody={currentData?.map((ele, index) => ({
                  "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                  Name: ele?.Name,
                  Team: "",
                  "Total Days:": ele?.TotalDays,
                  Sundays: ele?.Sundays,
                  CL: ele?.CL,
                  SL: ele?.SL,
                  WeekOff: ele?.WO,
                  CompOff: ele?.COMPOff,
                  "CL-CIR": ele?.CLCIR,
                  "SL-CIR": ele?.SLCIR,
                  LWP: ele?.LWP,
                  "Working Days": ele?.WorkingDays,
                  "Non Working Days": ele?.NonWorkingDays,
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
          )}
        </>
      )}
    </>
  );
};

export default ShowWorkingDays;
