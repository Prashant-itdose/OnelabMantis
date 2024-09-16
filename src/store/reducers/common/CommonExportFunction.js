import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../loadingSlice/loadingSlice";
import { apiUrls } from "../../../networkServices/apiEndpoints";
import makeApiRequest from "../../../networkServices/axiosInstance";
import { handleReactSelectDropDownOptions, notify } from "../../../utils/utils";

export const CentreWiseCacheByCenterID = createAsyncThunk(
  "CentreWiseCache",
  async ({ centreID }, { dispatch }) => {
    const options = {
      method: "GET",
    };

    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.CentreWiseCacheByCenterID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const CentreWisePanelControlCache = createAsyncThunk(
  "CentreWisePanelControlCache",
  async ({ centreID }, { dispatch }) => {
    const options = {
      method: "GET",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.CentreWisePanelControlCache}?CentreID=${centreID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const getEmployeeWise = createAsyncThunk(
  "centre",
  async ({ employeeID }, { dispatch }) => {
    const options = {
      method: "GET",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.EmployeeWiseCentreList}?EmployeeId=${employeeID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetBindMenu = createAsyncThunk(
  "BindMenu",
  async ({ RoleID }, { dispatch }) => {
    // console.log("RoleID", RoleID);
    const options = {
      method: "GET",
    };
    try {
      dispatch(setLoading(true));
      // const data = await makeApiRequest(
      //   `${apiUrls.BindMenuList}?RoleID=${RoleID}`,
      //   options
      // );
      const newdata={
        "success": true,
        "data": [
            {
                "menuName": "Tickets",
                "menuOrder": "1",
                "menuID": "84",
                "menuIcon": "fas fa-tachometer-alt",
                "children": [
                    {
                        "childrenName": "MyView",
                        "url": "/myview",
                        "childrenOrder": "1",
                        "breadcrumb": "Tickets / MyView"
                    },
                    {
                      "childrenName": "View Issues",
                      "url": "/viewissues",
                      "childrenOrder": "2",
                      "breadcrumb": "Tickets / ViewIssues"
                  },
                  {
                    "childrenName": "Report Issue",
                    "url": "/reportissue",
                    "childrenOrder": "3",
                    "breadcrumb": "Tickets / ReportIssue"
                }
                ]
            },
            {
              "menuName": "AutoBackup",
              "menuOrder": "2",
              "menuID": "85",
              "menuIcon": "fas fa-tachometer-alt",
              "children": [
                {
                    "childrenName": "AutoBackupStatusSheet",
                    "url": "/AutoBackupStatusSheet",
                    "childrenOrder": "1",
                    "breadcrumb": "AutoBackup / AutoBackupStatusSheet"
                }]
            },
          
            {
              "menuName": "Master",
              "menuOrder": "4",
              "menuID": "87",
              "menuIcon": "fas fa-tachometer-alt",
              "children": [
                {
                    "childrenName": "Employee Master",
                    "url": "/EmployeeMaster",
                    "childrenOrder": "1",
                    "breadcrumb": "Master / Employee Master"
                },
                {
                    "childrenName": "Employee Change Password",
                    "url": "/EmployeeChangePassword",
                    "childrenOrder": "2",
                    "breadcrumb": "Master / Employee Change Password"
                },
                {
                    "childrenName": "Project Master",
                    "url": "/ProjectMaster",
                    "childrenOrder": "3",
                    "breadcrumb": "Master / Project Master"
                },
                {
                    "childrenName": "Quotation Master",
                    "url": "/QuotationMaster",
                    "childrenOrder": "4",
                    "breadcrumb": "Master / Quotation Master"
                },
              ]},
                {
                  "menuName": "Tools",
                  "menuOrder": "5",
                  "menuID": "88",
                  "menuIcon": "fas fa-tachometer-alt",
                  "children": [
                    {
                        "childrenName": "User Vs Project Mapping",
                        "url": "/UserVSProjectMapping",
                        "childrenOrder": "1",
                        "breadcrumb": "Tools / User Vs Project Mapping"
                    },
                    {
                        "childrenName": "Change Submit Dat of Ticket",
                        "url": "/ChangeSubmitDateofTicket",
                        "childrenOrder": "2",
                        "breadcrumb": "Tools / Change Submit Date of Ticket"
                    },
                    {
                        "childrenName": "Query Vs Result",
                        "url": "/QueryVsResultMaster",
                        "childrenOrder": "3",
                        "breadcrumb": "Tools / Query Vs Result"
                    },
                    {
                        "childrenName": "Upload Document",
                        "url": "/UploadDocument",
                        "childrenOrder": "4",
                        "breadcrumb": "Tools / Upload Document"
                    },
              ]
            },
            {
              "menuName": "Sales",
              "menuOrder": "3",
              "menuID": "86",
              "menuIcon": "fas fa-tachometer-alt",
              "children": [
                {
                    "childrenName": "Connector Request",
                    "url": "/ConnectorRequest",
                    "childrenOrder": "1",
                    "breadcrumb": "Sales / Connector Request"
                },
                {
                    "childrenName": "Account",
                    "url": "/AmountSubmission",
                    "childrenOrder": "2",
                    "breadcrumb": "Sales / Account"
                },
                {
                    "childrenName": "Account",
                    "url": "/SalesBooking",
                    "childrenOrder": "3",
                    "breadcrumb": "Sales / SalesBooking"
                },
              ]
            },
            {
              "menuName": "HR",
              "menuOrder": "4",
              "menuID": "87",
              "menuIcon": "fas fa-tachometer-alt",
              "children": [
                {
                    "childrenName": "Attendance",
                    "url": "/Attendance",
                    "childrenOrder": "1",
                    "breadcrumb": "HR / Attendance"
                },
                {
                    "childrenName": "Leave Request",
                    "url": "/LeaveRequest",
                    "childrenOrder": "2",
                    "breadcrumb": "HR / Leave Request"
                },
                {
                    "childrenName": "Leave View/Approval",
                    "url": "/LeaveViewApproval",
                    "childrenOrder": "3",
                    "breadcrumb": "HR / Leave View/Approval"
                },
                {
                    "childrenName": "Show Employee",
                    "url": "/ShowEmployee",
                    "childrenOrder": "4",
                    "breadcrumb": "HR / Show Employee"
                },
                {
                    "childrenName": "Show Working Days",
                    "url": "/ShowWorkingDays",
                    "childrenOrder": "4",
                    "breadcrumb": "HR / Show Working Days"
                },
                {
                    "childrenName": "Advance Request",
                    "url": "/AdvanceRequest",
                    "childrenOrder": "5",
                    "breadcrumb": "HR / Advance Request"
                },
                {
                    "childrenName": "Advance Request View",
                    "url": "/AdvanceRequestView",
                    "childrenOrder": "6",
                    "breadcrumb": "HR / Advance Request View"
                },
                {
                    "childrenName": "View Employee Expense",
                    "url": "/ViewExpenseList",
                    "childrenOrder": "7",
                    "breadcrumb": "HR / View Employee Expense"
                },
              ]
            }
          ]
        
          ,"message":""
          }
      dispatch(setLoading(false));
      return newdata;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const getNotification = createAsyncThunk(
  "GetNotify",
  async ({ RoleID, EmployeeID, CentreID }, { dispatch }) => {
    const options = {
      method: "GET",
    };
    try {
      dispatch(setLoading(true));
      const data = await makeApiRequest(
        `${apiUrls.getNotificationDetail}?RoleID=${RoleID}&EmployeeID=${EmployeeID}&CentreID=${CentreID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetRoleListByEmployeeIDAndCentreID = createAsyncThunk(
  "GetRoleList",
  async ({ centreID, employeeID }, { dispatch }) => {
    const options = {
      method: "GET",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.getRoleList}?centerID=${centreID}&employeeID=${employeeID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetBindReferDoctor = createAsyncThunk(
  "GetBindDoctorList",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
      data,
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.BindReferDoctor}`, options);
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetBindReferalType = createAsyncThunk(
  "getReferTypeList",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
      data,
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.BindRefferalType}`, options);
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetBindDepartment = createAsyncThunk(
  "GetBindDepartmentList",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
      data: {
        centreID: "1",
        TypeID: "5",
      },
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.BindDepartment}?TypeID=5`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);
export const BindSeeMoreList = createAsyncThunk(
  "BindSeeMoreList",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
      data: {
        centreID: "1",
        TypeID: "5",
      },
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.BindSeeMoreList}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetPanelDocument = createAsyncThunk(
  "getPanelDocumentList",
  async ({ PanelID }, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.GetPanelDocument}?PanelID=${PanelID}`,
        options
      );

      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const GetPatientUploadDocument = createAsyncThunk(
  "getPatientUploadDocument",
  async ({ patientID }, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.GetPatientUploadDocument}?patientID=${patientID}`,
        options
      );
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);

export const ReferenceTypeInsert = createAsyncThunk(
  "REFERENCETYPE",
  async (data, { dispatch }) => {
    const options = {
      method: "POST",
      data,
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(apiUrls.CreateTypeOfReference, options);
      dispatch(setLoading(false));
      if (data?.status) {
        notify(data?.message, "success");
      } else {
        notify(data?.message, "error");
      }
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);
export const ProjectList = createAsyncThunk(
  "ProjectList",
  async (payload, { dispatch }) => {
    const options = {
      method: "POST",
      data: payload,
    };
    
    dispatch(setLoading(true));
     
    try {
      const response = await makeApiRequest(apiUrls.ProjectList, options);
      dispatch(setLoading(false));
      
     
      return response;
    } catch (error) {
      dispatch(setLoading(false));
      notify(error?.message || "An error occurred", "error");
      throw error;  // Ensure the error is rethrown for any further handling upstream
    }
  }
);


export const GetAdvanceReason = createAsyncThunk(
  "GetAdvanceReason",
  async (data,{ dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(`${apiUrls.GetAdvanceReason}`, options);
      dispatch(setLoading(false));
      return data;
    } catch {
      dispatch(setLoading(false));
    }
  }
);


export const CreateAdvanceReason = createAsyncThunk(
  "CreateAdvanceReason",
  async (data, { dispatch }) => {
    console.log(data)
    const options = {
      method: "POST",
      data,
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        apiUrls.CreateAdvanceReason,
        options
      );
      dispatch(setLoading(false));
      if (data?.success) {
        notify(data?.message, "success")
      } else {
        notify(data?.message, "error");
      }
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);

export const GetBindResourceList = createAsyncThunk(
  "BINDRESOURCELIST",
  async (data, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(apiUrls.BindResourceList, options);
      dispatch(setLoading(false));
      return data;
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);

export const GetAllDoctor = createAsyncThunk(
  "GetAllDoctorList",
  async (_, { dispatch }) => {
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.BindDoctorDept}?Department=ALL&CentreID=1`,
        options
      );
      dispatch(setLoading(false));
      return {
        data: handleReactSelectDropDownOptions(data?.data, "Name", "DoctorID"),
      };
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);



export const GetBindAllDoctorConfirmation = createAsyncThunk(
  "GetBindAllDoctorConfirmation",
  async ({Department, CentreID}, { dispatch }) => {

    
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.BindDoctorDept}?Department=${Department}`,
        options
      );
      dispatch(setLoading(false));
      return data
      // return {
      //   data: handleReactSelectDropDownOptions(data?.data, "Name", "DoctorID"),
      // };
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);

export const GetBindSubCatgeory = createAsyncThunk(
  "GetBindSubCatgeory",
  async ({Type, CategoryID}, { dispatch }) => {

    
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.getBindSubCategory}?Type=${Type}&CategoryID=${CategoryID}`,
        options
      );
      dispatch(setLoading(false));
      return data
      // return {
      //   data: handleReactSelectDropDownOptions(data?.data, "Name", "DoctorID"),
      // };
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);



// Token Management
export const getBindCentre = createAsyncThunk(
  "getBindCentre",
  async (_,{ dispatch }) => {    
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.getBindCenterAPI}`,
        options
      );
      dispatch(setLoading(false));
      return data
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);
export const getBindSpeciality = createAsyncThunk(
  "getBindSpeciality",
  async (_,{ dispatch }) => {    
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.BindSpeciality}`,
        options
      );
      dispatch(setLoading(false));
      return data
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);
export const getBindPanelList = createAsyncThunk(
  "getBindPanelList", 
  async ({PanelGroup},{ dispatch }) => {    
    const options = {
      method: "get",
    };
    dispatch(setLoading(true));
    try {
      const data = await makeApiRequest(
        `${apiUrls.GetPanelName}?PanelGroup=${PanelGroup}`,
        options
      );
      dispatch(setLoading(false));
      return data
    } catch (e) {
      dispatch(setLoading(false));
      notify(e?.message, "error");
    }
  }
);