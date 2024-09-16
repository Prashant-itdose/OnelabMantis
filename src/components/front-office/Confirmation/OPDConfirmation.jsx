import React, { useEffect } from "react";
import DatePicker from "../../formComponent/DatePicker";
import ReactSelect from "../../formComponent/ReactSelect";
import Input from "@app/components/formComponent/Input";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const OPDConfirmation = (props) => {
  const {
    searchHandleChange,
    searchData,
    setSearchData,
    handleReactSelectChange,
    handleClickDataGetAPI,
  } = props;
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const { GetDepartmentList, GetBindAllDoctorConfirmationData } = useSelector(
    (state) => state.CommonSlice
  );

  const typeStatus = [
    { value: "All", label: "All" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "ReScheduled", label: "ReScheduled" },
    { value: "Pending", label: "Pending" },
    { value: "Canceled", label: "Canceled" },
    { value: "App. Time Expired", label: "App. Time Expired" },
  ];
  return (
    <>
      <DatePicker
        className="custom-calendar"
        id="DOB"
        name="fromDate"
        lable={"From Date"}
        placeholder={VITE_DATE_FORMAT}
        respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
        value={
          searchData.fromDate
            ? moment(searchData.fromDate, "YYYY-MM-DD").toDate()
            : null
        }
        handleChange={searchHandleChange}
      />
      <DatePicker
        className="custom-calendar"
        id="toDate"
        name="toDate"
        lable={"To Date"}
        placeholder={VITE_DATE_FORMAT}
        respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
        value={
          searchData.toDate
            ? moment(searchData.toDate, "YYYY-MM-DD").toDate()
            : null
        }
        handleChange={searchHandleChange}
      />

      <ReactSelect
        placeholderName={t("FrontOffice.OPD.Confirmation.label.Status")}
        id={"Status"}
        searchable={true}
        respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
        dynamicOptions={typeStatus?.map((item) => {
          return {
            label: item?.label,
            value: item?.value,
          };
        })}
        name={"status"}
        value={searchData?.status || "All"}
        handleChange={handleReactSelectChange}
      />
      <Input
        type="text"
        className="form-control"
        id="AppointmentNo"
        lable={t("FrontOffice.OPD.Confirmation.label.AppointmentNo")}
        placeholder=" "
        required={true}
        respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
        name="appointmentNo"
        value={searchData.appointmentNo}
        onChange={searchHandleChange}
      />
      <ReactSelect
        placeholderName={t("FrontOffice.OPD.Confirmation.label.PatientType")}
        id={"visitType"}
        searchable={true}
        respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
        name={"visitType"}
        dynamicOptions={[
          { value: "All", label: "All" },
          { value: "Old Patient", label: "Old Patient" },
          { value: "New Patient", label: "New Patient" },
        ]}
        value={searchData?.visitType || "All"}
        handleChange={handleReactSelectChange}
      />
      <Input
        type="text"
        className="form-control"
        id="pname"
        name="pname"
        lable={t("FrontOffice.OPD.Confirmation.label.PatientName")}
        placeholder=" "
        required={true}
        respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
        value={searchData?.pname}
        onChange={searchHandleChange}
      />

      <ReactSelect
        placeholderName={t("FrontOffice.OPD.Confirmation.label.Specialization")}
        id={"doctorDepartmentID"}
        searchable={true}
        respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
        name={"doctorDepartmentID"}
        dynamicOptions={[
          { label: "All", value: "All" },
          ...GetDepartmentList.map((item) => {
            return {
              label: item?.Name,
              value: item?.ID,
            };
          }),
        ]}
        value={searchData.doctorDepartmentID || "All"}
        handleChange={handleReactSelectChange}
      />
      <ReactSelect
        placeholderName={t("FrontOffice.OPD.Confirmation.label.DoctorName")}
        id={"doctorID"}
        searchable={true}
        respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
        name={"doctorID"}
        dynamicOptions={[
          { label: "All", value: "All" },
          ...GetBindAllDoctorConfirmationData.map((item) => {
            return {
              label: item?.Name,
              value: item?.DoctorID,
            };
          }),
        ]}
        value={searchData.doctorID || "All"}
        handleChange={handleReactSelectChange}
      />

      <div className="col-md-1 col-sm-1 col-12 d-flex  ">
        <button
          className="btn btn-sm btn-info "
          onClick={handleClickDataGetAPI}
        >
          {t("FrontOffice.OPD.Confirmation.label.Search")}
        </button>
      </div>
    </>
  );
};

export default OPDConfirmation;
