import React, { useEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import Input from "../../../components/formComponent/Input";
import { useTranslation } from "react-i18next";
import DatePicker from "../../../components/formComponent/DatePicker";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import moment from "moment";
import MultiSelectComp from "../../../components/formComponent/MultiSelectComp";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  getBindCityList,
  getBindCountryList,
  getBindDistrictList,
  getBindStateList,
} from "../../../networkServices/ReportsAPI";
import { isArrayFunction } from "../../../utils/utils";
import {
  GetBindAllDoctorConfirmation,
  getBindPanelList,
  GetBindSubCatgeory,
} from "../../../store/reducers/common/CommonExportFunction";
import { print_Type, Revenue_Analysis_Report } from "../../../utils/constant";

export default function RevenueAnalysisReport() {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const {
    GetEmployeeWiseCenter,
    getBindPanelListData,
    GetBindSubCatgeoryData,
    GetBindAllDoctorConfirmationData,
  } = useSelector((state) => state.CommonSlice);
  const { getBindCategoryData } = useSelector(
    (state) => state.TokenManagementSlice
  );

  const [apiData, setApiData] = useState({
    getCountry: [],
    getState: [],
    getDistrict: [],
    getCity: [],
  });
  const [multiselectState, setMultiSelectState] = useState({
    centreMulti: [],
    itemMulti: [],
    doctorMulti: [],
    panelMulti: [],
  });

  const { handleChange, values, setFieldValue, handleSubmit, resetForm } =
    useFormik({
      initialValues: Revenue_Analysis_Report,
      enableReinitialize: true,
      onSubmit: (values) => {
        console.log(values);

        // Reset the form and state
        resetForm();
        setMultiSelectState({
          centreMulti: [],
          itemMulti: [],
          doctorMulti: [],
          panelMulti: [],
        });
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

  const handleReactSelectChange = async (name, e) => {
    setFieldValue(name, e);
    console.log(name, e);
    switch (name) {
      case "category":
        try {
          dispatch(
            GetBindSubCatgeory({
              Type: 1,
              CategoryID: e.value,
            })
          );
        } catch (err) {
          console.log(err);
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBindCountryList();
        setApiData((prev) => ({
          ...prev,
          getCountry: isArrayFunction(data.data),
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    dispatch(
      getBindPanelList({
        PanelGroup: "ALL",
      })
    );
    dispatch(
      GetBindAllDoctorConfirmation({
        Department: "All",
      })
    );
  }, []);

  return (
    <>
      <div className="card patient_registration border">
        <Heading
          title={t("card patient_registration border")}
          isBreadcrumb={true}
        />
        <form className="row  p-2" onSubmit={handleSubmit}>
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="centre"
            placeholderName="Centre"
            dynamicOptions={GetEmployeeWiseCenter.map((item) => ({
              name: item.CentreName,
              code: item.CentreID,
            }))}
            handleChange={handleMultiSelectChange}
            value={multiselectState.centreMulti.map((code) => ({
              code,
              name: GetEmployeeWiseCenter.find((item) => item.CentreID === code)
                ?.CentreName,
            }))}
          />
          {/* <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="Category"
            placeholderName="Category"
            id="Category"
            dynamicOptions={getBindCategoryData.map((item) => ({
              name: item.name,
              code: item.categoryID,
            }))}
            handleChange={handleMultiSelectChange}
            value={multiselectState.centreMulti.map((code) => ({
              code,
              name: GetEmployeeWiseCenter.find((item) => item.categoryID === code)
                ?.name,
            }))}
          /> */}
          <ReactSelect
            placeholderName={t("Category")}
            id={"Category"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={getBindCategoryData.map((item) => {
              return {
                label: item.name,
                value: item.categoryID,
              };
            })}
            name="category"
            value={values.category}
            handleChange={handleReactSelectChange}
          />
          <ReactSelect
            placeholderName={t("Sub Category")}
            id={"subCategory"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={GetBindSubCatgeoryData.map((item) => {
              return {
                label: item.name,
                value: item.subCategoryID,
              };
            })}
            name="subCategory"
            value={values.subCategory}
            handleChange={handleReactSelectChange}
          />
          {/* <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="subCategory"
            placeholderName="Sub Category"
            dynamicOptions={GetEmployeeWiseCenter.map((item) => ({
              name: item.CentreName,
              code: item.CentreID,
            }))}
            handleChange={handleMultiSelectChange}
            value={multiselectState.centreMulti.map((code) => ({
              code,
              name: GetEmployeeWiseCenter.find((item) => item.CentreID === code)
                ?.CentreName,
            }))}
          /> */}
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="item"
            placeholderName="Item"
            dynamicOptions={getBindPanelListData.map((item) => ({
              name: item.Company_Name,
              code: item.PanelID,
            }))}
            handleChange={handleMultiSelectChange}
            value={multiselectState.itemMulti.map((code) => ({
              code,
              name: getBindPanelListData.find((item) => item.PanelID === code)
                ?.Company_Name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="doctor"
            id="doctor"
            placeholderName="Doctor"
            dynamicOptions={GetBindAllDoctorConfirmationData?.map((item) => ({
              name: item.Name,
              code: item.DoctorID,
            }))}
            handleChange={handleMultiSelectChange}
            value={multiselectState?.doctorMulti?.map((code) => ({
              code,
              name: GetBindAllDoctorConfirmationData?.find(
                (item) => item.DoctorID === code
              )?.Name,
            }))}
          />
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="panel"
            placeholderName="Panel"
            dynamicOptions={getBindPanelListData.map((item) => ({
              name: item.Company_Name,
              code: item.PanelID,
            }))}
            handleChange={handleMultiSelectChange}
            value={multiselectState?.panelMulti?.map((code) => ({
              code,
              name: getBindPanelListData.find((item) => item.PanelID === code)
                ?.Company_Name,
            }))}
          />

          <ReactSelect
            placeholderName={t("Date Filter Type")}
            id={"dateFilterType"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={[
              { label: " Bill Date", value: "0" },
              { label: "Entry Date", value: "1" },
              { label: "Bill Date", value: "2" },
              { label: "DR/CR Entry Date", value: "3" },
            ]}
            name="dateFilterType"
            handleChange={handleReactSelectChange}
            value={values.dateFilterType}
          />

          <DatePicker
            className="custom-calendar"
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            id="fromDate"
            name="fromDate"
            lable={t("FrontOffice.OPD.Report.CollectionReport.fromDate")}
            placeholder={VITE_DATE_FORMAT}
            showTime
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
            showTime
            hourFormat="12"
            value={
              values.toDate
                ? moment(values.toDate, "YYYY-MM-DD").toDate()
                : null
            }
            handleChange={handleChange}
          />

          <ReactSelect
            placeholderName={t("Patient Type")}
            id={"patientType"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={[
              { label: "All", value: "0" },
              { label: "OPD", value: "1" },
              { label: "IPD", value: "2" },
              { label: "EMG", value: "3" },
            ]}
            name="patientType"
            handleChange={handleReactSelectChange}
            value={values.patientType}
            // value={values.}
          />
          <ReactSelect
            placeholderName={t("Report Type")}
            id={"reportType"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={[
              { label: "Summarised", value: "0" },
              { label: "Detailed", value: "1" },
              { label: "Categorywise", value: "2" },
              { label: "Sub Categorywise", value: "3" },
              { label: "Itemwise", value: "4" },
              { label: "Entry wise", value: "5" },
            ]}
            name="reportType"
            handleChange={handleReactSelectChange}
            value={values.reportType}
            // value={values.}
          />
          <ReactSelect
            placeholderName={t("Sub Type")}
            id={"subType"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={[
              { label: "Panelwise", value: "0" },
              { label: "Doctorwise", value: "1" },
            ]}
            name="subType"
            handleChange={handleReactSelectChange}
            value={values.subType}
            // value={values.}
          />

          <Input
            type="text"
            className="form-control required-fieldss"
            id="UHID"
            name="UHID"
            lable="UHID"
            placeholder=" "
            respclass="col-xl-2 col-md-3 col-sm-4 col-12"
            onChange={handleChange}
              value={values.UHID}
          />
          <ReactSelect
            placeholderName={t("Print Type")}
            id={"printType"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={print_Type?.map((item,index)=>{
            return{
              value:item.ID,
              label:item.name
            }
          })}
            name="printType"
            handleChange={handleReactSelectChange}
            value={values.printType}
          />
          <div className="box-inner ">
            <button className="btn btn-sm btn-primary ml-2" type="submit">
              Report
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
