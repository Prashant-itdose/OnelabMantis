import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactSelect from "../formComponent/ReactSelect";
import i18n from "@app/utils/i18n";
import Input from "@app/components/formComponent/Input";
import { useTranslation } from "react-i18next";
import Modal from "../modalComponent/Modal";
import Tables from "../UI/customTable";
import AttachDoumentModal from "../modalComponent/Utils/AttachDoumentModal";
import {
  bindLabelValue,
  filterByType,
  filterByTypes,
  inputBoxValidation,
  notify,
} from "../../utils/utils";
import DatePicker from "../formComponent/DatePicker";
import moment from "moment";
import { AMOUNT_REGX } from "../../utils/constant";

const PanelDetails = ({
  CentreWiseCache,
  CentreWisePanelControlCacheList,
  handleChangePanelDetail,
  values,
  setValues,
  handleReactSelect,
  PanelPatientDetailList,
  setPanelBodyData,
  panelBodyData,
}) => {
  const [t] = useTranslation();
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [isDesabled, setIsDesabled] = useState(false);
  // const [bodyData, setBodyData] = useState([]);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isuploadOpen, setIsuploadOpen] = useState(false);
  const [isEditable, setIsEditable] = useState({});
  const [handleModelData, setHandleModelData] = useState({});
  const handleModel = (label, width, type, isOpen, Component, buttons) => {
    setHandleModelData({
      label: label,
      width: width,
      type: type,
      isOpen: isOpen,
      Component: Component,
      buttons: buttons,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      // setImage(file);
      setPreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const inputRef = useRef(null);

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };

  const headData = [
    "Panel Group",
    "Panel",
    "Parent Panel",
    "Corporate",
    "Policy No.",
    "Policy Card No.",
    "Name On Card",
    "Expire Date",
    "Card holder",
    "Approval Account",
    "Approval Remark",
    "Upload_Document",
    "Actions",
  ];

  useEffect(() => {
    if (PanelPatientDetailList?.length > 0) {
      let panelDetailTableData = [];
      PanelPatientDetailList?.map((obj) => {
        if (obj?.PanelName !== "CASH") {
          let panelItem = {};
          panelItem["PanelGroup"] = bindLabelValue(
            obj?.PanelGroup,
            obj?.PanelGroupID
          );
          panelItem["PanelName"] = bindLabelValue(obj?.PanelName, obj?.PanelID);
          panelItem["ParentPanel"] = bindLabelValue(
            obj?.ParentPanel,
            obj?.ParentPanelID
          );
          panelItem["CorporareName"] = bindLabelValue(
            obj?.CorporareName,
            obj?.PanelCroporateID
          );
          panelItem["PolicyNo"] = obj?.PolicyNo;
          panelItem["PolicyCardNo"] = obj?.PolicyCardNo;
          panelItem["PanelCardName"] = obj?.PanelCardName;
          panelItem["PolicyExpiry"] = obj?.PolicyExpiry;
          panelItem["CardHolder"] = bindLabelValue(
            obj?.CardHolder,
            obj?.CardHolder
          );
          panelItem["ApprovalAmount"] = obj?.ApprovalAmount;
          panelItem["ApprovalRemarks"] = obj?.ApprovalRemarks;
          panelDetailTableData.push(panelItem);
        }
      });
      setPanelBodyData(panelDetailTableData);
    }
  }, [PanelPatientDetailList]);

  const ErrorHandling = () => {
    let errors = {};
    errors.id = [];
    if (!values?.PanelGroup) {
      errors.PanelGroup = "Panel Group Is Required";
      errors.id[errors.id?.length] = "PanelGroupFocus";
    }
    if (!values?.ParentPanel) {
      errors.ParentPanel = "Parent Panel Is Required";
      errors.id[errors.id?.length] = "ParentPanelFocus";
    }
    if (!values?.PanelName) {
      errors.PanelName = "Panel Is Required";
      errors.id[errors.id?.length] = "PanelFocus";
    }
    if (!values?.PolicyNo) {
      errors.PolicyNo = "Policy No Is Required";
      errors.id[errors.id?.length] = "PolicyNo";
    }
    if (!values?.PolicyCardNo) {
      errors.PolicyCardNo = "Policy Card No Is Required";
      errors.id[errors.id?.length] = "PolicyCardNo";
    }
    if (!values?.PanelCardName) {
      errors.PanelCardName = "Name On Card Is Required";
      errors.id[errors.id?.length] = "PanelCardName";
    }
    if (!values?.PolicyExpiry) {
      errors.PolicyExpiry = "Expire Date Is Required";
      errors.id[errors.id?.length] = "PolicyExpiry";
    }
    if (!values?.CardHolder) {
      errors.CardHolder = "Card Holder Is Required";
      errors.id[errors.id?.length] = "CardHolderFocus";
    }
    if (!values?.ApprovalAmount) {
      errors.ApprovalAmount = "Approval Amount Is Required";
      errors.id[errors.id?.length] = "ApprovalAmount";
    }
    if (!values?.ApprovalRemarks) {
      errors.ApprovalRemarks = "Approval Remark Is Required";
      errors.id[errors.id?.length] = "ApprovalRemarks";
    }

    return errors;
  };

  useEffect(() => {
    if (errors?.id) {
      const inputElement = document.getElementById(errors?.id[0]);
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [errors]);


  const handleSavePanelDetail = () => {
    const customerrors = ErrorHandling();
    if (Object.keys(customerrors)?.length > 1) {
      if (Object.values(customerrors)[0]) {
        notify(Object.values(customerrors)[1], "error");
        setErrors(customerrors);
      }
      return false;
    }



    setPanelBodyData((val) => [
      {
        PanelGroup: values?.PanelGroup,
        PanelName: values?.PanelName,
        ParentPanel: values?.ParentPanel,
        CorporareName: values?.CorporareName,
        PolicyNo: values?.PolicyNo,
        PolicyCardNo: values?.PolicyCardNo,
        PanelCardName: values?.PanelCardName,
        PolicyExpiry: moment(new Date(values?.PolicyExpiry)).format('DD-MM-YYYY'),
        CardHolder: values?.CardHolder,
        ApprovalAmount: values?.ApprovalAmount,
        ApprovalRemarks: values?.ApprovalRemarks,
      },
      ...val,
    ]);

    setValues((val) => ({
      ...val,
      PanelGroup: {label:"",value:""},
      PanelName: {label:"",value:""},
      ParentPanel: {label:"",value:""},
      CorporareName: {label:"",value:""},
      PolicyNo: "",
      PolicyCardNo: "",
      PanelCardName: "",
      PolicyExpiry: "",
      CardHolder: {label:"",value:""},
      ApprovalAmount: "",
      ApprovalRemarks: "",
    }));
  };
  const handleUpdatePanelDetail = () => {
    const customerrors = ErrorHandling();
    if (Object.keys(customerrors)?.length > 1) {
      if (Object.values(customerrors)[0]) {
        notify(Object.values(customerrors)[1], "error");
        setErrors(customerrors);
      }
      return false;
    }

    let panelDetailTableData = panelBodyData?.map((obj, key) => {
      if (key === isEditable?.index) {
        obj["PanelGroup"] = values?.PanelGroup;
        obj["PanelName"] = values?.PanelName;
        obj["ParentPanel"] = values?.ParentPanel;
        obj["CorporareName"] = values?.CorporareName;
        obj["PolicyNo"] = values?.PolicyNo;
        obj["PolicyCardNo"] = values?.PolicyCardNo;
        obj["PanelCardName"] = values?.PanelCardName;
        obj["PolicyExpiry"] = values?.PolicyExpiry;
        obj["CardHolder"] = values?.CardHolder;
        obj["ApprovalAmount"] = values?.ApprovalAmount;
        obj["ApprovalRemarks"] = values?.ApprovalRemarks;
      }
      return obj;
    });

    setPanelBodyData(panelDetailTableData);

    setValues((val) => ({
      ...val,
      PanelGroup: {},
      PanelName: "",
      ParentPanel: "",
      CorporareName: "",
      PolicyNo: "",
      PolicyCardNo: "",
      PanelCardName: "",
      PolicyExpiry: "",
      CardHolder: "",
      ApprovalAmount: "",
      ApprovalRemarks: "",
    }));
    setIsEditable({ status: false, index: null });
  };

  // Dynamically generate THEAD using bodyData keys
  const THEAD = headData?.map((key) => {
    // Capitalize first letter and replace underscores with spaces
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
  });
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const data = [...panelBodyData];
    data[index][name] = (
      <input
        value={value}
        onChange={(e) => handleChange(e, index)}
        name="input"
      />
    );
    setPanelBodyData(data);
  };

  const handleEditAction = (index) => {
    let editData = panelBodyData?.find((item, i) => i === index);
    Object.keys(editData).forEach((key) => {
      values[key] = editData[key];
    });
    let ParentPanel = { ...values?.ParentPanel, extraColomn: values?.ParentPanel?.value }
    let PanelName = { ...values?.PanelName, extraColomn: values?.PanelName?.value }
    values.ParentPanel = ParentPanel
    values.PanelName = PanelName
    setIsEditable({ status: true, index: index });
    setValues(values);
  };

  const handleDeleteAction = (index) => {
    let editData = panelBodyData?.filter((item, i) => i !== index);
    setPanelBodyData(editData);
  };
  const handleChangeParentPanel = (name, value) => {
    setValues((val) => ({ ...val, [name]: value, PanelName: value }))
  }


  const handleAddPanelTable = useCallback((panelBodyData) => {
    return (
      panelBodyData?.map((val, key) => {
        val["Upload_Document"] = (
          <>
            <button
              className="btn btn-primary btn-sm w-50 "
              type="button"
              disabled={isDesabled}
              onClick={() => setIsuploadOpen(true)}
            >
              {t(
                "FrontOffice.OPD.billingDetails.label.Panel_Required_Document",
                {
                  quantity: "0",
                }
              )}
              {/* <i class="fa fa-file ml-1" aria-hidden="true"></i> */}
            </button>
          </>
        );

        val["Actions"] = (
          <>
            <span
              className="mx-2"
              onClick={(e) => {
                handleEditAction(key);
              }}
            >
              <i className="fa fa-edit" aria-hidden="true"></i>
            </span>
            <span
              className="mx-2"
              onClick={(e) => {
                handleDeleteAction(key);
              }}
            >
              <i className="fa fa-trash text-danger text-center" aria-hidden="true"></i>
            </span>
          </>
        );

        return val;
      })
    )
  }, [panelBodyData.length])


  return (
    <>
      {isuploadOpen && (
        <AttachDoumentModal
          isuploadOpen={isuploadOpen}
          setIsuploadOpen={setIsuploadOpen}
          preview={preview}
          modelHeader={"Panel Document"}
          handleImageChange={handleImageChange}
        />
      )}
      <div className="row g-4 pt-2 pl-2 pr-2">
        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <div className="form-group">
            <ReactSelect
              placeholderName={i18n.t(
                "FrontOffice.OPD.billingDetails.label.PanelGroup"
              )}
              dynamicOptions={filterByType(
                CentreWisePanelControlCacheList,
                4,
                "TypeID",
                "TextField",
                "ValueField"
              )}
              name="PanelGroup"
              value={`${values?.PanelGroup?.value}`}
              // defaultValue={values?.PanelGroupID}
              handleChange={handleReactSelect}
              requiredClassName={`required-fields ${errors?.PanelGroup ? "required-fields-active" : ""}`}
              id="PanelGroup"
              inputId="PanelGroupFocus"
              searchable={true}
              //tabIndex="6"
            />
          </div>
        </div>

        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <div className="form-group">
            <ReactSelect
              placeholderName={i18n.t(
                "FrontOffice.OPD.billingDetails.label.ParentPanel"
              )}
              // isDisabled={values?.PanelGroup?.value ? false : true}
              dynamicOptions={filterByTypes(
                CentreWisePanelControlCacheList,
                [1, parseInt(values?.PanelGroup?.value)],
                ["TypeID", "PanelGroupID"],
                "TextField",
                "ValueField",
                "ParentID"
              )}
              id="ParentPanel"
              inputId="ParentPanelFocus"
              name="ParentPanel"
              value={`${values?.ParentPanel?.value}`}
              handleChange={handleChangeParentPanel}
              searchable={true}
              requiredClassName={`required-fields ${errors?.ParentPanel ? "required-fields-active" : ""}`}
              //tabIndex="7"
            />
          </div>
        </div>

        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <div className="form-group">
            <ReactSelect
              placeholderName={i18n.t(
                "FrontOffice.OPD.billingDetails.label.Panel"
              )}
              // isDisabled={values?.PanelGroup?.value ? false : true}
              id="Panel"
              inputId="PanelFocus"
              name="PanelName"
              value={`${values?.PanelName?.value}`}
              handleChange={handleReactSelect}
              dynamicOptions={filterByTypes(
                CentreWisePanelControlCacheList,
                [1, parseInt(values?.ParentPanel?.extraColomn) === 0 ? NaN : parseInt(values?.ParentPanel?.extraColomn)],
                ["TypeID", "ParentID"],
                "TextField",
                "ValueField",
                "ParentID"
              )}
              requiredClassName={`required-fields ${errors?.PanelName ? "required-fields-active" : ""}`}
              searchable={true}
              //tabIndex="8"
            />
          </div>
        </div>

        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <div className="form-group">
            <ReactSelect
              placeholderName={i18n.t(
                "FrontOffice.OPD.billingDetails.label.Corporate"
              )}
              dynamicOptions={filterByTypes(
                CentreWisePanelControlCacheList,
                [2],
                ["TypeID"],
                "TextField",
                "ValueField"
              )}
              name="CorporareName"
              value={`${values?.CorporareName?.value}`}
              handleChange={handleReactSelect}
              id={"CorporareName"}
              searchable={true}
            />
          </div>
        </div>

        <div className="col-xl-2 col-md-3 col-sm-4 col-12 d-flex">
         
          <Input
            type="text"
            className={`form-control required-fields ${errors?.PolicyNo && "required-fields-active"}`}
            id="PolicyNo"
            name="PolicyNo"
            value={values?.PolicyNo}
            onChange={handleChangePanelDetail}
            inputRef={inputRef}
            disabled={isDesabled}
            lable={i18n.t("FrontOffice.OPD.billingDetails.label.Policy_No")}
            placeholder=" "
            respclass="w-100 ml-1"
            //tabIndex="9"
          />
        </div>

        <Input
          type="text"
          className={`form-control required-fields ${errors?.PolicyCardNo && "required-fields-active"}`}
          id="PolicyCardNo"
          name="PolicyCardNo"
          value={values?.PolicyCardNo}
          onChange={handleChangePanelDetail}
          lable={i18n.t("FrontOffice.OPD.billingDetails.label.Policy_Card_No")}
          placeholder=" "
          disabled={isDesabled}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          //tabIndex="10"
        />
       
        <Input
          type="text"
          className={`form-control required-fields ${errors?.PanelCardName && "required-fields-active"}`}
          id="PanelCardName"
          name="PanelCardName"
          value={values?.PanelCardName}
          onChange={handleChangePanelDetail}
          lable={i18n.t("FrontOffice.OPD.billingDetails.label.Name_On_Card")}
          placeholder=" "
          disabled={isDesabled}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          //tabIndex="11"
        />

        <DatePicker
          className={`custom-calendar required-fields ${errors?.PanelCardName && "required-fields-active"}`}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          id="PolicyExpiry"
          name="PolicyExpiry"
          value={values?.PolicyExpiry}
          handleChange={handleChangePanelDetail}
          lable={t("FrontOffice.OPD.billingDetails.label.Expire_Date")}
          placeholder={VITE_DATE_FORMAT}
          //tabIndex="12"
        />

        {/* <Input
          type="date"
          className={`form-control required-fields ${errors?.PolicyExpiry && "required-fields-active"}`}
          id="PolicyExpiry"
          name="PolicyExpiry"
          value={values?.PolicyExpiry}
          onChange={handleChangePanelDetail}
          lable={i18n.t("FrontOffice.OPD.billingDetails.label.Expire_Date")}
          placeholder=" "
          disabled={isDesabled}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
        /> */}

        <div className="col-xl-2 col-md-3 col-sm-4 col-12">
          <div className="form-group">
            <ReactSelect
              placeholderName={i18n.t(
                "FrontOffice.OPD.billingDetails.label.CardHolder"
              )}
              dynamicOptions={filterByTypes(
                CentreWisePanelControlCacheList,
                [3],
                ["TypeID"],
                "TextField",
                "ValueField"
              )}
              name="CardHolder"
              value={values?.CardHolder?.value}
              handleChange={handleReactSelect}
              isDisabled={isDesabled}
              id="CardHolder"
              inputId="CardHolderFocus"
              searchable={true}
              requiredClassName={`required-fields ${errors?.CardHolder ? "required-fields-active" : ""}`}
              //tabIndex="13"
            />
          </div>
        </div>

        <Input
          type="text"
          className={`form-control required-fields ${errors?.ApprovalAmount && "required-fields-active"}`}
          id="ApprovalAmount"
          name="ApprovalAmount"
          value={values?.ApprovalAmount}
          defaultValue={values?.ApprovalAmount}
          // onChange={handleChangePanelDetail}
          onChange={(e) => { inputBoxValidation(AMOUNT_REGX(8), e, handleChangePanelDetail) }}
          lable={i18n.t("FrontOffice.OPD.billingDetails.label.Approval_Amount")}
          placeholder=" "
          disabled={isDesabled}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          //tabIndex="14"
        />
        <Input
          type="text"
          className={`form-control required-fields ${errors?.ApprovalRemarks && "required-fields-active"}`}
          id="ApprovalRemarks"
          name="ApprovalRemarks"
          value={values?.ApprovalRemarks}
          onChange={handleChangePanelDetail}
          lable={i18n.t("FrontOffice.OPD.billingDetails.label.Approval_Remark")}
          placeholder=" "
          disabled={isDesabled}
          respclass="col-xl-2 col-md-3 col-sm-4 col-12"
          //tabIndex="15"
        />

        <div className="col-xl-2 col-md-3 col-sm-4 col-12 d-flex">
          {/* <button
            className="btn btn-primary btn-sm w-50 "
            disabled={isDesabled}
            onClick={() => setIsuploadOpen(true)}
          >
            {t("FrontOffice.OPD.billingDetails.label.Panel_Required_Document", {
              quantity: "0",
            })}
            <i class="fa fa-file ml-1" aria-hidden="true"></i>
          </button> */}
          {/* <button
            className="btn btn-primary btn-sm w-50 "
            disabled={isDesabled}
            onClick={() =>
              handleModel(
                "Panel Required Document's",
                "80vw",
                "Document",
                true,
                <AttachDoumentModal handleImageChange={handleImageChange} />,
                <>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <button className="btn btn-sm">
                    <label
                      htmlFor="fileInput"
                      className="text-white file-type-browse"
                    >
                      Browse
                    </label>
                  </button>
                </>
              )
            }
          >
            {t("FrontOffice.OPD.billingDetails.label.Panel_Required_Document", {
              quantity: "0",
            })}
            <i class="fa fa-file ml-1" aria-hidden="true"></i>
          </button> */}
          {isEditable?.status ? (
            <button
              className="btn btn-primary btn-sm  w-50 ml-1"
              type="button"
              onClick={handleUpdatePanelDetail}
            >
              {t("FrontOffice.OPD.billingDetails.label.update")}
              <i class="fa fa-edit ml-1" aria-hidden="true"></i>
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm  w-50 ml-1"
              type="button"
              onClick={handleSavePanelDetail}
            >
              {t("FrontOffice.OPD.billingDetails.label.add")}
              {/* <i class="fa fa-save ml-1" aria-hidden="true"></i> */}
            </button>
          )}
        </div>
      </div>


      {panelBodyData?.length ? (
        <Tables
          thead={THEAD}
          style={{
            maxHeight: "125px",
          }}
          tbody={handleAddPanelTable(panelBodyData)}
          fs={"12"}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default PanelDetails;
