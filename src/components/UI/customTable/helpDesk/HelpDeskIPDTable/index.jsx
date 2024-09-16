import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Tables from "../../index";


const index = () => {
  const [t] = useTranslation();

  const THEAD = [
    t("helpDesk.HelpDeskIPD.SRNO"),
    t("helpDesk.HelpDeskIPD.UHID"),
    t("helpDesk.HelpDeskIPD.IPDNo"),
    t("helpDesk.HelpDeskIPD.PatientName"),
    t("helpDesk.HelpDeskIPD.ContactNo"),
    t("helpDesk.HelpDeskIPD.Panel"),
    t("helpDesk.HelpDeskIPD.DateOfAdmit"),
    t("helpDesk.HelpDeskIPD.DateOfDischarge"),
    t("helpDesk.HelpDeskIPD.DoctorName"),
    t("helpDesk.HelpDeskIPD.RoomNo"),
    t("helpDesk.HelpDeskIPD.BedNo"),
    t("helpDesk.HelpDeskIPD.Floor"),
    t("helpDesk.HelpDeskIPD.Status"),
    t("helpDesk.HelpDeskIPD.Address"),
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
      Check: (
        <>
          <i
            className="fa fa-check"
            aria-hidden="true"
            onClick={() => show("top")}
          ></i>
        </>
      ),
    },
  ]);
  const handleChange = (e, index) => {
    console.log(bodyData);
    const { name, value } = e.target;
    const data = [...bodyData];
    data[index][name] = (
      <input
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
