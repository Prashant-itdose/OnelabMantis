import React, {  lazy }  from "react";
import Layout from "@app/layouts";
import Authenticated from "@app/Guard/Authenticated.jsx";
import Guest from "@app/Guard/Guest.jsx";
// import LLL from  "../modules/login/Login"
function manageRoutePath() {

  const LLL = React.lazy(()=> import("../modules/login/Login"))
  const allRoutes = [
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/DirectPatientReg",
      component: lazy(
        () => import("@app/pages/frontOffice/PatientRegistration/Index.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/myview",
      component: lazy(
        () =>
          import("@app/pages/MyView.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/viewissues",
      component: lazy(
        () =>
          import("@app/pages/ViewIssues.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/reportissue",
      component: lazy(
        () =>
          import("@app/pages/ReportIssue.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/EmployeeMaster",
      component: lazy(
        () =>
          import("@app/pages/EmployeeMaster.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/SearchEmployeeMaster",
      component: lazy(
        () =>
          import("@app/pages/SearchEmployeeMaster.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/SearchProjectMaster",
      component: lazy(
        () =>
          import("@app/pages/SearchProjectMaster.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/SearchAmountSubmission",
      component: lazy(
        () =>
          import("@app/pages/SearchAmountSubmission.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/SearchConnectorRequest",
      component: lazy(
        () =>
          import("@app/pages/SearchConnectorRequest.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/SalesBooking",
      component: lazy(
        () =>
          import("@app/pages/SalesBooking.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/Attendance",
      component: lazy(
        () =>
          import("@app/pages/CRM/Attendance.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/CrmDashboard",
      component: lazy(
        () =>
          import("@app/pages/CRM/CrmDashboard.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/LeaveRequest",
      component: lazy(
        () =>
          import("@app/pages/CRM/LeaveRequest.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/LeaveViewApproval",
      component: lazy(
        () =>
          import("@app/pages/CRM/LeaveViewApproval.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ShowEmployee",
      component: lazy(
        () =>
          import("@app/pages/CRM/ShowEmployee.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ShowWorkingDays",
      component: lazy(
        () =>
          import("@app/pages/CRM/ShowWorkingDays.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/AdvanceRequest",
      component: lazy(
        () =>
          import("@app/pages/CRM/AdvanceRequest.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/AdvanceRequestView",
      component: lazy(
        () =>
          import("@app/pages/CRM/AdvanceRequestView.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ViewExpenseList",
      component: lazy(
        () =>
          import("@app/pages/CRM/ViewExpenseList.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/EmployeeChangePassword",
      component: lazy(
        () =>
          import("@app/pages/EmployeeChangePassword.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ProjectMaster",
      component: lazy(
        () =>
          import("@app/pages/ProjectMaster.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/UserVSProjectMapping",
      component: lazy(
        () =>
          import("@app/pages/UserVSProjectMapping.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ChangeSubmitDateofTicket",
      component: lazy(
        () =>
          import("@app/pages/ChangeSubmitDateofTicket.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/QueryVsResultMaster",
      component: lazy(
        () =>
          import("@app/pages/QueryVsResultMaster.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ConnectorRequest",
      component: lazy(
        () =>
          import("@app/pages/ConnectorRequest.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/AmountSubmission",
      component: lazy(
        () =>
          import("@app/pages/AmountSubmission.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/UploadDocument",
      component: lazy(
        () =>
          import("@app/pages/UploadDocument.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/PatientBlackList",
      component: lazy(
        () =>
          import(
            "@app/pages/frontOffice/PatientRegistration/PatientBlackList.jsx"
          )
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/dashboard",
      component: lazy(() => import("@app/pages/Dashboard.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-servicebooking",
      component: lazy(
        () => import("@app/pages/frontOffice/OPD/OPDServiceBooking.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/Confirmation",
      component: lazy(
        () => import("@app/pages/frontOffice/OPD/Confirmation.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-setellment",
      component: lazy(
        () => import("@app/pages/frontOffice/OPDSetellment/Index.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-refund",
      component: lazy(() => import("@app/pages/frontOffice/OPD/OPDRefund.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-advance",
      component: lazy(
        () => import("@app/pages/frontOffice/OPDAdvance/Index.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/card-print",
      component: lazy(
        () => import("@app/pages/frontOffice/OPD/CardPrint.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/Uploadpatientdocuments",
      component: lazy(
        () => import("@app/pages/frontOffice/OPD/UploadViewDocument.jsx")
      ),
      exact: true,
    },

    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ReceiptReprint",
      component: lazy(
        () => import("@app/pages/frontOffice/Re_Print/ReceiptReprint.jsx")
      ),
      exact: true,
    },

    {
      Guard: Guest,
      path: "/login",
      component: LLL,
      exact: true,
    },
    {
      path: "/ForgetPassword",
      component: lazy(() => import("@app/modules/login/ForgetPassword.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/expense-voucher",
      component: lazy(
        () => import("@app/pages/frontOffice/tools/ExpenseVoucher.jsx")
      ),
      exact: true,
    },

    {
      Guard: Authenticated,
      layout: Layout,
      path: "/myview",
      component: lazy(
        () => import("@app/pages/MyView.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/viewissues",
      component: lazy(
        () => import("@app/pages/ViewIssues.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/reportissue",
      component: lazy(
        () => import("@app/pages/ReportIssue.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/AutoBackupStatusSheet",
      component: lazy(
        () => import("@app/pages/AutoBackupStatusSheet.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/QuotationMaster",
      component: lazy(
        () => import("@app/pages/QuotationMaster.jsx")
      ),
      exact: true,
    },
  ];
  return allRoutes;
}

export default manageRoutePath;
