import React, { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from "@app/components/loader/Loading";
import ErrorBoundary from "../layouts/error-Boundary";
import Layout from "@app/layouts";
import Authenticated from "@app/Guard/Authenticated.jsx";
import Guest from "@app/Guard/Guest.jsx";
import { useDispatch, useSelector } from "react-redux";

import { useLocalStorage } from "../utils/hooks/useLocalStorage";
import {
  GetBindMenu,
  GetBindResourceList,
  GetRoleListByEmployeeIDAndCentreID,
} from "../store/reducers/common/CommonExportFunction";

function RenderRoute() {
  const { GetMenuList } = useSelector((state) => state?.CommonSlice);


 




  // Define your routes after ensuring all necessary data is fetched
  const getAllUrls = [];
  GetMenuList?.forEach((menu) => {
    menu?.children.forEach((child) => {
      getAllUrls.push(child.url.toLowerCase());
    });
  });

  const bindroutes = allRoutes["roleRoutes"].reduce((acc, current) => {
    if (getAllUrls.includes(current?.path.toLowerCase())) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          
          {[...allRoutes["commonRoutes"], ...bindroutes]?.map(
            (route, index) => {
              const Component = route?.component;
              const Layout = route?.layout || Fragment;
              const Guard = route?.Guard || Fragment;
              return (
                <Route
                  path={route?.path}
                  exact={route?.exact}
                  key={index}
                  element={
                    <Guard>
                      <Layout>
                        <Component />
                      </Layout>
                    </Guard>
                  }
                />
              );
            }
          )}
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default RenderRoute;

const allRoutes = {
  commonRoutes: [
    // {
    //   Guard: Authenticated,
    //   layout: Layout,
    //   path: "*",
    //   component: lazy(() => import("@app/pages/NotFound.jsx")),
    //   exact: true,
    // },
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
      path: "/ImplementationStepMaster",
      component: lazy(
        () =>
          import("@app/pages/ImplementationStepMaster.jsx")
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
      path: "/BulkReportIssue",
      component: lazy(
        () =>
          import("@app/pages/BulkReportIssue.jsx")
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
      path: "/AutoBackupStatusSheet",
      component: lazy(
        () =>
          import("@app/pages/AutoBackupStatusSheet.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/QuotationMaster",
      component: lazy(
        () =>
          import("@app/pages/QuotationMaster.jsx")
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
      Guard: Guest,
      path: "/login",
      component: lazy(() => import("../modules/login/Login")),
      exact: true,
    },
    {
      path: "/ForgetPassword",
      component: lazy(() => import("@app/modules/login/ForgetPassword.jsx")),
      exact: true,
    },
    {
      // Guard: Authenticated,
      layout: Layout,
      path: "/examination-room",
      component: lazy(
        () => import("@app/pages/examinationRoom/OPD/ExaminationRoom.jsx")
      ),
      exact: true,
    },
  ],
  roleRoutes: [
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
      component: lazy(() => import("@app/pages/frontOffice/OPD/CardPrint.jsx")),
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
      path: "/ExpenseSubmission",
      component: lazy(
        () =>
          import("@app/pages/CRM/ExpenseSubmission.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ViewExpense",
      component: lazy(
        () =>
          import("@app/pages/CRM/ViewExpense.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/ViewEmployeeExpense",
      component: lazy(
        () =>
          import("@app/pages/CRM/ViewEmployeeExpense.jsx")
      ),
      exact: true,
    },

    // Reports Section Start
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-balance-advance-detail",
      component: lazy(
        () =>
          import("@app/pages/frontOffice/Reports/OPDBalanceAdvanceDetail.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/revenueAnalysisReport",
      component: lazy(
        () => import("@app/pages/frontOffice/Reports/RevenueAnalysisReport.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/refund-details",
      component: lazy(
        () => import("@app/pages/frontOffice/Reports/RefundDetail.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/collection-report",
      component: lazy(
        () => import("@app/pages/frontOffice/Reports/CollectionReport.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/registration-report",
      component: lazy(
        () => import("@app/pages/frontOffice/Reports/RegistrationReport.jsx")
      ),
      exact: true,
    },

    {
      Guard: Authenticated,
      layout: Layout,
      path: "/patient-vise-search",
      component: lazy(
        () => import("@app/pages/frontOffice/Reports/PatientViseHistory.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/opd-billregisterreport",
      component: lazy(
        () =>
          import("@app/pages/frontOffice/Reports/OPD_BillRegisterReport.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/panel-detail",
      component: lazy(() => import("@app/pages/helpDesk/PanelDetail.jsx")),
      exact: true,
    },

    {
      Guard: Authenticated,
      layout: Layout,
      path: "/package-detail-opd",
      component: lazy(() => import("@app/pages/helpDesk/PackageDetailOPD.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/cost-estimation-billing",
      component: lazy(
        () => import("@app/pages/helpDesk/CostEstimateBilling.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/doctortiming",
      component: lazy(() => import("@app/pages/helpDesk/DoctorTiming.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/help-deskipd",
      component: lazy(() => import("@app/pages/helpDesk/HelpDeskIPD.jsx")),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/cost-estimation-reprint",
      component: lazy(
        () => import("@app/pages/helpDesk/CostEstimationReprint.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/cost-estimation-billing",
      component: lazy(
        () => import("@app/pages/helpDesk/CostEstimateBilling.jsx")
      ),
      exact: true,
    },
  
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/token-generation-master",
      component: lazy(
        () => import("@app/pages/TokenManagement/TokenGenerationMaster.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/online-inv-slot-master",
      component: lazy(
        () => import("@app/pages/TokenManagement/OnlineInvSlotMaster.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/modality-master",
      component: lazy(
        () => import("@app/pages/TokenManagement/ModalityMaster.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/samplecollroommaster",
      component: lazy(
        () => import("@app/pages/TokenManagement/SampleCollRoomMaster.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/doctorwiseappsummary",
      component: lazy(
        () =>
          import("@app/pages/examinationRoom/reports/DoctorwiseAppsummary.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/doctorwiseappdetail",
      component: lazy(
        () =>
          import("@app/pages/examinationRoom/reports/DoctorWiseAppDetail.jsx")
      ),
      exact: true,
    },
    {
      Guard: Authenticated,
      layout: Layout,
      path: "/UploadBiometric",
      component: lazy(
        () =>
          import("@app/pages/CRM/UploadBiometric.jsx")
      ),
      exact: true,
    },

    
    
    // Reports Section End

    // Reports Section Start
  ],
};
