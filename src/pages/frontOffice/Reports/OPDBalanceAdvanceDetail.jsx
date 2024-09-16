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
import { BindPaymentModePanelWise } from "../../../networkServices/PaymentGatewayApi";
import { print_Type } from "../../../utils/constant";

export default function OPDBalanceAdvanceDetail() {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const {
    GetEmployeeWiseCenter,
    GetBindAllDoctorConfirmationData,
    getBindSpecialityData,
  } = useSelector((state) => state.CommonSlice);

  const [multiselectState, setMultiSelectState] = useState({
    centreMulti: [],
    typeMulti: [],
    userMulti: [],
    doctorMulti: [],
    specialityMulti: [],
  });
  const [apiData, setApiData] = useState({
    paymentModeData: [],
    getBindTypeOfTnxData: [],
  });

  const initialValues = {
    centre: "",
    paymentType: "",
    UHID: "",
    type: "",
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

  const handleReactSelectChange = (name, e) => {
    setFieldValue(name, e.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Data = await BindPaymentModePanelWise({ PanelID: 1 });
        setApiData({
          paymentModeData: Data.data,
        });
      } catch (err) {
        console.error(err);
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
        <form className="row p-2 justify-content-centers" onSubmit={handleSubmit}>
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
            placeholderName={t("Payment Type")}
            id={"Centre"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={apiData.paymentModeData.map((item) => {
              return {
                label: item.PaymentMode,
                value: item.PaymentModeID,
              };
            })}
            name="paymentType"
            value={values.paymentType}
            handleChange={handleReactSelectChange}
            //    requiredClassName="required-fields"
            // handleChange={handleReactSelectChange}
          />
          <Input
            type="text"
            className="form-control"
            id="AppointmentNo"
            lable={t("UHID")}
            placeholder=" "
            required={true}
            respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
            name="UHID"
            value={values.UHID}
            onChange={handleChange}
          />
          <ReactSelect
            placeholderName={t("Type")}
            id={"Centre"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={[
              { label: "All", value: "0" },
              { label: "Advance", value: "1" },
              { label: "Balance", value: "2" },
            ]}
            name="type"
            value={values.type}
            handleChange={handleReactSelectChange}
            //    requiredClassName="required-fields"
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

          <div className="box-inner text-center">
            <button className="btn btn-sm btn-primary ml-2" type="submit">
              Report
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
