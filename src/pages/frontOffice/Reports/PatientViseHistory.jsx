import React, { useState } from "react";
import Heading from "../../../components/UI/Heading";
import { useTranslation } from "react-i18next";
import Input from "../../../components/formComponent/Input";
import DatePicker from "../../../components/formComponent/DatePicker";
import { Avatar } from "primereact/avatar";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import MultiSelectComp from "../../../components/formComponent/MultiSelectComp";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { print_Type } from "../../../utils/constant";

function PatientViseHistory() {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const dispatch = useDispatch()
  const { GetEmployeeWiseCenter , GetBindAllDoctorConfirmationData , getBindSpecialityData
  } = useSelector((state) => state.CommonSlice);

  const [multiselectState, setMultiSelectState] = useState({
    centreMulti: [],
    typeMulti: [],
    userMulti: [],
    doctorMulti:[],
    specialityMulti:[]
  });
  const [apiData, setApiData] = useState({
    paymentModeData: [],
    getBindTypeOfTnxData: [],
  });
  

  const initialValues = {
    centre: "",
    UHID: "",
    printType: "",
    fromDate: moment().format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
  };

  const { handleChange, values, setFieldValue, handleSubmit, resetForm } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        console.log(values);

        // Reset the form and state
        resetForm();
        setMultiSelectState({ centreMulti: [], typeMulti: [], userMulti: [], doctorMulti:[], specialityMulti:[] });
       
      },
    });

  

  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    const selectedNames = selectedOptions
      .map((option) => option.name)
      .join(", ");
    setFieldValue(name, selectedNames);
    setMultiSelectState((prev) => ({
      ...prev,
      [`${name}Multi`]: selectedValues,
    }));
  };

  
  const handleReactSelectChange = (name, e) => {
    setFieldValue(name, e.value);
  };
  return (
    <>
      <div className="m-2 spatient_registration_card">
        <form className="patient_registration card" onSubmit={handleSubmit}>
          <Heading isBreadcrumb={true} />
          <div className="row  p-2">
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="centre"
            placeholderName="Centre"
            dynamicOptions={GetEmployeeWiseCenter?.map((item) => ({
              name: item.CentreName,
              code: item.CentreID,
            }))}
            handleChange={handleMultiSelectChange}
            value={multiselectState?.centreMulti?.map((code) => ({
              code,
              name: GetEmployeeWiseCenter.find((item) => item.CentreID === code)
                ?.CentreName,
            }))}
          />
            <Input
              type="text"
              className="form-control"
              id="UHID"
              name="UHID"
              onChange={handleChange}
              value={values.UHID}
              lable={t("FrontOffice.OPD.Report.PatientViseHistory.UHID")}
              placeholder=" "
              required={true}
              respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            />
               <DatePicker
            className="custom-calendar"
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            id="fromDate"
            name="fromDate"
            lable={t("FrontOffice.OPD.Report.CollectionReport.fromDate")}
            placeholder={VITE_DATE_FORMAT}
            showTime={true}
            hourFormat="12"
            value={
            values.fromDate
              ? moment(values.fromDate, "YYYY-MM-DD").toDate()
              : null
          }
          handleChange={handleChange}
          />
            <DatePicker
            className="custom-calendar"
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            id="toDate"
            name="toDate"
            lable={t("FrontOffice.OPD.Report.CollectionReport.toDate")}
            placeholder={VITE_DATE_FORMAT}
            showTime={true}
            hourFormat="12"
            value={
            values.toDate ? moment(values.toDate, "YYYY-MM-DD").toDate() : null
          }
          handleChange={handleChange}
          />
           <ReactSelect
            placeholderName={t("Print Type")}
            id={"Centre"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={print_Type?.map((item,index)=>{
            return{
              value:item.ID,
              label:item.name
            }
          })}
            name="printType"
            value={values.printType}
            handleChange={handleReactSelectChange}
          />
           <div className="col-sm-2 d-flex align-items-center" style={{gap:"10px"}}>
              <Avatar label="" className="p-avatar-circle bg-info" />
              <label className="m-0">{t("FrontOffice.OPD.Report.PatientViseHistory.IPD")}</label>
              <Avatar label="" className="p-avatar-circle bg-success" />
              <label className="m-0">{t("FrontOffice.OPD.Report.PatientViseHistory.EMG")}</label>
              <Avatar label="" className="p-avatar-circle bg-warning" />
              <label className="m-0">{t("FrontOffice.OPD.Report.PatientViseHistory.OPD")}</label>
            </div>
            <div className=" d-flex align-items-center ml-3" style={{gap:"10px"}}> 
            <button className="btn btn-sm btn-primary" type="submit">
                {t("FrontOffice.OPD.Report.PatientViseHistory.Save")}
              </button>
              <button className="btn btn-sm btn-primary" type="submit">
                {t("FrontOffice.OPD.Report.PatientViseHistory.Report")}
              </button>
            </div>
            {/* <div className="col-xl-1 col-md-3 col-sm-4 col-12">
              <button className="btn btn-sm btn-primary" type="button">
                {t("FrontOffice.OPD.Report.PatientViseHistory.Save")}
              </button>
            </div>
            <div className="col-xl-1 col-md-3 col-sm-4 col-12">
              <button className="btn btn-sm btn-primary" type="button">
                {t("FrontOffice.OPD.Report.PatientViseHistory.Report")}
              </button>
            </div> */}
          </div>
          
        </form>
      </div>
    </>
  );
}

export default PatientViseHistory;
