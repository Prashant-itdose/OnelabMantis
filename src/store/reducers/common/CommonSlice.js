import { createSlice } from "@reduxjs/toolkit";
import { isArrayFunction, notify, renameKeys } from "../../../utils/utils";
import {
  CentreWiseCacheByCenterID,
  GetBindDepartment,
  GetBindMenu,
  GetBindReferDoctor,
  GetBindReferalType,
  GetRoleListByEmployeeIDAndCentreID,
  getEmployeeWise,
  getNotification,
  GetPanelDocument,
  GetPatientUploadDocument,
  CentreWisePanelControlCache,
  GetAdvanceReason,
  GetBindResourceList,
  GetAllDoctor,
  GetBindAllDoctorConfirmation,
  BindSeeMoreList,
  GetBindSubCatgeory,
  getBindCentre,
  getBindSpeciality,
  getBindPanelList,
  ProjectList,
} from "./CommonExportFunction";

const initialState = {
  CentreWiseCache: [],
  ReasonWiseCache: [],
  CentreWisePanelControlCacheList: [],
  GetEmployeeWiseCenter: [],
  GetMenuList: [
    {
      menuName: "Tickets",
      menuOrder: "1",
      menuID: "84",
      menuIcon: "fas fa-tachometer-alt",
      children: [
        {
          childrenName: "MyView",
          url: "/myview",
          childrenOrder: "1",
          breadcrumb: "Tickets / MyView",
        },
        {
          childrenName: "View Issues",
          url: "/viewissues",
          childrenOrder: "2",
          breadcrumb: "Tickets / ViewIssues",
        },
        {
          childrenName: "NewTicket",
          url: "/reportissue",
          childrenOrder: "3",
          breadcrumb: "Tickets / NewTicket",
        },
        {
          childrenName: "BulkNewTicket",
          url: "/BulkReportIssue",
          childrenOrder: "1",
          breadcrumb: "Tickets / BulkTicket",
        },
      ],
    },
    {
      menuName: "AutoBackup",
      menuOrder: "2",
      menuID: "85",
      menuIcon: "fas fa-tachometer-alt",
      children: [
        {
          childrenName: "AutoBackupStatusSheet",
          url: "/AutoBackupStatusSheet",
          childrenOrder: "1",
          breadcrumb: "AutoBackup / AutoBackupStatusSheet",
        },
      ],
    },

    {
      menuName: "Master",
      menuOrder: "4",
      menuID: "87",
      menuIcon: "fas fa-tachometer-alt",
      children: [
        {
          childrenName: "Employee Master",
          url: "/EmployeeMaster",
          childrenOrder: "1",
          breadcrumb: "Master / Employee Master",
        },
        {
          childrenName: "Employee Change Password",
          url: "/EmployeeChangePassword",
          childrenOrder: "2",
          breadcrumb: "Master / Employee Change Password",
        },
        {
          childrenName: "Project Master",
          url: "/ProjectMaster",
          childrenOrder: "3",
          breadcrumb: "Master / Project Master",
        },
        {
          childrenName: "Quotation Master",
          url: "/QuotationMaster",
          childrenOrder: "4",
          breadcrumb: "Master / Quotation Master",
        },
      ],
    },
    {
      menuName: "Tools",
      menuOrder: "5",
      menuID: "88",
      menuIcon: "fas fa-tachometer-alt",
      children: [
        {
          childrenName: "User Vs Project Mapping",
          url: "/UserVSProjectMapping",
          childrenOrder: "1",
          breadcrumb: "Tools / User Vs Project Mapping",
        },
        {
          childrenName: "Change Submit Date of Ticket",
          url: "/ChangeSubmitDateofTicket",
          childrenOrder: "2",
          breadcrumb: "Tools / Change Submit Date of Ticket",
        },
        {
          childrenName: "Query Vs Result",
          url: "/QueryVsResultMaster",
          childrenOrder: "3",
          breadcrumb: "Tools / Query Vs Result",
        },
        {
          childrenName: "Upload Document",
          url: "/UploadDocument",
          childrenOrder: "4",
          breadcrumb: "Tools / Upload Document",
        },
        //   {
        //     "childrenName": "Implementation Step Master",
        //     "url": "/ImplementationStepMaster",
        //     "childrenOrder": "4",
        //     "breadcrumb": "Tools /ImplementaionStepMaster"
        // },
      ],
    },
    {
      menuName: "Sales",
      menuOrder: "3",
      menuID: "86",
      menuIcon: "fas fa-tachometer-alt",
      children: [
        {
          childrenName: "Connector Request",
          url: "/ConnectorRequest",
          childrenOrder: "1",
          breadcrumb: "Sales / Connector Request",
        },
        {
          childrenName: "Account",
          url: "/AmountSubmission",
          childrenOrder: "2",
          breadcrumb: "Sales / Account",
        },
        {
          childrenName: "SalesBooking",
          url: "/SalesBooking",
          childrenOrder: "3",
          breadcrumb: "Sales / SalesBooking",
        },
      ],
    },
    {
      menuName: "HR",
      menuOrder: "4",
      menuID: "87",
      menuIcon: "fas fa-tachometer-alt",
      children: [
        {
          childrenName: "Attendance",
          url: "/Attendance",
          childrenOrder: "1",
          breadcrumb: "HR / Attendance",
        },
        {
          childrenName: "Leave Request",
          url: "/LeaveRequest",
          childrenOrder: "2",
          breadcrumb: "HR / Leave Request",
        },
        {
          childrenName: "Leave View/Approval",
          url: "/LeaveViewApproval",
          childrenOrder: "3",
          breadcrumb: "HR / Leave View/Approval",
        },
        {
          childrenName: "Show Employee",
          url: "/ShowEmployee",
          childrenOrder: "4",
          breadcrumb: "HR / Show Employee",
        },
         {
          "childrenName": "Expense Submission",
          "url": "/ExpenseSubmission",
          "childrenOrder": "5",
          "breadcrumb": "HR/ExpenseSubmission"
      },
      {
        "childrenName": "View Expense",
        "url": "/ViewExpense",
        "childrenOrder": "6",
        "breadcrumb": "HR/ViewExpense"
    },
    {
      "childrenName": "ViewEmployeeExpense",
        "url": "/ViewEmployeeExpense",
        "childrenOrder": "7",
        "breadcrumb": "HR/ViewEmployeeExpense"
    },
        {
          childrenName: "Show Working Days",
          url: "/ShowWorkingDays",
          childrenOrder: "4",
          breadcrumb: "HR / Show Working Days",
        },
        {
          childrenName: "Advance Request",
          url: "/AdvanceRequest",
          childrenOrder: "5",
          breadcrumb: "HR / Advance Request",
        },
        {
          childrenName: "Advance Request View",
          url: "/AdvanceRequestView",
          childrenOrder: "6",
          breadcrumb: "HR / Advance Request View",
        },
        {
          childrenName: "View Employee Expense",
          url: "/ViewExpenseList",
          childrenOrder: "7",
          breadcrumb: "HR / View Employee Expense",
        },
        {
    "childrenName": "Upload Biometric Excel",
    "url": "/UploadBiometric",
    "childrenOrder": "9",
    "breadcrumb": "HR/UploadBiometric"
}
      ],
    },
  ],
  GetRoleList: [],
  GetProjectList: [],
  GetBindReferDoctorList: [],
  GetReferTypeList: [],
  GetDepartmentList: [],
  GetNotifications: [],
  GetDoctorDeptList: [],
  BindResource: {},
  GetAllDoctorList: [],
  GetBindAllDoctorConfirmationData: [],
  GetBindSubCatgeoryData: [],
  getbindCentreData: [],
  getBindSpecialityData: [],
  getBindPanelListData: [],
  loading: false,
  error: "",
  message: "",
  success: false,
};

export const CommonSlice = createSlice({
  name: "CommonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CentreWiseCacheByCenterID.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(CentreWiseCacheByCenterID.fulfilled, (state, { payload }) => {
        state.CentreWiseCache = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(CentreWiseCacheByCenterID.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })
      .addCase(ProjectList.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(ProjectList.fulfilled, (state, { payload }) => {
        state.GetProjectList = payload?.data || [];
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message || "Success";
      })
      .addCase(ProjectList.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error?.message || "Something went wrong";
        state.success = false;
        state.message = error?.message || "Something went wrong";
        // It's better to trigger notifications outside reducers in middleware or components
      })

      // getEmployeeWIseCenter
      .addCase(getEmployeeWise.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getEmployeeWise.fulfilled, (state, { payload }) => {
        state.GetEmployeeWiseCenter = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(getEmployeeWise.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // getMenuList
      .addCase(GetBindMenu.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetBindMenu.fulfilled, (state, { payload }) => {
        state.GetMenuList = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetBindMenu.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // Notification Detail
      .addCase(getNotification.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getNotification.fulfilled, (state, { payload }) => {
        state.GetNotifications = isArrayFunction(payload?.data);
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(getNotification.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // getRoleList

      .addCase(GetRoleListByEmployeeIDAndCentreID.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(
        GetRoleListByEmployeeIDAndCentreID.fulfilled,
        (state, { payload }) => {
          state.GetRoleList = payload?.data;
          state.loading = false;
          state.success = true;
          state.error = "";
          state.message = payload?.Message;
        }
      )
      .addCase(
        GetRoleListByEmployeeIDAndCentreID.rejected,
        (state, { error }) => {
          console.log(error.message);
          state.loading = false;
          state.error = error.message;
          state.success = false;
          state.message = error.message;
          //notify(error.message, "error");
        }
      )

      // CentreWisePanelControlCache
      .addCase(CentreWisePanelControlCache.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(CentreWisePanelControlCache.fulfilled, (state, { payload }) => {
        state.CentreWisePanelControlCacheList = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.Message;
      })
      .addCase(CentreWisePanelControlCache.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      .addCase(GetBindReferDoctor.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetBindReferDoctor.fulfilled, (state, { payload }) => {
        state.GetBindReferDoctorList = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetBindReferDoctor.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // get ReferType
      .addCase(GetBindReferalType.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetBindReferalType.fulfilled, (state, { payload }) => {
        state.GetReferTypeList = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetBindReferalType.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // getDoctorDepartment
      .addCase(GetBindDepartment.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetBindDepartment.fulfilled, (state, { payload }) => {
        state.GetDepartmentList = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetBindDepartment.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })
      // BindSeeMoreList
      .addCase(BindSeeMoreList.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(BindSeeMoreList.fulfilled, (state, { payload }) => {
        state.BindSeeMoreListData = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(BindSeeMoreList.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // GetPanelDocument
      .addCase(GetPanelDocument.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetPanelDocument.fulfilled, (state, { payload }) => {
        state.GetPanelDocumentList = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetPanelDocument.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // GetPatientUploadDocument
      .addCase(GetPatientUploadDocument.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetPatientUploadDocument.fulfilled, (state, { payload }) => {
        state.GetPatientUploadDocumentList = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetPatientUploadDocument.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })
      // GetAdvanceReason
      .addCase(GetAdvanceReason.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetAdvanceReason.fulfilled, (state, { payload }) => {
        const newKeyNames = {
          ID: "value",
          Reason: "label",
        };

        const arrayOfObjects = payload?.data.map((obj) =>
          renameKeys(obj, newKeyNames)
        );
        state.ReasonWiseCache = arrayOfObjects;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetAdvanceReason.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })
      // GetBindResourceList
      .addCase(GetBindResourceList.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetBindResourceList.fulfilled, (state, { payload }) => {
        state.BindResource = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetBindResourceList.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // GetAllDoctor
      .addCase(GetAllDoctor.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetAllDoctor.fulfilled, (state, { payload }) => {
        state.GetAllDoctorList = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetAllDoctor.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // GetAllDoctorConfirmation
      .addCase(GetBindAllDoctorConfirmation.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetBindAllDoctorConfirmation.fulfilled, (state, { payload }) => {
        state.GetBindAllDoctorConfirmationData = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetBindAllDoctorConfirmation.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // GetBindSubCatgeory
      .addCase(GetBindSubCatgeory.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(GetBindSubCatgeory.fulfilled, (state, { payload }) => {
        state.GetBindSubCatgeoryData = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(GetBindSubCatgeory.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      // Token Management

      .addCase(getBindCentre.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getBindCentre.fulfilled, (state, { payload }) => {
        state.getbindCentreData = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(getBindCentre.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      .addCase(getBindSpeciality.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getBindSpeciality.fulfilled, (state, { payload }) => {
        state.getBindSpecialityData = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(getBindSpeciality.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      })

      .addCase(getBindPanelList.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.success = false;
      })
      .addCase(getBindPanelList.fulfilled, (state, { payload }) => {
        state.getBindPanelListData = payload?.data;
        state.loading = false;
        state.success = true;
        state.error = "";
        state.message = payload?.message;
      })
      .addCase(getBindPanelList.rejected, (state, { error }) => {
        console.log(error.message);
        state.loading = false;
        state.error = error.message;
        state.success = false;
        state.message = error.message;
        //notify(error.message, "error");
      });
  },
});

export default CommonSlice.reducer;
