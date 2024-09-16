import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Tables from "../../../../UI/customTable/index"
const AdditionalEstimationTable = () => {
  const [t] = useTranslation();

  const THEAD = [
    t("helpDesk.CostEstimateBilling.S_No"),
    <input
        type='checkbox'
        name="input"
        className="table-form-control"
    />,
    t("helpDesk.CostEstimateBilling.Department"),
    t("helpDesk.CostEstimateBilling.Remarks"),
    t("helpDesk.CostEstimateBilling.Amount")

];

const [bodyData, setBodyData] = useState([
  {
      "S.No.": 1,
      "RoomType": <input type='checkbox'
          name="input"
          className="table-form-control"
      />,
      "Doctor_Name ": "Department",
      "Remarks": <input
          name="input"
          className="table-form-control"
      />,
      "Amount": <input
          name="input"
          className="table-form-control"
      />,

  },
  {
      "S.No.": 2,
      "RoomType": <input type='checkbox'
          name="input"
          className="table-form-control"
      />,
      "Doctor_Name ": "Department2",
      "Remarks": <input
          name="input"
          className="table-form-control"
      />,
      "Amount": <input
          name="input"
          className="table-form-control"
      />,

  },
]);

  return (
    <>
      <Tables thead={THEAD} tbody={bodyData} />
    </>
  )
}

export default AdditionalEstimationTable