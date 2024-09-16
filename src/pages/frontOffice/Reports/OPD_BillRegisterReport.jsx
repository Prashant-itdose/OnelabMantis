import React, { useEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import Input from "../../../components/formComponent/Input";
import { useTranslation } from "react-i18next";
import DatePicker from "../../../components/formComponent/DatePicker";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import moment from "moment";
import MultiSelectComp from "../../../components/formComponent/MultiSelectComp";
import { useDispatch, useSelector } from "react-redux";
import { getBindPanelList } from "../../../store/reducers/common/CommonExportFunction";
import { useFormik } from "formik";
import { print_Type } from "../../../utils/constant";

export default function OPD_BillRegisterReport() {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const dispatch = useDispatch();
  const { GetEmployeeWiseCenter, getBindPanelListData } = useSelector(
    (state) => state.CommonSlice
  );
  const [t] = useTranslation();
  const [multiselectState, setMultiSelectState] = useState({
    centreMulti: [],
    panelMulti: [],
  });
  const [apiData, setApiData] = useState({
    paymentModeData: [],
    getBindTypeOfTnxData: [],
  });

  const initialValues = {
    centre: "",
    groupBy: "",
    panel: "",
    type: "",
    UHID: "",
    billNo: "",
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
          typeMulti: [],
          userMulti: [],
          doctorMulti: [],
          specialityMulti: [],
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
    // dispatch(getBindPanelList({
    //   PanelGroup:"ALL"
    // }))
  }, []);

  return (
    <>
      <div className="card patient_registration border">
        <Heading
          title={t("card patient_registration border")}
          isBreadcrumb={true}
        />
        <form className="row  p-2 " onSubmit={handleSubmit}>
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
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="panel"
            placeholderName="Panel"
            dynamicOptions={getBindPanelListData?.map((item) => ({
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
            placeholderName={t("Group By")}
            id={"Group"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={[
              { label: "Bill Wise", value: "0" },
              { label: "Category Wise", value: "1" },
              { label: "Sub Category Wise", value: "2" },
              { label: "Item Wise", value: "2" },
            ]}
            name="groupBy"
            value={values.groupBy}
            handleChange={handleReactSelectChange}
          />

          <ReactSelect
            placeholderName={t(" Type")}
            id={"Report"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={[
              { label: "All", value: "0" },
              { label: "Only Outstanding", value: "1" },
            ]}
            name="type"
            value={values.type}
            handleChange={handleReactSelectChange}
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
          <Input
            type="text"
            className="form-control"
            id="BillNo"
            lable={t("Bill No.")}
            placeholder=" "
            required={true}
            respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
            name="billNo"
            value={values.billNo}
            onChange={handleChange}
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
              values.toDate
                ? moment(values.toDate, "YYYY-MM-DD").toDate()
                : null
            }
            handleChange={handleChange}
          />

          <ReactSelect
            placeholderName={t("Print Type")}
            id={"Centre"}
            searchable={true}
            respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
            dynamicOptions={print_Type.map((item,index)=>{
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
