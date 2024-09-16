import React, { useCallback } from "react";
import Tables from "..";
import HtmlSelect from "../../../formComponent/HtmlSelect";
import Input from "../../../formComponent/Input";

function PaymentTable(props) {
  const {
    getBankMasterData,
    tbody,
    handleChange,
    handlePaymentRemove,
    getMachineData,
  } = props;

  const THEAD = [
    "Payment Mode",
    "Paid Amount",
    "Currency",
    "Bank Name",
    "Ref No.",
    "Machine",
    "Base",
    "Action",
  ];

  const settleValue = (row, index) => {
    const tableData = {
      PaymentMode: null,
      Paid_Amount: null,
      currency: null,
      BankName: null,
      RefNo: null,
      Machine: null,
      Base: null,
      Action: null,
    };

    // payment mode;
    tableData.PaymentMode = row?.PaymentMode;

    // Paid_Amount

    tableData.Paid_Amount = (
      <Input
        className="table-input text-right"
        value={row?.S_Amount}
        removeFormGroupClass={true}
        name="S_Amount"
        onChange={(e) => handleChange(e, index)}
      />
    );

    // currency

    tableData.currency = row?.S_Notation;

    // BankName
    if (![1, 4].includes(row?.PaymentModeID)) {
      tableData.BankName = (
        <HtmlSelect
          name="BankName"
          option={[
            { label: "Select Bank", value: "" },
            ...getBankMasterData?.map((ele) => {
              return {
                label: ele?.BankName,
                value: ele?.Bank_ID,
              };
            }),
          ]}
          value={row?.BankName}
          onChange={(e) => handleChange(e, index)}
        />
      );
    }

    // RefNo

    if (![1, 4].includes(row?.PaymentModeID)) {
      tableData.RefNo = (
        <Input
          className="table-input"
          type="text"
          value={row?.RefNo}
          name="RefNo"
          onChange={(e) => handleChange(e, index)}
        />
      );
    }

    if (![1, 2, 4].includes(row?.PaymentModeID)) {
      tableData.Machine = (
        <HtmlSelect
          name="swipeMachine"
          option={[
            { label: "Select Machine", value: "" },
            ...getMachineData?.map((ele) => {
              return {
                label: ele?.MachineName,
                value: ele?.MachineID,
              };
            }),
          ]}
          value={row?.swipeMachine}
          onChange={(e) => handleChange(e, index)}
        />
      );
    }

    tableData.Base = `${row?.Amount} ${row?.BaseCurrency}`;

    tableData.Action = (
      <i
        class="fa fa-trash text-danger text-center"
        aria-hidden="true"
        onClick={() => handlePaymentRemove(index)}
      ></i>
    );

    return tableData;
  };

  return (
    <>
      <Tables
        thead={THEAD}
        style={{ maxHeight: "90px" }}
        tbody={tbody?.map((row, index) => {
          const {
            PaymentMode,
            Paid_Amount,
            currency,
            BankName,
            RefNo,
            Machine,
            Base,
            Action,
          } = settleValue(row, index);
          return {
            PaymentMode,
            Paid_Amount,
            currency,
            BankName,
            RefNo,
            Machine,
            Base,
            Action,
          };
        })}
      />
    </>
  );
}

export default PaymentTable;
