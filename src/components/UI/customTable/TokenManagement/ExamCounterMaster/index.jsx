// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import Tables from "../../../../UI/customTable/index";
// const index = (props) => {
//   const { tbody, handleDeleteCounter, handleEditData , handleConfirmBox} = props;
//   const [t] = useTranslation();

//   const THEAD = [
//     t("TokenManagement.ExamCounterMaster.tableDataName.SNO"),
//     t("TokenManagement.ExamCounterMaster.tableDataName.CounterName"),
//      "Created Date",
//     "Created Time",
//     t("TokenManagement.ExamCounterMaster.tableDataName.Edit"),
//     t("TokenManagement.ExamCounterMaster.tableDataName.Delete"),
   
//   ];

//   return (
//     <>
//       <Tables
//         thead={THEAD}
//         tbody={tbody.map((item, index) => ({
//           SNO: index + 1,
//           CounterName: item?.CounterName,
//            "Created Date":"11/03/2024	",
//     "Created Time":"12:00 AM",
//           Edit: (
//             <>
//               <button
//                 className="btn btn-sm btn-primary"
//                 onClick={() => handleEditData(item)}
//               >
//                 Edit
//               </button>
//             </>
//           ),
//           Delete: (
//             <>
//               {" "}
//               <button
//                 // className="btn btn-sm btn-primary"
//                 className={
//                   item.IsActive === 0
//                     ? "grayColorBtnDisabled btn btn-sm"
//                     : "btn btn-sm btn-primary"
//                 }
//                 onClick={() => handleConfirmBox(item?.Id)}
//                 disabled={item.IsActive === 0}
//               >
//                 Delete
//               </button>
//             </>
//           ),
//         }))}
//         tableHeight={"tableHeight"}
//       />
//     </>
//   );
// };

// export default index;
