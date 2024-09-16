import React, { useEffect, useState } from "react";
import Heading from "../../components/UI/Heading";
import DatePicker from "../../components/formComponent/DatePicker";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import Tables from "../../components/UI/customTable";
import { attendanceTHEAD } from "../../components/modalComponent/Utils/HealperThead";
import MultiSelectComp from "../../components/formComponent/MultiSelectComp";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { headers } from "../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
const Attendance = () => {
  const CRMID = localStorage.getItem("CrmEmployeeID");
  console.log(CRMID);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [tableData, setTableData] = useState([]); // Original data
  const [searchQuery, setSearchQuery] = useState("");
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [formData, setFormData] = useState({
    FromDate: new Date(),
    Team: "",
    SubTeam: "",
    Name: "",
    UserLocation: "",
    Remarks: "",
    VerticalID: [],
    TeamID: [],
    WingID: [],
  });
  const [coordinates, setcordinates] = useState("Fetching location...");
  const [location, setLocation] = useState([
    // { label: "Location", value: "0" },
    { label: "Noida Office", value: "Noida Office" },
    { label: "Client Site", value: "Client Site" },
    { label: "Work From Home", value: "Work From Home" },
    { label: "Office+Client", value: "Office+Client" },
  ]);
  const [status, setStatus] = useState("");

  const LoginLogoutButton = () => {
    let form = new FormData();
    form.append("Id", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname"));
    form.append("CrmEmpID", CRMID);
    form.append("SearchType", "LogInStatus");
    axios
      .post(apiUrls?.Attendence_Select, form, { headers })
      .then((res) => {
        const data = res?.data?.data[0];
        if (data.IsLoggedIn == "1" && data.IsLogout == "0") {
          setStatus(true);
        }
        if (data.IsLogout == "1" && data.IsLoggedIn == "1") {
          setStatus(false);
        }
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    LoginLogoutButton();
  }, []);

  useEffect(() => {
    MyLocation()
      .then((currentLocation) => {
        setcordinates(currentLocation);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogin = () => {
    let form = new FormData();
    const location = coordinates || "";
    const latLonMatch = location.match(
      /Lat:\s*([0-9.-]+),\s*Lon:\s*([0-9.-]+)/
    );
    const latitude = latLonMatch ? latLonMatch[1] : "";
    const longitude = latLonMatch ? latLonMatch[2] : "";
    form.append("Id", localStorage?.getItem("ID"));
    form.append("LoginName", localStorage?.getItem("realname"));
    form.append("CrmEmpID", CRMID);
    form.append("Location", formData?.UserLocation);
    form.append("Latitude", latitude);
    form.append("Longitude", longitude);
    form.append("Remarks", formData?.Remarks);
    form.append("StatusType", "LogIn");
    axios
      .post(apiUrls?.Attendence_Login, form, { headers })
      .then((res) => {
        toast.success(res?.data?.message);
        LoginLogoutButton();
        handleTableSearch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    let form = new FormData();
    const location = coordinates || "";
    const latLonMatch = location.match(
      /Lat:\s*([0-9.-]+),\s*Lon:\s*([0-9.-]+)/
    );
    const latitude = latLonMatch ? latLonMatch[1] : "";
    const longitude = latLonMatch ? latLonMatch[2] : "";
    form.append("Id", localStorage?.getItem("ID"));
    form.append("LoginName", localStorage?.getItem("realname"));
    form.append("CrmEmpID", CRMID);
    form.append("Location", formData?.UserLocation);
    form.append("Latitude", latitude);
    form.append("Longitude", longitude);
    form.append("Remarks", formData?.Remarks);
    form.append("StatusType", "LogOut");
    axios
      .post(apiUrls?.Attendence_Login, form, { headers })
      .then((res) => {
        toast.success(res?.data?.message);
        LoginLogoutButton();
        handleTableSearch();
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
  const handleTableSearch = (value) => {
    let form = new FormData();

    form.append("Id", localStorage?.getItem("ID"));
    form.append("LoginName", localStorage?.getItem("realname"));
    form.append("CrmID", CRMID);
    form.append(
      "Date",
      value ? formatDate(value) : formatDate(formData?.FromDate)
    );
    form.append("VerticalID", formData?.VerticalID);
    form.append("TeamID", formData?.TeamID);
    form.append("WingID", formData?.WingID);
    form.append("Name", formData?.Name);
    axios
      .post(apiUrls?.Attendence_Search, form, { headers })
      .then((res) => {
        setTableData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSearch = (event) => {
    // Prevent default action for the form submission, if it's in a form
    event?.preventDefault();

    const query = event?.target?.value.toLowerCase(); // Ensure event is valid and prevent null/undefined errors
    setSearchQuery(query); // Set the search query state
    // Make an API call to search when the input value changes
    let form = new FormData();
    form.append("Id", localStorage?.getItem("ID"));
    form.append("LoginName", localStorage?.getItem("realname"));
    form.append("CrmID", CRMID);
    form.append("Date", formatDate(formData?.FromDate));
    form.append("VerticalID", formData?.VerticalID);
    form.append("TeamID", formData?.TeamID);
    form.append("WingID", formData?.WingID);
    form.append("Name", query); // Pass the search query here
    axios
      .post(apiUrls?.Attendence_Search, form, { headers })
      .then((res) => {
        // Filter the result based on the response and search query
        const filtered = res?.data?.data?.filter((item) =>
          item?.Name?.toLowerCase().includes(query)
        );
        setTableData(filtered); // Update the table data with filtered results
        setCurrentPage(1); // Reset to the first page after search
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
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

  const handleDateChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
    handleTableSearch(value);
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // This ensures the time is in 12-hour format with AM/PM
      });
      setCurrentTime(formattedTime);
    }, 1000);
    return () => clearInterval(interval); // Clear interval on component unmount
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
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };

  useEffect(() => {
    getVertical();
    getTeam();
    getWing();
    handleTableSearch();
  }, []);

  const getIconColor = (orderSequence) => {
    switch (orderSequence) {
      case 0:
        return "orange"; // Leave
      case 1:
        return "red"; // Offline
      case 2:
        return "purple"; // Missing Attendance
      case 3:
        return "green"; // Online
      default:
        return "gray"; // Default color if no match
    }
  };

  const calculateStatusCounts = (data) => {
    let total = data.length;
    let online = data.filter((member) => member.OrderSequence === 3).length;
    let offline = data.filter((member) => member.OrderSequence === 1).length;
    let leave = data.filter((member) => member.OrderSequence === 0).length;
    let missingAttendance = data.filter(
      (member) => member.OrderSequence === 2
    ).length;
    return { total, online, offline, leave, missingAttendance };
  };

  const statusCounts = calculateStatusCounts(tableData);
  return (
    <>
      <div className="card">
        <Heading
          title={<span style={{ fontWeight: "bold" }}>Attendance</span>}
          secondTitle={
            <div className="attendance-status">
              <div className="status-item total">
                <span className="dot gray"></span>
                <strong>Total :</strong> {statusCounts.total}
              </div>
              <div className="status-item online">
                <span className="dot green"></span>
                <strong>Online :</strong> {statusCounts.online}
              </div>
              <div className="status-item offline">
                <span className="dot red"></span>
                <strong>Offline :</strong> {statusCounts.offline}
              </div>
              <div className="status-item leave">
                <span className="dot orange"></span>
                <strong>Leave/Off :</strong> {statusCounts.leave}
              </div>
              <div className="status-item missing">
                <span className="dot purple"></span>
                <strong>Missing Attendance :</strong>{" "}
                {statusCounts.missingAttendance}
              </div>
            </div>
          }
        />
        <div className="row g-4 m-2">
          <DatePicker
            className="custom-calendar"
            id="FromDate"
            name="FromDate"
            lable="Date"
            placeholder={VITE_DATE_FORMAT}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            value={formData?.FromDate}
            handleChange={handleDateChange}
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
          <Input
            type="text"
            className="form-control"
            id="Name"
            name="Name"
            lable="Name"
            onChange={handleSearch}
            value={searchQuery}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
        </div>

        <div className="card">
          {/* <Tables
            thead={attendanceTHEAD}
            tbody={currentData?.map((ele, index) => ({
                
              "S.No.": (  <div className="team-member">
                <span className="team-member-id">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </span>
                <span className="team-member-icon ml-0">
                  {ele?.name?.charAt(0)}
                </span>
                <span className="team-member-name">{ele.name}</span>
              </div>),
              "Team Member": "Lotus",
              Login: ele?.login,
              Location: ele?.location,
              Logout: ele?.logout,
              Location1: ele?.location,
            }))}
            tableHeight={"tableHeight"}
          /> */}
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left", fontWeight: "900" }}>
                  #Team Member
                </th>
                <th style={{ textAlign: "left" }}>Login</th>
                <th style={{ textAlign: "left" }}>Location</th>
                <th style={{ textAlign: "left" }}> Logout</th>
                <th style={{ textAlign: "left" }}>Location</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((member, index) => (
                <tr key={index}>
                  <td>
                    <div className="team-member">
                      <span className="team-member-id">
                        {(currentPage - 1) * rowsPerPage + index + 1}
                      </span>
                      <span
                        className="team-member-icon ml-0"
                        style={{
                          background: getIconColor(member?.OrderSequence),
                        }}
                      >
                        {member?.EmpSymbol?.charAt(0)}
                      </span>
                      <span className="team-member-name">{member.Name}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: "left" }}>
                    {member?.LoginTime || " "}
                  </td>
                  <td style={{ textAlign: "left" }}>{member?.Location}</td>
                  <td style={{ textAlign: "left" }}>
                    {member?.LogoutLocation}
                  </td>
                  <td style={{ textAlign: "left" }}>
                    {member?.LogoutTime || " "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row g-4 m-2 d-flex">
          <ReactSelect
            className="form-control"
            name="UserLocation"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Location"
            id="Location"
            dynamicOptions={location}
            value={formData?.UserLocation}
            handleChange={handleDeliveryChange}
          />
          <Input
            type="text"
            className="form-control"
            id="Remarks"
            name="Remarks"
            lable="Remarks"
            onChange={handleDateChange}
            value={formData?.Remarks}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <div>
            <select
              style={{ height: "24px", borderRadius: "2px", color: "black" }}
              disabled
            >
              <option value={currentTime}>{currentTime}</option>
            </select>
          </div>
          <div className="col-2">
            {status ? (
              <button
                className="btn btn-sm"
                onClick={handleLogout}
                style={{ background: "red", color: "white", border: "none" }}
              >
                Logout
              </button>
            ) : (
              <button
                className="btn btn-sm"
                onClick={handleLogin}
                style={{ background: "Green", color: "white", border: "none" }}
              >
                Login
              </button>
            )}
          </div>

          <div
            className="pagination ml-auto"
            style={{ marginTop: "0px !important" }}
          >
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
      </div>
    </>
  );
};
export default Attendance;

const MyLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`Lat: ${latitude}, Lon: ${longitude}`);
        },
        (error) => {
          reject(`Error: ${error.message}`);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};
