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
import { print_Type, Registration_Report } from "../../../utils/constant";

export default function RegistrationReport() {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const {
    GetEmployeeWiseCenter,
    GetBindAllDoctorConfirmationData,
    getBindSpecialityData,
  } = useSelector((state) => state.CommonSlice);
  const [apiData, setApiData] = useState({
    getCountry: [],
    getState: [],
    getDistrict: [],
    getCity: [],
  });
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedStateId, setSelectedStateId] = useState(null);
  // console.log(selectedCountryId);
  // console.log(selectedStateId);
  const [multiselectState, setMultiSelectState] = useState({
    centreMulti: [],
    typeMulti: [],
    userMulti: [],
    doctorMulti: [],
    specialityMulti: [],
  });

  

  const { handleChange, values, setFieldValue, handleSubmit, resetForm } =
    useFormik({
      initialValues:Registration_Report,
      enableReinitialize: true,
      onSubmit: (values) => {
        console.log(values);

        // Reset the form and state
        resetForm();
        setMultiSelectState({
          centreMulti: [],
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
      case "country":
        setSelectedCountryId(e.value);
        try {
          const dataState = await getBindStateList(e.value);
          setApiData((prev) => ({
            ...prev,
            getState: isArrayFunction(dataState.data),
          }));
        } catch (error) {
          console.log(error);
        }
        break;
      case "state":
        setSelectedStateId(e.value);
        try {
          const dataDistrict = await getBindDistrictList({
            countryId: selectedCountryId,
            StateId: e.value,
          });
          setApiData((prev) => ({
            ...prev,
            getDistrict: isArrayFunction(dataDistrict.data),
          }));
        } catch (error) {
          console.log(error);
        }
        break;
      case "district":
        // setSelectedStateId(e.value);
        try {
          const dataCity = await getBindCityList({
            DistrictId: e.value,
            StateId: selectedStateId,
          });
          // console.log(dataDistrict);
          setApiData((prev) => ({
            ...prev,
            getCity: isArrayFunction(dataCity.data),
          }));
        } catch (error) {
          console.log(error);
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
            placeholderName={t("Country")}
            id={"country"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={apiData?.getCountry?.map((item) => ({
              label: item?.Name,
              value: item?.CountryID,
            }))}
            name="country"
            value={values.country}
            handleChange={handleReactSelectChange}
          />
          <ReactSelect
            placeholderName={t("State")}
            id={"state"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={apiData?.getState?.map((item) => ({
              label: item?.StateName,
              value: item?.StateID,
            }))}
            name="state"
            value={values.state}
            handleChange={handleReactSelectChange}
          />
          <ReactSelect
            placeholderName={t("District")}
            id={"district"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={apiData?.getDistrict?.map((item) => ({
              label: item?.District,
              value: item?.DistrictID,
            }))}
            name="district"
            value={values.district}
            handleChange={handleReactSelectChange}
          />
          <ReactSelect
            placeholderName={t("City")}
            id={"city"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={apiData?.getCity?.map((item) => ({
              label: item?.City,
              value: item?.ID,
            }))}
            name="city"
            value={values.city}
            handleChange={handleReactSelectChange}
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
            value={values.printType}
            handleChange={handleReactSelectChange}
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
