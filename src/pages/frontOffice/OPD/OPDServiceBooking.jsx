import { useTranslation } from "react-i18next";
import Heading from "../../../components/UI/Heading";
import ReactSelect from "../../../components/formComponent/ReactSelect";
import OverLay from "../../../components/modalComponent/OverLay";
import { Fragment, lazy, useEffect, useMemo, useRef, useState } from "react";
import TestPayment from "../../../components/front-office/TestPayment";
import PaymentGateway from "../../../components/front-office/PaymentGateway";
import TestAddingTable from "../../../components/UI/customTable/frontofficetables/TestAddingTable";
import {
  BindDisApprovalList,
  BindPRO,
  CheckblacklistAPI,
  GetBindDoctorDept,
  GetDiscReasonList,
  GetEligiableDiscountPercent,
  GetLastVisitDetail,
  LastVisitDetails,
  PatientSearchbyBarcode,
  bindPanelByPatientID,
} from "../../../networkServices/opdserviceAPI";
import { PAYMENT_OBJECT, THEAD } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  BindSeeMoreList,
  GetBindDepartment,
  GetBindReferDoctor,
  GetBindReferalType,
} from "../../../store/reducers/common/CommonExportFunction";
import {
  ReactSelectisDefaultValue,
  handleReactSelectDropDownOptions,
} from "../../../utils/utils";
import SearchComponentByUHIDMobileName from "../../../components/commonComponents/SearchComponentByUHIDMobileName";
import Index from "../../frontOffice/PatientRegistration/Index";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import NotificationCard from "../Re_Print/NotificationCard";
import MessageCard from "../Re_Print/MessageCard";
import SeeMoreList from "../../../components/commonComponents/SeeMoreList";
export default function OPDServiceBooking(props) {
  const { UHID, TestData } = props;
  console.log(TestData);
  const [t] = useTranslation();
  const [singlePatientData, setSinglePatientData] = useState({});
  const [visible, setVisible] = useState(false);
  const [renderComponent, setRenderComponent] = useState({
    name: "",
    component: null,
  });
  const [discounts, setDiscounts] = useState({
    discountApprovalList: [],
    discountReasonList: [],
  });
  const [testPaymentState, setTestPaymentState] = useState({
    type: "",
    category: "0",
    subCategory: "0",
    searchType: 1,
  });
  const [testAddingTableState, setTestAddingTable] = useState([]);
  let userData = useLocalStorage("userData", "get");

  // global state for this component
  const [payloadData, setPayloadData] = useState({
    panelID: "",
    referalTypeID: "Self",
    referDoctorID: "",
    DepartmentID: "ALL",
    DoctorID: "",
  });

  const [paymentControlModeState, setPaymentControlModeState] =
    useState(PAYMENT_OBJECT);

  const [paymentMethod, setPaymentMethod] = useState([]);

  const [notificationDetail, setNotificationData] = useState([]);

  const sendReset = () => {
    setSinglePatientData({});

    setTestPaymentState({
      type: "",
      category: "0",
      subCategory: "0",
      searchType: 1,
    });

    setTestAddingTable([]);

    setPayloadData({
      panelID: "",
      referalTypeID: "Self",
      referDoctorID: "",
      DepartmentID: "ALL",
      DoctorID: "",
    });

    setPaymentControlModeState(PAYMENT_OBJECT);
    setPaymentMethod([]);
    setNotificationData([]);
  };

  const ModalComponent = (name, component) => {
    setVisible(true);
    setRenderComponent({
      name: name,
      component: component,
    });
  };

  const handleGetLastVisitDetail = async (PatientID, DoctorID) => {
    try {
      const data = await GetLastVisitDetail(PatientID, DoctorID);
      return data?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleLastVisitDetails = async (PatientID) => {
    try {
      const data = await LastVisitDetails(PatientID);
      return data?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  //   const handleChecker = (params) => {
  //     const data = params.reduce((acc, current) => {
  //       if (Object.keys(current).length > 0) {
  //         acc.push(current);
  //       }
  //       return acc;
  //     }, []);
  // debugger
  //     return data;
  //   };

  const handleDoctorSelected = (ID) => {
    setPayloadData({ ...payloadData, DoctorID: ID });
  };

  const handleJSXNotificationDetils = (details) => {
    const { getLastDetail, lastDetail } = details;
    const response = {
      getLastDetail: {},
      lastDetail: {},
    };

    // getLastDetail

    response.getLastDetail.header = "Last Visit Details";

    const responsegetLastDetail = getLastDetail[getLastDetail.length - 1];

    const component = (
      <div>
        <div className="d-flex justify-content-between">
          <div>Date</div>
          <div>{responsegetLastDetail?.VisitDate}</div>
        </div>

        <div className="d-flex justify-content-between">
          <div>Valid To</div>
          <div>{responsegetLastDetail?.ValidTo}</div>
        </div>

        <div className="d-flex justify-content-between">
          <div>Amount Paid</div>
          <div>{responsegetLastDetail?.AmountPaid}</div>
        </div>

        <div className="d-flex justify-content-between">
          <div>Days</div>
          <div>{responsegetLastDetail?.Days}</div>
        </div>

        <div className="d-flex justify-content-between">
          <div>Type</div>
          <div>{responsegetLastDetail?.VisitType}</div>
        </div>

        <div className="d-flex justify-content-between">
          <div>Doctor</div>
          <div>{responsegetLastDetail?.Doctor}</div>
        </div>
      </div>
    );

    response.getLastDetail.component = component;

    // lastDetail

    response.lastDetail.header = "Last Visit Details";

    const responselastDetail = lastDetail;

    const responselastDetailcomponent = (
      <table>
        <tbody>
          {responselastDetail?.map((ele, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ textAlign: "left" }}>{ele?.Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    response.lastDetail.component = responselastDetailcomponent;
    return response;
  };

  const handleSinglePatientData = async (data) => {
    let blacklist = await CheckblacklistAPI();
    const { MRNo } = data;
    try {
      const data = await PatientSearchbyBarcode(MRNo, 1);
      const responseGetLastVisitDetail = await handleGetLastVisitDetail(
        MRNo,
        " "
      );
      const responseLastVisitDetail = await handleLastVisitDetails(MRNo);

      if (
        responseGetLastVisitDetail.length > 0 &&
        responseLastVisitDetail.length > 0
      ) {
        const { getLastDetail, lastDetail } = handleJSXNotificationDetils({
          getLastDetail: responseGetLastVisitDetail,
          lastDetail: responseLastVisitDetail,
        });

        const notificationResponse = [getLastDetail, lastDetail];

        setNotificationData(notificationResponse);
      }
      setSinglePatientData(
        Array.isArray(data?.data) ? data?.data[0] : data?.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (UHID) {
      handleSinglePatientData({ MRNo: UHID });
    }
  }, [UHID]);

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
      coPayIsDefault,
      discountIsDefault,
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
      coPayIsDefault,
      discountIsDefault,
    };
    setPaymentMethod([]);
    setPaymentControlModeState(setData);
  };

  // table

  const handleChange = (e, index, name) => {
    const { value } = e.target;
    const data = [...bodyData];
    data[index][name] = value;
    setBodyData(data);
  };

  const renderNotification = useMemo(() => {
    return (
      <NotificationCard>
        {notificationDetail.map((row, index) => {
          return (
            <MessageCard header={row?.header} key={index}>
              {row?.component}
            </MessageCard>
          );
        })}
      </NotificationCard>
    );
  }, [notificationDetail]);

  const GetDiscListAPI = async () => {
    try {
      const [
        discountReasonListRes,
        discountApprovalListRes,
        eligibleDiscountPercentRes,
      ] = await Promise.all([
        GetDiscReasonList("OPD"),
        BindDisApprovalList("HOSPITAL", "1"),
        GetEligiableDiscountPercent(userData?.employeeID),
      ]);
      const discountReasonList = discountReasonListRes?.data;
      const discountApprovalList = discountApprovalListRes?.data;
      const eligibleDiscountPercent =
        eligibleDiscountPercentRes?.data?.Eligible_DiscountPercent;

      if (discountReasonList)
        setDiscounts((val) => ({ ...val, discountReasonList }));
      if (discountApprovalList)
        setDiscounts((val) => ({ ...val, discountApprovalList }));
      if (eligibleDiscountPercent)
        setDiscounts((val) => ({
          ...val,
          Eligible_DiscountPercent: eligibleDiscountPercent,
        }));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    GetDiscListAPI();
  }, []);

  return (
    <>
      {/* {bodyData.map((ele)=> ele.Qty * ele.Rate)} */}
      <div className="card patient_registration border">
        <Heading
          title={"Search Criteria"}
          isBreadcrumb={true}
          secondTitle={
            <>
              <button
                className="btn btn-xs text-white"
                onClick={() => ModalComponent(" New Registration", <Index bindDetail={true} bindDetailAPI={handleSinglePatientData} setVisible={setVisible} />)}
              >
                New Registration
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
            payloadData={payloadData}
            setPayloadData={setPayloadData}
            sendReset={sendReset}
          />
        )}

      </div>


      <TestPayment
        testPaymentState={testPaymentState}
        setTestPaymentState={setTestPaymentState}
        payloadData={payloadData}
        handleDoctorSelected={handleDoctorSelected}
        singlePatientData={singlePatientData}
        setTestAddingTable={setTestAddingTable}
        testAddingTableState={testAddingTableState}
        handlePaymentGateWay={handlePaymentGateWay}
        TestData={TestData ?? []}
      />

      <TestAddingTable
        bodyData={testAddingTableState}
        setBodyData={setTestAddingTable}
        handlePaymentGateWay={handlePaymentGateWay}
        singlePatientData={singlePatientData}
        discounts={discounts}
        THEAD={THEAD}
        handleChange={handleChange}
      />

      {/* Payment Component */}

      <PaymentGateway
        screenType={paymentControlModeState}
        setScreenType={setPaymentControlModeState}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        discounts={discounts}
        testAddingTableState={testAddingTableState}
        button={
          <button className="button">
            {t("FrontOffice.OPD.PaymentGateway.Save")}
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

      {renderNotification}
    </>
  );
}

const DetailCard = ({
  ModalComponent,
  singlePatientData,
  payloadData,
  setPayloadData,
  sendReset,
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const {
    GetBindReferDoctorList,
    GetReferTypeList,
    GetDepartmentList,
    BindSeeMoreListData,
  } = useSelector((state) => state?.CommonSlice);

  const [DropDownState, setDropDownState] = useState({
    getBindPanelByPatientID: [],
    getBindProList: [],
    getDoctorDeptWise: [],
  });

  const handlePanelReactSelectChange = (name, e) => {
    setPayloadData({
      ...payloadData,
      [name]: e,
    });
  };

  // react select handleChange
  const handleReactSelectChange = (name, e) => {
    switch (name) {
      case "referDoctorID":
        handleBindPRO(e.value);
        break;
      case "DepartmentID":
        const data = handleDoctorDeptWise(e.label);
        setDropDownState({
          ...DropDownState,
          getDoctorDeptWise: handleReactSelectDropDownOptions(
            data?.data,
            "Name",
            "DoctorID"
          ),
        });
        break;
      default:
        break;
    }

    setPayloadData({
      ...payloadData,
      [name]: e.value,
    });
  };

  const [seeMore, setSeeMore] = useState([]);

  useEffect(() => {
    let list = SeeMoreList(BindSeeMoreListData, singlePatientData?.PatientID)
    setSeeMore(list);
  }, [BindSeeMoreListData?.length]);

  const handleBindPanelByPatientID = async () => {
    try {
      const data = await bindPanelByPatientID(singlePatientData?.PatientID);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBindPRO = async (referDoctorID) => {
    try {
      const data = await BindPRO(referDoctorID);
      setDropDownState({
        ...DropDownState,
        getBindProList: handleReactSelectDropDownOptions(
          data?.data,
          "ProName",
          "Pro_ID"
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoctorDeptWise = async (Department) => {
    try {
      const data = await GetBindDoctorDept(Department);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  // api call
  const FetchAllDropDown = async () => {
    // debugger;
    try {
      const response = await Promise.all([
        handleBindPanelByPatientID(),
        handleDoctorDeptWise(payloadData?.DepartmentID),
      ]);

      const responseDropdown = {
        getBindPanelByPatientID: handleReactSelectDropDownOptions(
          response[0],
          "PanelName",
          "PanelID"
        ),
        getDoctorDeptWise: handleReactSelectDropDownOptions(
          response[1],
          "Name",
          "DoctorID"
        ),
      };
      setDropDownState(responseDropdown);
      setPayloadData({
        ...payloadData,
        panelID: ReactSelectisDefaultValue(
          responseDropdown?.getBindPanelByPatientID,
          "isDefaultPanel"
        ),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        value: singlePatientData?.Outstanding ?? "0.00",
      },
    ];

    return data;
  }, [singlePatientData]);

  useEffect(() => {
    FetchAllDropDown();
    dispatch(GetBindReferDoctor());
    dispatch(GetBindReferalType());
    dispatch(GetBindDepartment());
    dispatch(BindSeeMoreList());
  }, []);

  return (
    <>
      <>hh</>
    </>
  );
};
