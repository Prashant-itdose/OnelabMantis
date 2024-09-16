import React, { useState } from "react";
import ReactSelect from "@app/components/formComponent/ReactSelect";
import Input from "@app/components/formComponent/Input";
import { useTranslation } from "react-i18next";
import ReferenceTypeModel from "../modalComponent/Utils/ReferenceTypeModel";
import Modal from "../modalComponent/Modal";
import { filterByType, filterByTypes, inputBoxValidation } from "../../utils/utils";
import { CentreWiseCacheByCenterID, ReferenceTypeInsert } from "../../store/reducers/common/CommonExportFunction";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../../utils/constant";
export default function OtherDetails({ CentreWiseCache,
  handleChange,
  values,
  handleReactSelect, }) {
  const [t] = useTranslation();
  const [handleModelData, setHandleModelData] = useState({});
  const [modalData, setModalData] = useState({});
  const handleModel = (label, width, type, isOpen, Component, handleInsertAPI) => {
    setHandleModelData({ label: label, width: width, type: type, isOpen: isOpen, Component: Component, handleInsertAPI })
  }
  const handleChangeModel = (data) => {

    setModalData(data);
  };
  const userData = useLocalStorage("userData", "get");
  const dispatch = useDispatch();
  const handleReferenceTypeAPI = async (data) => {


    let insData = await dispatch(ReferenceTypeInsert(data));
    if (insData?.payload?.status) {
      setModalData({});
      setHandleModelData((val) => ({ ...val, isOpen: false }));
      dispatch(
        CentreWiseCacheByCenterID({
          centreID: userData?.defaultCentre,
        })
      );
    }
  };

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }))
  }
  return (
    <>
      <div className="row  g-4 pt-2 pl-2 pr-2">
        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <div className="row">
            <Input
              type="text"
              className="form-control"
              id="std_code"
              name="Phone_STDCODE"
              value={values?.Phone_STDCODE ? values?.Phone_STDCODE : values?.countryID?.extraColomn}
              // onChange={handleChange}
              readOnly={true}
              
              lable={t("FrontOffice.OPD.patientRegistration.Code")}
              placeholder=" "
              respclass="col-4"
            />

            <Input
              type="text"
              className="form-control"
              id="LandLine_No"
              name="Phone"
              value={values?.Phone}
              onChange={(e) => { inputBoxValidation(MOBILE_NUMBER_VALIDATION_REGX, e, handleChange) }}
              showTooltipCount={true}
              lable={t("FrontOffice.OPD.patientRegistration.LandLine_No")}
              placeholder=" "
              respclass="col-8"
            />
          </div>
        </div>

        <Input
          type="text"
          className="form-control"
          id="Birth_Place"
          name="placeofBirth"
          value={values?.placeofBirth}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.Birth_Place")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <ReactSelect
          placeholderName={t("FrontOffice.OPD.patientRegistration.Religion")}
          searchable={true}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          id="Religion"
          name="Religion"
          value={values?.Religion}
          handleChange={handleReactSelect}
          dynamicOptions={filterByType(
            CentreWiseCache,
            14,
            "TypeID",
            "TextField",
            "ValueField"
          )}
        />
        <ReactSelect
          placeholderName={t("FrontOffice.OPD.patientRegistration.Relation_Of")}
          id="Relation_Of"
          searchable={true}
          name="Relation"
          value={values?.Relation}
          handleChange={handleReactSelect}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          dynamicOptions={filterByType(
            CentreWiseCache,
            6,
            "TypeID",
            "TextField",
            "ValueField"
          )}
        />

        <Input
          type="text"
          className="form-control"
          id="Relation_Name"
          name="RelationName"
          value={values?.RelationName}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.Relation_Name")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <Input
          type="text"
          className="form-control"
          id="Relation_Phone"
          name="RelationPhoneNo"
          value={values?.RelationPhoneNo}
          onChange={(e) => { inputBoxValidation(MOBILE_NUMBER_VALIDATION_REGX, e, handleChange) }}
          showTooltipCount={true}
          lable={t("FrontOffice.OPD.patientRegistration.Relation_Phone")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <Input
          type="text"
          className="form-control"
          id="EMG_First_Name"
          name="EmergencyFirstName"
          value={values?.EmergencyFirstName}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.EMG_First_Name")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <Input
          type="text"
          className="form-control"
          id="EMG_Last_Name"
          name="EmergencySecondName"
          value={values?.EmergencySecondName}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.EMG_Last_Name")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <ReactSelect
          placeholderName={t(
            "FrontOffice.OPD.patientRegistration.EMG_Relation"
          )}
          id="EMG_Relation"
          name="EmergencyRelationOf"
          value={values?.EmergencyRelationOf}
          handleChange={handleReactSelect}
          searchable={true}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          dynamicOptions={filterByType(
            CentreWiseCache,
            6,
            "TypeID",
            "TextField",
            "ValueField"
          )}
        />

        <Input
          type="text"
          className="form-control"
          id="EMG_Mobile_No"
          name="EmergencyPhoneNo"
          value={values?.EmergencyPhoneNo}
          onChange={(e) => { inputBoxValidation(MOBILE_NUMBER_VALIDATION_REGX, e, handleChange) }}
          showTooltipCount={true}
          lable={t("FrontOffice.OPD.patientRegistration.EMG_Mobile_No")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <div className="row">
            <Input
              type="text"
              className="form-control"
              id="emg_std_code"
              name='ResidentialNumber_STDCODE'
              value={values?.ResidentialNumber_STDCODE ? values?.ResidentialNumber_STDCODE : values?.countryID?.extraColomn}
              onChange={handleChange}
              readOnly={true}
              lable={t("FrontOffice.OPD.patientRegistration.Code")}
              placeholder=" "
              respclass="col-4"

            />

            <Input
              type="text"
              className="form-control"
              id="EMG_Resident_No"
              name="ResidentialNumber"
              value={values?.ResidentialNumber}
              onChange={(e) => { inputBoxValidation(MOBILE_NUMBER_VALIDATION_REGX, e, handleChange) }}
              showTooltipCount={true}
              lable={t("FrontOffice.OPD.patientRegistration.EMG_Resident_No")}
              placeholder=" "
              respclass="col-8"
            />
          </div>
        </div>

        <Input
          type="text"
          className="form-control"
          id="EMG_Address"
          name="EmergencyAddress"
          value={values?.EmergencyAddress}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.EMG_Address")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <ReactSelect
          placeholderName={t("FrontOffice.OPD.patientRegistration.IsInternational")}
          id="IsInternational"
          name="IsInternational"
          value={`${values?.IsInternational}`}
          handleChange={handleReactSelect}
          dynamicOptions={[{ "label": "YES", "value": "1" }, { "label": "NO", "value": "2" }]}
          // searchable={true}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <ReactSelect
          placeholderName={t("FrontOffice.OPD.patientRegistration.Country")}
          id="Country"
          searchable={true}
          name='InternationalCountryID'
          value={`${values?.InternationalCountryID}`}
          handleChange={handleReactSelect}
          requiredClassName={`${(values?.IsInternational?.value ? values?.IsInternational?.value : values?.IsInternational) === "2" ? "disable-focus" : ""}`}
          isDisabled={(values?.IsInternational?.value ? values?.IsInternational?.value : values?.IsInternational) === "2" ? true : false}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          dynamicOptions={filterByTypes(
            CentreWiseCache,
            [7],
            ["TypeID"],
            "TextField",
            "ValueField",
            "STD_CODE"
          )}
        />


        <Input
          type="text"
          className={`form-control ${(values?.IsInternational?.value ? values?.IsInternational?.value : values?.IsInternational) === "2" ? "disable-focus" : ""}`}
          id="Passport_No"
          name="Passport_No"
          value={values?.Passport_No}
          onChange={handleChange}
          disabled={(values?.IsInternational?.value ? values?.IsInternational?.value : values?.IsInternational) === "2" ? true : false}
          lable={t("FrontOffice.OPD.patientRegistration.Passport_Number")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <Input
          type="text"
          className={`form-control ${(values?.IsInternational?.value ? values?.IsInternational?.value : values?.IsInternational) === "2" ? "disable-focus" : ""}`}
          id="International_No"
          name="InternationalNumber"
          value={values?.InternationalNumber}
          onChange={handleChange}
          readOnly={(values?.IsInternational?.value ? values?.IsInternational?.value : values?.IsInternational) === "2" ? true : false}
          lable={t("FrontOffice.OPD.patientRegistration.International_No")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <Input
          type="text"
          className="form-control"
          id="Locality"
          name="Place"
          value={values?.Place}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.Locality")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />

        <Input
          type="text"
          className="form-control"
          id="Membership_No"
          name="MemberShipCardNo"
          value={values?.MemberShipCardNo}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.Membership_No")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />
        <ReactSelect
          placeholderName={t("FrontOffice.OPD.patientRegistration.Patient_Type")}
          searchable={true}
          id={"PatientType"}
          name='HospPatientType'
          value={`${values?.HospPatientType}`}
          handleChange={handleReactSelect}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          dynamicOptions={filterByType(
            CentreWiseCache,
            12,
            "TypeID",
            "TextField",
            "ValueField"
          )}
        />

        <Input
          type="text"
          className="form-control"
          id="Emp_refID"
           name="Emp_refID"
          value={values?.Emp_refID}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.Emp_refID")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />
        <Input
          type="text"
          className="form-control"
          id="IdentificationMark"
          name="IdentificationMark"
          value={values?.IdentificationMark}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.Identity_Mark")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />
        <Input
          type="text"
          className="form-control"
          id="IdentificationMarkSecond"
          name="IdentificationMarkSecond"
          value={values?.IdentificationMarkSecond}
          onChange={handleChange}
          lable={t("FrontOffice.OPD.patientRegistration.Identity_Mark2")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        />


        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <div className="d-flex">
            <ReactSelect
              placeholderName={t("FrontOffice.OPD.patientRegistration.Reference_Type")}
              id="ReferenceType"
              searchable={true}
              respclass="w-100 pr-2"
              name='TypeOfReference'
              value={values?.TypeOfReference}
              handleChange={handleReactSelect}
              // respclass="col-sm-10 col-lg-10 col-md-10 col-lg-10 col-xl-10 col-xxl-10 col-11"
              dynamicOptions={filterByType(
                CentreWiseCache,
                20,
                "TypeID",
                "TextField",
                "ValueField"
              )}
            />
              <div >
            <button
              className="btn btn-sm btn-primary"
              onClick={() => handleModel("modalComponent.Utils.ReferenceTypeModel.Add_ReferenceType", '20vw', 'ReferenceType', true, <ReferenceTypeModel
                handleChangeModel={handleChangeModel}
                inputData={{
                  userID: userData?.employeeID,
                }} />, handleReferenceTypeAPI)}
              type="button"
            >
              <i className="fa fa-plus-circle fa-sm new_record_pluse"></i>
            </button>
            </div>
          </div>
        </div>

        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <div className="row">
            <Input
              type="text"
              className="form-control"
              id="MLC_NO"
              onChange={(e) => { inputBoxValidation(MOBILE_NUMBER_VALIDATION_REGX, e, handleChange) }}
              showTooltipCount={true}
              value={values?.MLC_NO}
              name="MLC_NO"
              lable={t("FrontOffice.OPD.patientRegistration.MLC_NO")}
              placeholder=" "
              respclass="col-6"
            />

            <ReactSelect
              placeholderName={t("FrontOffice.OPD.patientRegistration.MLC")}
              id={"MLC"}
              searchable={true}
              name="MLC_Type"
              value={values?.MLC_Type}
              handleChange={handleReactSelect}
              respclass="col-6"
              dynamicOptions={filterByType(
                CentreWiseCache,
                23,
                "TypeID",
                "TextField",
                "ValueField"
              )}
            />
          </div>
        </div>
        {/* <Input
          type="text"
          className="form-control"
          id="Remarks"
          name="barcode"
          lable={t("FrontOffice.OPD.patientRegistration.Remarks")}
          placeholder=" "
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        /> */}
      </div>

      {handleModelData?.isOpen && (
        <Modal
          visible={handleModelData?.isOpen}
          setVisible={setIsOpen}
          modalWidth={handleModelData?.width}
          Header={t(handleModelData?.label)}
          handleAPI={handleModelData?.handleInsertAPI}
          setModalData={setModalData}
          modalData={modalData}

        >
          {handleModelData?.Component}
        </Modal>
      )}
    </>
  );
}
