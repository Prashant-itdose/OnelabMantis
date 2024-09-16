import React, { useEffect, useState } from "react";
import { headers } from "../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import ReactSelect from "../components/formComponent/ReactSelect";
import Input from "../components/formComponent/Input";
import Heading from "../components/UI/Heading";
import Tables from "../components/UI/customTable";
import { projectModalTHEAD } from "../components/modalComponent/Utils/HealperThead";
import { Link } from "react-router-dom";
import Modal from "../components/modalComponent/Modal";
import ProjectRateCardModal from "../components/UI/customTable/ProjectRateCardModal";
import { apiUrls } from "../networkServices/apiEndpoints";

const SearchProjectMaster = () => {
  const [tableData, setTableData] = useState([]);
  const [project, setProject] = useState([]);
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: "",
    Mandays: "",
    Onsitecharges: "",
    MachineChargesUNI: "",
    MachineChargesBI: "",
    ProjectName: "",
    Status: "1",
  });
  const handleSaveDesignation = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", "1048"),
      form.append("Mandays", "5000"),
      form.append("Onsitecharges", "3500"),
      form.append("MachineChargesUNI", "20000"),
      form.append("MachineChargesBI", "20000"),
      axios
        .post(
          apiUrls?.UpdateProjectRateCard,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          handleViewProject();
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : "";
  }
  const handleViewProject = () => {
    if (formData?.ProjectName == "") {
      toast.error("Please Enter Project.");
    } else {
      let form = new FormData();
      form.append("ID", localStorage.getItem("ID")),
        form.append("LoginName", localStorage.getItem("realname")),
        form.append("ProjectName", formData?.ProjectName);
        form.append("ProjectID", formData?.ProjectID);
      //   form.append("IsActive", "");
      axios
        .post(
         apiUrls?.ViewProject,
          form,
          { headers }
        )
        .then((res) => {
          setTableData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;
  const totalPages = Math.ceil(tableData?.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
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
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  useEffect(() => {
    getProject();
    getTeam();
    getWing();
    getVertical();
  }, []);

  const shortenName = (name) => {
    return name.length > 10 ? name.substring(0, 25) + "..." : name;
  };
  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });

  return (
    <>
      <Modal
        modalWidth={"700px"}
        visible={visible?.showVisible}
        setVisible={setVisible}
        tableData={visible?.showData}
        Header="Update Project RateCard"
      >
        <ProjectRateCardModal
          visible={visible?.showVisible}
          setVisible={setVisible}
          tableData={visible?.showData}
        />
      </Modal>
      <div className="card ProjectRateCard border">
        <Heading
          title="Search Project"
          secondTitle={
            <Link to="/ProjectMaster" style={{ float: "right" }}>
              {"Create Project"}
            </Link>
          }
        />
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
          <ReactSelect
            name="Status"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Status"
            dynamicOptions={[
              { label: "Active", value: "1" },
              { label: "In-Active", value: "0" },
              { label: "Both", value: "2" },
            ]}
            value={formData?.Status}
            handleChange={handleDeliveryChange}
          />
          {/* <ReactSelect
                        respclass="col-md-4 col-12 col-sm-12"
                        name="ProjectID"
                        placeholderName="Project"
                        dynamicOptions={project}
                        value={formData?.ProjectID}
                        handleChange={handleDeliveryChange}
                    /> */}
          {/* <Input
                        type="text"
                        className="form-control"
                        id="Mandays"
                        name="Mandays"
                        lable="Mandays"
                        placeholder=" "
                        max={20}
                        onChange={handleSelectChange}
                        value={formData?.Mandays}
                        respclass="col-md-4 col-12 col-sm-12"
                    /> */}
          {/* <Input
                        type="text"
                        className="form-control"
                        id="Onsitecharges"
                        name="Onsitecharges"
                        lable="Onsitecharges"
                        placeholder=" "
                        max={20}
                        onChange={handleSelectChange}
                        value={formData?.Onsitecharges}
                        respclass="col-md-4 col-12 col-sm-12"
                    /> */}
          {/* <Input
                        type="text"
                        className="form-control"
                        id="MachineChargesUNI"
                        name="MachineChargesUNI"
                        lable="MachineChargesUNI"
                        placeholder=" "
                        max={20}
                        onChange={handleSelectChange}
                        value={formData?.MachineChargesUNI}
                        respclass="col-md-4 col-12 col-sm-12"
                    /> */}
          {/* <Input
                        type="text"
                        className="form-control"
                        id="MachineChargesBI"
                        name="MachineChargesBI"
                        lable="MachineChargesBI"
                        placeholder=" "
                        max={20}
                        onChange={handleSelectChange}
                        value={formData?.MachineChargesBI}
                        respclass="col-md-4 col-12 col-sm-12"
                    /> */}
          <div className="col-sm-2">
            <button
              className="btn btn-sm btn-info ml-2"
              onClick={handleViewProject}
            >
              Search
            </button>
          </div>
        </div>
        {tableData?.length > 0 && (
          <div className=" mt-3 my-2">
            <Heading title="Search Details" />
            <Tables
              thead={projectModalTHEAD}
              tbody={currentData?.map((ele, index) => ({
                "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                "Project Name": (
                  <span
                    id={`projectName-${index}`}
                    targrt={`projectName-${index}`}
                    title={ele?.NAME}
                  >
                    {shortenName(ele?.NAME)}
                  </span>
                ),
                Vertical: ele?.vertical,
                Team: ele?.team,
                Wing: ele?.wing,
                ManDays: ele?.maindayscharges,
                OnSiteCharges: ele?.Onsitecharges,
                "Machine Uni": ele?.MachineChargesUNI,
                "Machine Bi": ele?.MachineChargesBI,
                Action: (
                  <Link
                    to="/ProjectMaster"
                    state={{ data: ele?.Id, edit: true, givenData: ele }}
                    style={{ cursor: "pointer" }}
                  >
                    Edit
                  </Link>
                ),
                //             "Edit": ( <i className="fa fa-edit" onClick={() => {
                //                 setVisible({ showVisible: true, showData: ele });
                //               }} style={{ marginLeft: "10px", color: "#3d3c3a" }}></i>
                //   )
              }))}
              tableHeight={"tableHeight"}
            />
            <div className="pagination" style={{ float: "right" }}>
              <div>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default SearchProjectMaster;
