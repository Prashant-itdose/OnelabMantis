import React from "react";
import Heading from "../../../Heading";
import Tables from "../..";
import { useTranslation } from "react-i18next";

const PendingAppointmentPatientList = ({
  thead,
  tbody,
  handleChange,
  handleCallButtonClick,
  handlePatientSelect,
}) => {
  const [t] = useTranslation();
  console.log("first", tbody);

  // const handleCallButtonClick = (index) => {
  //   console.log(index)
  //   const updatedBodyData = [...tbody];
  //   updatedBodyData[index].IsCall = !updatedBodyData[index].IsCall;
  //   setBodyData(updatedBodyData);
  // };
  return (
    <>
      <Heading title={t("Item Details")} />
      <Tables
        thead={thead}
        tbody={tbody?.map((item, index) => ({
          "Sr.No.": index + 1,
          MRNo: item?.MRNo,
          Pname: item?.Pname,
          Age: (
            <span>
              {" "}
              {item?.Age}/{item?.Sex}
            </span>
          ),
          DName: item?.DName,
          AppointmentDate: item?.AppointmentDate,
          PanelName: item?.PanelName,
          IsCall: (
            <button
              className="btn btn-sm text-white"
              onClick={() => handleCallButtonClick(index)}
            >
              {item?.IsCall === 1 ? "call" : "UnCall"}
            </button>
          ),
          P_In: (
            <button
              className="btn btn-sm text-white"
              // onClick={() => handlePatientSelect(patient)}
              disabled={!item.IsCall}
            >
              In
            </button>
          ),
        }))}
        tableHeight={"tableHeight"}
        style={{ height: "auto" }}
      />
    </>
  );
};

export default PendingAppointmentPatientList;
