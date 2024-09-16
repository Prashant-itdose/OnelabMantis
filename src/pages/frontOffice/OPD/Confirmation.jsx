import React, { useEffect, useState } from "react";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import Heading from "../../../components/UI/Heading";
import OPDConfirmation from "../../../components/front-office/Confirmation/OPDConfirmation";
import OPDConfirmationTable from "../../../components/UI/customTable/ConfirmationTable/OPDConfirmationTable";
import OPDRadiology from "../../../components/front-office/Confirmation/OPDRadiology";
import { useDispatch } from "react-redux";
import {
  GetBindAllDoctorConfirmation,
  GetBindDepartment,
  GetBindSubCatgeory,
} from "../../../store/reducers/common/CommonExportFunction";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { useFormik } from "formik";
import {
  getAppointmentDetailAPIData,
  GetPatientDoctorAppointmentDetails,
  getRadiologyAppointmentDetail,
} from "../../../networkServices/OPDConfirmation";
import RadiologyConfirmationTable from "../../../components/UI/customTable/ConfirmationTable/RadiologyConfirmationTable";
import {
  OPDCONFIRMATIONSTATE,
  RADIOLOGYCONFIRMATIONSTATE,
} from "../../../utils/constant";
import OPDServiceBooking from "./OPDServiceBooking";
import Modal from "../../../components/modalComponent/Modal";

const Confirmation = () => {
  const [t] = useTranslation();
  const localData = useLocalStorage("userData", "get");
  const dispatch = useDispatch();
  const [selectOPDRadio, setSelectOPDRadio] = useState("OPD");
  const [OPDServiceModal, setOPDServiceModal] = useState({
    ConfirmationData: {},
    isShow: false,
  });
  const [apiData, setApiData] = useState({
    getAppointmentDetailData: [],
    getRadiologyAppointmentDetailApiData: [],
  });

  const THEAD = [
    "#",
    "App. No.",
    "Patient Name	",
    "UHID",
    "Age",
    "ContactNo	",
    "Relative",
    "Doctor Name	",
    "Patient Type	",
    "Purpose of Visit	",
    "App. Time	",
    "App. Date	",
    "Actions",
  ];
  const RadioLogyTHEAD = [
    "S.No",
    "UHID",
    "Lab No	",
    "Patient Name	",
    "Age",
    "ContactNo	",
    "Department",
    "Test Name	",
    "TokenNo",
    "Room",
    "App. Date",
    "App. Time	",
    "BookingFrom",
    "Select",
  ];

  // model open and set data
  const handleModel = (
    label,
    width,
    type,
    isOpen,
    Component,
    handleInsertAPI,
    extrabutton
  ) => {
    setHandleModelData({
      label: label,
      width: width,
      type: type,
      isOpen: isOpen,
      Component: Component, // yeh component hai
      handleInsertAPI: handleInsertAPI, // yaha se API
      extrabutton: extrabutton ? extrabutton : <></>, // yeh extra button  hai
    });
  };

  // change the Path OPD and RadioLogy
  const handleReactSelectAppointmentChange = (name, e) => {
    setSelectOPDRadio(e.value);
  };

  const {
    handleChange,
    values,
    setFieldValue,
    setValues,
    handleSubmit,
    errors,
    touched,
    validateForm,
    resetForm,
  } = useFormik({
    initialValues:
      selectOPDRadio === "OPD"
        ? OPDCONFIRMATIONSTATE
        : RADIOLOGYCONFIRMATIONSTATE,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (selectOPDRadio === "OPD") {
        const OPDValues = {
          ...values,
          doctorID: String(values?.doctorID.value || ""),
          fromDate: values.fromDate,
          toDate: values.toDate,
          appointmentNo: values?.appointmentNo,
          isConform: "",
          visitType: values?.visitType.value || "All",
          status: values.status.value || "All",
          doctorDepartmentID: String(values?.doctorDepartmentID?.value || "0") ,
          pname: values?.pname,
        };
        try {
          const dataRes = await getAppointmentDetailAPIData(OPDValues);
          setApiData((prevState) => ({
            ...prevState,
            getAppointmentDetailData: dataRes.data,
          }));
        } catch (error) {
          console.error(error);
        }
      } else {
        const RadioValues = {
          ...values,
          fromDate: values.fromDate,
          toDate: values.toDate,
          uhid: values?.uhid,
          pName: values?.pName,
          mobile: values?.mobile,
          subCategoryID: values?.subCategoryID?.value,
          labNo: values?.labNo,
          tokenNo: values?.tokenNo,
          isConform: "",
          status: values.status,
        };
        try {
          const dataRes = await getRadiologyAppointmentDetail(RadioValues);
          setApiData((prevState) => ({
            ...prevState,
            getRadiologyAppointmentDetailApiData: dataRes.data,
          }));
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  // Department Get API Call Doctor
  const handleReactSelectChange = async (name, e) => {
    setFieldValue(name, e);
    switch (name) {
      case "doctorDepartmentID":
        return (
          dispatch(
            GetBindAllDoctorConfirmation({
              Department: e.label,
              CentreID: localData?.centreID,
            })
          ),
          "doctorDepartmentID"
        );
      default:
        break;
    }
  };

  const handleOpenOPDServiceBooking = async (UHID, appointmentID) => {
    console.log(appointmentID);

    try {
      const data = await GetPatientDoctorAppointmentDetails(appointmentID);
      console.log(data);
      setOPDServiceModal({
        ConfirmationData: {
          UHID,
          TestData: [data?.data],
        },
        isShow: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(
      GetBindAllDoctorConfirmation({
        Department: "All",
        CentreID: localData?.centreID,
      })
    );
    dispatch(GetBindDepartment());
    dispatch(
      GetBindSubCatgeory({
        Type: "1",
        CategoryID: "7",
      })
    );
  }, [dispatch]);

  const tableLogic = (params) => {
    switch (params) {
      case "OPD":
        return (
          <OPDConfirmationTable
            THEAD={THEAD}
            tbody={apiData?.getAppointmentDetailData}
            handleModel={handleModel}
            handleClickDataGetAPI={handleSubmit}
            handleOpenOPDServiceBooking={handleOpenOPDServiceBooking}
          />
        );
      case "Radiology":
        return (
          <RadiologyConfirmationTable
            THEAD={RadioLogyTHEAD}
            tbody={apiData?.getRadiologyAppointmentDetailApiData}
            handleModel={handleModel}
          />
        );
      default:
        break;
    }
  };

  const formComponentReder = (params) => {
    switch (params) {
      case "OPD":
        return (
          <OPDConfirmation
            searchHandleChange={handleChange}
            searchData={values}
            // setSearchData={setSearchData}
            handleReactSelectChange={handleReactSelectChange}
            handleClickDataGetAPI={handleSubmit}
          />
        );

      case "Radiology":
        return (
          <OPDRadiology
            values={values}
            searchHandleChange={handleChange}
            handleReactSelectChange={handleReactSelectChange}
            handleClickDataGetAPI={handleSubmit}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
     
        <>
          <div className="card patient_registration border">
            <Heading
              title={t("FrontOffice.OPD.Confirmation.label.Confirmation")}
              isBreadcrumb={true}
            />
            <div className="row g-4 m-2">
              <ReactSelect
                placeholderName={"Appointment"}
                id={"Title"}
                searchable={true}
                name={"OPDANDRADIOLOGY"}
                respclass="col-xl-2 col-md-4 col-sm-4 col-sm-4 col-12"
                dynamicOptions={[
                  { label: "OPD", value: "OPD" },
                  { label: "Radiology", value: "Radiology" },
                ]}
                handleChange={handleReactSelectAppointmentChange}
                value={selectOPDRadio}
              />
              {formComponentReder(selectOPDRadio)}
            </div>
          </div>
          <div className="card patient_registration border">
            <div className="row " style={{ padding: "6px 10px  6px 10px" }}>
              <div
                className="col-sm-2 d-flex align-items-center "
                onClick={handleSubmit}
                style={{ gap: "10px" }}
              >
                <div className="statusConfirmed"></div>
                <label className="text-dark m-0 ">
                  {t("FrontOffice.OPD.Confirmation.label.Confirmed")}
                </label>
              </div>
              <div
                className="col-sm-2 d-flex align-items-center"
                onClick={handleSubmit}
                style={{ gap: "10px" }}
              >
                <div className="statusRescheduled"></div>
                <label className="text-dark m-0">
                  {t("FrontOffice.OPD.Confirmation.label.Rescheduled")}
                </label>
              </div>
              <div
                className="col-sm-2 d-flex align-items-center "
                onClick={handleSubmit}
                style={{ gap: "10px" }}
              >
                <div className="statusPending"></div>
                <label className="text-dark m-0">
                  {t("FrontOffice.OPD.Confirmation.label.Pending")}
                </label>
              </div>
              <div
                className="col-sm-2 d-flex align-items-center "
                onClick={handleSubmit}
                style={{ gap: "10px" }}
              >
                <div className="statusAppointment"></div>
                <label className="text-dark m-0">
                  {t("FrontOffice.OPD.Confirmation.label.Apt_Time_Expired")}
                </label>
              </div>
              <div
                className="col-sm-2 d-flex align-items-center "
                onClick={handleSubmit}
                style={{ gap: "10px" }}
              >
                <div className="statusCanceled"></div>
                <label className="text-dark m-0">
                  {t("FrontOffice.OPD.Confirmation.label.Canceled")}
                </label>
              </div>
              <div
                className="col-sm-2 d-flex align-items-center "
                onClick={handleSubmit}
                style={{ gap: "10px" }}
              >
                <div className="statusUnregistered"></div>
                <label className="text-dark m-0">
                  {t("FrontOffice.OPD.Confirmation.label.Unregistered")}
                </label>
              </div>
            </div>
          </div>

          <div className="card patient_registration_card my-1 mt-2">
            {tableLogic(selectOPDRadio)}
          </div>
        </>
   
      {OPDServiceModal.isShow && (
        <Modal
          visible={OPDServiceModal}
          setVisible={setOPDServiceModal}
          modalWidth="95vw"
          Header="OPD Service Booking"
          footer={<></>}
        >
         <OPDServiceBooking
            UHID={OPDServiceModal?.ConfirmationData?.UHID}
            TestData={OPDServiceModal?.ConfirmationData?.TestData}
          />
         
        </Modal>
      )}
    </>
  );
};

export default Confirmation;
