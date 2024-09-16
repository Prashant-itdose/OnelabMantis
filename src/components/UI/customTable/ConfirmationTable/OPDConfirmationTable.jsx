import React, { useEffect, useState } from "react";
import Tables from "..";
import SlotModal from "../../../modalComponent/Utils/SlotModal";
import Modal from "../../../modalComponent/Modal";
import { Tooltip } from "primereact/tooltip";
import moment from "moment";
import Confirm from "../../../modalComponent/Confirm";
import { Button } from "primereact/button";
import {
  bindAppointmentDetail,
  getAppointmentDetailAPIData,
  updateAppointmentSchedule,
  UpdateAppointmentStatus,
} from "../../../../networkServices/OPDConfirmation";
import { notify } from "../../../../utils/utils";
import { OPDCONFIRMATIONSTATE } from "../../../../utils/constant";
import PatientRegister from "../../../../pages/frontOffice/PatientRegistration/Index";
import OPDServiceBooking from "../../../../pages/frontOffice/OPD/OPDServiceBooking";
const OPDConfirmationTable = (props) => {
  const styleset = window.innerWidth > 768 
  console.log(styleset);
  const {
    THEAD,
    tbody,
    handleModel,
    handleClickDataGetAPI,
    handleOpenOPDServiceBooking,
  } = props;
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [modalData, setModalData] = useState(false);
  const [registerModal, setRegisterModal] = useState({
    isShow: false,
    App_ID: "",
    ApiData: [],
  });

  const handleSlotModal = (index) => {
    setModalData(true);
    setSelectedRowIndex(index);
  };
  const handleSetData = (modifiedData) => {
    const data = [...tbody];
    data[selectedRowIndex] = modifiedData;
    // setBodyData(data);
    setModalData(false);
    setSelectedRowIndex(null);
  };

  const [confirmBoxvisible, setConfirmBoxvisible] = useState({
    show: false,
    alertMessage: "",
    lableMessage: "",
    chidren: "",
  });

  const handleUpdateAppointmentSchedule = async (APIPARAMS) => {
    try {
      const res = await updateAppointmentSchedule({
        slotTiming: `${APIPARAMS?.SlotDateDisplay} # ${APIPARAMS?.FromTimeDisplay} - ${APIPARAMS?.ToTimeDisplay}`,
        appID: String(tbody[selectedRowIndex]?.App_ID),
        isSlotWiseToken: "0",
        doctorID: tbody[selectedRowIndex]?.DoctorID,
      });
      if (res.success === true) {
        notify(res.message, "success");
        setConfirmBoxvisible({ ...confirmBoxvisible, show: false });
        setModalData(false);
        handleClickDataGetAPI();
        // window.location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmBox = (paramsData) => {
    setConfirmBoxvisible({
      show: true,
      alertMessage: "Reschedule Doctor Appointment",
      lableMessage: "Are you sure to Update Schedule",
      chidren: (
        <>
          <div>
           
            <button
                className="modalConfirmButton"
              onClick={() => {
                handleUpdateAppointmentSchedule(paramsData);
              }}
            >
              Update
            </button>
            <button
            className="modalCancelButton"
              onClick={() => {
                setConfirmBoxvisible({ ...confirmBoxvisible, show: false });
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ),
    });
  };

  const handlePatientRegister = async (APPID) => {
    try {
      const data = await bindAppointmentDetail(APPID);
      setRegisterModal({
        ...registerModal,
        isShow: true,
        App_ID: APPID,
        ApiData: data.data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (ITEM) => {
    try {
      const RESPONSE = await UpdateAppointmentStatus({
        appointmentID: String(ITEM?.App_ID),
        status: "confirm",
        remark: "",
        patientID: ITEM.PatientID,
        pName: ITEM.NAME,
        doctorName: ITEM.DoctorName,
        contactNo: ITEM.ContactNo,
        appDate: ITEM.AppDate,
      });
      if (RESPONSE.success === true) {
        notify(RESPONSE.message, "success");

        handleClickDataGetAPI();
        // window.location.reload()
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    // Select the p-dialog-mask element
    const maskElement = document.querySelector('.p-dialog-mask');

    // Check if the maskElement exists
    if (maskElement) {
        // Select all sibling div elements following p-dialog-mask
        const contentDivs = Array.from(maskElement.nextElementSibling.querySelectorAll('div'));
        
        // Loop through each content div and add a class
        contentDivs.forEach(div => {
            div.classList.add('custom_class');
        });
    }
}, []);

  return (
    <>
      {/* {tbody.map((item, index) => (
        <Tooltip
          key={index}
          target={`#doctorName-${index}, #visitType-${index}`}
          position="top"
        />
      ))} */}
      {tbody.length > 0 && (
        <Tables
          thead={THEAD}
          tbody={tbody.map((item, index) => ({
            "#": index + 1,
            AppNo: item?.AppNo,
            NAME: item?.NAME,
            PatientID: item?.PatientID,
            Age: item?.Age,
            ContactNo: item?.ContactNo,
            Relative: item?.Relative,
            DoctorName: (
              <span
                id={`doctorName-${index}`}
                data-pr-tooltip={item?.DoctorName}
                style={{ fontSize: "11px" }}
              >
                {`${item?.DoctorName}`}
                {/* {`${item?.DoctorName?.substring(0, 8)}...`} */}
              </span>
            ),
            VisitType: (
              <span
                id={`visitType-${index}`}
                data-pr-tooltip={item?.VisitType}
                style={{ fontSize: "11px" }}
              >
                {`${item?.VisitType}`}
                {/* {`${item?.VisitType?.substring(0, 6)}...`} */}
              </span>
            ),
            PurposeOfVisit: item?.PurposeOfVisit || "",
            AppTime: item?.AppTime,
            AppDate: item?.AppDate,
            Actions: (
              <>
                <div className="d-flex  tableaddconfirmation" style={{ gap: "10px", flexWrap: styleset  ? "":"wrap" }}>
                  <button
                    className={
                      item?.IsConform === 1 ||
                      item?.isExpired === 1 ||
                      item?.IsCancel === 1
                        ? "grayColorBtnDisabled btn btn-sm "
                        : "btn btn-sm btn-primary"
                    }
                    onClick={() => handleUpdateStatus(item)}
                    disabled={
                      item?.IsConform === 1 ||
                      item?.isExpired === 1 ||
                      item?.IsCancel === 1
                    }
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleSlotModal(index, item)}
                    className={
                      item?.IsConform === 1 || item?.IsCancel === 1
                        ? "grayColorBtnDisabled btn btn-sm"
                        : "btn btn-sm btn-primary"
                    }
                    disabled={item?.IsConform === 1 || item?.IsCancel === 1}
                  >
                    Reschedule
                  </button>
                  <button
                    className={
                      item?.PatientID
                        ? "grayColorBtnDisabled btn btn-sm"
                        : "btn btn-sm btn-primary"
                    }
                    disabled={item?.PatientID}
                    onClick={() => handlePatientRegister(item?.App_ID)}
                  >
                    Registration
                  </button>
                  <button
                    className={
                      item?.Reg_Pay === 0 || item?.PatientID === ""
                        ? "grayColorBtnDisabled btn btn-sm"
                        : "btn btn-sm btn-primary"
                    }
                    disabled={item?.Reg_Pay === 0 || item?.PatientID === ""}
                    onClick={() =>
                      handleOpenOPDServiceBooking(item?.PatientID, item?.App_ID)
                    }
                  >
                    Payment
                  </button>
                  <button
                    className={
                      item?.IsConform === 1 ||
                      item?.isExpired === 1 ||
                      item?.IsCancel === 1
                        ? "grayColorBtnDisabled btn btn-sm"
                        : "btn btn-sm btn-primary"
                    }
                    disabled={
                      item?.IsConform === 1 ||
                      item?.isExpired === 1 ||
                      item?.IsCancel === 1
                    }
                  >
                    Cancel
                  </button>
                </div>
              </>
            ),
          }))}
          tableHeight={"tableHeight"}
        />
      )}

      {modalData && (
        <Modal
          visible={modalData}
          setVisible={setModalData}
          modalWidth="95vw"
          Header="Doctor Slot"
          footer={<></>}
        >
          {selectedRowIndex !== null && (
            <div>
              <SlotModal
                data={{
                  ...tbody[selectedRowIndex],
                  Type_ID: tbody[selectedRowIndex].DoctorID,
                  AppointedDate: moment().format("YYYY-MM-DD"),
                  Item: tbody[selectedRowIndex]?.DoctorName,
                }}
                handleSetData={handleSetData}
                typePage="confirmation"
                handleConfirmBox={handleConfirmBox}
                confirmBoxvisible={confirmBoxvisible}
              />
            </div>
          )}
        </Modal>
      )}
      {registerModal.isShow && (
        <Modal
          visible={registerModal}
          setVisible={setRegisterModal}
          modalWidth="90vw"
          Header="Registration"
          footer={<></>}
        >
          <PatientRegister registrationConfirmData={registerModal?.ApiData} />
        </Modal>
      )}
     

      {confirmBoxvisible?.show && (
        <Confirm
          alertMessage={confirmBoxvisible?.alertMessage}
          lableMessage={confirmBoxvisible?.lableMessage}
          confirmBoxvisible={confirmBoxvisible}
        >
          {confirmBoxvisible?.chidren}
        </Confirm>
      )}
    </>
  );
};

export default OPDConfirmationTable;
