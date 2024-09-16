import React, { useState, useEffect } from "react";
import Heading from "../../components/UI/Heading";
import DatePickerMonth from "../../components/formComponent/DatePickerMonth";
import Modal from "../../components/modalComponent/Modal";
import LeaveRequestModal from "./LeaveRequestModal";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrls } from "../../networkServices/apiEndpoints";
import { headers } from "../../utils/apitools";
// Helper function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Array(new Date(year, month, 0).getDate())
    .fill(null)
    .map((_, index) => {
      return { date: `${month}/${index + 1}`, status: "" }; // Add status later
    });
};

const getStartDayOfWeek = (year, month) => {
  return new Date(year, month - 1, 1).getDay(); // Get the weekday of the 1st day of the month (0 = Sunday, 6 = Saturday)
};

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
const currentYear = currentDate.getFullYear();

const LeaveRequest = () => {
  const CRMID = localStorage.getItem("CrmEmployeeID");
  console.log(CRMID);
  const LoginUserName = localStorage.getItem("realname");
  console.log(LoginUserName);
  const [formData, setFormData] = useState({
    Month: new Date(),
    Year: "",
    currentMonth: currentMonth,
    currentYear: currentYear,
  });
  const [CalenderDetails, setCalenderDetails] = useState([]);
  console.log(formData);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [startDayOfWeek, setStartDayOfWeek] = useState(0);
  const [clickedate, setclickeddate] = useState("");

  // Effect to update days when month/year changes
  useEffect(() => {
    console.log("hello");
    const updatedDays = getDaysInMonth(selectedYear, selectedMonth + 1); // +1 because JS months are 0-indexed
    const startDay = getStartDayOfWeek(selectedYear, selectedMonth + 1); // Get the day of the week the month starts on
    setDaysInMonth(updatedDays);
    setStartDayOfWeek(startDay);
  }, [selectedMonth, selectedYear]);

  const handleMonthYearChange = (name, e) => {
    const { value } = e.target;
    const date = new Date(value);

    setSelectedMonth(date.getMonth());
    setSelectedYear(date.getFullYear());
    handleLeaveRequest_BindCalender({
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderDay = (day, index, today, table1Data) => {
    console.log(table1Data);
    const { date, status } = day; // assuming date is in 'MM/DD' format

    // Set today's date to midnight (so time doesn't affect the comparison)
    const todayMidnight = new Date(today);
    todayMidnight.setHours(0, 0, 0, 0);

    // Assuming 'date' is in 'MM/DD' format, split it and create a new Date object
    const [month, dayOfMonth] = date.split("/").map(Number); // convert 'MM/DD' to [month, day]
    const dayDate = new Date(today.getFullYear(), month - 1, dayOfMonth); // create a Date object

    // Check if the day is before today
    const isBeforeToday = dayDate < todayMidnight;

    // Use toLocaleDateString to format the date as 'Sep 14'
    const formattedDate = dayDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    // Find the entry in Table1 that corresponds to this day
    const dayDetails = table1Data.find((d) => d.Day === dayOfMonth);

    return (
      <td
        key={index}
        className={isBeforeToday ? "disabled-day" : "active-day"}
        onClick={() => {
          setVisible({ showVisible: true, data: dayDate }),
            setclickeddate(dayDate);
        }}
        style={{
          cursor: !isBeforeToday ? "pointer" : "default",
        }}
      >
        <div>{formattedDate}</div> {/* Display the formatted date 'Sep 14' */}
        {status && <div className="day-status">{status}</div>}
        {/* Display holiday or login/logout details if they exist */}
        {dayDetails && (
          <div
            className="day-details"
            dangerouslySetInnerHTML={{ __html: dayDetails.Holiday }}
          />
        )}
      </td>
    );
  };

  const renderCalendarRows = () => {
    const weeks = [];
    const today = new Date(); // Get today's date
    let currentWeek = new Array(startDayOfWeek).fill(null); // Fill with empty days until the first day of the month

    // Loop through each day of the month
    daysInMonth.forEach((day) => {
      if (currentWeek.length === 7) {
        // Push the full week to the weeks array
        weeks.push(currentWeek);
        currentWeek = []; // Start a new week
      }

      currentWeek.push(day); // Add the current day to the week
    });

    // If there are remaining days in the current week, pad the week and push it
    if (currentWeek.length > 0) {
      weeks.push([
        ...currentWeek, // Add the remaining days
        ...new Array(7 - currentWeek.length).fill(null), // Fill the rest with empty cells
      ]);
    }

    // Render weeks and their days

    return weeks.map((week, index) => (
      <tr key={index}>
        {week.map((day, i) =>
          day ? (
            renderDay(
              day,
              i,
              today,
              CalenderDetails?.Table1 ? CalenderDetails?.Table1 : []
            ) // Pass today's date to the renderDay function
          ) : (
            <td key={i} className="empty-day"></td> // Render empty cells for padding
          )
        )}
      </tr>
    ));
  };

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });
  const handleLeaveRequest_ApproveALL = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("CrmEmpID", CRMID),
      form.append("ToApproveCrmEmpID", ""),
      form.append("Month", details ? details?.month : currentMonth),
      form.append("Year", details ? details?.year : currentYear),
      axios
        .post(apiUrls?.LeaveRequest_ApproveALL, form, { headers })
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };

  const handleLeaveRequest_Select = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("CrmEmpID", CRMID),
      form.append("LeaveDate", "");
    axios
      .post(apiUrls?.LeaveRequest_Select, form, { headers })
      .then((res) => {
        toast.success(res?.data?.message);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleLeaveRequest_BindCalender = (details) => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("CrmEmpID", CRMID),
      form.append("Month", details ? details?.month : currentMonth),
      form.append("Year", details ? details?.year : currentYear),
      axios
        .post(apiUrls?.LeaveRequest_BindCalender, form, { headers })
        .then((res) => {
          setCalenderDetails(res?.data?.data);

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  console.log(CalenderDetails?.Table);

  const leaveData = CalenderDetails?.Table || [];

  const getLeaveAvailable = (leaveType) => {
    const leave = leaveData.find((item) => item.LeaveType === leaveType);
    return leave ? leave.Available : "0";
  };

  useEffect(() => {
    handleLeaveRequest_BindCalender();
  }, []);

  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  function format2Date(inputDate) {
    // Create a new Date object from the input string (YYYY/MM/DD)
    const date = new Date(inputDate);
    // Format the date using toLocaleDateString
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate; // Return the formatted date as '12 Sep 2024'
  }

  console.log(visible);
  return (
    <>
      <Modal
        modalWidth={"600px"}
        visible={visible?.showVisible}
        setVisible={setVisible}
        // tableData={formData}
        Header={`Selected Date: ${format2Date(clickedate)}`}
      >
        <LeaveRequestModal
          visible={visible}
          setVisible={setVisible}
          //   tableData={formData}
        />
      </Modal>
      <div className="card">
        <Heading title={"Leave Request"} />
        <div className="row g-4 m-2">
          <div className="col-sm-4 ">
            <div className="d-flex">
              <label className="mr-2">Name :</label>
              <span style={{ textAlign: "right" }}>{LoginUserName}</span>
            </div>
          </div>
          <div className="col-sm-4 d-flex">
            <div className="">
              <label>Leave Month/Year :</label>
            </div>
            <div className="cl-sm-4">
              <DatePickerMonth
                className="custom-calendar"
                id="Month"
                name="Month"
                lable="Month/Year"
                placeholder={"MM/YY"}
                respclass="col-xl-12 col-md-6 col-sm-6 col-12"
                value={formData?.Month}
                handleChange={(e) => handleMonthYearChange("Month", e)}
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="d-flex flex-wrap">
              <label className="mr-5">Available :</label>
              <label className="mr-5">
                CL :
                <span style={{ color: "red" }}>
                  &nbsp;{getLeaveAvailable("CL")}
                </span>
              </label>
              <label className="mr-5">
                SL :
                <span style={{ color: "red" }}>
                  &nbsp;{getLeaveAvailable("SL")}
                </span>
              </label>
              <label className="mr-5">
                WO :
                <span style={{ color: "red" }}>
                  &nbsp; {getLeaveAvailable("Week Off")}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="row d-flex custom-layout">
          <div className="col-md-9 calendar-container-wrapper">
            <div className="calendar-container">
              <table className="calendar">
                <thead style={{ color: "#0099ff" }}>
                  <tr>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                  </tr>
                </thead>
                <tbody>{renderCalendarRows()}</tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3 legend-wrapper">
            <div className="legend">
              <p>
                <span className="pending-approval"></span> Pending Approval
              </p>
              <p>
                <span className="approved-leave"></span> Approved Leave
              </p>
              <p>
                <span className="gazetted-holiday"></span> Gazetted/Restricted
                Holiday
              </p>
              <p>
                <span className="optional-leave"></span> Optional Leave
              </p>
              <p>
                <span className="missing-attendance"></span> Missing Attendance
              </p>
              <p>
                <span className="working-day"></span> Working Day
              </p>
            </div>
            <div>
              <span style={{ color: "red" }}>
                <strong>Note</strong>: Pending SL will carry forward in the next
                financial year
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRequest;
