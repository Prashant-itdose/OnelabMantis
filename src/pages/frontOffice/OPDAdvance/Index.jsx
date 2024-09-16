import { useTranslation } from "react-i18next";
import Heading from "../../../components/UI/Heading";
import Input from "../../../components/formComponent/Input";
import OverLay from "../../../components/modalComponent/OverLay";
import Index from "../PatientRegistration/Index";
import { useEffect, useMemo, useState } from "react";
import PatientBlackList from "../PatientRegistration/PatientBlackList";

import { PatientSearchbyBarcode } from "../../../networkServices/opdserviceAPI";
import {
  MOBILE_NUMBER_VALIDATION_REGX,
  PAYMENT_OBJECT,
  Reason_list,
  Type_list,
  number,
} from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateAdvanceReason,
  GetAdvanceReason,
  GetBindDepartment,
  GetBindReferDoctor,
  GetBindReferalType,
} from "../../../store/reducers/common/CommonExportFunction";
import UploadViewDocument from "../OPD/UploadViewDocument";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import ReasonAddModal from "../../../components/modalComponent/Utils/ReasonAddModal";
import Modal from "../../../components/modalComponent/Modal";
import { useFormik } from "formik";
import PaymentGateway from "../../../components/front-office/PaymentGateway";
import SearchComponentByUHIDMobileName from "../../../components/commonComponents/SearchComponentByUHIDMobileName";
import {
  calculateBillAmount,
  inputBoxValidation,
  PAYMENT_MODE_FLAG_ISREFUND,
} from "../../../utils/utils";

export default function OPDAdvance() {
  const [t] = useTranslation();
  const [singlePatientData, setSinglePatientData] = useState({});
  const [visible, setVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState({
    name: "",
    component: null,
  });
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [paymentControlModeState, setPaymentControlModeState] =
    useState(PAYMENT_OBJECT);

  const { values, setFieldValue, handleChange, setValues } = useFormik({
    initialValues: Reason_list,
    onSubmit: (values, { resetForm }) => {
      console.log("reasonValues", values);
    },
  });

  const sendReset = () => {
    setSinglePatientData({});
    setValues(Reason_list);
    setPaymentControlModeState(PAYMENT_OBJECT);
    setPaymentMethod([]);
  };

  const handleTypeDropwn = () => {
    setPaymentControlModeState(PAYMENT_OBJECT);
    setPaymentMethod([]);
  };

  const ModalComponent = (name, component) => {
    setVisible(true);
    setRenderComponent({
      name: name,
      component: component,
    });
  };

  const handlePaymentGateWay = (details) => {
    const {
      panelID,
      billAmount,
      discountAmount,
      isReceipt,
      patientAdvanceAmount,
      autoPaymentMode,
      minimumPayableAmount,
      panelAdvanceAmount,
      disableDiscount,
      refund,
      constantMinimumPayableAmount,
      discountIsDefault,
      coPayIsDefault,
    } = details;

    const setData = {
      panelID,
      billAmount,
      discountAmount,
      isReceipt,
      patientAdvanceAmount,
      autoPaymentMode,
      minimumPayableAmount,
      panelAdvanceAmount,
      disableDiscount,
      refund,
      constantMinimumPayableAmount,
      discountIsDefault,
      coPayIsDefault,
    };
    setPaymentMethod([]);
    setPaymentControlModeState(setData);
  };

  const handleSinglePatientData = async (data) => {
    const { MRNo } = data;
    try {
      const data = await PatientSearchbyBarcode(MRNo, 1);
      setSinglePatientData(
        Array.isArray(data?.data) ? data?.data[0] : data?.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card patient_registration border">
        <Heading
          title={"Search Criteria"}
          isBreadcrumb={true}
          secondTitle={
            <>
              <button
                className="btn btn-xs text-white"
                onClick={() => ModalComponent(" New Registration", <Index />)}
              >
                {t("FrontOffice.OPD.OPDAdvance.label.NewRegistration")}
              </button>
            </>
          }
        />

        {Object.keys(singlePatientData)?.length === 0 ? (
          <SearchComponentByUHIDMobileName onClick={handleSinglePatientData} />
        ) : (
          <DetailCard
            ModalComponent={ModalComponent}
            singlePatientData={singlePatientData}
            values={values}
            setValues={setValues}
            setFieldValue={setFieldValue}
            handlePaymentGateWay={handlePaymentGateWay}
            handleTypeDropwn={handleTypeDropwn}
            sendReset={sendReset}
          />
        )}
      </div>

      <PaymentGateway
        screenType={paymentControlModeState}
        setScreenType={setPaymentControlModeState}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        button={
          <button className="button">
            {values?.Type?.label === "Advance"
              ? t("FrontOffice.OPD.OPDAdvance.label.Advance")
              : t("FrontOffice.OPD.OPDAdvance.label.Refund")}
          </button>
        }
      />

      <OverLay
        visible={visible}
        setVisible={setVisible}
        Header={renderComponent?.name}
      >
        {renderComponent?.component}
      </OverLay>
    </>
  );
}

const DetailCard = ({
  ModalComponent,
  singlePatientData,
  values,
  setValues,
  setFieldValue,
  handlePaymentGateWay,
  handleTypeDropwn,
  sendReset,
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [handleModelData, setHandleModelData] = useState({});
  const [modalData, setModalData] = useState({});
  const { ReasonWiseCache } = useSelector((state) => state.CommonSlice);

  // global state for this component

  const SEEMOREDETAILS = [
    {
      name: "Edit Demographic Details",
      component: <Index data={singlePatientData} />,
    },
    {
      name: "View Documents",
      component: <UploadViewDocument />,
    },
    {
      name: "View Prescriptions",
      component: "",
    },
    {
      name: "OLD Dischanrge Summary",
      component: "",
    },
    {
      name: "Lab Reports",
      component: "",
    },
    {
      name: "Blacklist Patient",
      component: <PatientBlackList />,
    },
    {
      name: "Card Print",
      component: "",
    },
    {
      name: "Stricker Print",
      component: "",
    },
    {
      name: "Last 5 Visit History",
      component: "",
    },
  ];

  const handleChangeModel = (data) => {
    setModalData(data);
  };
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
      Component: Component,
      handleInsertAPI: handleInsertAPI,
      extrabutton: extrabutton ? extrabutton : <></>,
    });
  };

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };
  useEffect(() => {
    setHandleModelData((val) => ({ ...val, modalData: modalData }));
  }, [modalData]);

  const handleSelect = (name, value) => {
    setFieldValue(name, value);
  };

  const handleCreateAdvanceReason = async (data) => {
    let insData = await dispatch(CreateAdvanceReason(data));
    if (insData?.payload?.success) {
      dispatch(GetAdvanceReason());
      setModalData({});
      setHandleModelData((val) => ({ ...val, isOpen: false }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    const data = calculateBillAmount(
      [
        {
          panelID: 1,
          grossAmount: Number(value),
          discountAmount: 0,
          PayableAmount: Number(value),
        },
      ],
      "1",
      0,
      values?.Type?.value === 1
        ? PAYMENT_MODE_FLAG_ISREFUND["advance"]
        : PAYMENT_MODE_FLAG_ISREFUND["refund"],
      0,
      0.0,
      1,
      1
    );

    handlePaymentGateWay(data);
  };

  useEffect(() => {
    dispatch(GetBindReferDoctor());
    dispatch(GetBindReferalType());
    dispatch(GetBindDepartment());
    dispatch(GetAdvanceReason());
  }, []);

  const handleDataInDetailView = useMemo(() => {
    const data = [
      {
        label: t("FrontOffice.OPD.OPDAdvance.label.PatientID"),
        value: `${singlePatientData?.PatientID}`,
      },
      {
        label: t("FrontOffice.OPD.OPDAdvance.label.PatientName"),
        value: `${singlePatientData?.Title} ${singlePatientData?.PName}`,
      },
      {
        label: t("FrontOffice.OPD.OPDAdvance.label.GenderAge"),
        value: `${singlePatientData?.Gender} / ${singlePatientData?.Age}`,
      },
      {
        label: t("FrontOffice.OPD.OPDAdvance.label.ContactNo"),
        value: singlePatientData?.Mobile,
      },
      {
        label: t("FrontOffice.OPD.OPDAdvance.label.Address"),
        value: singlePatientData.House_No,
      },
      {
        label: t("FrontOffice.OPD.OPDAdvance.label.Outstanding"),
        value: singlePatientData?.Outstanding ?? "0",
      },
      {
        label: t("FrontOffice.OPD.OPDAdvance.label.AvailableAmt"),
        value: singlePatientData.OPDAdvanceAmount,
      },
    ];

    return data;
  }, [singlePatientData]);

  const compareOPDAdvanceAmount = (e, handleChange) => {
    if (values?.Type?.label === "Refund") {
      if (
        e.target.value <= parseInt(singlePatientData.OPDAdvanceAmount)
          ? parseInt(singlePatientData.OPDAdvanceAmount)
          : 0
      )
        handleChange(e);
    } else {
      handleChange(e);
    }
  };

  return (
    <>
      {handleModelData?.isOpen && (
        <Modal
          visible={handleModelData?.isOpen}
          setVisible={setIsOpen}
          modalWidth={handleModelData?.width}
          Header={t(handleModelData?.label)}
          buttonType={"submit"}
          modalData={handleModelData?.modalData}
          setModalData={setModalData}
          handleAPI={handleModelData?.handleInsertAPI}
        >
          {handleModelData?.Component}
        </Modal>
      )}
    </>
  );
};
