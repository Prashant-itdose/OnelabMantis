export const apiUrls = {
  // Auth

  logout: "/HospediaAPI/api/v1/MasterPage/Logout",

  // claim update

  UpdateCliam: "/HospediaAPI/api/v1/Claims/UpdateCliam",

  // master api
  getRoleList: "/HospediaAPI/api/v1/MasterPage/CentreWiseRoleList",
  EmployeeWiseCentreList:
    "/HospediaAPI/api/v1/MasterPage/EmployeeWiseCentreList",
  BindMenuList: "/HospediaAPI/api/v1/MasterPage/BindMenu",
  getNotificationDetail: "/HospediaAPI/api/v1/MasterPage/Notification",
  StoreState: "/HospediaAPI/api/v1/PatientControl/StateInsert",
  StateInsert: "/HospediaAPI/api/v1/PatientControl/StateInsert",
  DistrictInsert: "/HospediaAPI/api/v1/PatientControl/DistrictInsert",
  CityInsert: "/HospediaAPI/api/v1/PatientControl/CityInsert",
  CentreWiseCacheByCenterID:
    "/HospediaAPI/api/v1/PatientControl/CentreWiseCache",
  CentreWiseCacheByCenterID:
    "/HospediaAPI/api/v1/PatientControl/CentreWiseCache",

  // DirectPatientReg Mayank START
  CentreWisePanelControlCache:
    "/HospediaAPI/api/v1/PanelControl/CentreWisePanelControlCache",
  GetPanelDocument: "/HospediaAPI/api/v1/PanelControl/GetPanelDocument",
  GetPatientUploadDocument:
    "/HospediaAPI/api/v1/PatientControl/GetMasterDocuments",
  CreateTypeOfReference:
    "/HospediaAPI/api/v1/PatientControl/CreateTypeOfReference",
  BindSeeMoreList: "/HospediaAPI/api/v1/CommonAPI/BindSeeMoreList",
  ValidateDuplicatePatientEntry:
    "/HospediaAPI/api/v1/PatientControl/ValidateDuplicatePatientEntry",
  GetAgeByDateOfBirth: "/HospediaAPI/api/v1/CommonAPI/GetAgeByDateOfBirth",
  SaveReg: "/HospediaAPI/api/v1/Registration/SaveReg",
  // DirectPatientReg Mayank END

  // payment control ----- Arshad Pathaan Khan-----
  LoadCurrencyDetail: "/HospediaAPI/api/v1/PaymentControl/LoadCurrencyDetail",
  PaymentControlBindPaymentModePanelWise:
    "/HospediaAPI/api/v1/PaymentControl/BindPaymentModePanelWise",
  GetSwipMachine: "/HospediaAPI/api/v1/PaymentControl/GetSwipMachine",
  GetBankMaster: "/HospediaAPI/api/v1/PaymentControl/GetBankMaster",
  getConvertCurrecncy: "/HospediaAPI/api/v1/PaymentControl/getConvertCurrecncy",
  GetConversionFactor: "/HospediaAPI/api/v1/PaymentControl/GetConversionFactor",
  // opdServiceBooking ----sahil--
  Oldpatientsearch: "/HospediaAPI/api/v1/PatientControl/Oldpatientsearch",
  PatientSearchbyBarcode:
    "/HospediaAPI/api/v1/PatientControl/PatientSearchbyBarcode",
  BindReferDoctor: "/HospediaAPI/api/v1/PatientControl/BindReferDoctor",
  bindPanelByPatientID: "/HospediaAPI/api/v1/CommonAPI/bindPanelByPatientID",
  BindRefferalType: "/HospediaAPI/api/v1/CommonAPI/bindReferalType",
  BindPRO: "/HospediaAPI/api/v1/PatientControl/bindPRO",
  BindDepartment: "/HospediaAPI/api/v1/CommonAPI/bindDepartment",
  BindDoctorDept: "/HospediaAPI/api/v1/CommonAPI/bindDoctorDept",
  RoleWiseOPDServiceBookingControls:
    "/HospediaAPI/api/v1/OPDServiceBooking/RoleWiseOPDServiceBookingControls",
  LoadOPD_All_ItemsLabAutoComplete:
    "/HospediaAPI/api/v1/CommonAPI/LoadOPD_All_ItemsLabAutoComplete",
  PackageExpirayDate:
    "/HospediaAPI/api/v1/OPDServiceBooking/PackageExpirayDate",
  ValidateDoctorMap: "/HospediaAPI/api/v1/OPDServiceBooking/ValidateDoctorMap",
  ValidateDoctorLeave:
    "/HospediaAPI/api/v1/OPDServiceBooking/ValidateDoctorLeave",
  GetDiscountWithCoPay: "/HospediaAPI/api/v1/CommonAPI/GetDiscountWithCoPay",
  getAlreadyPrescribeItem:
    "/HospediaAPI/api/v1/OPDServiceBooking/getAlreadyPrescribeItem",
  BindLabInvestigationRate:
    "/HospediaAPI/api/v1/PatientControl/BindLabInvestigationRate",
  GetAuthorization: "/HospediaAPI/api/v1/CommonAPI/GetAuthorization",
  BindResourceList: "/HospediaAPI/api/v1/CommonAPI/BindResourceList",
  GetAppointmentCount:
    "/HospediaAPI/api/v1/OPDServiceBooking/GetAppointmentCount",

  GetDoctorAppointmentTimeSlotConsecutive:
    "/HospediaAPI/api/v1/OPDServiceBooking/GetDoctorAppointmentTimeSlotConsecutive",

  BindPackageItemDetailsNew:
    "/HospediaAPI/api/v1/OPDServiceBooking/BindPackageItemDetailsNew",
  checkblacklist: "/HospediaAPI/api/v1/PatientControl/Checkblacklist",
  GetDiscReason: "/HospediaAPI/api/v1/PaymentControl/GetDiscReason",
  BindDisApproval: "/HospediaAPI/api/v1/PaymentControl/BindDisApproval",
  GetEligiableDiscountPercent:
    "/HospediaAPI/api/v1/PaymentControl/GetEligiableDiscountPercent",
  GetInvestigationTimeSlot:
    "/HospediaAPI/api/v1/OPDServiceBooking/GetInvestigationTimeSlot",
  BindModality: "/HospediaAPI/api/v1/CommonAPI/BindModality",
  HoldTimeSlot: "/HospediaAPI/api/v1/OPDServiceBooking/HoldTimeSlot",
  BindInvestigation: "/HospediaAPI/api/v1/OPDServiceBooking/BindInvestigation",
  HoldTimeSlot: "/HospediaAPI/api/v1/OPDServiceBooking/HoldTimeSlot",
  GetLastVisitDetail:
    "/HospediaAPI/api/v1/OPDServiceBooking/GetLastVisitDetail",
  LastVisitDetails: "/HospediaAPI/api/v1/OPDServiceBooking/LastVisitDetails",
  //expense voucher API --Arshad--
  GetEmployeeDoctors: "/HospediaAPI/api/v1/ExpenseVoucher/GetEmployeeDoctors",
  GetExpenceHead: "/HospediaAPI/api/v1/ExpenseVoucher/GetExpenceHead",
  GetExpenceSubHead: "/HospediaAPI/api/v1/ExpenseVoucher/GetExpenceSubHead",
  getApproveBy: "/HospediaAPI/api/v1/ExpenseVoucher/GetApprovalBy",
  addNewExpense: "/HospediaAPI/api/v1/ExpenseVoucher/NewExpenceTo",
  getExpenseList: "/HospediaAPI/api/v1/ExpenseVoucher/GetExpenceList",
  saveExpense: "/HospediaAPI/api/v1/ExpenseVoucher/SaveExpence",
  // Opd Advance
  GetAdvanceReason: "/HospediaAPI/api/v1/OPDAdvance/GetAdvanceReason",
  CreateAdvanceReason: "/HospediaAPI/api/v1/OPDAdvance/CreateAdvanceReason",

  // end OPD Advance

  // opd Settlement
  SearchOPDBills: "/HospediaAPI/api/v1/OPDSettlement/SearchOPDBills",
  // end opd settlement

  // Confirmation
  getAppointmentDetails:
    "/HospediaAPI/api/v1/Confirmation/GetApppointmentDetails",
  updateAppointmentShedule:
    "/HospediaAPI/api/v1/Confirmation/UpdateDoctorAppointmentSchedule",
  UpdateRadiologySchedule:
    "/HospediaAPI/api/v1/Confirmation/UpdateRadiologySchedule",
  GetPatientDoctorAppointmentDetails:
    "/HospediaAPI/api/v1/OPDServiceBooking/GetPatientDoctorAppointmentDetails",
  // Receipt_Reprint
  GetReceiptDetailnew: "/HospediaAPI/api/v1/ReceiptRePrint/GetReceiptDetailnew",
  UpdateAppointmentStatus:
    "/HospediaAPI/api/v1/Confirmation/UpdateAppointmentStatus",
  // Card Print
  searchCardPrint: "HospediaAPI/api/v1/CardPrint/Binddetail",
  UploadPhoto: "HospediaAPI/api/v1/CardPrint/UploadPhoto",
  ViewPhoto: "HospediaAPI/api/v1/CardPrint/ViewPhoto",
  getRadiologyAppointmentDetails:
    "/HospediaAPI/api/v1/Confirmation/GetRadiologyApppointmentDetails",
  getBindSubCategory: "/HospediaAPI/api/v1/CommonAPI/BindSubCategory",
  bindAppointmentDetail:
    "/HospediaAPI/api/v1/Confirmation/bindAppointmentDetail",


  SearchPatient: "/HospediaAPI/api/v1/DebitCredit/SearchPatient",
  GetDepartmentWiseDetails:
    "/HospediaAPI/api/v1/DebitCredit/GetDepartmentWiseDetails",
  GetDepartmentItemDetails:
    "/HospediaAPI/api/v1/DebitCredit/GetDepartmentItemDetails",
  GetPanelList: "/HospediaAPI/api/v1/DebitCredit/GetPanelList",

  // doctor Timming

  DoctorAppointmentStatusByDoctorID:
    "/HospediaAPI/api/v1/PrescriptionAdvice/DoctorAppointmentStatusByDoctorID",

  // Token Management
  getBindCenterAPI: "/HospediaAPI/api/v1/CommonAPI/BindCentre",
  getBindFloorAPI: "/HospediaAPI/api/v1/ModalityMaster/BindFloor",
  saveModality: "/HospediaAPI/api/v1/ModalityMaster/SaveModality",
  SearchModality: "/HospediaAPI/api/v1/ModalityMaster/SearchModality",
  BindCategory: "/HospediaAPI/api/v1/CommonAPI/BindCategory",
  SearchInvestigationSlotSchedule:
    "/HospediaAPI/api/v1/OnlineInvSlotMaster/SearchInvestigationSlotSchedule",
  BindDocTimingShift:
    "/HospediaAPI/api/v1/OnlineInvSlotMaster/BindDocTimingShift",
  GetBindDetail: "/HospediaAPI/api/v1/RecieptTokenMaster/BindDetail",
  GetCategoryName: "/HospediaAPI/api/v1/RecieptTokenMaster/GetCategoryName",
  SaveTokenmasterDetail:
    "/HospediaAPI/api/v1/RecieptTokenMaster/SaveTokenmasterDetail",
  IsGroupNameExists: "/HospediaAPI/api/v1/RecieptTokenMaster/IsGroupNameExists",
  CheckTokenPrefixExist:
    "/HospediaAPI/api/v1/RecieptTokenMaster/CheckTokenPrefixExist",
  GetSubCategoryName:
    "/HospediaAPI/api/v1/RecieptTokenMaster/GetSubCategoryName",
  GetGroupName: "/HospediaAPI/api/v1/RecieptTokenMaster/GetGroupName",
  GetPanelName: "/HospediaAPI/api/v1/CommonAPI/GetPanel",
  GetCountryList: "/HospediaAPI/api/v1/CommonAPI/getCountry",
  GetStateList: "/HospediaAPI/api/v1/CommonAPI/getState",
  GetDistrictList: "/HospediaAPI/api/v1/CommonAPI/getDistrict",
  GetCityList: "/HospediaAPI/api/v1/CommonAPI/getCity",

  // Reports
  // BindDetailUser: "/HospediaAPI/api/v1/DailyCollection/BindUser",
  // BindTypeOfTnx: "/HospediaAPI/api/v1/DailyCollection/BindTypeOfTnx",
  // BindSpeciality: "/HospediaAPI/api/v1/CommonAPI/BindSpeciality",

  // Reports

  BindDetailUser: "/HospediaAPI/api/v1/DailyCollection/BindUser",
  BindTypeOfTnx: "/HospediaAPI/api/v1/DailyCollection/BindTypeOfTnx",
  BindSpeciality: "/HospediaAPI/api/v1/CommonAPI/BindSpeciality",


  ///////////////////////////////    MANTIS API  ///////////////////////////////

  login: "/CRMAPI/API/LoginAPIDynamic/Login",

  //PROJECTDROPDOWN HEADER
  ProjectList: "/CRMAPI/API/MasterBind/Project_Select",

  //PROJECTMASTER PAGE apiUrls
  ProjectSelect: "/CRMAPI/API/MasterBind/Project_Select",

  ///ViewIssuesSearchPage
  ViewIssueSearch: "/CRMAPI/API/ViewIssue/ViewIssueSearch",

  //MyView Page Api's
  AutobackupSearch: "/CRMAPI/API/Autobackup/AutobackupSearch",
  AssingedToMe: "/CRMAPI/API/MyView/AssingedToMe",
  UnAssigned: "/CRMAPI/API/MyView/UnAssigned",
  ReportedbyMe: "/CRMAPI/API/MyView/ReportedbyMe",

  // ViewIssues Page Api's
  ApplyAction: "/CRMAPI/API/ViewIssue/ApplyAction",
  Vertical_Select: "/CRMAPI/API/MasterBind/Vertical_Select",
  Team_Select: "/CRMAPI/API/MasterBind/Team_Select",
  Wing_Select: "/CRMAPI/API/MasterBind/Wing_Select",
  POC_1_Select: "/CRMAPI/API/MasterBind/POC_1_Select",
  POC_2_Select: "/CRMAPI/API/MasterBind/POC_2_Select",
  POC_3_Select: "/CRMAPI/API/MasterBind/POC_3_Select",
  Category_Select: "/CRMAPI/API/MasterBind/Category_Select",
  Status_Select: "/CRMAPI/API/MasterBind/Status_Select",
  Reporter_Select: "/CRMAPI/API/MasterBind/Reporter_Select",
  AssignTo_Select: "/CRMAPI/API/MasterBind/AssignTo_Select",
  Priority_Select: "/CRMAPI/API/MasterBind/Priority_Select",
  DeleteTicket: "/CRMAPI/API/ViewIssue/DeleteTicket",
  ViewTicket: "/CRMAPI/API/ViewIssue/ViewTicket",
  UpdateTicket: "/CRMAPI/API/BugReport/UpdateTicket",
  DeleteNote: "/CRMAPI/API/BugReport/DeleteNote",
  UpdateNote: "/CRMAPI/API/BugReport/UpdateNote",
  ViewNote: "/CRMAPI/API/ViewIssue/ViewNote",
  ViewHistory: "/CRMAPI/API/ViewIssue/ViewHistory",
  UpdateTickets: "/CRMAPI/API/ViewIssue/UpdateTicket",
  //NewTicket(ReportIssue) Page Api's
  NewTicket: "/CRMAPI/API/BugReport/NewTicket",

  //AutoBackupStatusSheet  Page Api's   & MisReport Table Page
  AutobackupSearch: "/CRMAPI/API/Autobackup/AutobackupSearch",
  SPOC_Update: "/CRMAPI/API/Autobackup/SPOC_Update",
  AutobackupLog: "/CRMAPI/API/Autobackup/AutobackupLog",

  //Employee Master Page Api's   && SearchEmployeeMaster
  SearchEmployee_EmployeeID:
    "/CRMAPI/API/EmployeeMaster/SearchEmployee_EmployeeID",
  CreateEmployee: "/CRMAPI/API/EmployeeMaster/CreateEmployee",
  UpdateEmployee: "/CRMAPI/API/EmployeeMaster/UpdateEmployee",
  ViewDesignation: "/CRMAPI/API/DesignationMaster/ViewDesignation",
  Accesslevel: "/CRMAPI/API/EmployeeMaster/Accesslevel",
  SearchEmployee_Name: "/CRMAPI/API/EmployeeMaster/SearchEmployee_Name",
  CreateDesignation: "/CRMAPI/API/DesignationMaster/CreateDesignation",
  UpdateDesignation: "/CRMAPI/API/DesignationMaster/UpdateDesignation",

  //EmployeeChangePassword Page Api's
  ChangePassword: "/CRMAPI/API/BugReport/ChangePassword",

  //ProjectMaster Page Api's
  CreateProject: "/CRMAPI/API/ProjectMaster/CreateProject",
  ViewProject: "/CRMAPI/API/ProjectMaster/ViewProject",
  UpdateProject: "/CRMAPI/API/ProjectMaster/UpdateProject",
  UpdateProjectRateCard: "/CRMAPI/API/ProjectMaster/UpdateProjectRateCard",
  GetCountry: "/CRMAPI/API/MasterBind/GetCountry",
  GetState: "/CRMAPI/API/MasterBind/GetState",
  GetDistrict: "/CRMAPI/API/MasterBind/GetDistrict",
  GetCity: "/CRMAPI/API/MasterBind/GetCity",
  GetProductVersion: "/CRMAPI/API/ProjectMaster/GetProductVersion",
  UpdateLocality: "/CRMAPI/API/ProjectMaster/UpdateLocality",
  CreateBilling: "/CRMAPI/API/ProjectMaster/CreateBilling",
  UpdateBilling: "/CRMAPI/API/ProjectMaster/UpdateBilling",
  UpdateEscalation: "/CRMAPI/API/ProjectMaster/UpdateEscalation",
  UpdateNotification: "/CRMAPI/API/ProjectMaster/UpdateNotification",
  GetClientModuleList: "/CRMAPI/API/ProjectMaster/GetClientModuleList",
  GetPhaseID: "/CRMAPI/API/ProjectMaster/GetPhaseID",
  CreateClientModule: "/CRMAPI/API/ProjectMaster/CreateClientModule",
  UpdateClientModule: "/CRMAPI/API/ProjectMaster/UpdateClientModule",
  DeleteClientModule: "/CRMAPI/API/ProjectMaster/DeleteClientModule",
  SaveMachineList: "/CRMAPI/API/ProjectMaster/SaveMachineList",
  UpdateMachineList: "/CRMAPI/API/ProjectMaster/UpdateMachineList",
  DeleteClientMachineList: "/CRMAPI/API/ProjectMaster/DeleteClientMachineList",
  GetGstTaxAndOldLisID: "/CRMAPI/API/ProjectMaster/GetGstTaxAndOldLisID",
  AMCType_Select: "/CRMAPI/API/MasterBind/AMCType_Select",
  UpdateFinancialInfo: "/CRMAPI/API/ProjectMaster/UpdateFinancialInfo",
  CreateClientCentre: "/CRMAPI/API/ProjectMaster/CreateClientCentre",
  UpdateClientCentre: "/CRMAPI/API/ProjectMaster/UpdateClientCentre",
  GetProjectCategory: "/CRMAPI/API/ProjectMaster/GetProjectCategory",
  CreateProjectCategory: "/CRMAPI/API/ProjectMaster/CreateProjectCategory",

  //UserVSProjectMapping Page Api's
  UserVsProject_Select: "/CRMAPI/API/EmployeeMaster/UserVsProject_Select",
  UserVsProjectMapping: "/CRMAPI/API/EmployeeMaster/UserVsProjectMapping",

  //ChangeSubmitDateofTicket Page Api's
  ChangeSubmitDate: "/CRMAPI/API/BugReport/ChangeSubmitDate",

  //UploadDocument Page Api's
  DocumentType_Select: "/CRMAPI/API/ManageDocument/DocumentType_Select",
  UploadDocument_Search: "/CRMAPI/API/ManageDocument/UploadDocument_Search",
  UploadDocument: "/CRMAPI/API/ManageDocument/UploadDocument",

  //Amount Submission Page Api's
AmountSubmission_ByAccounts:'/CRMAPI/API/Accounts/AmountSubmission_ByAccounts',
  AmountSubmission_ByAccounts_Search:'/CRMAPI/API/Accounts/AmountSubmission_ByAccounts_Search',
  AmountSubmission_ByAccounts_IsCancel:'/CRMAPI/API/Accounts/AmountSubmission_ByAccounts_IsCancel',

  //Query Master Api;s
  Query_Insert:'/CRMAPI/API/QueryVsResult/Query_Insert',
  Query_Update :'/CRMAPI/API/QueryVsResult/Query_Update',
  QueryVsResult_Select :'/CRMAPI/API/QueryVsResult/QueryVsResult_Select',
  Result_Insert:'/CRMAPI/API/QueryVsResult/Result_Insert',
  Result_Update :'/CRMAPI/API/QueryVsResult/Result_Update',

  //Connector Request Api's 
  Connector_Search:'/CRMAPI/API/AccountsConnector/Connector_Search',
  Connector_Settlement_Insert:'/CRMAPI/API/AccountsConnector/Connector_Settlement_Insert',
  Connector_Discount_Insert :'/CRMAPI/API/AccountsConnector/Connector_Discount_Insert',
  Connector_Select:'/CRMAPI/API/AccountsConnector/Connector_Select',
  Connector_Insert:'/CRMAPI/API/AccountsConnector/Connector_Insert',
  Connector_Status_Update:'/CRMAPI/API/AccountsConnector/Connector_Status_Update',
  Connector_Update:'/CRMAPI/API/AccountsConnector/Connector_Update',


  
  GetImplementaiondropdown:"/CRMAPI/API/ImplementationSteps/ImplementationSteps_MasterSelect",
  InsertImplementaion:"/CRMAPI/API/ImplementationSteps/ImplementationSteps_Insert",
  DeleteImplementation:"CRMAPI/API/ImplementationSteps/ImplementationSteps_Delete",
  UpdateImplementation:"CRMAPI/API/ImplementationSteps/ImplementationSteps_Update",


  //Attendance//
  Attendence_Login:'/CRMAPI/API/Attendence/Attendence_Login',
  Attendence_Select:'/CRMAPI/API/Attendence/Attendence_Select',
  Attendence_Search:'/CRMAPI/API/Attendence/Attendence_Search',

  //LeaveRequest//
  LeaveRequest_ApproveALL:'/CRMAPI/API/Attendence/LeaveRequest_ApproveALL',
  LeaveRequest_BindCalender:'/CRMAPI/API/Attendence/LeaveRequest_BindCalender',
  LeaveRequest_Save:'/CRMAPI/API/Attendence/LeaveRequest_Save',
  LeaveRequest_Select:'/CRMAPI/API/Attendence/LeaveRequest_Select',

  LeaveApproval_Search:'/CRMAPI/API/Attendence/LeaveApproval_Search',
  ShowWorkingDays_Search:'/CRMAPI/API/Attendence/ShowWorkingDays_Search',
  UploadAttendanceExcel:'/CRMAPI/API/Attendence/UploadAttendanceExcel',
  
};
