// // import React, { useEffect, useState } from "react";
// // import Heading from "../../../components/UI/Heading";
// // import Input from "../../../components/formComponent/Input";
// // import { useTranslation } from "react-i18next";
// // import DatePicker from "../../../components/formComponent/DatePicker";
// // import ReactSelect from "../../../components/formComponent/ReactSelect";
// // import MultiSelectComp from "../../../components/formComponent/MultiSelectComp";
// // import TimePicker from "../../../components/formComponent/TimePicker";
// // import { useFormik } from "formik";
// // import {
// //   getBindDetailUser,
// //   getBindTypeOfTnx,
// // } from "../../../networkServices/ReportsAPI";
// // import { useDispatch, useSelector } from "react-redux";
// // import moment from "moment";
// // import {
// //   GetBindAllDoctorConfirmation,
// //   getBindSpeciality,
// // } from "../../../store/reducers/common/CommonExportFunction";

// // const CollectionReport = () => {
// //   const { VITE_DATE_FORMAT } = import.meta.env;
// //   const [t] = useTranslation();
// //   const dispatch = useDispatch();
// //   const {
// //     GetEmployeeWiseCenter,
// //     GetBindAllDoctorConfirmationData,
// //     getBindSpecialityData,
// //   } = useSelector((state) => state.CommonSlice);
// //   // const  GetDoctorDeptList   = useSelector((state) => state.CommonSlice);
// //   // console.log(getBindSpecialityData);
// //   const [apiData, setApiData] = useState({
// //     getBindDetailsUSerData: [],
// //     getBindTypeOfTnxData: [],
// //   });
// //   const [multiselectState, setMultiSelectState] = useState({
// //     centreMulti: [],
// //     typeMulti: [],
// //     userMulti: [],
// //     doctorMulti: [],
// //     specialityMulti: [],
// //   });
// //   const [time, setTime] = useState({
// //     fromTime: "00:00:00",
// //     toTime: "11:59:00",
// //   });

// //   const initialValues = {
// //     centre: "",
// //     type: "",
// //     user: "",
// //     fromDate: moment().format("YYYY-MM-DD"),
// //     fromTime: time.fromTime,
// //     toDate: moment().format("YYYY-MM-DD"),
// //     toTime: time.toTime,
// //     batchNo: "",
// //     reportType: "",
// //     doctor: "",
// //     speciality: "",
// //     printType: "",
// //   };

// //   const { handleChange, values, setFieldValue, handleSubmit, resetForm } =
// //     useFormik({
// //       initialValues,
// //       enableReinitialize: true,
// //       onSubmit: (values) => {
// //         console.log(values);

// //         // Reset the form and state
// //         setMultiSelectState({
// //           centreMulti: [],
// //           typeMulti: [],
// //           userMulti: [],
// //           doctorMulti: [],
// //           specialityMulti: [],
// //         });
// //         setTime({ fromTime: "00:00:00", toTime: "11:59:00" });
// //         resetForm();
// //       },
// //     });
// //   console.log(values.reportType);
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const userData = await getBindDetailUser();
// //         const tnxData = await getBindTypeOfTnx();
// //         setApiData({
// //           getBindDetailsUSerData: userData.data,
// //           getBindTypeOfTnxData: tnxData.data,
// //         });
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };
// //     fetchData();
// //     // dispatch(
// //     //   GetBindAllDoctorConfirmation({
// //     //     Department: "All",
// //     //   })
// //     // );
// //     // dispatch(getBindSpeciality());

// //     // dispatch(
// //     //   GetBindAllDoctorConfirmation({
// //     //     Department: "All",
// //     //   })
// //     // )
// //   }, []);

// //   const handleMultiSelectChange = (name, selectedOptions) => {
// //     const selectedValues = selectedOptions.map((option) => option.code);
// //     const selectedNames = selectedOptions
// //       .map((option) => option.name)
// //       .join(", ");
// //     setFieldValue(name, selectedNames);
// //     setMultiSelectState((prev) => ({
// //       ...prev,
// //       [`${name}Multi`]: selectedValues,
// //     }));
// //   };

// //   const handleTimeChange = (e, timeType) => {
// //     const selectedTime = moment(e.target.value, "HH:mm:ss").format("HH:mm:ss");
// //     setTime((prev) => ({ ...prev, [timeType]: selectedTime }));
// //     setFieldValue(timeType, selectedTime);
// //   };
// //   const handleReactSelectChange = async (name, e) => {
// //     setFieldValue(name, e);
// //     console.log(e);
// //     switch (e.value) {
// //       case "7":
// //         try {
// //           dispatch(
// //             GetBindAllDoctorConfirmation({
// //               Department: "All",
// //             })
// //           );
// //         } catch (err) {
// //           console.error(err);
// //         }
// //         break;
// //       case "Speciality Wise":
// //         try {
// //           dispatch(getBindSpeciality());
// //         } catch (err) {
// //           console.error(err);
// //         }
// //         break;

// //       default:
// //         break;
// //     }
// //   };
// //   return (
// //     <div className="card patient_registration border">
// //       <Heading title={t("card patient_registration border")} isBreadcrumb />
// //       <form className="row p-2" onSubmit={handleSubmit}>
// //         <MultiSelectComp
// //           respclass="col-xl-2 col-md-4 col-sm-6 col-12"
// //           name="centre"
// //           placeholderName="Centre"
// //           dynamicOptions={GetEmployeeWiseCenter.map((item) => ({
// //             name: item.CentreName,
// //             code: item.CentreID,
// //           }))}
// //           handleChange={handleMultiSelectChange}
// //           value={multiselectState.centreMulti.map((code) => ({
// //             code,
// //             name: GetEmployeeWiseCenter.find((item) => item.CentreID === code)
// //               ?.CentreName,
// //           }))}
// //         />
// //         <MultiSelectComp
// //           respclass="col-xl-2 col-md-4 col-sm-6 col-12"
// //           name="type"
// //           placeholderName="Type"
// //           dynamicOptions={apiData.getBindTypeOfTnxData.map((item) => ({
// //             name: item.DisplayName,
// //             code: item.TypeOfTnx,
// //           }))}
// //           handleChange={handleMultiSelectChange}
// //           value={multiselectState.typeMulti.map((code) => ({
// //             code,
// //             name: apiData.getBindTypeOfTnxData.find(
// //               (item) => item.TypeOfTnx === code
// //             )?.DisplayName,
// //           }))}
// //         />
// //         <MultiSelectComp
// //           respclass="col-xl-2 col-md-4 col-sm-6 col-12"
// //           name="user"
// //           placeholderName="User"
// //           dynamicOptions={apiData.getBindDetailsUSerData.map((item) => ({
// //             name: item.Name,
// //             code: item.EmployeeID,
// //           }))}
// //           handleChange={handleMultiSelectChange}
// //           value={multiselectState.userMulti.map((code) => ({
// //             code,
// //             name: apiData.getBindDetailsUSerData.find(
// //               (item) => item.EmployeeID === code
// //             )?.Name,
// //           }))}
// //         />
// //         <DatePicker
// //           className="custom-calendar"
// //           respclass="col-xl-2 col-md-3 col-sm-4 col-12"
// //           id="fromDate"
// //           name="fromDate"
// //           lable={t("FrontOffice.OPD.Report.CollectionReport.fromDate")}
// //           placeholder={VITE_DATE_FORMAT}
// //           showTime
// //           hourFormat="12"
// //           value={
// //             values.fromDate
// //               ? moment(values.fromDate, "YYYY-MM-DD").toDate()
// //               : null
// //           }
// //           handleChange={handleChange}
// //         />
// //         <TimePicker
// //           placeholderName="From Time"
// //           respclass="col-xl-1 col-md-4 col-sm-6 col-12"
// //           // value={time.fromTime}
// //           lable="From Time"
// //           id="Fromtime"
// //           value={
// //             time.fromTime
// //               ? new Date(`1970-01-01T${time.fromTime}`)
// //               : new Date(`1970-01-01T00:00:00`)
// //           }
// //           handleChange={(e) => handleTimeChange(e, "fromTime")}
// //         />
// //         <DatePicker
// //           className="custom-calendar"
// //           respclass="col-xl-2 col-md-3 col-sm-4 col-12"
// //           id="toDate"
// //           name="toDate"
// //           lable={t("FrontOffice.OPD.Report.CollectionReport.toDate")}
// //           placeholder={VITE_DATE_FORMAT}
// //           showTime
// //           hourFormat="12"
// //           value={
// //             values.toDate ? moment(values.toDate, "YYYY-MM-DD").toDate() : null
// //           }
// //           handleChange={handleChange}
// //         />
// //         <TimePicker
// //           placeholderName="To Time"
// //           lable="To Time"
// //           id="toTime"
// //           respclass="col-xl-1 col-md-4 col-sm-6 col-12"
// //           name="toTime"
// //           // value={time.toTime}
// //           value={
// //             time.toTime
// //               ? new Date(`1970-01-01T${time.toTime}`)
// //               : new Date(`1970-01-01T00:00:00`)
// //           }
// //           handleChange={(e) => handleTimeChange(e, "toTime")}
// //         />
// //         <Input
// //           type="text"
// //           className="form-control required-fieldss"
// //           id="batchNo"
// //           name="batchNo"
// //           lable="Batch No."
// //           placeholder=" "
// //           respclass="col-xl-2 col-md-3 col-sm-4 col-12"
// //           onChange={handleChange}
// //           value={values.batchNo}
// //         />
// //         <ReactSelect
// //           placeholderName={t("Report Type")}
// //           id="reportType"
// //           searchable
// //           respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
// //           dynamicOptions={[
// //             { label: "Summarised", value: "0" },
// //             { label: "Detailed", value: "1" },
// //             { label: "Summarised Date Wise", value: "2" },
// //             { label: "Summarised Department Wise", value: "3" },
// //             { label: "IPD Collection", value: "4" },
// //             { label: "Collection PaymentMode wise", value: "5" },
// //             { label: "Collection(TOTAL)", value: "6" },
// //             { label: "Doctor Wise", value: "7" },
// //             { label: "Speciality Wise", value: "8" },
// //             { label: "Summarised Total", value: "9" },
// //           ]}
// //           value={values.reportType}
// //           name="reportType"
// //           handleChange={handleReactSelectChange}
// //         />

// //         {/* {GetBindAllDoctorConfirmationData.length > 0 && ( */}
// //         {values.reportType === "7" && (
// //           <MultiSelectComp
// //             respclass="col-xl-2 col-md-4 col-sm-6 col-12"
// //             name="doctor"
// //             placeholderName="Doctors"
// //             dynamicOptions={GetBindAllDoctorConfirmationData.map((item) => ({
// //               name: item.Name,
// //               code: item.DoctorID,
// //             }))}
// //             handleChange={handleMultiSelectChange}
// //             value={multiselectState.doctorMulti.map((code) => ({
// //               code,
// //               name: GetBindAllDoctorConfirmationData.find(
// //                 (item) => item.DoctorID === code
// //               )?.Name,
// //             }))}
// //           />
// //         )}

// //         {/* )} */}
// //         {/* {values.reportType === "8" && ( */}
// //         {getBindSpecialityData.length > 0 && (
// //           <MultiSelectComp
// //             respclass="col-xl-2 col-md-4 col-sm-6 col-12"
// //             name="speciality"
// //             placeholderName="Speciality"
// //             dynamicOptions={getBindSpecialityData.map((item) => ({
// //               name: item.Name,
// //               code: item.ID,
// //             }))}
// //             handleChange={handleMultiSelectChange}
// //             value={multiselectState.specialityMulti.map((code) => ({
// //               code,
// //               name: getBindSpecialityData.find((item) => item.ID === code)
// //                 ?.Name,
// //             }))}
// //           />
// //         )}

// //         {/* )} */}
// //         <ReactSelect
// //           placeholderName={t("Print Type")}
// //           id="printType"
// //           searchable
// //           respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
// //           dynamicOptions={[
// //             { label: "Excel", value: "0" },
// //             { label: "PDF", value: "1" },
// //             { label: "Word", value: "2" },
// //           ]}
// //           name="printType"
// //           handleChange={handleReactSelectChange}
// //           value={values.printType}
// //         />
// //         <div className="box-inner ">
// //           <button className="btn btn-sm btn-primary ml-2" type="submit">
// //             Report
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CollectionReport;



// import React, { useEffect, useState } from "react";
// import Heading from "../../../components/UI/Heading";
// import Input from "../../../components/formComponent/Input";
// import { useTranslation } from "react-i18next";
// import DatePicker from "../../../components/formComponent/DatePicker";
// import ReactSelect from "../../../components/formComponent/ReactSelect";
// import MultiSelectComp from "../../../components/formComponent/MultiSelectComp";
// import TimePicker from "../../../components/formComponent/TimePicker";
// import { useFormik } from "formik";
// import {
//   getBindDetailUser,
//   getBindTypeOfTnx,
// } from "../../../networkServices/ReportsAPI";
// import { useDispatch, useSelector } from "react-redux";
// import moment from "moment";
// import {
//   GetBindAllDoctorConfirmation,
//   getBindSpeciality,
// } from "../../../store/reducers/common/CommonExportFunction";

// const CollectionReport = () => {
//   const { VITE_DATE_FORMAT } = import.meta.env;
//   const [t] = useTranslation();
//   const dispatch = useDispatch();
//   const {
//     GetEmployeeWiseCenter,
//     GetBindAllDoctorConfirmationData,
//     getBindSpecialityData,
//   } = useSelector((state) => state.CommonSlice);

//   const [apiData, setApiData] = useState({
//     getBindDetailsUSerData: [],
//     getBindTypeOfTnxData: [],
//   });

//   const [multiselectState, setMultiSelectState] = useState({
//     centreMulti: [],
//     typeMulti: [],
//     userMulti: [],
//     doctorMulti: [],
//     specialityMulti: [],
//   });

//   const [time, setTime] = useState({
//     fromTime: "00:00:00",
//     toTime: "11:59:00",
//   });

//   const initialValues = {
//     centre: "",
//     type: "",
//     user: "",
//     fromDate: moment().format("YYYY-MM-DD"),
//     fromTime: time.fromTime,
//     toDate: moment().format("YYYY-MM-DD"),
//     toTime: time.toTime,
//     batchNo: "",
//     reportType: "",
//     doctor: "",
//     speciality: "",
//     printType: "",
//   };

//   const { handleChange, values, setFieldValue, handleSubmit, resetForm } =
//     useFormik({
//       initialValues,
//       enableReinitialize: true,
//       onSubmit: (values) => {
//         console.log(values);
//         setMultiSelectState({
//           centreMulti: [],
//           typeMulti: [],
//           userMulti: [],
//           doctorMulti: [],
//           specialityMulti: [],
//         });
//         setTime({ fromTime: "00:00:00", toTime: "11:59:00" });
//         resetForm();
//       },
//     });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userData = await getBindDetailUser();
//         const tnxData = await getBindTypeOfTnx();
//         setApiData({
//           getBindDetailsUSerData: userData.data,
//           getBindTypeOfTnxData: tnxData.data,
//         });
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (values.reportType === "7") {
//       dispatch(GetBindAllDoctorConfirmation({ Department: "All" }));
//     } else if (values.reportType === "8") {
//       dispatch(getBindSpeciality());
//     }
//   }, [values.reportType, dispatch]);

//   const handleMultiSelectChange = (name, selectedOptions) => {
//     const selectedValues = selectedOptions.map((option) => option.code);
//     const selectedNames = selectedOptions.map((option) => option.name).join(", ");
//     setFieldValue(name, selectedNames);
//     setMultiSelectState((prev) => ({
//       ...prev,
//       [`${name}Multi`]: selectedValues,
//     }));
//   };

//   const handleTimeChange = (e, timeType) => {
//     const selectedTime = moment(e.target.value, "HH:mm:ss").format("HH:mm:ss");
//     setTime((prev) => ({ ...prev, [timeType]: selectedTime }));
//     setFieldValue(timeType, selectedTime);
//   };

//   const handleReactSelectChange = (name, e) => {
//     setFieldValue(name, e.value);
//     console.log(e);
//   };

//   return (
//     <div className="card patient_registration border">
//       <Heading title={t("card patient_registration border")} isBreadcrumb />
//       <form className="row p-2" onSubmit={handleSubmit}>
//         <MultiSelectComp
//           respclass="col-xl-2 col-md-4 col-sm-6 col-12"
//           name="centre"
//           placeholderName="Centre"
//           dynamicOptions={GetEmployeeWiseCenter.map((item) => ({
//             name: item.CentreName,
//             code: item.CentreID,
//           }))}
//           handleChange={handleMultiSelectChange}
//           value={multiselectState.centreMulti.map((code) => ({
//             code,
//             name: GetEmployeeWiseCenter.find((item) => item.CentreID === code)?.CentreName,
//           }))}
//         />
//         <MultiSelectComp
//           respclass="col-xl-2 col-md-4 col-sm-6 col-12"
//           name="type"
//           placeholderName="Type"
//           dynamicOptions={apiData.getBindTypeOfTnxData.map((item) => ({
//             name: item.DisplayName,
//             code: item.TypeOfTnx,
//           }))}
//           handleChange={handleMultiSelectChange}
//           value={multiselectState.typeMulti.map((code) => ({
//             code,
//             name: apiData.getBindTypeOfTnxData.find((item) => item.TypeOfTnx === code)?.DisplayName,
//           }))}
//         />
//         <MultiSelectComp
//           respclass="col-xl-2 col-md-4 col-sm-6 col-12"
//           name="user"
//           placeholderName="User"
//           dynamicOptions={apiData.getBindDetailsUSerData.map((item) => ({
//             name: item.Name,
//             code: item.EmployeeID,
//           }))}
//           handleChange={handleMultiSelectChange}
//           value={multiselectState.userMulti.map((code) => ({
//             code,
//             name: apiData.getBindDetailsUSerData.find((item) => item.EmployeeID === code)?.Name,
//           }))}
//         />
//         <DatePicker
//           className="custom-calendar"
//           respclass="col-xl-2 col-md-3 col-sm-4 col-12"
//           id="fromDate"
//           name="fromDate"
//           lable={t("FrontOffice.OPD.Report.CollectionReport.fromDate")}
//           placeholder={VITE_DATE_FORMAT}
//           showTime
//           hourFormat="12"
//           value={values.fromDate ? moment(values.fromDate, "YYYY-MM-DD").toDate() : null}
//           handleChange={handleChange}
//         />
//         <TimePicker
//           placeholderName="From Time"
//           respclass="col-xl-1 col-md-4 col-sm-6 col-12"
//           lable="From Time"
//           id="Fromtime"
//           value={time.fromTime ? new Date(`1970-01-01T${time.fromTime}`) : new Date(`1970-01-01T00:00:00`)}
//           handleChange={(e) => handleTimeChange(e, "fromTime")}
//         />
//         <DatePicker
//           className="custom-calendar"
//           respclass="col-xl-2 col-md-3 col-sm-4 col-12"
//           id="toDate"
//           name="toDate"
//           lable={t("FrontOffice.OPD.Report.CollectionReport.toDate")}
//           placeholder={VITE_DATE_FORMAT}
//           showTime
//           hourFormat="12"
//           value={values.toDate ? moment(values.toDate, "YYYY-MM-DD").toDate() : null}
//           handleChange={handleChange}
//         />
//         <TimePicker
//           placeholderName="To Time"
//           lable="To Time"
//           id="toTime"
//           respclass="col-xl-1 col-md-4 col-sm-6 col-12"
//           name="toTime"
//           value={time.toTime ? new Date(`1970-01-01T${time.toTime}`) : new Date(`1970-01-01T00:00:00`)}
//           handleChange={(e) => handleTimeChange(e, "toTime")}
//         />
//         <Input
//           type="text"
//           className="form-control required-fieldss"
//           id="batchNo"
//           name="batchNo"
//           lable="Batch No."
//           placeholder=" "
//           respclass="col-xl-2 col-md-3 col-sm-4 col-12"
//           onChange={handleChange}
//           value={values.batchNo}
//         />
//         <ReactSelect
//           placeholderName={t("Report Type")}
//           id="reportType"
//           searchable
//           respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
//           dynamicOptions={[
//             { label: "Summarised", value: "0" },
//             { label: "Detailed", value: "1" },
//             { label: "Summarised Date Wise", value: "2" },
//             { label: "Summarised Department Wise", value: "3" },
//             { label: "IPD Collection", value: "4" },
//             { label: "Collection PaymentMode wise", value: "5" },
//             { label: "Collection(TOTAL)", value: "6" },
//             { label: "Doctor Wise", value: "7" },
//             { label: "Speciality Wise", value: "8" },
//             { label: "Summarised Total", value: "9" },
//           ]}
//           value={values.reportType}
//           name="reportType"
//           handleChange={handleReactSelectChange}
//         />
//         {values.reportType === "7" && (
//           <MultiSelectComp
//             respclass="col-xl-2 col-md-4 col-sm-6 col-12"
//             name="doctor"
//             placeholderName="Doctors"
//             dynamicOptions={GetBindAllDoctorConfirmationData.map((item) => ({
//               name: item.Name,
//               code: item.DoctorID,
//             }))}
//             handleChange={handleMultiSelectChange}
//             value={multiselectState.doctorMulti.map((code) => ({
//               code,
//               name: GetBindAllDoctorConfirmationData.find((item) => item.DoctorID === code)?.Name,
//             }))}
//           />
//         )}
//         {values.reportType === "8" && (
//           <MultiSelectComp
//             respclass="col-xl-2 col-md-4 col-sm-6 col-12"
//             name="speciality"
//             placeholderName="Speciality"
//             dynamicOptions={getBindSpecialityData.map((item) => ({
//               name: item.Name,
//               code: item.ID,
//             }))}
//             handleChange={handleMultiSelectChange}
//             value={multiselectState.specialityMulti.map((code) => ({
//               code,
//               name: getBindSpecialityData.find((item) => item.ID === code)?.Name,
//             }))}
//           />
//         )}
//         <ReactSelect
//           placeholderName={t("Print Type")}
//           id="printType"
//           searchable
//           respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
//           dynamicOptions={[
//             { label: "Excel", value: "0" },
//             { label: "PDF", value: "1" },
//             { label: "Word", value: "2" },
//           ]}
//           name="printType"
//           handleChange={handleReactSelectChange}
//           value={values.printType}
//         />
//         <div className="box-inner ">
//           <button className="btn btn-sm btn-primary ml-2" type="submit">
//             Report
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CollectionReport;


import React, { useEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import Input from "../../../components/formComponent/Input";
import { useTranslation } from "react-i18next";
import DatePicker from "../../../components/formComponent/DatePicker";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import MultiSelectComp from "../../../components/formComponent/MultiSelectComp";
import TimePicker from "../../../components/formComponent/TimePicker";
import { useFormik } from "formik";
import {
  getBindDetailUser,
  getBindTypeOfTnx,
} from "../../../networkServices/ReportsAPI";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  GetBindAllDoctorConfirmation,
  getBindSpeciality,
} from "../../../store/reducers/common/CommonExportFunction";
import { print_Type } from "../../../utils/constant";

const CollectionReport = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const {
    GetEmployeeWiseCenter,
    GetBindAllDoctorConfirmationData,
    getBindSpecialityData,
  } = useSelector((state) => state.CommonSlice);

  const [apiData, setApiData] = useState({
    getBindDetailsUSerData: [],
    getBindTypeOfTnxData: [],
  });

  const [multiselectState, setMultiSelectState] = useState({
    centreMulti: [],
    typeMulti: [],
    userMulti: [],
    doctorMulti: [],
    specialityMulti: [],
  });

  const [time, setTime] = useState({
    fromTime: "00:00:00",
    toTime: "11:59:00",
  });

  const initialValues = {
    centre: "",
    type: "",
    user: "",
    fromDate: moment().format("YYYY-MM-DD"),
    fromTime: time.fromTime,
    toDate: moment().format("YYYY-MM-DD"),
    toTime: time.toTime,
    batchNo: "",
    reportType: "",
    doctor: "",
    speciality: "",
    printType: "",
  };

  const { handleChange, values, setFieldValue, handleSubmit, resetForm } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        console.log(values);
        setMultiSelectState({
          centreMulti: [],
          typeMulti: [],
          userMulti: [],
          doctorMulti: [],
          specialityMulti: [],
        });
        setTime({ fromTime: "00:00:00", toTime: "11:59:00" });
        resetForm();
      },
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getBindDetailUser();
        const tnxData = await getBindTypeOfTnx();
        setApiData({
          getBindDetailsUSerData: userData.data,
          getBindTypeOfTnxData: tnxData.data,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (values.reportType === "7") {
      dispatch(GetBindAllDoctorConfirmation({ Department: "All" }));
      setMultiSelectState((prev)=> ({...prev, specialityMulti:[]}))
    } else if (values.reportType === "8") {
      dispatch(getBindSpeciality());
      setMultiSelectState((prev)=> ({...prev, doctorMulti:[]}))
    }
  }, [values.reportType, dispatch]);

  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    const selectedNames = selectedOptions.map((option) => option.name).join(", ");
    setFieldValue(name, selectedNames);
    setMultiSelectState((prev) => ({
      ...prev,
      [`${name}Multi`]: selectedValues,
    }));
  };

  const handleTimeChange = (e, timeType) => {
    const selectedTime = moment(e.target.value, "HH:mm:ss").format("HH:mm:ss");
    setTime((prev) => ({ ...prev, [timeType]: selectedTime }));
    setFieldValue(timeType, selectedTime);
  };

  const handleReactSelectChange = (name, e) => {
    setFieldValue(name, e.value);
    console.log(e);
  };

  return (
    <div className="card patient_registration border">
      <Heading title={t("card patient_registration border")} isBreadcrumb />
      <form className="row p-2" onSubmit={handleSubmit}>
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
            name: GetEmployeeWiseCenter.find((item) => item.CentreID === code)?.CentreName,
          }))}
        />
        <MultiSelectComp
          respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          name="type"
          placeholderName="Type"
          dynamicOptions={apiData.getBindTypeOfTnxData.map((item) => ({
            name: item.DisplayName,
            code: item.TypeOfTnx,
          }))}
          handleChange={handleMultiSelectChange}
          value={multiselectState.typeMulti.map((code) => ({
            code,
            name: apiData.getBindTypeOfTnxData.find((item) => item.TypeOfTnx === code)?.DisplayName,
          }))}
        />
        <MultiSelectComp
          respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          name="user"
          placeholderName="User"
          dynamicOptions={apiData.getBindDetailsUSerData.map((item) => ({
            name: item.Name,
            code: item.EmployeeID,
          }))}
          handleChange={handleMultiSelectChange}
          value={multiselectState.userMulti.map((code) => ({
            code,
            name: apiData.getBindDetailsUSerData.find((item) => item.EmployeeID === code)?.Name,
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
          value={values.fromDate ? moment(values.fromDate, "YYYY-MM-DD").toDate() : null}
          handleChange={handleChange}
        />
        <TimePicker
          placeholderName="From Time"
          respclass="col-xl-1 col-md-4 col-sm-12 col-xs-12"
          lable="From Time"
          id="Fromtime"
          value={time.fromTime ? new Date(`1970-01-01T${time.fromTime}`) : new Date(`1970-01-01T00:00:00`)}
          handleChange={(e) => handleTimeChange(e, "fromTime")}
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
          value={values.toDate ? moment(values.toDate, "YYYY-MM-DD").toDate() : null}
          handleChange={handleChange}
        />
        <TimePicker
          placeholderName="To Time"
          lable="To Time"
          id="toTime"
          respclass="col-xl-1 col-md-4 col-sm-6 col-12"
          name="toTime"
          value={time.toTime ? new Date(`1970-01-01T${time.toTime}`) : new Date(`1970-01-01T00:00:00`)}
          handleChange={(e) => handleTimeChange(e, "toTime")}
        />
        <Input
          type="text"
          className="form-control required-fieldss"
          id="batchNo"
          name="batchNo"
          lable="Batch No."
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          onChange={handleChange}
          value={values.batchNo}
        />
        <ReactSelect
          placeholderName={t("Report Type")}
          id="reportType"
          searchable
          respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
          dynamicOptions={[
            { label: "Summarised", value: "0" },
            { label: "Detailed", value: "1" },
            { label: "Summarised Date Wise", value: "2" },
            { label: "Summarised Department Wise", value: "3" },
            { label: "IPD Collection", value: "4" },
            { label: "Collection PaymentMode wise", value: "5" },
            { label: "Collection(TOTAL)", value: "6" },
            { label: "Doctor Wise", value: "7" },
            { label: "Speciality Wise", value: "8" },
            { label: "Summarised Total", value: "9" },
          ]}
          value={values.reportType}
          name="reportType"
          handleChange={handleReactSelectChange}
        />
        {values.reportType === "7" && (
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="doctor"
            placeholderName="Doctors"
            dynamicOptions={GetBindAllDoctorConfirmationData.map((item) => ({
              name: item.Name,
              code: item.DoctorID,
            }))}
            handleChange={handleMultiSelectChange}
            value={multiselectState.doctorMulti.map((code) => ({
              code,
              name: GetBindAllDoctorConfirmationData.find((item) => item.DoctorID === code)?.Name,
            }))}
          />
        )}
        {values.reportType === "8" && (
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="speciality"
            placeholderName="Speciality"
            dynamicOptions={getBindSpecialityData.map((item) => ({
              name: item.Name,
              code: item.ID,
            }))}
            handleChange={handleMultiSelectChange}
            value={multiselectState.specialityMulti.map((code) => ({
              code,
              name: getBindSpecialityData.find((item) => item.ID === code)?.Name,
            }))}
          />
        )}
        <ReactSelect
          placeholderName={t("Print Type")}
          id="printType"
          searchable
          respclass="col-xl-2 col-md-2 colt-sm-6 col-12"
          dynamicOptions={print_Type.map((item,index)=>{
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
  );
};

export default CollectionReport;
