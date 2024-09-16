import React, { useEffect, useState } from "react";
import Heading from "../../components/UI/Heading";
import DatePickerMonth from "../../components/formComponent/DatePickerMonth";
import MultiSelectComp from "../../components/formComponent/MultiSelectComp";
import { apiUrls } from "../../networkServices/apiEndpoints";
import axios from "axios";
import { headers } from "../../utils/apitools";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Tables from "../../components/UI/customTable";
import { advanceRequestTHEAD, leaveViewRequestTHEAD } from "../../components/modalComponent/Utils/HealperThead";
import Input from "../../components/formComponent/Input";
const AdvanceRequestView = () => {
  const tabledata1 = [
    {
      SNo: 1,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "PRASHANT SINGHAL",
      NoOfDays: 0,
      Dates: "",
      Action: "View",
    },
    {
      SNo: 2,
      MonthYear: "Sep-2024",
      Team: "Machine Team",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "PANKAJ PATHAK",
      NoOfDays: 4,
      Dates: "07,14,21,28",
      Action: "View",
    },
    {
      SNo: 3,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Aman Srivastav",
      NoOfDays: 6,
      Dates: "05,06,07,14,21,28",
      Action: "View",
    },
    {
      SNo: 4,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Sneh Jaiswal",
      NoOfDays: 2,
      Dates: "07,21",
      Action: "View",
    },
    {
      SNo: 5,
      MonthYear: "Sep-2024",
      Team: "Machine Team",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "RAHUL NAGAR",
      NoOfDays: 3,
      Dates: "14,04,07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
    {
      SNo: 6,
      MonthYear: "Sep-2024",
      Team: "LIS",
      Vertical: "LIS Support",
      Wing: "LIS Support",
      Name: "Mukesh Kumar",
      NoOfDays: 1,
      Dates: "07",
      Action: "View",
    },
  ];
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filteredData, setFilteredData] = useState([...tabledata1]); // Filtered data

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      // If the search query is empty, reset the filtered data to the original table data
      setFilteredData([...tabledata1]);
    } else {
      const filtered = filteredData.filter((item) =>
        item.Name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to the first page after search
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
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

  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({
    Month: new Date(),
    VerticalID: [],
    TeamID: [],
    WingID: [],
    Employee: "",
    Name: "",
  });

  const getReporter = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Reporter_Select, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setEmployee(reporters);
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
  const searchHandleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

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
  useEffect(() => {
    getVertical();
    getTeam();
    getWing();
    getReporter();
  }, []);
  const handleSelectChange = (e) => {
    const { name, value } = e?.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFilter = (filterValue) => {
    const filterData = tabledata1?.filter((item) => item?.Name === filterValue);
    return filterData;
  };
  console.log(handleFilter);
  return (
    <>
      <div className="card">
        <Heading
          title={
            <span style={{ fontWeight: "bold" }}>Advance Request View</span>
          }
          secondTitle={
            <div className="attendance-status">
              <div className="status-item missing">
                <span className="dot white"></span>
                <strong>Pending</strong>
              </div>
              <div className="status-item missing">
                <span className="dot skyblue"></span>
                <strong>Final Approved</strong>
              </div>
              <div className="status-item leave">
                <span className="dot orange"></span>
                <strong>First Level Approved </strong>
              </div>
              <div className="status-item offline">
                <span className="dot red"></span>
                <strong>Rejected </strong>
              </div>
              <div className="status-item total">
                <span className="dot yellow"></span>
                <strong>Settelement </strong>
              </div>
              <div className="status-item online">
                <span className="dot green"></span>
                <strong>Paid </strong>
              </div>
            </div>
          }
        />
        <div className="row g-4 m-2">
          <DatePickerMonth
            className="custom-calendar"
            id="Month"
            name="Month"
            lable="Month/Year"
            placeholder={"MM/YY"}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={formData?.Month}
            handleChange={searchHandleChange}
          />

          <ReactSelect
            name="Employee"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="User"
            dynamicOptions={employee}
            value={formData?.Employee}
            handleChange={handleDeliveryChange}
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

          <div className="col-2">
            <button className="btn btn-sm btn-info">Search</button>
          </div>
        </div>
      </div>
      <div className="card">
        <Heading
          title="Search Details"
          secondTitle={
            <div className="d-flex">
              <div className="">
                Showing {startEntry} to {endEntry} of {totalEntries} entries
              </div>
              <div style={{ padding: "0px !important", marginLeft: "50px" }}>
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
          thead={advanceRequestTHEAD}
          tbody={currentData?.map((ele, index) => ({
            "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
            "Entry Date":ele?.EntryDate,
            "Expected Date":ele?.ExpectedDate,
            Name: ele?.Name,
            Vertical: ele?.Vertical,
            Team: ele?.Team,
            Wing: ele?.Wing,
            "Purpose":ele?.Purpose,
            "Amount":ele?.Amount,
            "Settlement":ele?.Settlement,
            View: <i className="fa fa-eye" title="View Leave Request"></i>,
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
export default AdvanceRequestView;
