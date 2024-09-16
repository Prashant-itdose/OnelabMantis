import React, { useEffect, useRef, useState } from "react";
import Accordion from "@app/components/UI/Accordion";
import PersonalDetails from "@app/components/front-office/PersonalDetails";
import PanelDetails from "@app/components/front-office/PanelDetails";
import { useTranslation } from "react-i18next";
import OtherDetails from "@app/components/front-office/OtherDetails";
import PaymentGateway from "../../../components/front-office/PaymentGateway";
import UploadDocumentOPD from "../../../components/front-office/UploadDocumentOPD";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../utils/hooks/useLocalStorage";
import { useFormik } from "formik";
import {
  BIND_TABLE_OLDPATIENTSEARCH_REG,
  DIRECT_PATIENT_SEARCH_TYPE,
  PATIENT_DETAILS,
} from "../../../utils/constant";
import ActiveTabs from "../../../components/UI/ActiveTabs";
import Heading from "../../../components/UI/Heading";
import PaymentControl from "../../../components/PaymentControl/PaymentControl";
import { Register_Patient_TypeCasting, filterByType, filterByTypes, handletab, notify } from "../../../utils/utils";
import {
  CentreWiseCacheByCenterID,
  CentreWisePanelControlCache,
  GetBindResourceList,
} from "../../../store/reducers/common/CommonExportFunction";
import {
  Oldpatientsearch,
  PatientSearchbyBarcode,
  bindPanelByPatientID,
} from "../../../networkServices/opdserviceAPI";
import EasyUI from "../../../components/EasyUI/EasyUI";
import { PatientRegistrationAPI, ValidateDuplicatePatientEntry } from "../../../networkServices/directPatientReg";
import Modal from "../../../components/modalComponent/Modal";
import DuplicatePatientAlertModel from "../../../components/modalComponent/Utils/DuplicatePatientAlertModel";

import * as Yup from "yup";
import Button from "../../../components/formComponent/Button";

// Define the validation schema
const validationSchema = Yup.object().shape({
  // Barcode: Yup.string().required('Barcode is required'),
  // Mobile: Yup.string().required("Mobile is required"),
  // Title: Yup.string().required('Title is required'),
  Mobile: Yup.string()
    .matches(/^[0-9]+$/, "Mobile must be only digits")
    .min(10, 'Mobile must be at least 10 digits')
    .required('Mobile number is required'),
  Title: Yup.mixed().required('Title is required'),
  PFirstName: Yup.string().required('First Name is required'),
  Gender: Yup.mixed().required('Gender is required'),
  Age: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "Age must be a number with up to two decimal places")
    .required('Age is required')
});

export default function Index(props) {
  const localdata = useLocalStorage("userData", "get");
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [activetab, setActiveTab] = useState(props?.PatientID ? 1 : 0);
  const [panelBodyData, setPanelBodyData] = useState([]);
  const [isDuplicateModel, setIsDuplicateModel] = useState(false);
  const [isAfterSaveModel, setIsAfterSaveModel] = useState(false);
  const [getOldPatientData, setGetOldPatientData] = useState([]);
  const [patientDetails, setPatientDetail] = useState({
    PanelPatientDetail: [],
    singlePatientData: {},
  });
  const inputRef = useRef(null);
  let tabItems = ["Panel Details", "Other Details"];
  if (props?.PatientID) tabItems = ["Other Details"];
  const { BindResource } = useSelector((state) => state?.CommonSlice);

  const formRef = useRef(null);


  const { CentreWiseCache, CentreWisePanelControlCacheList } = useSelector(
    (state) => state.CommonSlice
  );

  const ValidateDuplicatePatient = async (value) => {
    try {

      // const data = await ValidateDuplicatePatientEntry(value);
      // if (data?.success) {
      if (0) {
        setIsDuplicateModel(true);
      } else {
        SaveRegistrationAPI()
      }
    } catch (error) {
      console.error(error);
    }
  };

// console.log("bindDetailbindDetail",props?.bindDetail)

  const SaveRegistrationAPI = async () => {
    setIsDuplicateModel(false);
    const saveData = Register_Patient_TypeCasting(values, panelBodyData)
    try {
      let apiResp = await PatientRegistrationAPI(saveData);
      if (apiResp?.success) {
        notify(apiResp?.message, "success");
        if(props?.bindDetail){
          props?.setVisible(false)
          props?.bindDetailAPI({MRNo:apiResp?.data})
        }else{
          setValues({ UHID: apiResp?.data })
          setIsAfterSaveModel(true)
        }
      } else {
        notify(apiResp?.message, "error");
      }
    } catch (error) {
      console.error(error)
    }
  };

  const {
    handleChange,
    values,
    setFieldValue,
    setValues,
    handleSubmit: handleFormSubmit,
    errors,
    touched,
    validateForm,
  } = useFormik({
    initialValues: PATIENT_DETAILS,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      ValidateDuplicatePatient(values);
    },
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { name } = e.target
    if ((name === "ID_Proof_No" || name === "PFirstName" || name === "Mobile" || name === "Barcode")) {
      return 0;
    }
    const errors = await validateForm();
    if (Object.values(errors)[0]) {
      notify(Object.values(errors)[0], "error");
      const inputElement = document.getElementById(
        Object.values(errors)[0].split(" ")[0]
      );
      if (inputElement) {
        inputElement.focus();
      }
    }
    if (Object.keys(errors).length === 0) {
      // handleFormSubmit();
      ValidateDuplicatePatient(values);
    }
  };

  const [propData, setPropData] = useState(props.data);

  const handleReactSelect = (name, value) => {
    setFieldValue(name, value);
  };

  const CentreWiseCacheByCenterIDAPI = async () => {
    let data = await dispatch(CentreWiseCacheByCenterID({}));
    if (data?.payload?.success) {
      let countryCode = filterByTypes(
        data?.payload?.data,
        [7, BindResource?.BaseCurrencyID],
        ["TypeID", "ValueField"],
        "TextField",
        "ValueField",
        "STD_CODE"
      )
      let defaultState = filterByTypes(
        data?.payload?.data,
        [8, BindResource?.DefaultStateID],
        ["TypeID", "ValueField"],
        "TextField",
        "ValueField",
      )
      let defaultDistrict = filterByTypes(
        data?.payload?.data,
        [9, BindResource?.DefaultDistrictID],
        ["TypeID", "ValueField"],
        "TextField",
        "ValueField",
      )
      let defaultCity = filterByTypes(
        data?.payload?.data,
        [10, BindResource?.DefaultCityID],
        ["TypeID", "ValueField"],
        "TextField",
        "ValueField",
      )
      setValues((val) => ({
        ...val,
        District: values?.District ? values?.District : defaultDistrict?.length > 0 && defaultDistrict[0]?.label,
        State: values?.State ? values?.State : defaultState?.length > 0 && defaultState[0]?.label,
        City: values?.City ? values?.City : defaultCity?.length > 0 && defaultCity[0]?.label,
        Phone_STDCODE: values?.Phone_STDCODE ? values?.Phone_STDCODE : countryCode?.length ? countryCode[0]?.extraColomn : "+91",
      }))
    }

    
  }
  useEffect(() => {
    if (CentreWiseCache?.length === 0) {
      CentreWiseCacheByCenterIDAPI()
    }
    if (CentreWisePanelControlCacheList?.length === 0) {
      dispatch(
        CentreWisePanelControlCache({
          centreID: localdata?.defaultCentre,
        })
      );
    }
  }, [dispatch]);

  const handleOldPatientSearch = async (e) => {
    if ([13].includes(e.which)) {
      try {
        const data = await Oldpatientsearch(
          e.target.value,
          DIRECT_PATIENT_SEARCH_TYPE[e.target.name]
        );
        setGetOldPatientData(data?.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClickEasyUI = (value) => {
    handleSinglePatientData(value);
  };

  const handleSinglePatientData = async (patientDetails) => {
    const { MRNo, PatientRegStatus } = patientDetails;
    try {
      const data = await PatientSearchbyBarcode(MRNo, PatientRegStatus);
      if (data?.data) {
        setPatientDetail((val) => ({ ...val, singlePatientData: data?.data }));

        if(data?.data?.Age){
          data.data['AgeType']=data?.data?.Age ? data?.data?.Age?.split(" ")[1] : ""
          data.data['Age']=data?.data?.Age ? data?.data?.Age?.split(" ")[0] : values?.Age
          data.data['HospPatientType']=data?.data?.PatientTypeID
          data.data['Barcode']=data?.data?.PatientID
        }

        setValues(data?.data);
        let PanelPatientDetail = await bindPanelByPatientID(
          data?.data?.PatientID
        );

        setPatientDetail((val) => ({
          ...val,
          PanelPatientDetail: Array.isArray(PanelPatientDetail?.data)
            ? PanelPatientDetail?.data
            : PanelPatientDetail?.data,
        }));
        setGetOldPatientData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (props?.PatientID) {
      const data = handleSinglePatientData({
        MRNo: props?.PatientID,
        PatientRegStatus: 1,
      });
      setGetOldPatientData(data?.data);
    }
    else if (props?.registrationConfirmData) {
      let obj = { ...props?.registrationConfirmData }
      obj.Age = obj?.Age?.split(" ")[0]
      setValues(obj);
    } else {

      let countryCode = filterByTypes(
        CentreWiseCache,
        [7, BindResource?.BaseCurrencyID],
        ["TypeID", "ValueField"],
        "TextField",
        "ValueField",
        "STD_CODE"
      )
      let defaultState = filterByTypes(
        CentreWiseCache,
        [8, BindResource?.DefaultStateID],
        ["TypeID", "ValueField"],
        "TextField",
        "ValueField",
      )
      let defaultDistrict = filterByTypes(
        CentreWiseCache,
        [9, BindResource?.DefaultDistrictID],
        ["TypeID", "ValueField"],
        "TextField",
        "ValueField",
      )
      let defaultCity = filterByTypes(
        CentreWiseCache,
        [10, BindResource?.DefaultCityID],
        ["TypeID", "ValueField"],
        "TextField",
        "ValueField",
      )

      setValues((val) => ({
        ...val,
        countryID: BindResource?.BaseCurrencyID,
        Country: BindResource?.DefaultCountry,
        // District: defaultDistrict?.length > 0 && defaultDistrict[0]?.label,
        // State: defaultState?.length > 0 && defaultState[0]?.label,
        // City: defaultCity?.length > 0 && defaultCity[0]?.label,
        // Phone_STDCODE: countryCode?.length ? countryCode[0]?.extraColomn : "+91",
        StateID: parseInt(BindResource?.DefaultStateID),
        districtID: parseInt(BindResource?.DefaultDistrictID),
        cityID: parseInt(BindResource?.DefaultCityID),
        IsInternational: "2",
        ResidentialNumber_STDCODE: countryCode?.length ? countryCode[0]?.extraColomn : "+91",
        AgeType: "YRS",
        Religion: "Hinduism",
        Relation: "Self",
      }))
    }
    handletab(formRef);
    // CentreWiseCache?.length    dependecy array value
  }, []);
  return (
    <>
      <form
        className="patient_registration position-relative"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <Heading isBreadcrumb={true} />
        <Accordion
          // title={t("FrontOffice.OPD.Personal_Details")}
          title={t("FrontOffice.OPD.Personal_Details")}
          // isBreadcrumb={true}
          defaultValue={true}
        >
          <PersonalDetails
            CentreWiseCache={CentreWiseCache}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleReactSelect={handleReactSelect}
            // propData={propData}
            handleOldPatientSearch={handleOldPatientSearch}
            errors={errors}
            touched={touched}
            inputRef={inputRef}
            handleKeyDown={handleKeyDown}
          />
        </Accordion>

        <Accordion
          title={t("FrontOffice.OPD.OtherDetails")}
          defaultValue={true}
        >
          <OtherDetails
            CentreWiseCache={CentreWiseCache}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            handleReactSelect={handleReactSelect}
            propData={propData}
            handleOldPatientSearch={handleOldPatientSearch}
          />
        </Accordion>
        {!props?.PatientID &&
          <Accordion
            title={t("FrontOffice.OPD.PanelDetails")}
            defaultValue={true}
          >
            <PanelDetails
              handleChangePanelDetail={handleChange}
              values={values}
              setFieldValue={setFieldValue}
              setValues={setValues}
              handleReactSelect={handleReactSelect}
              CentreWisePanelControlCacheList={CentreWisePanelControlCacheList}
              PanelPatientDetailList={patientDetails?.PanelPatientDetail}
              panelBodyData={panelBodyData}
              setPanelBodyData={setPanelBodyData}
            />
          </Accordion>
        }
        <div
          class=" formsec1 modify_register_save text-right p-2"
          style={{ textAlign: "end", float: "right" }}
        >

          {props?.type === 'update' ? (
            <button className="button" type="submit">
              {t("FrontOffice.OPD.patientRegistration.Update")}
            </button>
          ) : (
            <button className="button" type="submit">
              {t("FrontOffice.OPD.patientRegistration.Save")}
            </button>
          )}
        </div>

        {getOldPatientData?.length > 0 && (
          <div className="panelDetailEasyUI">
            <EasyUI
              dataBind={getOldPatientData}
              dataColoum={BIND_TABLE_OLDPATIENTSEARCH_REG}
              onClick={handleClickEasyUI}
            />
          </div>
        )}
      </form>

      {isDuplicateModel && (
        <Modal
          visible={isDuplicateModel}
          setVisible={setIsDuplicateModel}
          modalWidth={"25vw"}
          Header={t("FrontOffice.PatientRegistration.label.DuplicateEntry")}
          buttonType={"button"}
          modalData={{}}
          buttonName={t("FrontOffice.PatientRegistration.label.Confirm")}
          setModalData={() => { }}
          handleAPI={SaveRegistrationAPI}
        >
          <DuplicatePatientAlertModel
          // handleChangeModel={()=>{}}
          // inputData={{}}
          />
        </Modal>
      )}

      {isAfterSaveModel && (
        <Modal
          visible={isAfterSaveModel}
          setVisible={setIsAfterSaveModel}
          modalWidth={"25vw"}
          Header={t("FrontOffice.PatientRegistration.label.PatientUHID")}
          buttonType={"button"}
          modalData={{}}
          buttonName={t("FrontOffice.PatientRegistration.label.Advance")}
          buttons={<Button name={t("FrontOffice.PatientRegistration.label.RegistrationCharges")} type="button" className="text-white" handleClick={() => { }} />}
          setModalData={() => { }}
          handleAPI={() => { }}
        >
          <h1 className="text-center  PatientUHID" >UHID No : <span className="text-red PatientUHID"> {values?.UHID} </span> </h1>
        </Modal>
      )}
    </>
  );
}
