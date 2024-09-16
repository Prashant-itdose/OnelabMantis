import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Tables from "../../../../UI/customTable/index"
const SearchingCriteriaTable = () => {
  const [t] = useTranslation();

  const THEAD = [
    t("helpDesk.CostEstimateBilling.S_No"),
    t("helpDesk.CostEstimateBilling.RoomType"),
    t("helpDesk.CostEstimateBilling.Doctor_Name"),
    t("helpDesk.CostEstimateBilling.Panel_Name"),
    t("helpDesk.CostEstimateBilling.Bill_No"),
    t("helpDesk.CostEstimateBilling.Bill_Date"),
    t("helpDesk.CostEstimateBilling.Bill_Amount"),

];
const [bodyData, setBodyData] = useState([
  {
      "S.No.": 1,
      "RoomType": "ASHWINI EXECUTIVE HEALTH CHECK UP",
      "Doctor_Name ": "ABhat",
      "Panel_Name": "Panel_Name	",
      "Bill_No": "12312",
      "Bill_Date": "12/12/2023",
      "Bill_Amount ": "500 ₹",
  },
]);

  return (
    <>
      <Tables thead={THEAD} tbody={bodyData} />
    </>
  )
}

export default SearchingCriteriaTable