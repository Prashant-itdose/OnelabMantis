import React from "react";

import { Tooltip } from "primereact/tooltip";
// import { BillPRINTTYPE, ReceiptPRINTTYPE } from "../../../../utils/constant";
import Tables from "..";
const CardPrintTable = (props) => {

    const { THEAD, tbody = [...tbody], values, handleCustomSelect } = props;

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
            {console.log("aaaaa",THEAD)}
            <Tables
                thead={THEAD}
                tbody={tbody?.map((ele, index) => ({
                    "S.No.": index + 1,
                    //   EntryDateTime: ele?.entryDateTime,
                    "Vertical": ele?.labNo,
                    "Team": ele?.sinNo,
                    //   PatientName: ele?.patientName,
                    "Project Name": ele?.ageSex,
                    "Last AB Date": ele?.mobileNo,
                    "Last AB Done By": ele?.grossAmt,
                    "O_Name": ele?.discAmt,
                    "O_Email": ele?.netAmt,
                    "O_Mobile": ele?.paidAmt,
                    "SPOC_Name": ele?.dueAmt,
                    "SPOC_Email": ele?.client,

                    "SPOC_Mobile": ele?.patientName,
                    "Remark": ele?.Remark,
                    //   (
                    //     <input
                    //       type="checkbox"
                    //       name="isFullyPaid"
                    //       checked={ele?.isFullyPaid}
                    //       onChange={(e) => handleCustomSelect(index, "isFullyPaid", e.target.checked)}
                    //     />
                    //   ),
                    "Edit": (
                        <button onClick={() => handleSettlement(index)}>Settle</button>
                    ),
                    "Show Log": (
                        <button onClick={() => handleCashReceipt(index)}>Print Receipt</button>
                    ),
                }))}

                tableHeight={"tableHeight"}
            />
        </>
    );
};

export default CardPrintTable;
