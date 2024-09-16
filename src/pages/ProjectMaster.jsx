import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import Input from "../components/formComponent/Input";
import axios from "axios";
import { headers } from "../utils/apitools";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import { toast } from "react-toastify";
import ReactSelect from "../components/formComponent/ReactSelect";
import { projectTHEAD } from "../components/modalComponent/Utils/HealperThead";
import Tables from "../components/UI/customTable";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/modalComponent/Modal";
import ProjectRateCardModal from "../components/UI/customTable/ProjectRateCardModal";
import LocalityUpdateTab from "../components/UI/customTable/LocalityUpdateTab";
import BillingDetailModal from "../components/UI/customTable/BillingDetailModal";
import SpocUpdateModal from "../components/UI/customTable/SpocUpdateModal";
import EscalationModal from "../components/UI/customTable/EscalationModal";
import NotificationTabModal from "../components/UI/customTable/NotificationTabModal";
import ModuleTabModal from "../components/UI/customTable/ModuleTabModal";
import MachineModuleModal from "../components/UI/customTable/MachineModuleModal";
import FinanceModalTab from "../components/UI/customTable/FinanceModalTab";
import CentreModuleModal from "../components/UI/customTable/CentreModuleModal";
import ProjectCategoryModal from "../components/UI/customTable/ProjectCategoryModal";
import { apiUrls } from "../networkServices/apiEndpoints";
const ProjectMaster = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  console.log(state);
  const [tableData, setTableData] = useState();
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [project, setProject] = useState([]);
  const [wing, setWing] = useState([]);
  const [formData, setFormData] = useState({
    ProjectName: "",
    VerticalID: [],
    TeamID: [],
    WingID: [],
    IsActive: "",
    ProjectID: "",
  });
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  const getProject = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
          apiUrls?.ProjectSelect,
          form,
          { headers }
        )
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.Project, value: item?.ProjectId };
          });
          setProject(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getVertical = () => {
    let form = new FormData();
    form.append("Id", localStorage?.getItem("ID")),
      axios
        .post(
          apiUrls?.Vertical_Select,
          form,
          { headers }
        )
        .then((res) => {
          const verticals = res?.data.data.map((item) => {
            return { label: item?.Vertical, value: item?.verticalID };
          });
          setVertical(verticals);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getTeam = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
         apiUrls?.Team_Select,
          form,
          { headers }
        )
        .then((res) => {
          const teams = res?.data.data.map((item) => {
            return { label: item?.Team, value: item?.TeamID };
          });
          setTeam(teams);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getWing = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
          apiUrls?.Wing_Select,
          form,
          { headers }
        )
        .then((res) => {
          const wings = res?.data.data.map((item) => {
            return { label: item?.Wing, value: item?.WingID };
          });
          setWing(wings);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : "";
  }

  const handleProjectSave = () => {
    if (formData?.ProjectName == "") {
      toast.error("Please enter ProjectName.");
    } else if (formData?.VerticalID == "") {
      toast.error("Please select Vertical.");
    } else if (formData?.TeamID == "") {
      toast.error("Please select Team.");
    } else if (formData?.WingID == "") {
      toast.error("Please select Wing.");
    } else {
      let form = new FormData();
      form.append("ID", localStorage.getItem("ID")),
        form.append("LoginName", localStorage.getItem("realname")),
        form.append("ProjectName", formData?.ProjectName),
        form.append("VerticalID", formData?.VerticalID),
        form.append("TeamID", formData?.TeamID),
        form.append("WingID", formData?.WingID),
        form.append("VerticalName", getlabel(formData?.VerticalID, vertical)),
        form.append("TeamName", getlabel(formData?.TeamID, team)),
        form.append("WingName", getlabel(formData?.WingID, wing));
      axios
        .post(
          apiUrls?.CreateProject,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/SearchProjectMaster");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    // Check if state is an object and has the data property
    if (state?.edit) {
      handleViewProject(state?.data);
    }
    console.log(state);
  }, []);
  const handleViewProject = (id) => {
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID")),
      form.append("LoginName", localStorage.getItem("realname")),
      form.append("ProjectName", formData?.ProjectName);
    form.append("ProjectID", id);
    axios
      .post(
        apiUrls?.ViewProject,
        form,
        { headers }
      )
      .then((res) => {
        console.log(res?.data?.data)
        setFormData({
          ...formData,
          ProjectName: res?.data?.data[0]?.NAME,
          VerticalID: res?.data?.data[0]?.vertical,
          TeamID: res?.data?.data[0]?.team,
          WingID: res?.data?.data[0]?.wing,
          VerticalID: res?.data?.data[0]?.verticalid,
          TeamID: res?.data?.data[0]?.teamid,
          WingID: res?.data?.data[0]?.wingid,
          IsActive: res?.data?.data[0]?.enabled,
          ID: res?.data?.data[0]?.Id,
          ProjectID: id,
          Mandays: res?.data?.data[0]?.maindayscharges,
          Onsitecharges: res?.data?.data[0]?.Onsitecharges,
          MachineChargesUNI: res?.data?.data[0]?.MachineChargesUNI,
          MachineChargesBI: res?.data?.data[0]?.MachineChargesBI,
          ClientCentreList: res?.data?.ClientCentreList,
          MachineListByClient: res?.data?.MachineListByClient,
          ClientModule: res?.data?.ClientModule,
          ProjectCategory: res?.data?.ProjectCategory,
          BillingTable: res?.data?.BillingTable,
          ClientCentreList: res?.data?.ClientCentreList,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdateProject = (code) => {
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID")),
      form.append("LoginName", localStorage.getItem("realname")),
      form.append("ProjectName", formData?.ProjectName),
      form.append("ProjectID", formData?.ID),
      form.append("VerticalID", formData?.VerticalID),
      form.append("TeamID", formData?.TeamID),
      form.append("WingID", formData?.WingID),
      form.append("VerticalName", getlabel(formData?.VerticalID, vertical)),
      form.append("TeamName", getlabel(formData?.TeamID, team)),
      form.append("WingName", getlabel(formData?.WingID, wing));
    form.append("enabled", formData?.IsActive);
    axios
      .post(
       apiUrls?.UpdateProject,
        form,
        { headers }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        navigate("/SearchProjectMaster");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTeam();
    getWing();
    getVertical();
    getProject();
  }, []);
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
    localityVisible: false,
    billingVisible: false,
    spocVisible: false,
    escalationVisible: false,
    notificationVisible: false,
    moduleVisible: false,
    machineVisible: false,
    financeVisible: false,
    centreVisible: false,
    projectCategoryVisible: false,
  });

  return (
    <>
      <Modal
        modalWidth={"700px"}
        visible={visible?.showVisible}
        setVisible={setVisible}
        tableData={formData}
        Header={`Update Project RateCard : ${formData?.ProjectName}`}
      >
        <ProjectRateCardModal
          visible={visible?.showVisible}
          setVisible={setVisible}
          tableData={formData}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.localityVisible}
        setVisible={setVisible}
        tableData={state?.givenData}
        Header={`Update Locality : ${formData?.ProjectName}`}
      >
        <LocalityUpdateTab
          visible={visible?.localityVisible}
          setVisible={setVisible}
          tableData={state?.givenData}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.billingVisible}
        setVisible={setVisible}
        Header={`Update Billing Details : ${formData?.ProjectName}`}
      >
        <BillingDetailModal
          visible={visible?.billingVisible}
          setVisible={setVisible}
          showData={visible}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.spocVisible}
        setVisible={setVisible}
        tableData={state?.givenData}
        Header={`Update SPOC Details : ${formData?.ProjectName}`}
      >
        <SpocUpdateModal
          visible={visible?.spocVisible}
          setVisible={setVisible}
          tableData={state?.givenData}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.escalationVisible}
        setVisible={setVisible}
        tableData={state?.givenData}
        Header={`Escalation Matrix Details : ${formData?.ProjectName}`}
      >
        <EscalationModal
          visible={visible?.escalationVisible}
          setVisible={setVisible}
          tableData={state?.givenData}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.notificationVisible}
        setVisible={setVisible}
        tableData={state?.givenData}
        Header={`Notification Details : ${formData?.ProjectName}`}
      >
        <NotificationTabModal
          visible={visible?.notificationVisible}
          setVisible={setVisible}
          tableData={state?.givenData}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.moduleVisible}
        setVisible={setVisible}
        tableDataa={state?.givenData}
        Header={`Module Details : ${formData?.ProjectName}`}
      >
        <ModuleTabModal
          visible={visible?.moduleVisible}
          setVisible={setVisible}
          showData={visible}
          tableDataa={state?.givenData}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.machineVisible}
        setVisible={setVisible}
        Header={`Machine Details : ${formData?.ProjectName}`}
      >
        <MachineModuleModal
          showData={visible}
          apicall={handleViewProject}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.financeVisible}
        setVisible={setVisible}
        tableData={state?.givenData}
        Header={`Finance Details : ${formData?.ProjectName}`}
      >
        <FinanceModalTab
          visible={visible?.financeVisible}
          setVisible={setVisible}
          tableData={state?.givenData}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.centreVisible}
        setVisible={setVisible}
        showData={visible}
        Header={`Centre Details : ${formData?.ProjectName}`}
      >
        <CentreModuleModal
          visible={visible?.centreVisible}
          setVisible={setVisible}
          showData={visible}
        />
      </Modal>
      <Modal
        modalWidth={"700px"}
        visible={visible?.projectCategoryVisible}
        setVisible={setVisible}
        Header={`Centre Details : ${formData?.ProjectName}`}
      >
        <ProjectCategoryModal
          visible={visible?.projectCategoryVisible}
          setVisible={setVisible}
          Data={visible}
        />
      </Modal>
      <div className="card ProjectMaster border">
        <Heading title="Project Master" />
        <div className="row g-4 m-2">
          <Input
            type="text"
            className="form-control"
            id="ProjectName"
            name="ProjectName"
            lable="Project Name"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.ProjectName}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />

          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="VerticalID"
            placeholderName="Vertical"
            dynamicOptions={vertical}
            optionLabel="VerticalID"
            className="VerticalID"
            handleChange={handleDeliveryChange}
            value={formData.VerticalID}
          />

          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TeamID"
            placeholderName="Team"
            dynamicOptions={team}
            handleChange={handleDeliveryChange}
            value={formData.TeamID}
          />

          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="WingID"
            placeholderName="Wing"
            dynamicOptions={wing}
            handleChange={handleDeliveryChange}
            value={formData.WingID}
          />

          <div
            className="search-col"
            style={{ marginLeft: "8px", display: "flex" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="switch" style={{ marginTop: "7px" }}>
                <input
                  type="checkbox"
                  name="IsActive"
                  checked={formData?.IsActive == "1" ? true : false}
                  onChange={handleSelectChange}
                />
                <span className="slider"></span>
              </label>
              <span
                style={{
                  marginLeft: "3px",
                  marginRight: "5px",
                  fontSize: "12px",
                }}
              >
                Active
              </span>
            </div>
            <div className="col-2">
              {state?.edit ? (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleUpdateProject}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleProjectSave}
                >
                  Save
                </button>
              )}
            </div>
          </div>

          <div>
            {" "}
            <Link to="/SearchProjectMaster" className="ml-3">
              Back to List
            </Link>
          </div>
        </div>
        {state?.edit && (
          <div className="row ml-2">
            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({ showVisible: true, showData: state });
              }}
            >
              RateCard
            </button>

            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({ localityVisible: true, showData: state });
              }}
            >
              Locality
            </button>

            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({
                  billingVisible: true,
                  showData: formData?.BillingTable,
                  ProjectID: formData?.ProjectID,
                });
              }}
            >
              BillingDetails
            </button>
            <button
              className="btn btn-sm btn-success mb-2 ml-2"
              onClick={() => {
                setVisible({ escalationVisible: true, showData: state });
              }}
            >
              Escalation
            </button>
            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({ spocVisible: true, showData: state });
              }}
            >
              SPOC Detail
            </button>
            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({ notificationVisible: true, showData: state });
              }}
            >
              Notification
            </button>
            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({
                  moduleVisible: true,
                  showData: formData?.ClientModule,
                  ProjectID: formData?.ProjectID,
                });
              }}
            >
              Module
            </button>
            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({
                  machineVisible: true,
                  showData: formData?.MachineListByClient,
                  ProjectID: formData?.ProjectID,
                });
              }}
            >
              Machine
            </button>
            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({ financeVisible: true });
              }}
            >
              Finance
            </button>
            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({
                  centreVisible: true,
                  showData: formData?.ClientCentreList,
                  ProjectID: formData?.ProjectID,
                });
              }}
            >
              Centre
            </button>
            <button
              className="btn btn-sm btn-success ml-2 mb-2"
              onClick={() => {
                setVisible({
                  projectCategoryVisible: true,
                  showData: formData?.ProjectCategory,
                  ProjectID: formData?.ProjectID,
                });
              }}
            >
              Project Category
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default ProjectMaster;
