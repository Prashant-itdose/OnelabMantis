import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import Input from "../components/formComponent/Input";
import DatePicker from "../components/formComponent/DatePicker";
import ReactSelect from "../components/formComponent/ReactSelect";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { headers } from "../utils/apitools";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import axios from "axios";
import {
  AADHARCARD_VALIDATION_REGX,
  MOBILE_NUMBER_VALIDATION_REGX,
  PANCARD_VALIDATION_REGX,
  PINCODE_VALIDATION_REGX,
} from "../utils/constant";
import { inputBoxValidation } from "../utils/utils";
import { FormCheck } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment/moment";
import Modal from "../components/modalComponent/Modal";
import AddDesignationModal from "../components/UI/customTable/AddDesignationModal";
import { apiUrls } from "../networkServices/apiEndpoints";

const EmployeeMaster = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [errors, setErros] = useState({});
  const [tableData, setTableData] = useState([]);
  const [project, setProject] = useState([]);
  const [reporter, setReporter] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [title, setTitle] = useState([{ label: "Mr", value: "Mr" }]);
  const [category, setCategory] = useState([]);
  const [grade, setGrade] = useState([
    { label: "Level A", value: "LevelA" },
    { label: "Level B", value: "LevelB" },
    { label: "Level C", value: "LevelC" },
  ]);
  const [govtid, setGovtID] = useState([
    {
      label: "AadharCard",
      value: "AadharCard",
    },
  ]);
  const [relation, setRelation] = useState([
    { label: "Father", value: "Father" },
    { label: "Mother", value: "Mother" },
  ]);
  const [accesslevel, setAccessLevel] = useState([]);
  const [salaryaccountbank, setSalaryAccountBank] = useState([
    { label: "Kotak", value: "Kotak" },
    { label: "ICICI", value: "ICICI" },
    { label: "Cash", value: "Cash" },
  ]);
  const [uploadImage, setUploadImage] = useState({ show: false, data: "" });
  const [formData, setFormData] = useState({
    Name: "",
    DOB: moment().format("DD-MMM-YYYY"),
    DOJ: moment().format("DD-MMM-YYYY"),
    Mobile: "",
    ContactMobile: "",
    Email: "",
    ContactEmail: "",
    EmployeeEmail: "",
    Username: "",
    Password: "",
    IsActive: false,
    Designation: "",
    OfficeDesignation: "",
    AccessLevel: "",
    Category: [],
    Project: [],
    Manager: "",
    AlternateMobile: "",
    FatherName: "",
    MotherName: "",
    Qualification: "",
    AadharCard: "",
    PanCard: "",
    Address: "",
    CurrentAddress: "",
    PermanentAddress: "",
    Country: "",
    State: "",
    CurrentState: "",
    PermanentState: "",
    City: "",
    CurrentCity: "",
    PermanentCity: "",
    District: "",
    PinCode: "",
    CurrentPinCode: "",
    PermanentPinCode: "",
    Locality: "",
    CurrentLocality: "",
    PermanentLocality: "",
    Relation: "",
    EmergencyMobile: "",
    EmergencyName: "",
    TeamLeaderID: "",
    UpdatePassword: "0",
    Title: "",
    Course: "",
    BloodGroup: "",
    GovtID: "",
    GovtIDNo: "",
    SameAsCurrent: "",
    VerticalID: "",
    TeamID: "",
    WingID: "",
    ReporterTo: "",
    JoiningDate: new Date(),
    NextAppraisalDate: new Date(),
    EmployeeCode: "",
    Grade: "",
    Salary: "",
    SalaryAccountBank: "",
    SalaryAccountNumber: "",
    RegisteredSalesEnquiry: "",
    IsSalesTeamMember: "",
    ApproveLeaveRequest: "",
    MaximumWeekoffs:"",
    WorkingDays:"",
    BiometricEmployeeCode:""
  });
  const [rowHandler, setRowHandler] = useState({
    show: false,
    show1: false,
    show2: false,
    show3: true,
    show4: false,
    show5: false,
  });

  // const handleSelectChange = (e) => {
  //   const { name, value, checked, type } = e?.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
  //   });
  // };
  const getVertical = () => {
    let form = new FormData();
    form.append("Id", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.Vertical_Select, form, { headers })
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
        .post(apiUrls?.Team_Select, form, { headers })
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
        .post(apiUrls?.Wing_Select, form, { headers })
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
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => {
      let updatedData = {
        ...prevState,
        [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
      };

      if (name === "SameAsCurrent" && e.target.checked) {
        updatedData = {
          ...updatedData,
          PermanentAddress: prevState.CurrentAddress,
          PermanentLocality: prevState.CurrentLocality,
          PermanentCity: prevState.CurrentCity,
          PermanentState: prevState.CurrentState,
          PermanentPinCode: prevState.CurrentPinCode,
        };
        // setRowHandler({ ...rowHandler, show2: true });
      } else if (name === "SameAsCurrent" && !e.target.checked) {
        updatedData = {
          ...updatedData,
          PermanentAddress: "",
          PermanentLocality: "",
          PermanentCity: "",
          PermanentState: "",
          PermanentPinCode: "",
        };
        // setRowHandler({ ...rowHandler, show2: false });
      }

      return updatedData;
    });
  };

  useEffect(() => {
    getProject();
    getAccessLevel();
    getReporter();
    getDesignation();
    getVertical();
    getTeam();
    getWing();
  }, []);
  useEffect(() => {
    // Check if state is an object and has the data property
    if (state?.edit) {
      fetchDatabyId(state?.data);
    }
  }, [category]); // Adding state to dependency array to handle changes in state

  const handlemuliSelctSelected = (data, dropdownData) => {
    const responseData = data.split(",");
    const returnData = dropdownData.filter((ele) =>
      responseData.includes(String(ele?.code))
    );
    return returnData;
  };
  const handleSinglelect = (data, dropdowndata) => {
    const returnItem = dropdowndata?.find((ele) => {
      return ele.value == data;
    });
    return returnItem;
  };

  const fetchDatabyId = (id) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID"));
    form.append("LoginName", localStorage?.getItem("realname"));
    form.append("EmployeeID", id);

    axios
      .post(apiUrls?.SearchEmployee_EmployeeID, form, {
        headers,
      })
      .then((res) => {
        setFormData({
          ...formData,
          Name: res?.data?.data[0]?.NAME,
          DOB: res?.data?.data[0]?.DOB
            ? moment(res?.data?.data[0]?.DOB, "DD-MMM-YYYY").toDate()
            : moment().format("DD-MMM-YYYY"),
          DOJ: res?.data?.data[0]?.DOJ
            ? moment(res?.data?.data[0]?.DOJ, "DD-MMM-YYYY").toDate()
            : moment().format("DD-MMM-YYYY"),
          Mobile: res?.data?.data[0]?.MobileNo,
          Email: res?.data?.data[0]?.email,
          Username: res?.data?.data[0]?.username,
          Password: res?.data?.data[0]?.Password,
          IsActive: res?.data?.data[0]?.enabled,
          Designation: res?.data?.data[0]?.DesignationID,
          // Designation: handleSinglelect(res?.data?.data[0]?.DesignationName,designation),
          AccessLevel: res?.data?.data[0]?.access_level,
          // AccessLevel: handleSinglelect(res?.data?.data[0]?.access_level,accesslevel),
          Category: handlemuliSelctSelected(
            res?.data?.data[0]?.CategoryNames,
            category
          ),
          Project: handlemuliSelctSelected(
            res?.data?.data[0]?.ProjectIDs,
            project
          ),
          // Project: res?.data?.ProjectName.map((item) => {
          //   return {
          //     name: item?.name,
          //     code: item?.id
          //   }
          // }),
          Manager: res?.data?.data[0]?.Manager,
          AlternateMobile: res?.data?.data[0]?.AlternateMobileNo,
          FatherName: res?.data?.data[0]?.FatherName,
          MotherName: res?.data?.data[0]?.MotherName,
          Qualification: res?.data?.data[0]?.Qualification,
          AadharCard: res?.data?.data[0]?.AadharCard,
          PanCard: res?.data?.data[0]?.PanCard,
          Address: res?.data?.data[0]?.Address,
          Country: res?.data?.data[0]?.Country,
          State: res?.data?.data[0]?.State,
          City: res?.data?.data[0]?.City,
          District: res?.data?.data[0]?.District,
          PinCode: res?.data?.data[0]?.PinCode,
          Locality: res?.data?.data[0]?.Locality,
          Relation: res?.data?.data[0]?.Relation,
          EmergencyMobile: res?.data?.data[0]?.EmergencyContactNo,
          EmergencyName: res?.data?.data[0]?.NAME,
          TeamLeaderID: res?.data?.data[0]?.TeamLeaderName,
          EmployeeID: id,
        }),
          setRowHandler({
            ...rowHandler,
            show: true,
            show1: true,
            show2: true,
            show3: true,
            show4: true,
            show5: true,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlerow = (row) => {
    let obj;
    if (!rowHandler[row]) {
      obj = { ...rowHandler, [row]: true };
    } else {
      obj = { ...rowHandler, [row]: false };
    }
    setRowHandler(obj);
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMultiSelectData = (data, returnKey) => {
    return data.map((item) => item[returnKey]).join(",");
  };

  const handleSave = () => {
    setRowHandler({
      ...rowHandler,
      show: true,
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      show5: true,
    });
    const generatedError = SaveValidationForm(formData);
    if (generatedError === "") {
      if (formData?.AccessLevel == "") {
        toast.error("Please Select AccessLevel");
      } else if (formData?.Designation == "") {
        toast.error("Please Select Designation.");
      } else if (formData?.Project == "") {
        toast.error("Please Select Project.");
      } else if (formData?.Manager == "") {
        toast.error("Please Select Reporting Manager.");
      } else {
        let form = new FormData();
        form.append("ID", localStorage?.getItem("ID"));
        form.append("LoginName", localStorage?.getItem("realname"));
        form.append("UserName", formData?.Username);
        form.append("RealName", formData?.Name);
        form.append("Email", formData?.Email);
        form.append("Password", formData?.Password);
        form.append("MobileNo", formData?.Mobile);
        form.append(
          "DOB",
          formData?.DOB != ""
            ? new Date(formData?.DOB)?.toISOString()?.split("T")[0]
            : ""
        );
        form.append(
          "DOJ",
          formData?.DOJ != ""
            ? new Date(formData?.DOJ)?.toISOString()?.split("T")[0]
            : ""
        );
        form.append("DesignationID", formData?.Designation);
        form.append(
          "DesignationName",
          getlabel(formData?.Designation, designation)
        );
        form.append("DesignationName", formData?.Designation);
        form.append(
          "AccessCategoryID",
          handleMultiSelectData(formData?.Category, "code")
        );
        form.append(
          "AccessProjectID",
          handleMultiSelectData(formData?.Project, "code")
        );
        form.append("Access_level", formData?.AccessLevel);
        form.append("TeamLeaderID", formData?.Manager);
        form.append("FatherName", formData?.FatherName);
        form.append("MotherName", formData?.MotherName);
        form.append("Qualification", formData?.Qualification);
        form.append("AlternateMobileNo", formData?.AlternateMobile);
        form.append("Address", formData?.Address);
        form.append("PinCode", formData?.PinCode);
        form.append("Country", formData?.Country);
        form.append("District", formData?.District);
        form.append("City", formData?.City);
        form.append("EmergencyContactNo", formData?.EmergencyMobile);
        form.append("EmergencyContactPerson", formData?.EmergencyName);
        form.append("Relation", formData?.Relation);
        form.append("State", formData?.State);
        // form.append("ReportingManagerID", formData?.Manager);

        axios
          .post(apiUrls?.CreateEmployee, form, {
            headers,
          })
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              Name: "",
              DOB: moment().format("DD-MMM-YYYY"),
              DOJ: moment().format("DD-MMM-YYYY"),
              Mobile: "",
              Email: "",
              Username: "",
              Password: "",
              IsActive: false,
              Designation: "",
              AccessLevel: "",
              Category: [],
              Project: [],
              Manager: "",
              AlternateMobile: "",
              FatherName: "",
              MotherName: "",
              Qualification: "",
              AadharCard: "",
              PanCard: "",
              Address: "",
              CurrentAddress: "",
              PermanentAddress: "",
              Country: "",
              State: "",
              CurrentState: "",
              PermanentState: "",
              City: "",
              CurrentCity: "",
              PermanentCity: "",
              District: "",
              PinCode: "",
              CurrentPinCode: "",
              PermanentPinCode: "",
              Locality: "",
              CurrentLocality: "",
              PermanentLocality: "",
              Relation: "",
              EmergencyMobile: "",
              EmergencyName: "",
              TeamLeaderID: "",
              UpdatePassword: "",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      setErros(generatedError);
    }
  };

  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : undefined;
  }

  const handleUpdate = (id) => {
    const generatedError = SaveValidationForm(formData);
    if (generatedError === "") {
      if (formData?.AccessLevel == "") {
        toast.error("Please Select AccessLevel");
      } else if (formData?.Designation == "") {
        toast.error("Please Select Designation.");
      } else if (formData?.Project == "") {
        toast.error("Please Select Project.");
      } else if (formData?.Manager == "") {
        toast.error("Please Select Reporting Manager.");
      } else {
        let form = new FormData();
        form.append("ID", localStorage?.getItem("ID"));
        form.append("LoginName", localStorage?.getItem("realname"));
        form.append("UserName", formData?.Username);
        form.append("RealName", localStorage?.getItem("realname"));
        form.append("EmployeeID", formData?.EmployeeID);
        form.append("Email", formData?.Email);
        form.append(
          "Password",
          formData?.UpdatePassword == "1" ? formData?.Password : ""
        );
        form.append("Enabled", formData?.IsActive);
        form.append("Acess_level", formData?.AccessLevel);
        form.append("MobileNo", formData?.Mobile);
        form.append(
          "DOB",
          formData?.DOB != ""
            ? new Date(formData?.DOB)?.toISOString()?.split("T")[0]
            : ""
        );
        form.append(
          "DOJ",
          formData?.DOJ != ""
            ? new Date(formData?.DOJ)?.toISOString()?.split("T")[0]
            : ""
        );
        form.append("DesignationID", formData?.Designation);
        form.append("DesignationName", formData?.Designation);
        form.append("TeamLeaderID", formData?.Manager);
        form.append("FatherName", formData?.FatherName);
        form.append("MotherName", formData?.MotherName);
        form.append("Qualification", formData?.Qualification);
        form.append("AlternateMobileNo", formData?.AlternateMobile);
        form.append("Address", formData?.Address);
        form.append("PinCode", formData?.PinCode);
        form.append("Country", formData?.Country);
        form.append("District", formData?.District);
        form.append("City", formData?.City);
        form.append("EmergencyContactNo", formData?.EmergencyMobile);
        form.append("EmergencyContactPerson", formData?.EmergencyName);
        form.append("Relation", formData?.Relation);
        form.append("State", formData?.State);
        form.append("UpdatePasswordKey", formData?.UpdatePassword);

        axios
          .post(apiUrls?.UpdateEmployee, form, {
            headers,
          })
          .then((res) => {
            toast.success(res?.data?.message);
            navigate("/SearchEmployeeMaster");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      setErros(generatedError);
    }
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

  const getProject = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(apiUrls?.ProjectSelect, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { name: item?.Project, code: item?.ProjectId };
          });
          getCategory(poc3s[0]?.code);
          setProject(poc3s);
          // setFormData({ ...formData, Project: [poc3s[0]?.code] });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getCategory = (proj) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("ProjectID", proj),
      axios
        .post(apiUrls?.Category_Select, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { name: item?.NAME, code: item?.ID };
          });
          setCategory(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const getAccessLevel = (proj) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      axios
        .post(apiUrls?.Accesslevel, form, { headers })
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setAccessLevel(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOptions,
    }));
  };

  const SaveValidationForm = (formData) => {
    let err = "";
    if (formData?.Password === "") {
      err = { ...err, Password: "This Field is Required" };
    }

    if (formData?.Name === "") {
      err = { ...err, Name: "This Field is Required" };
    }
    if (formData?.Username === "") {
      err = { ...err, Username: "This Field is Required" };
    }
    if (formData?.FatherName === "") {
      err = { ...err, FatherName: "This Field is Required" };
    }
    if (formData?.MotherName === "") {
      err = { ...err, MotherName: "This Field is Required" };
    }
    // if (payload?.ContactPerson.length > 0 && payload?.ContactPerson.length < 3) {
    //   err = { ...err, ContactPersons: "Name Must be of 3 Characters" };
    // }
    if (formData?.Qualification === "") {
      err = { ...err, Qualification: "This Field is Required" };
    }
    if (formData?.EmergencyMobile === "") {
      err = { ...err, EmergencyMobile: "This Field is Required" };
    }
    if (formData?.EmergencyName === "") {
      err = { ...err, EmergencyName: "This Field is Required" };
    }
    if (formData?.Relation === "") {
      err = { ...err, Relation: "This Field is Required" };
    }

    if (formData?.Mobile?.length == 0) {
      err = {
        ...err,
        Mobile: "This filed is Required",
      };
    } else {
      if (formData?.Mobile?.length != 10)
        err = {
          ...err,
          Mobile: "Enter Valid Number",
        };
    }
    if (formData?.AlternateMobile === "") {
      err = { ...err, AlternateMobile: "This Field is Required" };
    }
    if (formData?.Address === "") {
      err = { ...err, Address: "This Field is Required" };
    }
    if (formData?.Country === "") {
      err = { ...err, Country: "This Field is Required" };
    }
    if (formData?.State === "") {
      err = { ...err, State: "This Field is Required" };
    }
    if (formData?.City === "") {
      err = { ...err, City: "This Field is Required" };
    }
    // if (formData?.District === "") {
    //   err = { ...err, District: "This Field is Required" };
    // }
    if (formData?.PinCode === "") {
      err = { ...err, PinCode: "This Field is Required" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData?.Email)) {
      err = { ...err, Email: "Enter a valid email address" };
    }
    return err;
  };

  const UpdateValidationForm = (formData) => {
    let err = "";
    if (formData?.UpdatePassword == "1") {
      if (formData?.Password === "" || formData?.Password == undefined) {
        err = { ...err, Password: "This Field is Required" };
      }
    }

    // if (formData?.Name === "") {
    //   err = { ...err, Name: "This Field is Required" };
    // }
    if (formData?.FatherName === "") {
      err = { ...err, FatherName: "This Field is Required" };
    }
    // if (payload?.ContactPerson.length > 0 && payload?.ContactPerson.length < 3) {
    //   err = { ...err, ContactPersons: "Name Must be of 3 Characters" };
    // }
    if (formData?.Qualification === "") {
      err = { ...err, Qualification: "This Field is Required" };
    }

    if (formData?.Mobile?.length == 0) {
      err = {
        ...err,
        Mobile: "Mobile No Required",
      };
    } else {
      if (formData?.Mobile?.length != 10)
        err = {
          ...err,
          Mobile: "Enter Valid Number",
        };
    }
    if (formData?.AlternateMobile === "") {
      err = { ...err, AlternateMobile: "This Field is Required" };
    }
    if (formData?.Address === "") {
      err = { ...err, Address: "This Field is Required" };
    }
    if (formData?.Country === "") {
      err = { ...err, Country: "This Field is Required" };
    }
    if (formData?.State === "") {
      err = { ...err, State: "This Field is Required" };
    }
    if (formData?.City === "") {
      err = { ...err, City: "This Field is Required" };
    }
    // if (formData?.District === "") {
    //   err = { ...err, District: "This Field is Required" };
    // }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData?.Email)) {
      err = { ...err, Email: "Enter a valid email address" };
    }
    return err;
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
        tableData={formData}
        Header="Add Designation"
      >
        <AddDesignationModal
          visible={visible?.showVisible}
          setVisible={setVisible}
          tableData={formData}
        />
      </Modal>
      <div className="card ViewIssues border mt-2">
        <Heading
          title="Personal Details"
          secondTitle={
            <button
              className={`fa ${rowHandler.show3 ? "fa-arrow-up" : "fa-arrow-down"}`}
              onClick={() => {
                handlerow("show3");
              }}
              style={{
                cursor: "pointer",
                border: "none",
                color: "black",
                borderRadius: "2px",
                background: "none",
                marginLeft: "30px",
              }}
            ></button>
          }
        />

        {rowHandler.show3 && (
          <>
            <div className="row g-4 m-2">
              <ReactSelect
                name="Title"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                defaultValue={formData?.Title}
                placeholderName="Title"
                dynamicOptions={title}
                value={formData?.Title}
                handleChange={handleDeliveryChange}
              />
              <Input
                type="text"
                className="form-control"
                id="Name"
                name="Name"
                lable="Name"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.Name}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Name ? errors?.Name : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="FatherName"
                name="FatherName"
                lable="Father Name"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.FatherName}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.FatherName ? errors?.FatherName : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="MotherName"
                name="MotherName"
                lable="Mother/Spouse Name"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.MotherName}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.MotherName ? errors?.MotherName : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="Qualification"
                name="Qualification"
                lable="Qualification"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.Qualification}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Qualification ? errors?.Qualification : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="Course"
                name="Course"
                lable="Course"
                placeholder="Course (Ex: B.Tech,B.Sc)"
                max={20}
                onChange={handleSelectChange}
                value={formData?.Course}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Course ? errors?.Course : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="BloodGroup"
                name="BloodGroup"
                lable="BloodGroup"
                placeholder=""
                max={20}
                onChange={handleSelectChange}
                value={formData?.BloodGroup}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.BloodGroup ? errors?.BloodGroup : ""}
              />
              <ReactSelect
                name="GovtID"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                defaultValue={formData?.GovtID}
                placeholderName="GovtID"
                dynamicOptions={govtid}
                value={formData?.GovtID}
                handleChange={handleDeliveryChange}
              />
              <Input
                type="text"
                className="form-control"
                id="GovtIDNo"
                name="GovtIDNo"
                lable="GovtIDNo"
                placeholder=""
                max={20}
                onChange={handleSelectChange}
                value={formData?.GovtIDNo}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.GovtIDNo ? errors?.GovtIDNo : ""}
              />
              <DatePicker
                className="custom-calendar"
                id="DOB"
                name="DOB"
                placeholder={VITE_DATE_FORMAT}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                value={formData?.DOB}
                lable="DOB"
                handleChange={handleSelectChange}
              />
              <DatePicker
                className="custom-calendar"
                id="DOJ"
                lable="DOJ"
                name="DOJ"
                placeholder={VITE_DATE_FORMAT}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                value={formData?.DOJ}
                handleChange={handleSelectChange}
              />
              <Input
                type="number"
                className="form-control"
                id="Mobile"
                name="Mobile"
                lable="Mobile"
                placeholder=" "
                onChange={(e) => {
                  inputBoxValidation(
                    MOBILE_NUMBER_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.Mobile}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Mobile ? errors?.Mobile : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="Email"
                name="Email"
                lable="Email"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.Email}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Email ? errors?.Email : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="AadharCard"
                name="AadharCard"
                lable="AadharCard"
                placeholder=" "
                max={20}
                onChange={(e) => {
                  inputBoxValidation(
                    AADHARCARD_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.AadharCard}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.AadharCard ? errors?.AadharCard : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="PanCard"
                name="PanCard"
                lable="PanCard"
                placeholder=" "
                max={20}
                onChange={(e) => {
                  inputBoxValidation(
                    PANCARD_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                // onChange={handleSelectChange}
                value={formData?.PanCard}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.PanCard ? errors?.PanCard : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="Address"
                name="Address"
                lable="Address"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.Address}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Address ? errors?.Address : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="Locality"
                name="Locality"
                lable="Locality"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.Locality}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Locality ? errors?.Locality : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="Country"
                name="Country"
                lable="Country"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.Country}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Country ? errors?.Country : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="State"
                name="State"
                lable="State"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.State}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.State ? errors?.State : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="City"
                name="City"
                lable="City"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.City}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.City ? errors?.City : ""}
              />
              {/* <Input
                type="text"
                className="form-control"
                id="District"
                name="District"
                lable="District"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.District}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.District ? errors?.District : ""}
              /> */}

              <Input
                type="text"
                className="form-control"
                id="PinCode"
                name="PinCode"
                lable="PinCode"
                placeholder=" "
                max={20}
                onChange={(e) => {
                  inputBoxValidation(
                    PINCODE_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.PinCode}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.PinCode ? errors?.PinCode : ""}
              />

              <Input
                type="text"
                className="form-control"
                id="Username"
                name="Username"
                lable="Username"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.Username}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Username ? errors?.Username : ""}
              />

              <Input
                type="password"
                className="form-control"
                id="Password"
                name="Password"
                lable="Password"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.Password}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Password ? errors?.Password : ""}
                disabled={state?.edit && formData?.UpdatePassword == "0"}
              />

              <ReactSelect
                name="Designation"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                defaultValue={formData?.Designation}
                placeholderName="Designation"
                dynamicOptions={designation}
                value={formData?.Designation}
                handleChange={handleDeliveryChange}
              />
              {!state?.edit && (
                <div className="col-2">
                  <button
                    className="btn btn-block btn-info btn-sm"
                    onClick={() => {
                      setVisible({ showVisible: true, showData: formData });
                    }}
                  >
                    Add Designation
                  </button>
                </div>
              )}
              <ReactSelect
                name="AccessLevel"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                placeholderName="Access Level"
                dynamicOptions={accesslevel}
                value={formData?.AccessLevel}
                handleChange={handleDeliveryChange}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="Project"
                placeholderName="Project"
                dynamicOptions={project}
                handleChange={handleMultiSelectChange}
                value={formData?.Project}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="Category"
                placeholderName="Category"
                dynamicOptions={category}
                handleChange={handleMultiSelectChange}
                value={formData?.Category}
              />
              <ReactSelect
                name="Manager"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                placeholderName="Reporting Manager"
                dynamicOptions={reporter}
                value={formData?.Manager}
                handleChange={handleDeliveryChange}
              />
              <div className="col-2">
                <button
                  className="btn btn-block btn-info btn-sm mb-2 ml-2"
                  type="button"
                  // onClick={() => {
                  //   setUploadImage({ ...uploadImage, show: true });
                  // }}
                >
                  Upload Employee Image
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="card ViewIssues border mt-2">
        <Heading
          title="Contact Details"
          secondTitle={
            <button
              className={`fa ${rowHandler.show ? "fa-arrow-up" : "fa-arrow-down"}`}
              onClick={() => {
                handlerow("show");
              }}
              style={{
                cursor: "pointer",
                border: "none",
                color: "black",
                borderRadius: "2px",
                background: "none",
                marginLeft: "30px",
              }}
            ></button>
          }
        />

        {rowHandler.show && (
          <>
            <div className="row g-4 m-2">
              <Input
                type="text"
                className="form-control"
                id="ContactEmail"
                name="ContactEmail"
                lable="Email"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.ContactEmail}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.ContactEmail ? errors?.ContactEmail : ""}
              />
              <Input
                type="number"
                className="form-control"
                id="ContactMobile"
                name="ContactMobile"
                lable="Mobile"
                placeholder=" "
                onChange={(e) => {
                  inputBoxValidation(
                    MOBILE_NUMBER_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.ContactMobile}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.ContactMobile ? errors?.ContactMobile : ""}
              />
              <Input
                type="number"
                className="form-control"
                id="AlternateMobile"
                name="AlternateMobile"
                lable="AlternateMobile"
                placeholder=" "
                onChange={(e) => {
                  inputBoxValidation(
                    MOBILE_NUMBER_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.AlternateMobile}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.AlternateMobile ? errors?.AlternateMobile : ""}
              />
              <Input
                type="number"
                className="form-control"
                id="EmergencyMobile"
                name="EmergencyMobile"
                lable="EmergencyMobile"
                placeholder=" "
                onChange={(e) => {
                  inputBoxValidation(
                    MOBILE_NUMBER_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.EmergencyMobile}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.EmergencyMobile ? errors?.EmergencyMobile : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="EmergencyName"
                name="EmergencyName"
                lable="Emergency Contact Person"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.EmergencyName}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.EmergencyName ? errors?.EmergencyName : ""}
              />
              {/* <Input
                type="text"
                className="form-control"
                id="Relation"
                name="Relation"
                lable="Relation"
                placeholder=" "
                max={20}
                onChange={handleSelectChange}
                value={formData?.Relation}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Relation ? errors?.Relation : ""}
              /> */}
              <ReactSelect
                name="Relation"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                placeholderName="Relation"
                dynamicOptions={relation}
                value={formData?.Relation}
                handleChange={handleDeliveryChange}
              />
            </div>
          </>
        )}
      </div>

      <div className="card ViewIssues border mt-2">
        <Heading
          title="Current Address Details"
          secondTitle={
            <button
              className={`fa ${rowHandler.show1 ? "fa-arrow-up" : "fa-arrow-down"}`}
              onClick={() => {
                handlerow("show1");
              }}
              style={{
                cursor: "pointer",
                border: "none",
                color: "black",
                borderRadius: "2px",
                background: "none",
                marginLeft: "30px",
              }}
            ></button>
          }
        />

        {rowHandler.show1 && (
          <>
            <div className="row g-4 m-2">
              <textarea
                type="text"
                className="form-control textArea"
                id="CurrentAddress"
                name="CurrentAddress"
                lable="Address"
                placeholder="Address"
                style={{ width: "16%", marginLeft: "7.5px" }}
                onChange={handleSelectChange}
                value={formData?.CurrentAddress}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.CurrentAddress ? errors?.CurrentAddress : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="CurrentLocality"
                name="CurrentLocality"
                lable="Locality"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.CurrentLocality}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.CurrentLocality ? errors?.CurrentLocality : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="CurrentCity"
                name="CurrentCity"
                lable="City"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.CurrentCity}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.CurrentCity ? errors?.CurrentCity : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="CurrentState"
                name="CurrentState"
                lable="State"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.CurrentState}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.CurrentState ? errors?.CurrentState : ""}
              />
              <Input
                type="number"
                className="form-control"
                id="CurrentPinCode"
                name="CurrentPinCode"
                lable="Pin Code"
                placeholder=" "
                max={6}
                onChange={(e) => {
                  inputBoxValidation(
                    PINCODE_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.CurrentPinCode}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.CurrentPinCode ? errors?.CurrentPinCode : ""}
              />
            </div>
          </>
        )}
      </div>
      <div className="card ViewIssues border mt-2">
        <Heading
          title={
            <div className="d-flex">
              <span>Permanent Address Details</span>
              <div
                className="search-col"
                style={{ marginLeft: "auto", marginLeft: "30px" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "1px" }}>
                    <input
                      type="checkbox"
                      name="SameAsCurrent"
                      checked={formData?.SameAsCurrent == "1" ? true : false}
                      onChange={handleSelectChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <span
                    style={{
                      marginLeft: "3px",
                      marginRight: "5px",
                      fontSize: "12px",
                      marginBottom: "2px",
                    }}
                  >
                    Same as Current Address
                  </span>
                </div>
              </div>
            </div>
          }
          secondTitle={
            <div className="d-flex">
              <button
                className={`fa ${rowHandler.show2 ? "fa-arrow-up" : "fa-arrow-down"}`}
                onClick={() => {
                  handlerow("show2");
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                  borderRadius: "2px",
                  background: "none",
                  marginLeft: "30px",
                }}
              ></button>
            </div>
          }
        />

        {rowHandler.show2 && (
          <>
            <div className="row g-4 m-2">
              <textarea
                type="text"
                className="form-control textArea"
                id="PermanentAddress"
                name="PermanentAddress"
                lable="Address"
                placeholder="Address"
                style={{ width: "16%", marginLeft: "7.5px" }}
                max={20}
                onChange={handleSelectChange}
                value={formData?.PermanentAddress}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                disabled={formData?.SameAsCurrent =="1"}
                error={errors?.PermanentAddress ? errors?.PermanentAddress : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="PermanentLocality"
                name="PermanentLocality"
                lable="Locality"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.PermanentLocality}
                disabled={formData?.SameAsCurrent =="1"}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={
                  errors?.PermanentLocality ? errors?.PermanentLocality : ""
                }
              />
              <Input
                type="text"
                className="form-control"
                id="PermanentCity"
                name="PermanentCity"
                lable="City"
                placeholder=" "
                onChange={handleSelectChange}
                disabled={formData?.SameAsCurrent =="1"}
                value={formData?.PermanentCity}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.PermanentCity ? errors?.PermanentCity : ""}
              />
              <Input
                type="text"
                className="form-control"
                id="PermanentState"
                name="PermanentState"
                lable="State"
                placeholder=" "
                onChange={handleSelectChange}
                disabled={formData?.SameAsCurrent =="1"}
                value={formData?.PermanentState}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.PermanentState ? errors?.PermanentState : ""}
              />
              <Input
                type="number"
                className="form-control"
                id="PermanentPinCode"
                name="PermanentPinCode"
                lable="Pin Code"
                placeholder=" "
                disabled={formData?.SameAsCurrent =="1"}
                max={6}
                onChange={(e) => {
                  inputBoxValidation(
                    PINCODE_VALIDATION_REGX,
                    e,
                    handleSelectChange
                  );
                }}
                value={formData?.PermanentPinCode}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.PermanentPinCode ? errors?.PermanentPinCode : ""}
              />
            </div>
          </>
        )}
      </div>
      <div className="card ViewIssues border mt-2">
        <Heading
          title={"For official use"}
          secondTitle={
            <div className="d-flex">
              <button
                className={`fa ${rowHandler.show4 ? "fa-arrow-up" : "fa-arrow-down"}`}
                onClick={() => {
                  handlerow("show4");
                }}
                style={{
                  cursor: "pointer",
                  border: "none",
                  color: "black",
                  borderRadius: "2px",
                  background: "none",
                  marginLeft: "30px",
                }}
              ></button>
            </div>
          }
        />

        {rowHandler.show4 && (
          <>
            <div className="row g-4 m-2">
              <ReactSelect
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="VerticalID"
                placeholderName="Vertical"
                dynamicOptions={vertical}
                optionLabel="VerticalID"
                className="VerticalID"
                handleChange={handleDeliveryChange}
                value={formData.VerticalID}
                required={true}
                requiredClassName="required-fields"
              />
              <ReactSelect
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="TeamID"
                placeholderName="Team"
                dynamicOptions={team}
                handleChange={handleDeliveryChange}
                value={formData?.TeamID}
                requiredClassName="required-fields"
              />
              <ReactSelect
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="WingID"
                placeholderName="Wing"
                dynamicOptions={wing}
                handleChange={handleDeliveryChange}
                value={formData.WingID}
                requiredClassName="required-fields"
              />
              <ReactSelect
                name="OfficeDesignation"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                defaultValue={formData?.OfficeDesignation}
                placeholderName="Designation"
                dynamicOptions={designation}
                value={formData?.OfficeDesignation}
                handleChange={handleDeliveryChange}
                requiredClassName="required-fields"
              />
              <ReactSelect
                name="ReporterTo"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                placeholderName="Report To"
                dynamicOptions={reporter}
                value={formData?.ReporterTo}
                handleChange={handleDeliveryChange}
                requiredClassName="required-fields"
              />
              <DatePicker
                className="custom-calendar"
                id="JoiningDate"
                name="JoiningDate"
                placeholder={VITE_DATE_FORMAT}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                value={formData?.JoiningDate}
                lable="Joining Date"
                handleChange={handleSelectChange}
                requiredClassName="required-fields"
              />
              <DatePicker
                className="custom-calendar"
                id="NextAppraisalDate"
                name="NextAppraisalDate"
                placeholder={VITE_DATE_FORMAT}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                value={formData?.NextAppraisalDate}
                lable="Next Appraisal Date"
                handleChange={handleSelectChange}
                requiredClassName="required-fields"
              />
              <Input
                type="text"
                className="form-control required-fields"
                id="EmployeeCode"
                name="EmployeeCode"
                lable="Employee Code"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.EmployeeCode}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.EmployeeCode ? errors?.EmployeeCode : ""}
              />
              <ReactSelect
                name="Grade"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                placeholderName="Grade"
                dynamicOptions={grade}
                value={formData?.Grade}
                handleChange={handleDeliveryChange}
                requiredClassName="required-fields"
              />
              <div
                className="input-group d-flex"
                style={{ width: "15.7%", marginLeft: "7px" }}
              >
                <input
                  type="text"
                  className="form-control required-fields"
                  id="EmployeeEmail"
                  name="EmployeeEmail"
                  placeholder="Company Email Id"
                  respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                  onChange={handleSelectChange}
                  value={formData?.EmployeeEmail}
                />
                <span className="input-group-text" style={{ height: "25px" }}>
                  @itdoseinfo.com
                </span>
                {errors?.EmployeeEmail && (
                  <div className="error-message">{errors?.EmployeeEmail}</div>
                )}
              </div>
              <Input
                type="number"
                className="form-control required-fields"
                id="Salary"
                name="Salary"
                lable="Salary"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.Salary}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={errors?.Salary ? errors?.Salary : ""}
              />
              <ReactSelect
                name="SalaryAccountBank"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                placeholderName="Salary A/c Bank"
                dynamicOptions={salaryaccountbank}
                value={formData?.SalaryAccountBank}
                handleChange={handleDeliveryChange}
                requiredClassName="required-fields"
              />
              <Input
                type="number"
                className="form-control required-fields"
                id="SalaryAccountNumber"
                name="SalaryAccountNumber"
                lable="Salary A/c No."
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.SalaryAccountNumber}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={
                  errors?.SalaryAccountNumber ? errors?.SalaryAccountNumber : ""
                }
              />
              <div className="search-col" style={{ marginLeft: "5px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "7px" }}>
                    <input
                      type="checkbox"
                      name="RegisteredSalesEnquiry"
                      checked={
                        formData?.RegisteredSalesEnquiry == "1" ? true : false
                      }
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
                    Registered Sales Enquiry
                  </span>
                </div>
              </div>
              <div className="search-col" style={{ marginLeft: "5px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "7px" }}>
                    <input
                      type="checkbox"
                      name="IsSalesTeamMember"
                      checked={
                        formData?.IsSalesTeamMember == "1" ? true : false
                      }
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
                    Is Sales Team Member
                  </span>
                </div>
              </div>
              <div className="search-col" style={{ marginLeft: "5px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label className="switch" style={{ marginTop: "7px" }}>
                    <input
                      type="checkbox"
                      name="ApproveLeaveRequest"
                      checked={
                        formData?.ApproveLeaveRequest == "1" ? true : false
                      }
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
                    Approve Leave Request
                  </span>
                </div>
              </div>
              <ReactSelect
                name="MaximumWeekoffs"
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                placeholderName="Maximum Weekoffs"
                dynamicOptions={[{
                  label:"None",value:"None"
                },{
                  label:"Alternate Saturdays",value:"AlternateSaturdays"
                },{
                  label:"All Saturdays",value:"AllSaturdays"
                }, ]}
                value={formData?.MaximumWeekoffs}
                handleChange={handleDeliveryChange}
                requiredClassName="required-fields"
              />
                <Input
                type="number"
                className="form-control required-fields"
                id="WorkingDays"
                name="WorkingDays"
                lable="Working Days"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.WorkingDays}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={
                  errors?.WorkingDays ? errors?.WorkingDays : ""
                }
              />
                <Input
                type="number"
                className="form-control required-fields"
                id="BiometricEmployeeCode"
                name="BiometricEmployeeCode"
                lable="Biometric Employee Code"
                placeholder=" "
                onChange={handleSelectChange}
                value={formData?.BiometricEmployeeCode}
                respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                error={
                  errors?.BiometricEmployeeCode ? errors?.BiometricEmployeeCode : ""
                }
              />
            </div>
          </>
        )}
      </div>
      <div className="row  g-4 mt-2">
        <div className="search-col" style={{ marginLeft: "8px" }}>
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
        </div>

        <div className="col-3 col-sm-4 d-flex">
          {/* <button
            className="btn btn-sm btn-success ml-2"
            onClick={handleSave}
          >
            Save
          </button> */}
          {state?.edit && (
            <div className="search-col" style={{ marginLeft: "8px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label className="switch" style={{ marginTop: "7px" }}>
                  <input
                    type="checkbox"
                    name="UpdatePassword"
                    checked={formData?.UpdatePassword == "1" ? true : false}
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
                  Update Password
                </span>
              </div>
            </div>
          )}
          {state?.edit ? (
            <button className="btn btn-sm btn-info ml-2" onClick={handleUpdate}>
              Update
            </button>
          ) : (
            <button className="btn btn-sm btn-info ml-2" onClick={handleSave}>
              Save
            </button>
          )}

          <Link to="/SearchEmployeeMaster" className="ml-4">
            {"Back to List"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default EmployeeMaster;
