import React from "react";
import Tables from "..";
import { useTranslation } from "react-i18next";

const ExpenseVoucherTable = (props) => {
  const { tbody,handleSetClickData } = props;
  const [t] = useTranslation();

  const THEAD = [
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.S.no"),
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.ReceiptNo"),
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.Received_Against_Receipt"),
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.Date"),
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.Amount_Paid"),
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.Adjustment"),
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.ExpenceType"),
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.Name"),
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.Remarks"),
    t("FrontOffice.Tools.ExpenseVoucher.table.thead.Receive"),
  ];

  const getRowClass = (rowData) => {
    if (rowData.PaymentType === "Received") {
      return "highlight-row";
    }
    return "";
  };
  return (
    <>
      <Tables
        thead={THEAD}
        tbody={tbody.map((item, index) => ({
          "S.no": index + 1,
          ReceiptNo: item?.ReceiptNo,
          ReceivedAgainstReceiptNo: item?.ReceivedAgainstReceiptNo,
          Date: item?.Date,
          Amount_Paid: item?.AmountPaid,
          Adjustment: item?.AdjustmentAmount ,
          PaymentType: item?.PaymentType,
          Name: item?.NAME,
          Remarks: item?.Naration,
          Receive: (
            <>
              {item.PaymentType === " Issue" ? (
                <i className="pi pi-check" onClick={()=> handleSetClickData(item)}></i>
              ) : (
                null
              )}
            </>
          ),
        }))}
        getRowClass={getRowClass}
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default ExpenseVoucherTable;
