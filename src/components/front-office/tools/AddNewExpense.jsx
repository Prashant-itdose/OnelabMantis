import React, { useState } from "react";
import Input from "@app/components/formComponent/Input";
import ReactSelect from "../../formComponent/ReactSelect";
import { useTranslation } from "react-i18next";
import { filterByTypes, notify } from "../../../utils/utils";
import { useSelector } from "react-redux";

const AddNewExpense = (props) => {
  const {
    handleReactSelectChange,
    apiData,
    handleModel,
    inputValues,
    inputHandleChange,
    inputData,
    handleInput,
    handleAddExpenseTo,
    selectedItem,
    // notifyError
  } = props;
  // console.log("inputValues.ExpenceType", inputValues.ExpenceType);
  const { GetRoleList } = useSelector((state) => state?.CommonSlice);
  const [t] = useTranslation();
  const typeD = [
    { label: "Employees", value: 1 },
    { label: "Doctors", value: 2 },
    { label: "Other", value: 3 },
  ];
  console.log(selectedItem);
  return (
    <>
      <div className="row p-2">
        {inputValues.receivedAgainstReceiptNo && (
          <Input
            type="text"
            className="form-control "
            id="eceiptNo"
            name="ReceiptNo"
            lable={"Receipt No"}
            placeholder=" "
            value={inputValues.receivedAgainstReceiptNo}
            // onChange={searchHandleChange}
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            disabled={true}
          />
        )}
        <ReactSelect
          placeholderName={t(
            "FrontOffice.Tools.ExpenseVoucher.ExpDetail.paymentType"
          )}
          id={"paymentType"}
          searchable={true}
          respclass="col-xl-2 col-md-2 col-sm-6 col-12 "
          dynamicOptions={[
            { label: "Issue", value: 1 },
            { label: "Received", value: 2 },
          ]}
          // defaultValue={{label: "Issue", value: 1 }}
          name={"paymentType"}
          value={inputValues.paymentType}
          isDisabled={inputValues.paymentType === 1 ? true : true}
          // defaultValue={inputValues.paymentType}
          handleChange={handleReactSelectChange}
        //  inputId="PanelGroupFocus"
        />
        <ReactSelect
          placeholderName={t(
            "FrontOffice.Tools.ExpenseVoucher.ExpDetail.EmployeeType"
          )}
          id={"employeeType"}
          searchable={true}
          respclass="col-xl-2 col-md-2 col-sm-6 col-12"
          requiredClassName="required-fields"
          dynamicOptions={typeD.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          name={"employeeType"}
          value={inputValues.employeeType && selectedItem?.EmployeeType}
          handleChange={handleReactSelectChange}
          inputId="PanelFocus"
        />
        {inputValues.employeeType.value === 3 ? (
          <Input
            type="text"
            className="form-control "
            id="Name"
            name="employeeID"
            lable={"Employee Name"}
            placeholder=" "
            value={inputValues.employeeID}
            onChange={inputHandleChange}
            // onChange={searchHandleChange}
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            disabled={false}
          />
        ) : (
          <ReactSelect
            placeholderName={t(
              "FrontOffice.Tools.ExpenseVoucher.ExpDetail.Name"
            )}
            id={"Name"}
            searchable={true}
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            requiredClassName="required-fields"
            dynamicOptions={apiData?.employeeType?.map((ele) => ({
              value: ele.EmployeeID,
              label: ele.Name,
            }))}
            name={"employeeID"}
            value={inputValues.employeeID}
            defaultValue={inputValues.employeeID}
            handleChange={handleReactSelectChange}
          />
        )}

        <ReactSelect
          placeholderName={t(
            "FrontOffice.Tools.ExpenseVoucher.ExpDetail.Department"
          )}
          id={"Department"}
          searchable={true}
          respclass="col-xl-2 col-md-2 col-sm-6 col-12"
          requiredClassName="required-fields"
          dynamicOptions={GetRoleList?.map((ele) => {
            return {
              label: ele?.roleName,
              value: ele?.roleID,
            };
          })}
          name={"roleID"}
          value={inputValues.roleID}
          handleChange={handleReactSelectChange}
        />

        {inputValues.paymentType === 2 ? (
          <Input
            type="text"
            className="form-control "
            id="receiptNo"
            name="expenceTypeId"
            lable={"Expence Type"}
            placeholder=" "
            value={selectedItem.ExpenceType}
            // onChange={searchHandleChange}
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            disabled={true}
          />
        ) : (
          <ReactSelect
            placeholderName={t(
              "FrontOffice.Tools.ExpenseVoucher.ExpDetail.ExpenceType"
            )}
            id={"ExpenceType"}
            searchable={true}
            respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            requiredClassName="required-fields"
            dynamicOptions={apiData?.GetExpenseAPIData?.map((ele) => ({
              value: ele.id,
              label: ele.ExpenceHead,
            }))}
            name={"expenceTypeId"}
            value={inputValues.expenceTypeId}
            // defaultValue={selectedItem?.ExpenceTypeId}
            handleChange={handleReactSelectChange}
          />
        )}
        <div className="col-xl-2 col-md-2 col-sm-6 col-12">
          <div className="box-size">
            <div className="box-upper">
              <ReactSelect
                placeholderName={t(
                  "FrontOffice.Tools.ExpenseVoucher.ExpDetail.ExpenceTo"
                )}
                title={"ExpenceTo"}
                id="expenceToId"
                searchable={true}
                respclass="opdadvance"
                requiredClassName="required-fields"
                dynamicOptions={apiData?.getExpenceHeadAPIData?.map((ele) => ({
                  value: ele.subhead_ID,
                  label: ele.subhead_name,
                }))}
                name={"expenceToId"}
                value={inputValues.expenceToId}
                handleChange={handleReactSelectChange}
              // isDisabled={inputValues.ExpenceToId}
              />
            </div>
            <div className="box-inner">
              <button
                className="btn btn-sm btn-primary"
                type="button"
                onClick={() =>
                  handleModel(
                    "Create New Expence To",
                    "25vw",
                    "add",
                    true,
                    handleAddExpenseTo
                  )
                }
              >
                <i className="fa fa-plus-circle fa-sm new_record_pluse"></i>
              </button>
            </div>
          </div>
        </div>

        <Input
          type="number"
          className="form-control required-fields"
          id="Amount"
          name="amountPaid"
          lable={t("FrontOffice.Tools.ExpenseVoucher.ExpDetail.Amount")}
          placeholder=" "
          //   required={true}
          respclass="col-xl-2 col-md-2 col-sm-6 col-12"
          value={inputValues.amountPaid}
          onChange={inputHandleChange}
        />
        <ReactSelect
          placeholderName={t(
            "FrontOffice.Tools.ExpenseVoucher.ExpDetail.ApprovedBy"
          )}
          id={"ApprovedBy"}
          searchable={true}
          respclass="col-xl-2 col-md-2 col-sm-6 col-12"
          requiredClassName="required-fields"
          name={"approvedBy"}
          dynamicOptions={[
            {
              value: apiData?.getApprovedAPIData?.data?.ApprovalType,
              label: apiData?.getApprovedAPIData?.data?.ApprovalType,
            },
          ]}
          value={inputValues.approvedBy}
          handleChange={handleReactSelectChange}
        />

        <div className="col-xl-2 col-md-2 col-sm-6 col-12">
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder=" "
              id="Local_Address"
              name="naration"
              value={inputValues.naration}
              onChange={inputHandleChange}
            ></textarea>
            <label for="Local_Address" className="lable truncate">
              {t("FrontOffice.Tools.ExpenseVoucher.ExpDetail.Remarks")}
            </label>
          </div>
        </div>
        <div className="box-inner text-center">
          <button className="btn btn-sm btn-primary ml-2" type="submit">
            {t("FrontOffice.Tools.ExpenseVoucher.btnName")}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNewExpense;
