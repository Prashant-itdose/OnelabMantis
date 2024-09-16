import React, { useState } from "react";
import Input from "@app/components/formComponent/Input";
import { useTranslation } from "react-i18next";
import { Tabfunctionality } from "../../../utils/helpers";
import Tables from "../../../components/UI/customTable";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import LabeledInput from "../../../components/formComponent/LabeledInput";
import Heading from "../../../components/UI/Heading";
import VitalExaminationModal from "../../../components/modalComponent/Utils/VitalExaminationModal";
import Modal from "../../../components/modalComponent/Modal";
import DatePicker from "../../../components/formComponent/DatePicker";

const ExaminationRoom = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [handleModelData, setHandleModelData] = useState({});
  const [bodyData, setBodyData] = useState([
    {
      "#": 1,

      "Patient Name": 1,
      "IPD No": 1,
      Panel: 1,
      Address: 1,

      Check: (
        <>
          <i
            onClick={() =>
              handleModel(
                "FrontOffice.Tools.label.Manage_Debit_Credit_Note",
                "90vw",
                "Manage_Debit_Credit_Note",
                true,
                <VitalExaminationModal />
              )
            }
            className="fa fa-check"
            aria-hidden="true"
          ></i>
        </>
      ),
    },
  ]);

  const handleModel = (label, width, type, isOpen, Component) => {
    setHandleModelData({
      label: label,
      width: width,
      type: type,
      isOpen: isOpen,
      Component: Component,
    });
  };

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };

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
      {handleModelData?.isOpen && (
        <Modal
          visible={handleModelData?.isOpen}
          setVisible={setIsOpen}
          modalWidth={handleModelData?.width}
          Header={t(handleModelData?.label)}
        >
          {handleModelData?.Component}
        </Modal>
      )}
      <div className="m-2 spatient_registration_card">
        <form className="card patient_registration">
          <Heading
            title={t("FrontOffice.Tools.label.Manage_Debit_Credit_Note")}
            isBreadcrumb={true}
          />
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1 p-2">
            {/* <DatePicker
              className="custom-calendar"
              id="DOB"
              name="fromDate"
              lable={"From Date"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
            />
            <DatePicker
              className="custom-calendar"
              id="DOB"
              name="toDate"
              lable={"To Date"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
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
            />*/}
            <Input
              type="text"
              className="form-control"
              id="UHID"
              name="UHID"
              lable={t("FrontOffice.Tools.label.UHID")}
              placeholder=" "
              required={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
              onKeyDown={Tabfunctionality}
            />
            <Input
              type="text"
              className="form-control"
              id="IPDNO"
              name="IPDNO"
              lable={t("FrontOffice.Tools.label.IPD_NO")}
              placeholder=" "
              required={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
              onKeyDown={Tabfunctionality}
            />
            <Input
              type="text"
              className="form-control"
              id="PatientName"
              name="PatientName"
              lable={t("FrontOffice.Tools.label.Patient_Name")}
              placeholder=" "
              required={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
              onKeyDown={Tabfunctionality}
            />
            <Input
              type="text"
              className="form-control"
              id="BillNo"
              name="BillNo"
              lable={t("FrontOffice.Tools.label.Bill_No")}
              placeholder=" "
              required={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
              onKeyDown={Tabfunctionality}
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
            />
            <DatePicker
              className="custom-calendar"
              id="DOB"
              name="fromDate"
              lable={"From Date"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
            />
            <DatePicker
              className="custom-calendar"
              id="DOB"
              name="toDate"
              lable={"To Date"}
              placeholder={VITE_DATE_FORMAT}
              respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
            /> 
            <div className=" col-sm-2 col-xl-2">
              <button className="btn btn-sm btn-success">
                {t("FrontOffice.Tools.label.Search")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExaminationRoom;
