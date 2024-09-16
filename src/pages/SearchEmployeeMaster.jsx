import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import Input from "../components/formComponent/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import { headers } from "../utils/apitools";
import Tables from "../components/UI/customTable";
import { EmployeeTHEAD } from "../components/modalComponent/Utils/HealperThead";
import { apiUrls } from "../networkServices/apiEndpoints";

const SearchEmployeeMaster = () => {
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [errors, setErros] = useState({});
  const [tableData, setTableData] = useState([]);
  const [reporter, setReporter] = useState([]);
  const [formData, setFormData] = useState({
    Designation: "",
    Name: "",
    VerticalID: [],
    TeamID: [],
    WingID: [],
    Manager: "",
    Status: "1",
  });
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
        .post(apiUrls?.Vertical_Select, form, { headers })
        .then((res) => {
          const verticals = res?.data.data.map((item) => {
            return { name: item?.Vertical, code: item?.verticalID };
          });
          setVertical(verticals);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getReporter = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Reporter_Select, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setReporter(reporters);
          // setFormData({ ...formData, Manager: reporters[0]?.value });
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getTeam = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Team_Select, form, { headers })
        .then((res) => {
          const teams = res?.data.data.map((item) => {
            return { name: item?.Team, code: item?.TeamID };
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
        .post(apiUrls?.Wing_Select, form, { headers })
        .then((res) => {
          const wings = res?.data.data.map((item) => {
            return { name: item?.Wing, code: item?.WingID };
          });
          setWing(wings);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getDesignation = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      axios
        .post(apiUrls?.ViewDesignation, form, { headers })
        .then((res) => {
          const reporters = res?.data.data.map((item) => {
            return { label: item?.DesignationName, value: item?.ID };
          });
          setDesignation(reporters);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
  };
  const ValidationForm = (formData) => {
    let err = "";
    if (formData?.Name === "") {
      err = { ...err, Name: "Please Enter Employee Name." };
    }
    return err;
  };
  const handleSearch = (id) => {
    const generatedError = ValidationForm(formData);
    if (generatedError === "") {
      let form = new FormData();
      form.append("ID", localStorage?.getItem("ID"));
      form.append("LoginName", localStorage?.getItem("realname"));
      form.append("EmployeeName", formData?.Name);
      form.append("IsActive", formData?.Status);

      axios
        .post(apiUrls?.SearchEmployee_Name, form, {
          headers,
        })
        .then((res) => {
          // if (res?.data?.status === true) {
          //   navigate("/ViewIssues", {
          //     state: {
          //       data: res.data.data,
          //       id:id
          //     },
          //   });
          // }
          setTableData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErros(generatedError);
    }
  };

  useEffect(() => {
    getVertical();
    getTeam();
    getWing();
    getDesignation();
    getReporter();
  }, []);

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

  return (
    <>
      <div className="card ViewIssues border">
        <Heading
          title="Search Employee"
          secondTitle={
            <Link to="/EmployeeMaster" style={{ float: "right" }}>
              {"Create Employee"}
            </Link>
          }
          // style={{marginBottom:"3px"}}
        />
        <div className="row g-4 m-2">
          {/* <ReactSelect
            name="Designation"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Designation"
            dynamicOptions={designation}
            value={formData?.Designation}
            handleChange={handleSelectChange}
          /> */}
          <Input
            type="text"
            className="form-control"
            id="Name"
            name="Name"
            lable="Employee Name"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.Name}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            error={errors?.Name ? errors?.Name : ""}
          />

          {/* <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="VerticalID"
            placeholderName="Vertical"
            dynamicOptions={vertical}
            optionLabel="VerticalID"
            className="VerticalID"
            handleChange={handleMultiSelectChange}
            value={formData.VerticalID.map((code) => ({
              code,
              name: vertical.find((item) => item.code === code)?.name,
            }))}
          /> */}
          {/* <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="TeamID"
            placeholderName="Team"
            dynamicOptions={team}
            handleChange={handleMultiSelectChange}
            value={formData.TeamID.map((code) => ({
              code,
              name: team.find((item) => item.code === code)?.name,
            }))}
          /> */}
          {/* <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="WingID"
            placeholderName="Wing"
            dynamicOptions={wing}
            handleChange={handleMultiSelectChange}
            value={formData.WingID.map((code) => ({
              code,
              name: wing.find((item) => item.code === code)?.name,
            }))}
          /> */}
          {/* <ReactSelect
            name="Manager"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Reporting Manager"
            dynamicOptions={reporter}
            value={formData?.Manager}
            handleChange={handleSelectChange}
          /> */}
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
          <div className="col-2">
            <button className="btn btn-sm btn-success" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
      {tableData?.length > 0 && (
        <div className="card patient_registration_card mt-3 my-2">
          <Heading title="Employee Details" />
          <Tables
            thead={EmployeeTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              // "Employee Name": ele?.NAME,
              "User Name": ele?.username,
              "Real Name": ele?.realname,
              Email: ele?.email,
              Address: ele?.Address,
              "Mobile No.": ele?.MobileNo,
              Active: ele?.enabled == 1 ? "Yes" : "No",
              Edit: (
                <Link
                  to="/EmployeeMaster"
                  state={{ data: ele?.id, edit: true }}
                  style={{ cursor: "pointer" }}
                >
                  Edit
                </Link>
              ),
            }))}
            tableHeight={"tableHeight"}
          />
          <div
            className="pagination"
            style={{ marginLeft: "auto", marginBottom: "9px" }}
          >
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
  );
};
export default SearchEmployeeMaster;
