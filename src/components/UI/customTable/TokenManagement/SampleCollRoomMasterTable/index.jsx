import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Tables from "../../../../UI/customTable/index";

const index = () => {
  const [t] = useTranslation();
  const THEAD = [
    t("tokenManagement.SampleCollRoomMaster.Srno"),
    t("tokenManagement.SampleCollRoomMaster.CentreName"),
    t("tokenManagement.SampleCollRoomMaster.RoomName"),
    t("tokenManagement.SampleCollRoomMaster.GroupName"),
    t("tokenManagement.SampleCollRoomMaster.RoleName"),
    t("tokenManagement.SampleCollRoomMaster.Remove"),
  ];
  const [bodyData, setBodyData] = useState([
    {
      Srno: 1,
      CentreName: "Clinic",
      RoomName: "lab",
      GroupName: "token(Prefix : tt)",
      RoleName: "LABORATORY",
      Remove: <i className="fa fa-trash" aria-hidden="true"></i>,
    },
  ]);

  return (
    <>
      <div className="mt-2">
        <Tables thead={THEAD} tbody={bodyData} />
      </div>
    </>
  );
};

export default index;
