import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import MenuItem from "@app/layouts/menu-sidebar/MenuItem.jsx";
import { Image } from "@profabric/react-components";
import styled from "styled-components";
import i18n from "@app/utils/i18n";
import ReactSelectHead from "../../components/formComponent/ReactSelectHead";
import logo from "@app/assets/image/logo.png";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import { useTranslation } from "react-i18next";
import DesktopMenuItem from "./DesktopMenuItem";
import { GetBindMenu } from "../../store/reducers/common/CommonExportFunction";
// import { GetRoleListByEmployeeIDAndCentreID } from "../../store/reducers/common/getRoleListSlice";

const Version = import.meta.env.VITE_APP_VERSION;

export const MENU = {
  commonComponent: [
    {
      menuName: i18n.t("menusidebar.label.dashboard"),
      icon: "fas fa-tachometer-alt nav-icon",
      children: [
        {
          childrenName: i18n.t("menusidebar.label.dashboard"),
          icon: "fas fa-regular fa-user",
          url: "/dashboard",
          breadcrumb: "Dashboard",
        },
      ],
    },
  ],
  frontOffice: [
    {
      name: i18n.t("Tickets"),
      icon: "fas fa-regular fa-users",
      children: [
        {
          name: "MyView",
          icon: "fas fa-regular fa-user",
          path: "/myview",
          breadcrumb: "Tickets / MyView",
        },
        {
          name: "ViewIssues",
          icon: "fas fa-regular fa-user",
          path: "/viewissues",
          breadcrumb: "Tickets / ViewIssues",
        },
        {
          name: "ReportIssue",
          icon: "fas fa-regular fa-user",
          path: "/reportissue",
          breadcrumb: "Tickets / ReportIssue",
        }
      ],
    },
    {
      name: i18n.t("MIS"),
      icon: "fas fa-regular fa-users",
      children: [
        {
          name: "AutoBackupStatusSheet",
          icon: "fas fa-regular fa-user",
          path: "/AutoBackupStatusSheet",
          breadcrumb: "MIS / AutoBackupStatusSheet",
        }]
    },
 
    {
      name: i18n.t("Master"),
      icon: "fas fa-regular fa-users",
      children: [
        {
          name: "EmployeeMaster",
          icon: "fas fa-regular fa-user",
          path: "/EmployeeMaster",
          breadcrumb: "Master / Employee Master",
        },
        {
          name: "Employee Change Password",
          icon: "fas fa-regular fa-user",
          path: "/EmployeeChangePassword",
          breadcrumb: "Master / Employee Change Password",
        },
        {
          name: "Project Master",
          icon: "fas fa-regular fa-user",
          path: "/ProjectMaster",
          breadcrumb: "Master / Project Master",
        },

        {
          name: "Quotation Master",
          icon: "fas fa-regular fa-user",
          path: "/QuotationMaster",
          breadcrumb: "Master / Quotation Master",
        },
      ]
    },
    {
      name: i18n.t("Tools"),
      icon: "fas fa-regular fa-users",
      children: [
        {
          name: "User Vs Project Mapping",
          icon: "fas fa-regular fa-user",
          path: "/UserVSProjectMapping",
          breadcrumb: "Tools / User Vs Project Mapping",
        },
        {
          name: "Change Submit Dat of Ticket",
          icon: "fas fa-regular fa-user",
          path: "/ChangeSubmitDateofTicket",
          breadcrumb: "Tools / Change Submit Dat of Ticket",
        },
        {
          name: "Query Vs Result",
          icon: "fas fa-regular fa-user",
          path: "/QueryVsResultMaster",
          breadcrumb: "Tools / Query Vs Result",
        },
        {
          name: "Upload Document",
          icon: "fas fa-regular fa-user",
          path: "/UploadDocument",
          breadcrumb: "Tools / Upload Document",
        },
      ]
    },
    {
      name: i18n.t("Sales"),
      icon: "fas fa-regular fa-users",
      children: [
        {
          name: "Connector Request",
          icon: "fas fa-regular fa-user",
          path: "/ConnectorRequest",
          breadcrumb: "Sales / Connector Request",
        },
        {
          name: "Account",
          icon: "fas fa-regular fa-user",
          path: "/AmountSubmission",
          breadcrumb: "Sales / Account",
        },
        {
          name: "SalesBooking",
          icon: "fas fa-regular fa-user",
          path: "/SalesBooking",
          breadcrumb: "Sales / SalesBooking",
        },
      ]
    },
    {
      name: i18n.t("HR"),
      icon: "fas fa-regular fa-users",
      children: [
        {
          name: "Attendance",
          icon: "fas fa-regular fa-user",
          path: "/Attendance",
          breadcrumb: "HR / Attendance",
        },
        {
          name: "Leave Request",
          icon: "fas fa-regular fa-user",
          path: "/LeaveRequest",
          breadcrumb: "HR / Leave Request",
        },
        {
          name: "Leave View/Approval",
          icon: "fas fa-regular fa-user",
          path: "/LeaveViewApproval",
          breadcrumb: "HR / Leave View/Approval",
        },
        {
          name: "Show Employee",
          icon: "fas fa-regular fa-user",
          path: "/ShowEmployee",
          breadcrumb: "HR / Show Employee",
        },
        {
          name: "Show Working Days",
          icon: "fas fa-regular fa-user",
          path: "/ShowWorkingDays",
          breadcrumb: "HR / Show Working Days",
        },
        {
          name: "Advance Request",
          icon: "fas fa-regular fa-user",
          path: "/AdvanceRequest",
          breadcrumb: "HR / AdvanceRequest",
        },
        {
          name: "Advance Request View",
          icon: "fas fa-regular fa-user",
          path: "/AdvanceRequestView",
          breadcrumb: "HR / Advance Request View",
        },
        {
          name: "View Employee Expense",
          icon: "fas fa-regular fa-user",
          path: "/ViewExpenseList",
          breadcrumb: "HR / View Employee Expense",
        },
      ]
    }
  ],
};

const StyledBrandImage = styled(Image)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(Image)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  const localData = useLocalStorage("userData", "get"); // get Data from localStorage
  const dispatch = useDispatch();
  const sidebarSkin = useSelector((state) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state) => state.ui.menuChildIndent);
  const screenSize = useSelector((state) => state.ui.screenSize);
  const { GetMenuList, GetRoleList } = useSelector(
    (state) => state.CommonSlice
  );
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    if (value) {
      const filtered = [...MENU["commonComponent"], ...GetMenuList]
        .map((category) => {
          const filteredChildren = category.children.filter((child) =>
            child.childrenName.toLowerCase().includes(value)
          );

          if (filteredChildren.length > 0) {
            return {
              ...category,
              children: filteredChildren,
            };
          }
          return null;
        })
        .filter((category) => category !== null);

      setFilteredData(filtered);
    } else {
      setFilteredData([...MENU["commonComponent"], ...GetMenuList]);
    }
  };

  // role bind
  const handleChangeRole = async (e) => {
    const { value } = e;
    useLocalStorage("userData", "set", { ...localData, defaultRole: value });
    try {
      await dispatch(
        GetBindMenu({
          RoleID: value,
        })
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };


  useEffect(() => {
    if (GetMenuList?.length > 0) {
      setFilteredData([...MENU["commonComponent"], ...GetMenuList]);
    }
  }, [GetMenuList]);

  // console.log(sidebarSkin);

  return ["lg", "md"].includes(screenSize) ? (
    <DesktopMenuItem filteredData={filteredData} />
  ) : (
    <aside className={`main-sidebar sidebar_border ${sidebarSkin}`}>
      <Link to="#" className="brand-link">
        <StyledBrandImage
          className="logoStyle"
          src={logo}
          alt="AdminLTE Logo"
          width={33}
          height={30}
          rounded
        />
        <span className="brand-text font-weight-bold">Mantis</span>
      </Link>
      <div className="sidebar">
        <div className="row mt-3  bindrole">
          <ReactSelectHead
            placeholderName="Select Role"
            dynamicOptions={GetRoleList?.map((ele) => {
              return {
                label: ele?.roleName,
                value: ele?.roleID,
              };
            })}
            searchable={true}
            respclass="col-12"
            value={Number(localData?.defaultRole)}
            handleChange={handleChangeRole}
          />
        </div>
        <div className="row bindrole">
          <div className="col-12">
            <input
              type="text"
              className="form-control search_Items"
              id="search"
              name="search"
              label=""
              value={query}
              onChange={handleSearch}
              placeholder="Search"
              respclass="col-12"
            />
            <i className="fa fa-search search_icon" aria-hidden="true"></i>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className={`nav  nav-sidebar flex-column${menuItemFlat ? " nav-flat" : ""
              }${menuChildIndent ? " nav-child-indent" : ""}`}
            role="menu"
          >
            {filteredData?.map((menuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
                isSearched={Boolean(query)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
