import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Tables from "../../../../UI/customTable/index";
const index = () => {
  const [t] = useTranslation();

  const THEAD = [
    t("helpDesk.PanelDetail.TableData.SNO"),
    t("helpDesk.PanelDetail.TableData.CompanyName"),
    t("helpDesk.PanelDetail.TableData.Address"),
    t("helpDesk.PanelDetail.TableData.RefRate(IPD)Company"),
    t("helpDesk.PanelDetail.TableData.RefRate(OPD)Company"),
    t("helpDesk.PanelDetail.TableData.ContactPerson"),
    t("helpDesk.PanelDetail.TableData.DateFrom"),
    t("helpDesk.PanelDetail.TableData.DateTo"),
    t("helpDesk.PanelDetail.TableData.CreditLimit"),
  ];
  const [bodyData, setBodyData] = useState([
    {
      "#": 1,

      Shortcuts: "AEXM2425-000001",
      "View Instruction": 1,
      "Is Critical": 1,
      "Triaging Code": 1,
      UHID: 1,
      "Patient Name": 1,
      Contact: 1,
      Sex: 1,
    },
    {
      "#": 1,

      Shortcuts: "AEXM2425-000001",
      "View Instruction": 1,
      "Is Critical": 1,
      "Triaging Code": 1,
      UHID: 1,
      "Patient Name": 1,
      Contact: 1,
      Sex: 1,
    },
    {
      "#": 1,

      Shortcuts: "AEXM2425-000001",
      "View Instruction": 1,
      "Is Critical": 1,
      "Triaging Code": 1,
      UHID: 1,
      "Patient Name": 1,
      Contact: 1,
      Sex: 1,
    },
  ]);
  const handleChange = (e, index) => {
    console.log(bodyData);
    const { name, value } = e.target;
    const data = [...bodyData];
    data[index][name] = (
      <input
        className="table-input"
        value={value}
        onChange={(e) => handleChange(e, index)}
        name="input"
      />
    );
    setBodyData(data);
  };
  return (
    <>
        <Tables thead={THEAD} tbody={bodyData} />
    </>
  );
};

export default index;
