import React, { useEffect, useRef, useState } from "react";
import ReactSelect from "@app/components/formComponent/ReactSelect";
import Input from "@app/components/formComponent/Input";
import LabeledInput from "@app/components/formComponent/LabeledInput";
import { Tabfunctionality } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import UploadImage from "./UploadImage";
import Modal from "../modalComponent/Modal";
import DatePicker from "../../components/formComponent/DatePicker";
import CityModel from "../modalComponent/Utils/CityModel";
import DistrictModel from "../modalComponent/Utils/DistrictModel";
import StateModel from "../modalComponent/Utils/StateModel";
import IMGLOLO from "../../assets/image/logoAadmiMan.gif";
import {
  BindCityBystateByDistrict,
  BindDistrictByCountryByState,
  BindStateByCountry,
  ageValidation,
  filterByType,
  filterByTypes,
  inputBoxValidation,
  notify,
} from "../../utils/utils";
import {
  AGE_TYPE,
  BIND_TABLE_OLDPATIENTSEARCH,
  BIND_TABLE_OLDPATIENTSEARCH_REG,
  MOBILE_NUMBER_VALIDATION_REGX,
} from "../../utils/constant";
import {
  cityInsert,
  districtInsert,
  storeState,
} from "../../store/reducers/common/storeStateDistrictCity";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import AttachDoumentModal from "../modalComponent/Utils/AttachDoumentModal";
import UploadImageModal from "../modalComponent/Utils/UploadImageModal";
import { Tooltip } from "primereact/tooltip";
import moment from "moment/moment";
import { findAgeByDOB } from "../../networkServices/directPatientReg";
import { CentreWiseCacheByCenterID } from "../../store/reducers/common/CommonExportFunction";
export default function PersonalDetails({
  CentreWiseCache,
  handleChange,
  values,
  handleReactSelect,
  handleOldPatientSearch,
  handleKeyDown,
  setValues
}) {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const dispatch = useDispatch();
  const [handleModelData, setHandleModelData] = useState({});
  const [t] = useTranslation();
  const [modalData, setModalData] = useState({});
  const [isuploadDocOpen, setIsuploadDocOpen] = useState(false);
  const localdata = useLocalStorage("userData", "get");

  // const [singlePatientData, setSinglePatientData] = useState({});
  // const [getOldPatientData, setGetOldPatientData] = useState([]);
  const [preview, setPreview] = useState(null);
  const [isuploadOpen, setIsuploadOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();

  const userData = useLocalStorage("userData", "get");
  const handleChangeModel = (data) => {
    setModalData(data);
  };

  const handleStateInsertAPI = async (data) => {
    let insData = await dispatch(storeState(data));
    if (insData?.payload?.status) {
      setModalData({});
      setHandleModelData((val) => ({ ...val, isOpen: false }));
      dispatch(
        CentreWiseCacheByCenterID({
          centreID: localdata?.defaultCentre,
        })
      );
    }
  };
  const handleDistrictInsertAPI = async (data) => {
    let insData = await dispatch(districtInsert(data));
    if (insData?.payload?.status) {
      setModalData({});
      setHandleModelData((val) => ({ ...val, isOpen: false }));
      dispatch(
        CentreWiseCacheByCenterID({
          centreID: localdata?.defaultCentre,
        })
      );
    }
  };

  const handleCityInsertAPI = async (data) => {
    let insData = await dispatch(cityInsert(data));
    if (insData?.payload?.status) {
      setModalData({});
      setHandleModelData((val) => ({ ...val, isOpen: false }));
      dispatch(
        CentreWiseCacheByCenterID({
          centreID: localdata?.defaultCentre,
        })
      );
    }
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

  useEffect(() => {
    setHandleModelData((val) => ({ ...val, modalData: modalData }));
  }, [modalData]);

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };

  const closeCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  // Function to start camera
  // const startCamera = async () => {
  //   try {
  //     setPreview(null);
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     setCameraStream(stream); // Store camera stream
  //     videoRef.current.srcObject = stream;
  //   } catch (err) {
  //     console.error("Error accessing camera:", err);
  //   }
  // };

  const startCamera = async () => {
    try {
      setCameraStream(null);

      console.log('Checking for getUserMedia support...');
      const hasGetUserMedia = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
      console.log('getUserMedia support:', hasGetUserMedia);

      if (!hasGetUserMedia) {
        throw new Error("getUserMedia is not supported in this browser");
      }

      console.log('Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera access granted');
      setCameraStream(stream); // Store camera stream
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };


  const takePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 200, 150);

    const canvas = canvasRef.current;
    const base64String = canvas.toDataURL("image/png");
    setPreview(base64String)

  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    closeCameraStream();
    reader.onloadend = () => {
      // setImage(file);
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = () => {
    // Upload logic here (e.g., send `image` state to server)
    if (image) {
      // `image` is a File object; convert it to base64 format if needed
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        let base64data = reader.result;
        console.log(base64data); // Base64 format of the image
        // Perform your upload logic (e.g., send `base64data` to server)
      };
    }
  };

  const [documentIds, setDocumentIds] = useState([])
  const handleAddDocumentIDs = (e) => {

    if (e.key === "Enter") {
      let docIDs = documentIds?.find((item) => (item?.id === e.target.value) || (item?.name?.value === values?.documentName?.value))
      let validDocLength = parseInt(values?.documentName?.value?.split('#')[1] ? values?.documentName?.value?.split('#')[1] : 0)
      if (!values?.documentName?.label) {
        notify("Please Select Document id", "error")
      } else if (!e.target.value) {
        notify("Document Can't Be Empty", "error")
      } else if (docIDs?.id) {
        notify("This Document  Has Already Added", "error")
      } else if (e.target.value?.length !== validDocLength) {
        notify(`${values?.documentName?.label} must be ${validDocLength} digit `, "error")
      } else {
        setDocumentIds((val) => [...val, { name: values?.documentName, id: e.target.value }])
        let ids = [...documentIds]
        ids.push({ name: values?.documentName, id: e.target.value })
        setValues((val) => ({ ...val, ID_Proof_No: "", documentName: "", documentIds: ids }))
      }
      handleKeyDown(e)
    }
  }
  const deleteDocument = (doc) => {
    const docDetail = documentIds?.filter((val) => val.id !== doc?.id)
    setValues((val) => ({ ...val, documentIds: docDetail }))
    setDocumentIds(docDetail)
  }

  const getAgeByDateOfBirth = async (e) => {
    try {
      let age = await findAgeByDOB(e.target.value)
      if (age?.success) {
        setValues((val) => ({ ...val, Age: age?.data?.split(" ")[0] ? age?.data?.split(" ")[0] : 0, AgeType: age?.data?.split(" ")[0] ? age?.data?.split(" ")[1] : "" }))
      } else {
        notify(age?.message, "error")
      }
    } catch (error) {

    }
  }
  const handleTitleSelect = (name, value) => {

    setValues((val) => ({ ...val, [name]: value, Gender: value?.extraColomn }))

  }
  return (
    <>
      <div className="row pt-2 pl-2 pr-2">
        <div className="d-md-none">
          {/* <UploadImage /> */}

          <label
            style={{
              position: "absolute",
              zIndex: "1",
              top: "0px",
              right: "100px",
            }}
            id="document-s"
            onClick={() => setIsuploadDocOpen(true)}
          >
            <i class="fa fa-file" aria-hidden="true"></i>
          </label>
          <label
            style={{
              position: "absolute",
              zIndex: "1",
              top: "0px",
              right: "10px",
            }}
            onClick={() => setIsuploadOpen(true)}
          >
            Upload Image
          </label>
        </div>
        <div className="col-md-11 col-sm-12 ">
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1">
            <Input
              type="text"
              className="form-control "
              id="Barcode"
              name="Barcode"
              value={values?.Barcode}
              lable={t("FrontOffice.OPD.patientRegistration.Barcode")}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              onKeyDown={(e) => { handleOldPatientSearch(e); handleKeyDown(e) }}
              onChange={handleChange}
            // inputRef={inputRef}
            />
            <Input
              type="text"
              className="form-control required-fields"
              id="Mobile"
              name="Mobile"
              value={values?.Mobile}
              onChange={(e) => { inputBoxValidation(MOBILE_NUMBER_VALIDATION_REGX, e, handleChange) }}
              showTooltipCount={true}
              lable={t("FrontOffice.OPD.patientRegistration.Mobile_No")}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              onKeyDown={(e) => { handleOldPatientSearch(e); handleKeyDown(e) }}
            //tabIndex="1"
            />

            <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
              <div className="row">
                <ReactSelect
                  placeholderName={t(
                    "FrontOffice.OPD.patientRegistration.Title"
                  )}
                  dynamicOptions={filterByTypes(
                    CentreWiseCache,
                    [1],
                    ["TypeID"],
                    "TextField",
                    "ValueField",
                    "Department"
                  )}
                  // id={"Title"}
                  name="Title"
                  // inputClass="required-fields"
                  inputId="Title"
                  value={values?.Title}
                  handleChange={(name, value) => { setValues((val) => ({ ...val, [name]: value, Gender: value?.extraColomn !== "UnKnown" ? value?.extraColomn : "" })) }}
                  searchable={true}
                  respclass="col-5 "
                  requiredClassName="required-fields"
                // onKeyDown={Tabfunctionality}
                //tabIndex="2"
                />

                <Input
                  type="text"
                  className="form-control required-fields"
                  id="First"
                  name="PFirstName"
                  value={values?.PFirstName}
                  onChange={handleChange}
                  lable={t("FrontOffice.OPD.patientRegistration.First_Name")}
                  placeholder=" "
                  respclass="col-7"
                  onKeyDown={(e) => { handleOldPatientSearch(e); handleKeyDown(e) }}
                //tabIndex="3"
                />
              </div>
            </div>

            <Input
              type="text"
              className="form-control"
              id="Last_Name"
              name="PLastName"
              value={values?.PLastName}
              onChange={handleChange}
              lable={t("FrontOffice.OPD.patientRegistration.Last_Name")}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
            />

            <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
              <div className="row">
                <ReactSelect
                  placeholderName={t(
                    "FrontOffice.OPD.patientRegistration.Gender"
                  )}
                  isDisabled={(values?.Gender === "Male" || values?.Gender === "Female") ? true : false}
                  // id="Gender"
                  inputId="Gender"
                  dynamicOptions={filterByTypes(
                    CentreWiseCache,
                    [22],
                    ["TypeID"],
                    "TextField",
                    "ValueField"
                  )}
                  name="Gender"
                  value={values?.Gender}
                  handleChange={handleReactSelect}
                  searchable={true}
                  respclass="col-5"
                  requiredClassName={`required-fields ${(values?.Gender === "Male" || values?.Gender === "Female") ? "disable-focus" : ""}`}
                  DropdownIndicator={true}
                //tabIndex="4"
                />

                <ReactSelect
                  placeholderName={t(
                    "FrontOffice.OPD.patientRegistration.Marital_Status"
                  )}
                  id="Marital_Status"
                  dynamicOptions={filterByType(
                    CentreWiseCache,
                    24,
                    "TypeID",
                    "TextField",
                    "ValueField"
                  )}
                  name="MaritalStatus"
                  value={values?.MaritalStatus}
                  handleChange={handleReactSelect}
                  searchable={true}
                  respclass="col-7"
                //tabIndex="-1"
                />
              </div>
            </div>

            <DatePicker
              className="custom-calendar"
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              id="DOB"
              name="DOB"
              value={values?.DOB ? moment(values?.DOB).toDate() : ""}
              // handleChange={handleChange}
              handleChange={(e) => { getAgeByDateOfBirth(e, handleChange); handleChange(e) }}
              lable={t("FrontOffice.OPD.patientRegistration.DOB")}
              placeholder={VITE_DATE_FORMAT}
            />


            <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
              <div className="row">
                <Input
                  type="text"
                  className="form-control required-fields"
                  id="Age"
                  name="Age"
                  value={values?.Age}
                  onChange={(e) => { ageValidation(/^\d{0,2}(\.\d{0,2})?$/, e, handleChange, values?.AgeType?.value ? values?.AgeType?.value : values?.AgeType) }}
                  lable={t("FrontOffice.OPD.patientRegistration.Age")}
                  placeholder=" "
                  respclass="col-5"
                //tabIndex="5"
                />

                <ReactSelect
                  placeholderName={t(
                    "FrontOffice.OPD.patientRegistration.Type"
                  )}
                  id="Type"
                  name="AgeType"
                  value={values?.AgeType}
                  handleChange={handleReactSelect}
                  dynamicOptions={AGE_TYPE}
                  searchable={true}
                  respclass="col-7"
                //tabIndex="-1"
                />
              </div>
            </div>
            <Input
              type="text"
              className="form-control "
              id="Email_Address"
              name="Email"
              value={values?.Email}
              onChange={handleChange}
              lable={t("FrontOffice.OPD.patientRegistration.email")}
              placeholder=" "
              // required={true}
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
            // onKeyDown={Tabfunctionality}
            //tabIndex="-1"
            />


            <Input
              type="text"
              className="form-control "
              id="Local_Address"
              name="House_No"
              value={values?.House_No}
              onChange={handleChange}
              lable={t("FrontOffice.OPD.patientRegistration.Local_Address")}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
            //tabIndex="-1"
            // onKeyDown={Tabfunctionality}
            />

            <Input
              type="text"
              className="form-control "
              id="parmanentAddress"
              name="parmanentAddress"
              value={values?.parmanentAddress}
              onChange={handleChange}
              lable={t("FrontOffice.OPD.patientRegistration.Perma_Address")}
              placeholder=" "
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
            //tabIndex="-1"
            // onKeyDown={Tabfunctionality}
            />

            <ReactSelect
              placeholderName={t("FrontOffice.OPD.patientRegistration.Country")}
              searchable={true}
              id="Country"
              respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
              dynamicOptions={filterByTypes(
                CentreWiseCache,
                [7],
                ["TypeID"],
                "TextField",
                "ValueField",
                "STD_CODE"
              )}
              name="countryID"
              value={`${values?.countryID}`}
              handleChange={handleReactSelect}
            //tabIndex="-1"
            />

            <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
              <div className="d-flex">
                <ReactSelect
                  placeholderName={t(
                    "FrontOffice.OPD.patientRegistration.State"
                  )}
                  searchable={true}
                  respclass="w-100 pr-2"
                  id="State"
                  dynamicOptions={
                    values?.countryID
                      ? filterByTypes(
                        CentreWiseCache,
                        [
                          8,
                          `${values?.countryID?.value ? parseInt(values?.countryID?.value) : values?.countryID}`,
                        ],
                        ["TypeID", "CountryID"],
                        "TextField",
                        "ValueField"
                      )
                      : []
                  }
                  name="StateID"
                  value={`${values?.StateID}`}
                  handleChange={handleReactSelect}
                //tabIndex="-1"
                />

                <div >
                  <button
                    className="btn btn-sm btn-primary"
                    disabled={values?.countryID ? false : true}
                    onClick={() =>
                      handleModel(
                        "modalComponent.Utils.StateModel.Add_State",
                        "20vw",
                        "State",
                        true,
                        <StateModel
                          handleChangeModel={handleChangeModel}
                          inputData={{
                            countryID: values?.countryID?.value,
                            ipAddress: "11.22.33.44",
                            EntryBy: userData?.employeeID,
                          }}
                        />,
                        handleStateInsertAPI
                      )
                    }
                    type="button"
                  >
                    <i className="fa fa-plus-circle fa-sm new_record_pluse"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
              <div className="d-flex">
                <ReactSelect
                  placeholderName={t(
                    "FrontOffice.OPD.patientRegistration.District"
                  )}
                  searchable={true}
                  id="District"
                  dynamicOptions={
                    values?.StateID
                      ? filterByTypes(
                        CentreWiseCache,
                        [
                          9,
                          `${values?.countryID?.value ? values?.countryID?.value : values?.countryID}`,
                          values?.StateID?.value
                            ? parseInt(values?.StateID?.value)
                            : values?.StateID,
                        ],
                        ["TypeID", "CountryID", "StateID"],
                        "TextField",
                        "ValueField"
                      )
                      : []
                  }
                  name="districtID"
                  value={`${values?.districtID}`}
                  handleChange={handleReactSelect}
                  respclass="w-100 pr-2"
                //tabIndex="-1"
                />
                <div className="box-inner">
                  <button
                    className="btn btn-sm btn-primary"
                    disabled={values?.StateID ? false : true}
                    onClick={() =>
                      handleModel(
                        "modalComponent.Utils.DistrictModel.Add_District",
                        "20vw",
                        "District",
                        true,
                        <DistrictModel
                          handleChangeModel={handleChangeModel}
                          inputData={{
                            stateID: values?.StateID?.value
                              ? parseInt(values?.StateID?.value)
                              : values?.StateID,
                            countryID: values?.countryID?.value
                              ? parseInt(values?.countryID?.value)
                              : values?.countryID,
                            ipAddress: "11.111.111.11",
                            EntryBy: userData?.employeeID,
                          }}
                        />,
                        handleDistrictInsertAPI
                      )
                    }
                    type="button"
                  >
                    <i className="fa fa-plus-circle fa-sm new_record_pluse"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
              <div className="d-flex">
                <ReactSelect
                  placeholderName={t(
                    "FrontOffice.OPD.patientRegistration.City"
                  )}
                  searchable={true}
                  respclass="w-100 pr-2"
                  id="City"
                  dynamicOptions={
                    values?.districtID
                      ? filterByTypes(
                        CentreWiseCache,
                        [
                          10,
                          values?.StateID?.value
                            ? parseInt(values?.StateID?.value)
                            : values?.StateID,
                          values?.districtID?.value
                            ? parseInt(values?.districtID?.value)
                            : values?.districtID,
                        ],
                        ["TypeID", "StateID", "DistrictID"],
                        "TextField",
                        "ValueField"
                      )
                      : []
                  }
                  name="cityID"
                  value={`${values?.cityID}`}
                  handleChange={handleReactSelect}
                />

                <div className="box-inner">
                  <button
                    className="btn btn-sm btn-primary"
                    disabled={values?.districtID ? false : true}
                    onClick={() =>
                      handleModel(
                        "modalComponent.Utils.cityModel.Add_City",
                        "20vw",
                        "city",
                        true,

                        <CityModel
                          handleChangeModel={handleChangeModel}
                          inputData={{
                            city: "noida",
                            country: `${values?.countryID?.value ? parseInt(values?.countryID?.value) : values?.countryID}`,
                            ipAddress: "11.111.111.11",
                            districtID: values?.districtID?.value
                              ? parseInt(values?.districtID?.value)
                              : values?.districtID,
                            CreatedBy: userData?.employeeID,
                            stateID: values?.StateID?.value
                              ? parseInt(values?.StateID?.value)
                              : values?.StateID,
                          }}
                        />,
                        handleCityInsertAPI
                      )
                    }
                    type="button"
                  >
                    <i className="fa fa-plus-circle fa-sm new_record_pluse"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-xl-2.5 col-md-3 col-sm-6 col-12">
              <div className="row">
                <ReactSelect
                  placeholderName="ID"
                  name='documentName'
                  value={`${values?.documentName}`}
                  handleChange={handleReactSelect}
                  searchable={true}
                  id={"ID"}
                  dynamicOptions={filterByType(
                    CentreWiseCache,
                    13,
                    "TypeID",
                    "TextField",
                    "ValueField"
                  )}
                  respclass="col-md-6 col-5"
                />
                <Input
                  type="text"
                  className="form-control"
                  id="ID_Proof_No"
                  name="ID_Proof_No"
                  value={values?.ID_Proof_No}
                  onChange={handleChange}
                  lable={t("FrontOffice.OPD.patientRegistration.ID_Proof_No")}
                  placeholder=" "
                  respclass="col-md-6 col-7"
                  showTooltipCount={true}
                  onKeyDown={handleAddDocumentIDs}
                />
              </div>
            </div>

            <div className="d-flex" >
              {documentIds?.map((doc, key) => {
                return (
                  <div className="d-flex ml-2 mb-2" key={key}>
                    <LabeledInput label={doc?.name?.label} value={doc?.id} className={'document_label'} />
                    <button className="btn btn-sm btn-primary " type="button" onClick={() => { deleteDocument(doc) }}>
                      <i className="fa fa-times fa-sm new_record_pluse"></i>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="col-1 d-none d-md-block position-relative">
          <div
            style={{
              border: "1px solid grey",
              borderRadius: "5px",
              textAlign: "center",
              width: "67%",
              marginLeft: "10px",
            }}
            className="p-1"
          >
            <img
              height={50}
              // width={116}
              src={values?.profileImage}
              style={{ width: "100%" }}
              // alt="Not found"
              onClick={() => setIsuploadOpen(true)}
            />
          </div>
          <div className="p-1 personalDetailUploadDocument">
            <Tooltip
              target={`#document-s`}
              position="top"
              content="Patient Document's"
              event="hover"
            />
            <button
              className="text-white rounded  position-absolute p-1"
              type="button"
              style={{
                width: "62%",
                fontSize: "11px",
                marginLeft: "5px",
                bottom: "5px",
              }}
              id="document-s"
              onClick={() => setIsuploadDocOpen(true)}
            >
              <i class="fa fa-file" aria-hidden="true"></i>
            </button>
            {/* <button
              className="text-white rounded d-block d-xl-none position-absolute"
              style={{ width: "67%", marginLeft: "3px", bottom: "5px" }}
              id="document-s"
            >
              <i class="fa fa-file" aria-hidden="true"></i>
            </button> */}
          </div>
        </div>
      </div>

      {handleModelData?.isOpen && (
        <Modal
          visible={handleModelData?.isOpen}
          setVisible={setIsOpen}
          modalWidth={handleModelData?.width}
          Header={t(handleModelData?.label)}
          buttonType={"submit"}
          buttons={handleModelData?.extrabutton}
          modalData={handleModelData?.modalData}
          setModalData={setModalData}
          handleAPI={handleModelData?.handleInsertAPI}
        >
          {handleModelData?.Component}
        </Modal>
      )}

      {isuploadDocOpen && (
        <AttachDoumentModal
          isuploadOpen={isuploadDocOpen}
          setIsuploadOpen={setIsuploadDocOpen}
          preview={preview}
          modelHeader={"Upload Patient Document"}
          handleImageChange={handleImageChange}
        />
      )}

      {isuploadOpen && (
        <UploadImageModal
          isuploadOpen={isuploadOpen}
          closeCameraStream={closeCameraStream}
          setIsuploadOpen={setIsuploadOpen}
          // preview={preview}
          modalData={{ preview: preview }}
          handleImageChange={handleImageChange}
          startCamera={startCamera}
          videoRef={videoRef}
          cameraStream={cameraStream}
          takePhoto={takePhoto}
          canvasRef={canvasRef}
          handleAPI={(data) => { setValues((val) => ({ ...val, profileImage: data?.preview })); setIsuploadOpen(false); closeCameraStream() }}
        />
      )}

      {/* {getOldPatientData?.length > 0 && (
        <div
          style={{
            position: "absolute",
            zIndex: 9,
            width: "80%",
            top: "63px",
          }}
        >
          <EasyUI
            dataBind={getOldPatientData}
            dataColoum={BIND_TABLE_OLDPATIENTSEARCH_REG}
            onClick={handleClickEasyUI}
          />
        </div>
      )} */}
    </>
  );
}
