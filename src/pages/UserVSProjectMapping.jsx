import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import { userVSprojectTHEAD } from "../components/modalComponent/Utils/HealperThead";
import Tables from "../components/UI/customTable";
import Modal from "../components/modalComponent/Modal";
import TransferProjectModal from "../components/UI/customTable/TransferProjectModal";
import axios from "axios";
import { headers } from "../utils/apitools";
import { toast } from "react-toastify";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import { apiUrls } from "../networkServices/apiEndpoints";

const UserVSProjectMapping = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [reporter, setReporter] = useState([]);
    const [project, setProject] = useState([]);
    const [formData, setFormData] = useState({
        Username: "",
        Password: "",
        User: "",
        Project:""
    })

    console.log(tableData)
    const handleSelectChange = (e) => {
        const { name, value, checked, type } = e?.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
        });
    };
    const getReporter = () => {
        let form = new FormData();
        form.append("ID", localStorage?.getItem("ID")),
            axios
                .post(
                    apiUrls?.Reporter_Select,
                    form,
                    { headers }
                )
                .then((res) => {
                    const reporters = res?.data.data.map((item) => {
                        return { label: item?.NAME, value: item?.ID };
                    });
                    setReporter(reporters);
                })
                .catch((err) => {
                    console.log(err);
                });
    };



    const getUserName = (id) => {
        console.log(reporter);

        const namee = reporter?.filter((ele) => ele?.value == id)
        return namee[0]?.label
    }
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
                return { name: item?.Project, code: item?.ProjectId };
              });
              setProject(poc3s);
            })
            .catch((err) => {
              console.log(err);
            });
      };
    const getUserVsProject_Select = (value) => {
        setLoading(true)
        let form = new FormData();
        form.append("ID", localStorage?.getItem("ID")),
            form.append("UserID", value),
            axios
                .post(
                   apiUrls?.UserVsProject_Select,
                    form,
                    { headers }
                )
                .then((res) => {
                   
                    const data = res?.data?.data;
                    const updateddata = data?.map((ele, index) => {
                        return {
                            ...ele,
                            UserName: getUserName(value),
                        };
                    });
                    setTableData(updateddata)
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                });
    }
    const handleDeliveryChange = (name, e) => {
        const { value } = e;
        if (name == "User") {
            setFormData({ ...formData, [name]: value })
            getUserVsProject_Select(value)
        }
        else{
            setFormData({
                ...formData,
                [name]: e,
            });
        }
       
    };
    console.log(formData)

    const [visible, setVisible] = useState({
        showVisible: false,
        showData: {},
    });
    useEffect(() => {
        getReporter()
        getProject()

    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 20;
    const totalPages = Math.ceil(tableData?.length / rowsPerPage);
    const currentData = tableData?.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    const handleMultiSelectData = (data, returnKey) => {
        return data.map(item => item[returnKey]).join(',');
      }
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const getAddProject = () => {
        setLoading(true)
        if(formData?.Project==""||formData?.User=="")
        {
         toast.error('Select User and Project to Map')
        }
        else {
              const form=new FormData()
            form.append("ID", localStorage?.getItem("ID")),
            form.append("LoginName", localStorage?.getItem("realname")),
            form.append("UserID", formData?.User),
            form.append("Status", "Add"),
            form.append("TargetUserID", ""),
            form.append("ProjectID", handleMultiSelectData(formData?.Project, "code")),

            axios
                .post(
                    apiUrls?.UserVsProjectMapping,
                    form,
                    { headers }
                )
                .then((res) => {
                    toast.success(res?.data?.message)
                    setLoading(false)
                    getUserVsProject_Select(formData?.User)
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                });
        }
        let form = new FormData();

    }

    const getHandleRemove = (ele) => {
        setLoading(true)
        console.log(ele)
        let form = new FormData();
        form.append("ID", localStorage?.getItem("ID")),
            form.append("LoginName", localStorage?.getItem("realname")),
            form.append("UserID", formData?.User),
            form.append("Status", "Remove"),
            form.append("TargetUserID", ""),
            form.append("ProjectID",ele?.ProjectID),

            axios
                .post(
                    apiUrls?.UserVsProjectMapping,
                    form,
                    { headers }
                )
                .then((res) => {
                    toast.success(res?.data?.message)
                    getUserVsProject_Select(formData?.User)
                    setLoading(false)
                  
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                });
    }
    return (
        <>
            <Modal
                modalWidth={"800px"}
                visible={visible?.showVisible}
                setVisible={setVisible}
                tableData={formData}
                Header="Transfer Project Modal"

            >
                <TransferProjectModal
                    visible={visible?.showVisible}
                    setVisible={setVisible}
                    tableData={formData}
                />
            </Modal>
            <div className="card  border mt-2">
                <Heading title="Mantis User Vs Project Mapping" />
                <div className="row g-4 m-2">
                    <ReactSelect
                        name="User"
                        respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                        placeholderName="User"
                        dynamicOptions={reporter}
                        value={formData?.User}
                        handleChange={handleDeliveryChange}
                    />

                    <MultiSelectComp
                        name="Project"
                        respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                        placeholderName="Project"
                        dynamicOptions={project}
                        
                        value={formData.Project}
                        handleChange={handleDeliveryChange}
                    />

                    <div className="col-3 col-sm-4 d-flex">
                        <button
                            className="btn btn-sm btn-success"
                            onClick={getAddProject}
                        >
                            Add Project
                        </button>
                        <button
                            className="btn btn-sm btn-success ml-2"
                            onClick={()=>{getUserVsProject_Select(formData?.User)}}
                        >
                            Search
                        </button>
                        <button
                            className="btn btn-sm btn-success ml-2"
                            onClick={() => {
                                setVisible({ showVisible: true, showData: formData });
                            }}
                        >
                            Transfer Project
                        </button>
                    </div>
                </div>
            </div>
            {tableData?.length > 0 && (
                <div className="card patient_registration_card mt-3 my-2">
                    <Heading title="Search Details" />
                    <Tables
                        thead={userVSprojectTHEAD}
                        tbody={currentData?.map((ele, index) => ({
                            "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                            "User Name": ele?.UserName,
                            Project: ele?.ProjectName,
                            Remove: <i className="fa fa-remove" style={{ color: "red" }} onClick={()=>{getHandleRemove(ele)}}>X </i>,
                        }))}
                        tableHeight={"tableHeight"}
                    />
                    <div className="pagination" style={{ marginLeft: "auto", marginBottom: "9px" }}>
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
            )}
        </>
    )
}

export default UserVSProjectMapping;