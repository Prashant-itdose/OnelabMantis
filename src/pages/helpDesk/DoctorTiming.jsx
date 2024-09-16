import React, { useCallback, useEffect, useState } from "react";
import Heading from "@app/components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "@app/components/formComponent/ReactSelect";
import DatePicker from "../../components/formComponent/DatePicker";
import DoctorDetails from "../../components/HelpDesk/DoctorDetails";
import {
  GetBindDoctorDept,
  GetDoctorAppointmentTimeSlotConsecutive,
} from "../../networkServices/opdserviceAPI";
import { DOCTOR_TIMING_COLOR } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBindDepartment,
  getBindSpeciality,
} from "../../store/reducers/common/CommonExportFunction";
import { handleReactSelectDropDownOptions } from "../../utils/utils";
import moment from "moment";
import { DoctorAppointmentStatusByDoctorID } from "../../networkServices/doctorTimingapi";

const DoctorTiming = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const { GetDepartmentList } = useSelector((state) => state.CommonSlice);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedPosition, setDraggedPosition] = useState({});
  const [shiftData, setShiftData] = useState({});
  const [DropDownState, setDropDownState] = useState({
    getDoctorDeptWise: [],
  });
  const [payloadData, setPayloadData] = useState({
    DepartmentID: "ALL",
    DoctorID: "",
    Date: new Date(),
  });

  const handleDragStart = (e, item, timeSlot, shiftName) => {
    setDraggedItem(item);
    setDraggedPosition({ timeSlot, shiftName });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropItem, dropTimeSlot, dropShiftName) => {
    e.preventDefault();

    const newShiftData = { ...shiftData };

    const draggedShift = newShiftData[draggedPosition.shiftName];
    const dropShift = newShiftData[dropShiftName];

    const draggedTimeData = draggedShift[draggedPosition.timeSlot];
    const dropTimeData = dropShift[dropTimeSlot];

    const draggedIndex = draggedTimeData.findIndex(
      (item) => item.label === draggedItem.label
    );
    const dropIndex = dropTimeData.findIndex(
      (item) => item.label === dropItem.label
    );

    // Swap the data
    [
      draggedTimeData[draggedIndex].PatientDetails,
      dropTimeData[dropIndex].PatientDetails,
    ] = [
      dropTimeData[dropIndex].PatientDetails,
      draggedTimeData[draggedIndex].PatientDetails,
    ];

    setShiftData(newShiftData);
    setDraggedItem(null);
    setDraggedPosition({});
  };

  const handleModifiedDoctorSlotData = (apiResponse, key, secondKey) => {
    const objData = apiResponse.reduce((acc, current) => {
      if (acc[current[key]]) {
        if (acc[current[key]][current[secondKey]]) {
          acc[current[key]][current[secondKey]] = [
            ...acc[current[key]][current[secondKey]],
            current,
          ];
        } else {
          acc[current[key]][current[secondKey]] = [current];
        }
      } else {
        acc[current[key]] = {
          ...acc[current[key]],
          [current[secondKey]]: [current],
        };
      }

      return acc;
    }, {});

    return objData;
  };

  const handleDoctorDeptWise = async (Department) => {
    try {
      const data = await GetBindDoctorDept(Department);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  const FetchAllDropDown = async () => {
    // debugger;
    try {
      const response = await Promise.all([
        handleDoctorDeptWise(payloadData?.DepartmentID),
      ]);

      const responseDropdown = {
        getDoctorDeptWise: handleReactSelectDropDownOptions(
          response[0],
          "Name",
          "DoctorID"
        ),
      };

      setDropDownState(responseDropdown);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayloadData({
      ...payloadData,
      [name]: value,
    });
  };

  // react select handleChange
  const handleReactSelectChange = async (name, e) => {
    switch (name) {
      case "DepartmentID":
        const data = await handleDoctorDeptWise(e.label);

        setDropDownState({
          ...DropDownState,
          getDoctorDeptWise: handleReactSelectDropDownOptions(
            data,
            "Name",
            "DoctorID"
          ),
        });
        break;
      default:
        setPayloadData({
          ...payloadData,
          [name]: e.value,
        });
        break;
    }
  };

  const handleGetDoctorAppointmentTimeSlotConsecutive = async (
    doctorID,
    AppointedDate
  ) => {
    try {
      const apiResponse = await GetDoctorAppointmentTimeSlotConsecutive(
        doctorID,
        AppointedDate
      );
      const modifiedData = handleModifiedDoctorSlotData(
        apiResponse?.data,
        "ShiftName",
        "SlotGroupTime"
      );
      setShiftData(modifiedData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSearch = async () => {
    const payload = {};
    payload.doctorID = String(payloadData?.DoctorID);
    payload.date = moment(payloadData?.Date).format("YYYY-MM-DD");
    await handleGetDoctorAppointmentTimeSlotConsecutive(
      payload?.doctorID,
      payload?.date
    );
  };

  useEffect(() => {
    if (GetDepartmentList.length === 0) {
      dispatch(GetBindDepartment());
    }
    FetchAllDropDown();
  }, []);

  const renderData = useCallback(
    (shiftData) => {
      const shiftName = Object.keys(shiftData);
      return shiftName?.map((shift, index) => {
        const doctorSlotData = shiftData[shift];
        const slotGroupTime = Object.keys(doctorSlotData);
        return (
          <>
            <div key={index} className="shift-header">
              {shift}
            </div>
            <div className="row">
              {slotGroupTime?.map((groupTime, innerIndex) => {
                return (
                  <>
                    <div key={innerIndex} className="col-12">
                      <div className="d-flex flex-nowrap">
                        <div>
                          <div className="groupTime m-1">{groupTime}</div>
                        </div>
                        <div>
                          <div className="d-flex flex-wrap">
                            {doctorSlotData[groupTime]?.map(
                              (data, mostInnerIndex) => {
                                return (
                                  <div
                                    id={`doctorName-${index}`}
                                    data-pr-tooltip={data?.PatientDetails}
                                    style={{
                                      backgroundColor:
                                        DOCTOR_TIMING_COLOR[
                                          data?.DoctorStatusID
                                        ],
                                      color: "white",
                                      margin: "2px",
                                      padding: "2px",
                                      borderRadius: "5px",
                                      minWidth:"150px"
                                    }}
                                  >
                                    <div key={mostInnerIndex}>
                                      <div
                                        style={{
                                          fontSize: "8px !important",
                                          marginBottom: "-5px",
                                        }}
                                      >
                                        {data?.DoctorStatus}
                                      </div>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 20 20"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <circle
                                            cx="12"
                                            cy="12"
                                            r="6"
                                            stroke="white"
                                            stroke-width="1.5"
                                          />
                                          <line
                                            x1="12"
                                            y1="8"
                                            x2="12"
                                            y2="12"
                                            stroke="white"
                                            stroke-width="1.5"
                                          />
                                          <line
                                            x1="12"
                                            y1="12"
                                            x2="15"
                                            y2="13.5"
                                            stroke="white"
                                            stroke-width="1.5"
                                          />
                                        </svg>
                                        {data?.FromTimeDisplay}
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        );
      });
    },
    [shiftData]
  );

  return (
    <>
      <div className="mt-1 spatient_registration_card">
        <div className="patient_registration card">
          <Heading isBreadcrumb={true} />
          <div className="row p-1">
            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
              <ReactSelect
                placeholderName={t("helpDesk.doctortiming.Department")}
                id={"Title"}
                searchable={true}
                respclass=""
                value={payloadData?.DepartmentID}
                dynamicOptions={[
                  { label: "All", value: "ALL" },
                  ...handleReactSelectDropDownOptions(
                    GetDepartmentList,
                    "Name",
                    "ID"
                  ),
                ]}
                name="DepartmentID"
                handleChange={handleReactSelectChange}
              />
              <ReactSelect
                placeholderName={t("helpDesk.doctortiming.Doctor")}
                id={"Title"}
                searchable={true}
                dynamicOptions={DropDownState?.getDoctorDeptWise}
                respclass=""
                value={payloadData?.DoctorID}
                name="DoctorID"
                requiredClassName="required-fields"
                handleChange={handleReactSelectChange}
              />
              <DatePicker
                className="custom-calendar required-fields"
                respclass=""
                id="date"
                name="Date"
                lable={t("helpDesk.doctortiming.Date")}
                value={payloadData?.Date}
                placeholder={VITE_DATE_FORMAT}
                showTime={true}
                hourFormat="12"
                handleChange={handleChange}
              />

              <div>
                <button
                  className="btn btn-sm btn-primary w-100"
                  type="button"
                  onClick={handleSearch}
                >
                  {t("helpDesk.doctortiming.Search")}
                </button>
              </div>
            </div>
            <div className="col-xl-10 col-md-8 col-sm-8 col-12">
              <DoctorDetails payloadData={payloadData} />
              {renderData(shiftData)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorTiming;
