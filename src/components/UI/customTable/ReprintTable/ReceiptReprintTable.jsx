import React from "react";
import Tables from "..";
import { Tooltip } from "primereact/tooltip";
import { BillPRINTTYPE, ReceiptPRINTTYPE } from "../../../../utils/constant";

const ReceiptReprintTable = (props) => {
  const { THEAD, tbody = [], values, handleCustomSelect } = props;

  console.log("first", tbody);
  return (
    <>
      {tbody?.map((item, index) => (
        <Tooltip
          key={index}
          target={`#doctorName-${index}, #visitType-${index}`}
          position="top"
        />
      ))}
      <Tables
        thead={THEAD}
        tbody={tbody?.map((ele, index) => ({
          "Sr. No.": index + 1,
          UHID: ele?.depositor,
          PatientName: ele?.PName,
          Address: ele?.Address,
          ReceiptNo: ele?.ReceiptNo,
          BillNo: ele?.BillNo,
          Date: ele?.DATE,
          BillAmount: ele?.AmountPaid,
          Print: (
            <select
              id="PrintType"
              name="PrintType"
              value={values?.PrintType?.value}
              onChange={(e) =>
                handleCustomSelect(index, "PrintType", e.target.value)
              }
            >
              {(values?.rblCon?.value === "1" || values?.rblCon === "1"
                ? BillPRINTTYPE
                : ReceiptPRINTTYPE
              )?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ),
          Original: (
            <div style={{ textAlign: "center" }}>
              <input
                type="checkbox"
                name="IsAllowedOriginalPrint"
                checked={ele?.IsAllowedOriginalPrint}
                onChange={(e) =>
                  handleCustomSelect(
                    index,
                    "IsAllowedOriginalPrint",
                    e.target.checked
                  )
                }
              />
            </div>
          ),
          isActionCreator: (
            <div style={{ textAlign: "center" }}>
              <svg
                width="12"
                height="12"
                color="red"
                backgroundColor="red"
                viewBox="0 0 66 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0C2.685 0 0 2.685 0 6V48C0 51.315 2.685 54 6 54H48C51.315 54 54 51.315 54 48V6C54 2.685 51.312 0 48 0H6ZM45 12C45.7673 12 46.5346 12.2924 47.1211 12.8789C48.2941 14.0519 48.2941 15.9481 47.1211 17.1211L24.4395 39.8027C23.8755 40.3667 23.1134 40.6816 22.3184 40.6816C21.5234 40.6816 20.7583 40.3667 20.1973 39.8027L9.83789 29.4434C8.66489 28.2704 8.66489 26.3742 9.83789 25.2012C11.0109 24.0282 12.9071 24.0282 14.0801 25.2012L22.3184 33.4395L42.8789 12.8789C43.4654 12.2924 44.2327 12 45 12ZM60 12V48C60 54.627 54.627 60 48 60H12C12 63.315 14.685 66 18 66H60C63.315 66 66 63.315 66 60V18C66 14.685 63.312 12 60 12Z"
                  fill="#434343"
                />
              </svg>
            </div>
          ),
        }))}
        tableHeight={"tableHeight"}
      />
    </>
  );
};

export default ReceiptReprintTable;
