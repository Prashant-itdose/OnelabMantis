import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebarMenu } from "@app/store/reducers/ui";
import NotificationsDropdown from "@app/layouts/header/notifications-dropdown/NotificationsDropdown";
import LanguagesDropdown from "@app/layouts/header/languages-dropdown/LanguagesDropdown";
import Themedropdown from "@app/layouts/header/Theme-dropdown";
import { toggleFullScreen } from "../../utils/helpers";
import SubMenuDropdown from "@app/layouts/header/submenu-dropdown/SubMenuDropdown";
import OverlayDropdown from "./overlay-dropdown";
import { useNavigate } from "react-router-dom";
// import { GetRoleListByEmployeeIDAndCentreID } from "../../store/reducers/getRoleListSlice";
// import getEmployewiseCentre from "../../store/reducers/common/getEmployewiseCentre";
import UserDropdown from "./user-dropdown/UserDropdown";
import ReactSelectHead from "../../components/formComponent/ReactSelectHead";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";
import {
  GetBindMenu,
  GetRoleListByEmployeeIDAndCentreID,
  ProjectList,
  getBindPanelList,
  getEmployeeWise,
  getNotification,
} from "../../store/reducers/common/CommonExportFunction";
import { logoutAction } from "../../store/reducers/AuthSlice/logoutSlice";
import { updateClaims } from "../../networkServices/HeaderApi";
import logoitdose from "../../assets/image/logoitdose.png";
import { getBindCategory } from "../../store/reducers/TokenManagementSlice/CommonExportFunction";
import { headers } from "../../utils/apitools";
import axios from "axios";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import Modal from "../../components/modalComponent/Modal";
import ViewIssueDetailsTableModal from "../../components/UI/customTable/ViewIssueDetailsTableModal";
import { apiUrls } from "../../networkServices/apiEndpoints";
const Header = React.memo(() => {
  const [routeFlag, setRouteFlag] = useState(false);
  const localData = useLocalStorage("userData", "get"); // get Data from localStorage
  const [t] = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navbarVariant = useSelector((state) => state.ui.navbarVariant);
  const headerBorder = useSelector((state) => state.ui.headerBorder);
  const screenSize = useSelector((state) => state.ui.screenSize);
  const { GetProjectList, loading, error, success } = useSelector(
    (state) => state.CommonSlice
  );

  const { GetEmployeeWiseCenter, GetMenuList, GetRoleList } = useSelector(
    (state) => state?.CommonSlice
  );
  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });
  const signout = useSelector((state) => state.logoutSlice);
  const handleToggleMenuSidebar = () => {
    dispatch(toggleSidebarMenu());
  };

  const getContainerClasses = useCallback(() => {
    let classes = `main-header navbar navbar-expand ${navbarVariant}`;
    if (headerBorder) {
      classes = `${classes} border-bottom-0`;
    }
    return classes;
  }, [navbarVariant, headerBorder]);

  /**
   * Logout function to handle user logout API Implement.
   */

  const logOut = () => {
    // dispatch(
    //   logoutAction({
    //     roleID: localData?.defaultRole,
    //     employeeID: localData?.employeeID,
    //     centreID: localData?.centreID,
    //   })
    // );
    localStorage.clear();
    setRouteFlag(true);
    navigate("/login");
    // notify("Sucessfully logout", "success");
  };

  const handleChangeCentre = async (e) => {
    const { value } = e;

    const handleDeliveryChange = (name, e) => {
      const { value } = e;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    window.location.reload();
  };

  /**
   * Make an API request for MasterPage/EmployeeWiseCentreList.
   *
   * @param {parametre} EmployeeID - The parametre for EmployeeID from localStorage
   * @param {API Implement Name} options - API for MasterPage/EmployeeWiseCentreList.
   */
  // useEffect(() => {
  //   if (localData?.employeeID) {
  //     dispatch(getEmployeeWise({ employeeID: localData?.employeeID }));
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(
  //     getNotification({
  //       RoleID: localData?.defaultRole,
  //       EmployeeID: localData?.employeeID,
  //       CentreID: localData?.defaultCentre,
  //     })
  //   );
  // }, []);

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
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    routeFlag && signout?.success && navigate("/login");
  }, [signout?.success]);

  useEffect(() => {
    const payload = new FormData();
    payload?.append("ID", localStorage?.getItem("ID"));
    dispatch(ProjectList(payload));
  }, [dispatch]);
  const [formData, setFormData] = useState({
    ProjectID: "",
    issuesearch: "",
  });
  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const [project, setProject] = useState([]);

  const handleIssueSearch = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID"));
    form.append("TicketID", formData?.issuesearch);

    axios
      .post(apiUrls?.ViewTicket, form, {
        headers,
      })
      .then((res) => {
        if (res?.data?.status === true) {
          navigate("/ViewIssues", {
            state: {
              data: res.data.data,
              id: formData?.issuesearch,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(event.key);
      handleIssueSearch();
    }
  };

  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"1000px"}
          visible={visible}
          setVisible={setVisible}
          Header="View Issues Detail"
        >
          <ViewIssueDetailsTableModal
            visible={visible}
            setVisible={setVisible}
          />
        </Modal>
      )}
      <nav className={getContainerClasses()} style={{ position: "relative" }}>
        <ul className="navbar-nav">
          {["lg", "md", "sm"].includes(screenSize) ? (
            <div className="img-conatiner">
              <div style={{ width: "70%", height: "50px" }}>
                <img
                  src={logoitdose}
                  className="img-fluid"
                  style={{ height: "26px" }}
                />
                <br></br>
                <span style={{ fontSize: "8px", fontWeight: "bold" }}>
                  Mantis
                </span>
              </div>
            </div>
          ) : (
            <li className="nav-item">
              <button
                onClick={handleToggleMenuSidebar}
                type="button"
                className="nav-link mobilerespBars"
              >
                <i className="fas fa-bars" />
              </button>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ml-6"></ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item savetheme">
            <div type="button" className=" headerboxsize">
              <ReactSelectHead
                respclass="col-sm-6 col-12 col-md-10"
                name="ProjectID"
                placeholderName="Project"
                dynamicOptions={GetProjectList?.map((item) => {
                  return { label: item?.Project, value: item?.ProjectId };
                })}
                handleChange={handleDeliveryChange}
                value={formData?.ProjectID}
              />
            </div>
          </li>

          {["lg", "md"].includes(screenSize) && (
            <li className="nav-item savetheme">
              <div type="button" className=" headerboxsize">
                <ReactSelectHead
                  placeholderName="Select Role"
                  dynamicOptions={GetRoleList?.map((ele) => {
                    return {
                      label: ele?.roleName,
                      value: ele?.roleID,
                    };
                  })}
                  searchable={true}
                  respclass="col-sm-6 col-12 col-md-10"
                  value={Number(localData?.defaultRole)}
                  handleChange={handleChangeRole}
                  //  respclass="roll-off"
                  plcN="center"
                />
              </div>
            </li>
          )}
        
            <li className="nav-item savetheme issuesearchcss">
              <div className="headerboxsize mt-1">
                <Input
                  type="text"
                  className="form-control"
                  id="issuesearch"
                  name="issuesearch"
                  lable="Issue Search"
                  placeholder=""
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  value={formData?.issuesearch}
                  respclass="col-sm-2 col-12 col-md-10"
                />
              </div>
            </li>
          
          <li className="nav-item d-md-none">
            <div type="button">
              {/* <i className="fa fa-ellipsis-v" aria-hidden="true"></i> */}
              <SubMenuDropdown />
            </div>
          </li>
          <li className="nav-item position-relative d-none d-md-flex px-1">
            <Themedropdown />
          </li>
          {/* <li className="nav-item">
          <OverLay />
          </li> */}
          {/* <li className="nav-item">
            <button type="button" className="nav-link">
              <i className="fa fa-solid fa-star"></i>
            </button>
          </li> */}
          <li className="nav-item d-none d-md-flex px-1">
            <div type="button">
              <i className="fa fa-home text-white" aria-hidden="true"></i>
            </div>
          </li>
          {/* <li className="nav-item d-none d-md-flex px-1">
            <NotificationsDropdown />
          </li> */}

          {/* <li className="nav-item d-none d-md-flex pr-2 ">
            <div>
              <OverlayDropdown />
            </div>
          </li> */}
          <li className="nav-item d-none d-md-flex px-2">
            <div onClick={toggleFullScreen}>
              <i className="fa fa-arrows-alt text-white" aria-hidden="true"></i>
            </div>
          </li>
          <li className="nav-item  d-md-flex">
            <button type="button" className="nav-link" onClick={logOut}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </li>

          {/* <li className="nav-item d-none d-md-flex ">
            <LanguagesDropdown />
          </li> */}

          <li className="nav-item d-none d-md-flex">
            <button type="button" className="nav-link d-flex">
              <UserDropdown />
              <label className="control-label ml-1 d-none d-lg-block text-white">
                {localStorage?.getItem("realname")}
              </label>
            </button>
          </li>
          {/* <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            onClick={handleToggleControlSidebar}
          >
            <i className="fas fa-th-large" />
          </button>
        </li> */}
        </ul>
      </nav>
      {/* <Header1 /> */}
    </>
  );
});

export default Header;
