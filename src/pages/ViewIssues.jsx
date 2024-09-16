import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../components/UI/Heading";
import ReactSelect from "../components/formComponent/ReactSelect";
import DatePicker from "../components/formComponent/DatePicker";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import axios from "axios";
import { headers } from "../utils/apitools";
import Tables from "../components/UI/customTable";
import {
  viewissuesTHEAD,
  viewTHEAD,
} from "../components/modalComponent/Utils/HealperThead";
import { toast } from "react-toastify";
import Loading from "../components/loader/Loading";
import moment from "moment";
import ViewIssueDetailsTableModal from "../components/UI/customTable/ViewIssueDetailsTableModal";
import { Link, useLocation } from "react-router-dom";
import Modal from "../components/modalComponent/Modal";
import Input from "../components/formComponent/Input";
import Index from "./frontOffice/PatientRegistration/Index";
import NoDataMessage from "./NoDataMessage";
import { apiUrls } from "../networkServices/apiEndpoints";
const ViewIssues = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const [tableData, setTableData] = useState([]);
  const location = useLocation();
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [project, setProject] = useState([]);
  const [wing, setWing] = useState([]);
  const [poc1, setPoc1] = useState([]);
  const [poc2, setPoc2] = useState([]);
  const [poc3, setPoc3] = useState([]);
  const [status, setStatus] = useState([]);
  const [category, setCategory] = useState([]);
  const [updatecategory, setUpdateCategory] = useState([]);
  const [reporter, setReporter] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const [priority, setPriority] = useState([]);
  const [assigntoValue, setAssignedtoValue] = useState([]);
  const [shownodata, setShownodata] = useState(false);

  const [rowHandler, setRowHandler] = useState({
    show: false,
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    SubmitDateShow: false,
    DeliveryDateShow: false,
    ResolveDateShow: false,
    CloseDateShow: false,
    UpadteDateShow: false,
  });
  const [formData, setFormData] = useState({
    SubmitDate: "",
    DeliveryDate: "",
    ResolveDate: "",
    CloseDate: "",
    UpadteDate: "",

    SubmitDateBefore: new Date(),
    SubmitDateAfter: new Date(),
    SubmitDateCurrent: new Date(),

    DeliveryDateBefore: new Date(),
    DeliveryDateAfter: new Date(),
    DeliveryDateCurrent: new Date(),

    ResolveDateBefore: new Date(),
    ResolveDateAfter: new Date(),
    ResolveDateCurrent: new Date(),

    CloseDateBefore: new Date(),
    CloseDateAfter: new Date(),
    CloseDateCurrent: new Date(),

    UpadteDateBefore: new Date(),
    UpadteDateAfter: new Date(),
    UpadteDateCurrent: new Date(),

    ProjectID: [],
    VerticalID: [],
    TeamID: [],
    WingID: [],
    POC1: [],
    POC2: [],
    POC3: [],
    Reporter: [],
    AssignedTo: [],
    AssignedToStatus: "",
    MoveStatus: "",
    UpdateToStatus: "",
    UpdateToCategory: "",
    DeliveryToStatus: "",
    Priority: "",
    Category: [],
    HideStatus: "",
    Status: "",
    TableStatus: "",
    IsActive: "",
    RefereRCA: "",
    RefereCode: "",
  });

  // function debounce(func, delay) {
  //   let timeout;
  //   return function (...args) {
  //     const context = this;
  //     if (timeout) clearTimeout(timeout);
  //     timeout = setTimeout(() => func.apply(context, args), delay);
  //   };
  // }

  // const debouncedApiCall = debounce((code) => {
  //   const filterdata = tableData?.filter((item) => item.IsActive == true);
  //   const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
  //   getmultiApplyAction(ticketIDs,{label:formData?.RefereRCA,value:code});
  // }, 1000);

  const handleResolve = () => {
    const filterdata = tableData?.filter((item) => item.IsActive == true);
    const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
    if (ticketIDs == "") {
      toast.error("Please Select atleast one Ticket.");
    } else {
      // const filterdata = tableData?.filter((item) => item.IsActive == true);
      // const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
      let form = new FormData();
      form.append("ID", localStorage?.getItem("ID")),
        form.append("LoginName", localStorage?.getItem("realname")),
        form.append("TicketIDs", ticketIDs),
        form.append("ActionText", formData?.RefereRCA),
        form.append("ActionId", formData?.RefereCode),
        axios
          .post(
            apiUrls?.ApplyAction,
            form,
            { headers }
          )
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              RefereRCA: "",
              RefereCode: "",
            });
            handleViewSearch()
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };
console.log(tableData)
  const handleResolveElement = (item) => {
    if (formData?.RefereRCA == "") {
      toast.error("Please Enter Reference RCA Name.");
    } else if (formData?.RefereCode == "") {
      toast.error("Please Enter Reference RCA Code.");
    } else {
      let form = new FormData();
      form.append("ID", localStorage?.getItem("ID")),
        form.append("LoginName", localStorage?.getItem("realname")),
        form.append("TicketIDs", item?.TicketID),
        form.append("ActionText", formData?.RefereRCA),
        form.append("ActionId", formData?.RefereCode),
        axios
          .post(
            apiUrls?.ApplyAction,
            form,
            { headers }
          )
          .then((res) => {
            toast.success(res?.data?.message);
            setFormData({
              ...formData,
              RefereRCA: "",
              RefereCode: "",
            });
            handleViewSearch()
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeliveryChangeValueStatus = (name, value) => {
    setFormData({ ...formData, [name]: value });
    const filterdata = tableData?.filter((item) => item.IsActive == true);
    const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
    if (name != "TableStatus") getmultiApplyAction(ticketIDs, value);
  };
  const getmultiApplyAction = (ids, data) => {
    if (ids == "") {
      toast.error("Please Select atleast one Ticket.");
    } else {
      let form = new FormData();
      form.append("ID", localStorage?.getItem("ID")),
        form.append("LoginName", localStorage?.getItem("username")),
        form.append("TicketIDs", ids),
        form.append("ActionText", data?.label),
        form.append("ActionId", data?.value),
        axios
          .post(
            apiUrls?.ApplyAction,
            form,
            { headers }
          )
          .then((res) => {
            toast.success(res?.data?.message);
            handleViewSearch()
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const handleDeliveryChangeValue = (name, value, index) => {
    if (name == "Move") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      data[index]["MoveResolve"] = true;
      setTableData(data);
    } else if (name == "Assign") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      data[index]["AssignResolve"] = true;
      setTableData(data);
    } else if (name == "AssignDropDownValue") {
      const data = [...tableData];
      data[index][name] = value;
      setTableData(data);
    } else if (name == "UpdateStatus") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      data[index]["UpdateStatusResolve"] = true;
      setTableData(data);
    } else if (name == "UpdateStatusValue") {
      const data = [...tableData];
      data[index][name] = value;
      setTableData(data);
    } else if (name == "UpdateCategory") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      data[index]["UpdateCategoryResolve"] = true;
      setTableData(data);
    } else if (name == "UpdateCategoryValue") {
      const data = [...tableData];
      data[index][name] = value;
      setTableData(data);
    } else if (name == "UpdateDeliveryDate") {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      data[index]["UpdatedeliverydateResolve"] = true;
      setTableData(data);
    } else if (name == "UpdatedeliverydateValue") {
      const data = [...tableData];
      data[index][name] = value;
      setTableData(data);
    } else {
      const data = [...tableData];
      data[index]["TableStatus"] = value;
      setTableData(data);
    }
  };
  const handleAgainChange = (name, value, index) => {
    let updatedData = [...tableData];
    updatedData[index][name] = value;
    setTableData(updatedData);
    getApplyAction(value, index);
  };

  const handleDeliveryChangeCheckbox = (e, index) => {
    const { checked } = e.target;
    const data = [...tableData];
    data[index]["IsActive"] = checked ? "1" : "0";
    setTableData(data);
  };
  const handleReset = () => {
    setFormData({
      ...formData,
      ProjectID: [],
      VerticalID: [],
      TeamID: [],
      WingID: [],
      POC1: [],
      POC2: [],
      POC3: [],
      Reporter: [],
      AssignedTo: [],
      Priority: "",
      Category: [],
      HideStatus: "",
      Status: "",
      TableStatus: "",
      IsActive: "",
      RefereRCA: "",
      RefereCode: "",
    });
    setProject([]),
      setCategory([]),
      setReporter([]),
      setAssignedto([]),
      setPriority([]),
      setStatus([]),
      setTeam([]),
      setWing([]),
      setPoc1([]),
      setPoc2([]),
      setPoc3([]);
  };
  const shortenName = (name) => {
    return name.length > 20 ? name.substring(0, 35) + "..." : name;
  };
  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectAll = (values) => {
    const data = tableData.map((ele) => {
      return {
        ...ele,
        IsActive: values ? "1" : "0",
      };
    });
    setTableData(data);
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
  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [`${name}`]: selectedValues,
    }));
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
            return { name: item?.Vertical, code: item?.verticalID };
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
        .post(
         apiUrls?.Wing_Select,
          form,
          { headers }
        )
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
  const getPOC1 = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
          apiUrls?.POC_1_Select,
          form,
          { headers }
        )
        .then((res) => {
          const poc1s = res?.data.data.map((item) => {
            return { name: item?.POC_1_Name, code: item?.POC_1_ID };
          });
          setPoc1(poc1s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPOC2 = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
          apiUrls?.POC_2_Select,
          form,
          { headers }
        )
        .then((res) => {
          const poc2s = res?.data.data.map((item) => {
            return { name: item?.POC_2_Name, code: item?.POC_2_ID };
          });
          setPoc2(poc2s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPOC3 = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
          apiUrls?.POC_3_Select,
          form,
          { headers }
        )
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { name: item?.POC_3_Name, code: item?.POC_3_ID };
          });
          setPoc3(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const [updateProject, setUpdateProject] = useState([]);
  const getProjectvalue = () => {
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
          getUpdateCategory(poc3s[0]?.value);
          setUpdateProject(poc3s);
        })
        .catch((err) => {
          console.log(err);
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
            return { name: item?.Project, code: item?.ProjectId };
          });
          setProject(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getCategory = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
          apiUrls?.Category_Select,
          form,
          { headers }
        )
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
  const getUpdateCategory = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
         apiUrls?.Category_Select,
          form,
          { headers }
        )
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setUpdateCategory(poc3s);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getStatus = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
         apiUrls?.Status_Select,
          form,
          { headers }
        )
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.STATUS, value: item?.id };
          });
          setStatus(poc3s);
        })
        .catch((err) => {
          console.log(err);
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
            return { name: item?.NAME, code: item?.ID };
          });
          setReporter(reporters);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getAssignTo = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
        apiUrls?.AssignTo_Select,
          form,
          { headers }
        )
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { name: item?.NAME, code: item?.ID };
          });
          setAssignedto(assigntos);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getAssignToValue = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
         apiUrls?.AssignTo_Select,
          form,
          { headers }
        )
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setAssignedtoValue(assigntos);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getPriority = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
         apiUrls?.Priority_Select,
          form,
          { headers }
        )
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.Id };
          });
          setPriority(assigntos);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getApplyAction = (data, index) => {
    // if (index == "") {
    //   toast.error("Please Select atleast one Ticket.");
    // } else {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("TicketIDs", tableData[index]?.TicketID),
      form.append("ActionText", data?.label),
      form.append("ActionId", data?.value),
      axios
        .post(
         apiUrls?.ApplyAction,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          console.log(err);
        });
    // }
  };

  useEffect(() => {
    getVertical(),
      getAssignTo(),
      getStatus(),
      getCategory(),
      getPriority(),
      getTeam(),
      getReporter(),
      getWing(),
      getUpdateCategory(),
      getPOC1(),
      getPOC2(),
      getPOC3();
    getProjectvalue();

    getProject();
    getAssignToValue();
    if (!location?.state?.id) handleViewSearch();
  }, []);
  const [loading, setLoading] = useState(false);

  const handleViewSearch = (code) => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID")),
      form.append("LoginName", localStorage.getItem("realname")),
      form.append("ProjectID", formData?.ProjectID),
      form.append("VerticalID", formData?.VerticalID),
      form.append("TeamID", formData?.TeamID),
      form.append("WingID", formData?.WingID),
      form.append("POC1", formData?.POC1),
      form.append("POC2", formData?.POC2),
      form.append("POC3", formData?.POC3),
      form.append("ReporterId", formData?.Reporter),
      form.append("AssignToID", formData?.AssignedTo),
      form.append("PriorityId", formData?.Priority),
      form.append("CategoryID", formData?.Category),
      form.append("HideStatusId", formData?.HideStatus),
      form.append("StatusId", formData?.Status),
      form.append("SubmittedDateStatus", formData?.SubmitDate),
      form.append(
        "DateFromSubmitted",
        formData?.SubmitDateBefore?.toISOString().split("T")[0]
      );
    form.append(
      "DateToSubmitted",
      formData?.SubmitDateAfter?.toISOString().split("T")[0]
    ),
      form.append("DeliveryDateStatus", formData?.DeliveryDate),
      form.append(
        "DeliveryFromDate",
        formData?.DeliveryDateBefore?.toISOString().split("T")[0]
      ),
      form.append(
        "Deliverytodate",
        formData?.DeliveryDateAfter?.toISOString().split("T")[0]
      ),
      form.append("ClosedDateStatus", formData?.CloseDate),
      form.append(
        "ClosedFromDate",
        formData?.CloseDateBefore?.toISOString().split("T")[0]
      ),
      form.append(
        "Closedtodate",
        formData?.CloseDateAfter?.toISOString().split("T")[0]
      ),
      form.append("LastUpdateDateStatus", formData?.UpadteDate),
      form.append(
        "LastUpdatedFromDate",
        formData?.UpadteDateBefore?.toISOString().split("T")[0]
      ),
      form.append(
        "LastUpdatedToDate",
        formData?.UpadteDateAfter?.toISOString().split("T")[0]
      ),
      form.append("ResolveDateStatus", formData?.ResolveDate),
      form.append(
        "ResolveDateFromDate",
        formData?.ResolveDateBefore?.toISOString().split("T")[0]
      ),
      form.append(
        "ResolveDateToDate",
        formData?.ResolveDateAfter?.toISOString().split("T")[0]
      ),
      form.append("rowColor", code ? code : ""),
      axios
        .post(
          apiUrls?.ViewIssueSearch,
          form,
          { headers }
        )
        .then((res) => {
          const data = res?.data?.data;
          if (data?.length == 0) {
            setShownodata(true);
          }
          const updatedData = data?.map((ele, index) => {
            return {
              ...ele,
              IsActive: "0",
              MoveDropDown: "",
              MoveResolve: false,
              MoveDropDownValue: "",

              AssignDropDown: "",
              AssignResolve: false,
              AssignDropDownValue: "",

              UpdateStatusDropdown: "",
              UpdateStatusResolve: false,
              UpdateStatusValue: "",

              UpdateCategoryDropdown: "",
              UpdateCategoryResolve: false,
              UpdateCategoryValue: "",

              UpdatedeliverydateDropdown: "",
              UpdatedeliverydateResolve: false,
              UpdatedeliverydateValue: "",

              CloseDropdown: "",
              CloseResolve: "",
              CloseResolve: "",

              index: index,
            };
          });
          setTableData(updatedData);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message
              ? err?.response?.data?.message
              : "Error Occured"
          );
          setLoading(false);
        });
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if(name=='RefereCode')
  //   {
  //       debouncedApiCall(value)
  //   }
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDelete = () => {
    const filterdata = tableData?.filter((item) => item.IsActive == true);
    const ticketIDs = filterdata.map((item) => item.TicketID).join(",");
    let form = new FormData();
    form.append("Id", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage.getItem("username")),
      form.append("TicketIDs", ticketIDs),
      axios
        .post(
         apiUrls?.DeleteTicket,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const currentData = tableData?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });

  useEffect(() => {
    if (location.state?.data[0]?.Id) {
      // setSample(location.state.sample);
      setVisible({
        showVisible: true,
        showData: { ...location?.state?.data[0], flag: true },
      });
    }
  }, [location?.state]);

  const getViewTicket = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID"));
    form.append("TicketID", formData?.TicketID);

    axios
      .post(apiUrls?.ViewTicket, form, {
        headers,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {shownodata && (
        <NoDataMessage show={shownodata} setShow={setShownodata} />
      )}
      {visible?.showVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="View Issues Detail"
          tableData={currentData}
          setTableData={setTableData}
        >
          <ViewIssueDetailsTableModal
            visible={visible}
            setVisible={setVisible}
            tableData={tableData}
            setTableData={setTableData}
          />
        </Modal>
      )}
      <div className="card ViewIssues border">
        <Heading
          title={t("View Issues")}
          isBreadcrumb={true}
          secondTitle={
            <div className="row g-4">
              <div
                className="d-flex flex-wrap align-items-center"
                style={{ marginRight: "10px" }}
              >
                <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="legend-circle"
                    style={{
                      backgroundColor: "#FFC0CB",
                      borderColor: "#FFC0CB",
                      cursor: "pointer",
                      height: "12px",
                      width: "19px",
                      borderRadius: "50%",
                      marginLeft: "4px",
                    }}
                    onClick={() => handleViewSearch("10")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("New")}
                  </span>
                </div>
                <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="legend-circle"
                    style={{
                      backgroundColor: "#e3b73b",
                      borderColor: "#e3b73b",
                      height: "12px",
                      width: "19px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => handleViewSearch("20")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("Feedback")}
                  </span>
                </div>
                <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="legend-circle"
                    style={{
                      backgroundColor: "#ffcde5",
                      cursor: "pointer",
                      height: "12px",
                      width: "19px",
                      borderRadius: "50%",
                    }}
                    onClick={() => handleViewSearch("30")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("Acknowledged")}
                  </span>
                </div>
                <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="legend-circle"
                    style={{
                      backgroundColor: "#fff494",
                      cursor: "pointer",
                      height: "12px",
                      width: "19px",
                      borderRadius: "50%",
                    }}
                    onClick={() => handleViewSearch("40")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("Confirmed")}
                  </span>
                </div>
                <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#C2Dfff",
                      cursor: "pointer",
                      height: "12px",
                      width: "19px",
                      marginLeft: "5px",
                      borderRadius: "50%",
                    }}
                    onClick={() => handleViewSearch("50")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("Assigned")}
                  </span>
                </div>
                <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#d2f5b0",
                      cursor: "pointer",
                      height: "12px",
                      width: "19px",
                      borderRadius: "50%",
                      marginLeft: "5px",
                    }}
                    onClick={() => handleViewSearch("80")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("Resolved")}
                  </span>
                </div>
                <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#c9ccc4",
                      cursor: "pointer",
                      height: "12px",
                      width: "19px",
                      borderRadius: "50%",
                      marginLeft: "4px",
                    }}
                    onClick={() => handleViewSearch("90")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("Closed")}
                  </span>
                </div>
                <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#fff000",
                      cursor: "pointer",
                      height: "12px",
                      width: "19px",
                      borderRadius: "50%",
                      marginLeft: "7px",
                    }}
                    onClick={() => handleViewSearch("60")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("Hold")}
                  </span>
                </div>
                <div
                  className="d-flex "
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="legend-circle"
                    style={{
                      backgroundColor: "#44E3AA",
                      cursor: "pointer",
                      height: "12px",
                      width: "19px",
                      borderRadius: "50%",
                    }}
                    onClick={() => handleViewSearch("70")}
                  ></div>
                  <span
                    className="legend-label"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {t("Done on UAT")}
                  </span>
                </div>
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
              </div>
            </div>
            // <div style={{ marginRight: "0px" }}>
            // <button
            //   className={`fa ${rowHandler.show ? "fa-arrow-up" : "fa-arrow-down"}`}
            //   onClick={() => {
            //     handlerow("show");
            //   }}
            //   style={{
            //     cursor: "pointer",
            //     border: "none",
            //     color: "black",
            //     borderRadius: "2px",
            //     background: "none",
            //   }}
            // ></button>
            // </div>
          }
        />

        {rowHandler.show && (
          <>
            <div className="row g-4 m-2">
              <MultiSelectComp
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
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="TeamID"
                placeholderName="Team"
                dynamicOptions={team}
                handleChange={handleMultiSelectChange}
                value={formData.TeamID.map((code) => ({
                  code,
                  name: team.find((item) => item.code === code)?.name,
                }))}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="WingID"
                placeholderName="Wing"
                dynamicOptions={wing}
                handleChange={handleMultiSelectChange}
                value={formData.WingID.map((code) => ({
                  code,
                  name: wing.find((item) => item.code === code)?.name,
                }))}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="POC1"
                placeholderName="POC-I"
                dynamicOptions={poc1}
                handleChange={handleMultiSelectChange}
                value={formData.POC1.map((code) => ({
                  code,
                  name: poc1.find((item) => item.code === code)?.name,
                }))}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="POC2"
                placeholderName="POC-II"
                dynamicOptions={poc2}
                handleChange={handleMultiSelectChange}
                value={formData.POC2.map((code) => ({
                  code,
                  name: poc2.find((item) => item.code === code)?.name,
                }))}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="POC3"
                placeholderName="POC-III"
                dynamicOptions={poc3}
                handleChange={handleMultiSelectChange}
                value={formData.POC3.map((code) => ({
                  code,
                  name: poc3.find((item) => item.code === code)?.name,
                }))}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="ProjectID"
                placeholderName="Project"
                dynamicOptions={project}
                handleChange={handleMultiSelectChange}
                value={formData.ProjectID.map((code) => ({
                  code,
                  name: project.find((item) => item.code === code)?.name,
                }))}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="Reporter"
                placeholderName="Reporter"
                dynamicOptions={reporter}
                handleChange={handleMultiSelectChange}
                value={formData.Reporter.map((code) => ({
                  code,
                  name: reporter.find((item) => item.code === code)?.name,
                }))}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="AssignedTo"
                placeholderName="AssignedTo"
                dynamicOptions={assignto}
                handleChange={handleMultiSelectChange}
                value={formData.AssignedTo.map((code) => ({
                  code,
                  name: assignto.find((item) => item.code === code)?.name,
                }))}
              />
              <ReactSelect
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="Priority"
                placeholderName="Priority"
                dynamicOptions={priority}
                value={formData?.Priority}
                handleChange={handleDeliveryChange}
              />
              <MultiSelectComp
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="Category"
                placeholderName="Category"
                dynamicOptions={category}
                handleChange={handleMultiSelectChange}
                value={formData.Category.map((code) => ({
                  code,
                  name: category.find((item) => item.code === code)?.name,
                }))}
              />
              <ReactSelect
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="HideStatus"
                placeholderName="HideStatus"
                dynamicOptions={status}
                value={formData?.HideStatus}
                defaultValue={"resolved"}
                handleChange={handleDeliveryChange}
              />
              <ReactSelect
                respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                name="Status"
                placeholderName="Status"
                dynamicOptions={status}
                value={formData?.Status}
                handleChange={handleDeliveryChange}
              />
              <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                <div>
                  <ReactSelect
                    placeholderName="Submit Date"
                    id={"SubmitDate"}
                    dynamicOptions={[
                      { label: "Any", value: "0" },
                      { label: "Between", value: "2" },
                      { label: "Before", value: "4" },
                      { label: "After", value: "6" },
                      { label: "OnOrBefore", value: "3" },
                      { label: "On", value: "5" },
                      { label: "OnOrAfter", value: "7" },
                      { label: "WithoutDeliveryDate", value: "9" },
                    ]}
                    searchable={true}
                    lable="Submit Date"
                    name="SubmitDate"
                    value={formData?.SubmitDate}
                    className={"SubmitDate"}
                    handleChange={handleDeliveryChange}
                  />
                </div>
                {formData.SubmitDate == "2" && (
                  <>
                    <DatePicker
                      className="custom-calendar"
                      id="SubmitDateBefore"
                      name="SubmitDateBefore"
                      // lable={"Before"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.SubmitDateBefore}
                      handleChange={searchHandleChange}
                    />
                    <DatePicker
                      className="custom-calendar"
                      id="SubmitDateAfter"
                      name="SubmitDateAfter"
                      // lable={"After"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.SubmitDateAfter}
                      handleChange={searchHandleChange}
                    />
                  </>
                )}

                {formData.SubmitDate == "4" ||
                formData.SubmitDate == "5" ||
                formData.SubmitDate == "6" ||
                formData.SubmitDate == "7" ||
                formData.SubmitDate == "3" ? (
                  <DatePicker
                    className="custom-calendar"
                    id="SubmitDateCurrent"
                    name="SubmitDateCurrent"
                    // lable={"Current"}
                    placeholder={VITE_DATE_FORMAT}
                    // respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
                    value={formData?.SubmitDateCurrent}
                    handleChange={searchHandleChange}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                <div>
                  <ReactSelect
                    placeholderName="Delivery Date"
                    id={"DeliveryDate"}
                    dynamicOptions={[
                      { label: "Any", value: "0" },
                      { label: "Between", value: "2" },
                      { label: "Before", value: "4" },
                      { label: "After", value: "6" },
                      { label: "OnOrBefore", value: "3" },
                      { label: "On", value: "5" },
                      { label: "OnOrAfter", value: "7" },
                      { label: "WithoutDeliveryDate", value: "9" },
                    ]}
                    searchable={true}
                    lable="Delivery Date"
                    name="DeliveryDate"
                    value={formData?.DeliveryDate}
                    //   respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                    className={"DeliveryDate"}
                    handleChange={handleDeliveryChange}
                  />
                </div>
                {formData.DeliveryDate == "2" && (
                  <>
                    <DatePicker
                      className="custom-calendar"
                      id="DeliveryDateBefore"
                      name="DeliveryDateBefore"
                      // lable={"Before"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.DeliveryDateBefore}
                      handleChange={searchHandleChange}
                    />
                    <DatePicker
                      className="custom-calendar"
                      id="DeliveryDateAfter"
                      name="DeliveryDateAfter"
                      // lable={"After"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.DeliveryDateAfter}
                      handleChange={searchHandleChange}
                    />
                  </>
                )}

                {formData.DeliveryDate == "4" ||
                formData.DeliveryDate == "5" ||
                formData.DeliveryDate == "6" ||
                formData.DeliveryDate == "7" ||
                formData.DeliveryDate == "3" ? (
                  <DatePicker
                    className="custom-calendar"
                    id="DeliveryDateCurrent"
                    name="DeliveryDateCurrent"
                    // lable={"Current"}
                    placeholder={VITE_DATE_FORMAT}
                    // respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
                    value={formData?.DeliveryDateCurrent}
                    handleChange={searchHandleChange}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                <div>
                  <ReactSelect
                    placeholderName="Resolve Date"
                    id={"ResolveDate"}
                    dynamicOptions={[
                      { label: "Any", value: "0" },
                      { label: "Between", value: "2" },
                      { label: "Before", value: "4" },
                      { label: "After", value: "6" },
                      { label: "OnOrBefore", value: "3" },
                      { label: "On", value: "5" },
                      { label: "OnOrAfter", value: "7" },
                      { label: "WithoutDeliveryDate", value: "9" },
                    ]}
                    searchable={true}
                    lable="Resolve Date"
                    name="ResolveDate"
                    value={formData?.ResolveDate}
                    //   respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                    className={"ResolveDate"}
                    handleChange={handleDeliveryChange}
                  />
                </div>
                {formData.ResolveDate == "2" && (
                  <>
                    <DatePicker
                      className="custom-calendar"
                      id="ResolveDateBefore"
                      name="ResolveDateBefore"
                      // lable={"Before"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.ResolveDateBefore}
                      handleChange={searchHandleChange}
                    />
                    <DatePicker
                      className="custom-calendar"
                      id="ResolveDateAfter"
                      name="ResolveDateAfter"
                      // lable={"After"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.ResolveDateAfter}
                      handleChange={searchHandleChange}
                    />
                  </>
                )}

                {formData.ResolveDate == "4" ||
                formData.ResolveDate == "5" ||
                formData.ResolveDate == "6" ||
                formData.ResolveDate == "7" ||
                formData.ResolveDate == "3" ? (
                  <DatePicker
                    className="custom-calendar"
                    id="ResolveDateCurrent"
                    name="ResolveDateCurrent"
                    // lable={"Current"}
                    placeholder={VITE_DATE_FORMAT}
                    // respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
                    value={formData?.ResolveDateCurrent}
                    handleChange={searchHandleChange}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                <div>
                  <ReactSelect
                    placeholderName="Close Date"
                    id={"CloseDate"}
                    dynamicOptions={[
                      { label: "Any", value: "0" },
                      { label: "Between", value: "2" },
                      { label: "Before", value: "4" },
                      { label: "After", value: "6" },
                      { label: "OnOrBefore", value: "3" },
                      { label: "On", value: "5" },
                      { label: "OnOrAfter", value: "7" },
                      { label: "WithoutDeliveryDate", value: "9" },
                    ]}
                    searchable={true}
                    lable="Close Date"
                    name="CloseDate"
                    value={formData?.CloseDate}
                    //   respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                    className={"CloseDate"}
                    handleChange={handleDeliveryChange}
                  />
                </div>
                {formData.CloseDate == "2" && (
                  <>
                    <DatePicker
                      className="custom-calendar"
                      id="CloseDateBefore"
                      name="CloseDateBefore"
                      // lable={"Before"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.CloseDateBefore}
                      handleChange={searchHandleChange}
                    />
                    <DatePicker
                      className="custom-calendar"
                      id="CloseDateAfter"
                      name="CloseDateAfter"
                      // lable={"After"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.CloseDateAfter}
                      handleChange={searchHandleChange}
                    />
                  </>
                )}

                {formData.CloseDate == "4" ||
                formData.CloseDate == "5" ||
                formData.CloseDate == "6" ||
                formData.CloseDate == "7" ||
                formData.CloseDate == "3" ? (
                  <DatePicker
                    className="custom-calendar"
                    id="CloseDateCurrent"
                    name="CloseDateCurrent"
                    // lable={"Current"}
                    placeholder={VITE_DATE_FORMAT}
                    // respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
                    value={formData?.CloseDateCurrent}
                    handleChange={searchHandleChange}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                <div>
                  <ReactSelect
                    placeholderName="Update Date"
                    id={"UpadteDate"}
                    dynamicOptions={[
                      { label: "Any", value: "0" },
                      { label: "Between", value: "2" },
                      { label: "Before", value: "4" },
                      { label: "After", value: "6" },
                      { label: "OnOrBefore", value: "3" },
                      { label: "On", value: "5" },
                      { label: "OnOrAfter", value: "7" },
                      { label: "WithoutDeliveryDate", value: "9" },
                    ]}
                    searchable={true}
                    lable="Update Date"
                    name="UpadteDate"
                    value={formData?.UpadteDate}
                    //   respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                    className={"UpadteDate"}
                    handleChange={handleDeliveryChange}
                  />
                </div>
                {formData.UpadteDate == "2" && (
                  <>
                    <DatePicker
                      className="custom-calendar"
                      id="UpadteDateBefore"
                      name="UpadteDateBefore"
                      // lable={"UpadteDateBefore"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.UpadteDateBefore}
                      handleChange={searchHandleChange}
                    />
                    <DatePicker
                      className="custom-calendar"
                      id="UpadteDateAfter"
                      name="UpadteDateAfter"
                      // lable={"UpadteDateAfter"}
                      placeholder={VITE_DATE_FORMAT}
                      // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                      value={formData?.UpadteDateAfter}
                      handleChange={searchHandleChange}
                    />
                  </>
                )}

                {formData.UpadteDate == "4" ||
                formData.UpadteDate == "5" ||
                formData.UpadteDate == "6" ||
                formData.UpadteDate == "7" ||
                formData.UpadteDate == "3" ? (
                  <DatePicker
                    className="custom-calendar"
                    id="UpadteDateCurrent"
                    name="UpadteDateCurrent"
                    // lable={"Current"}
                    placeholder={VITE_DATE_FORMAT}
                    // respclass={"col-xl-2 col-md-4 col-sm-6 col-12"}
                    value={formData?.UpadteDateCurrent}
                    handleChange={searchHandleChange}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                <div className="d-flex">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleViewSearch()}
                  >
                    Apply Filter
                  </button>
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={handleReset}
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {tableData?.length > 0 && (
            <div
              className="patient_registration_card bootable "
              style={{ marginTop: "10px" }}
            >
              <Heading title={t("Viewing Issues")} />
              <div className="row g-4 m-1">
                <Tables
                  style={{ width: "100%" }}
                  thead={viewissuesTHEAD}
                  tbody={currentData?.map((ele, index) => ({
                    "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
                    Action: (
                      <Input
                        type="checkbox"
                        name="IsActive"
                        checked={ele?.IsActive == "1" ? true : false}
                        onChange={(e) =>
                          handleDeliveryChangeCheckbox(
                            e,
                            (currentPage - 1) * rowsPerPage + index
                          )
                        }
                      />
                    ),
                    ID: (
                      <Link
                        onClick={() => {
                          setVisible({ showVisible: true, showData: ele });
                        }}
                        title="Click to Show"
                      >
                        {ele?.TicketID}
                      </Link>
                    ),
                    "Project Name":  <span
                    id={`ProjectName-${index}`}
                    targrt={`ProjectName-${index}`}
                    title={ele?.ProjectName}
                  >
                    {shortenName(ele?.ProjectName)}
                  </span>,
                    "Category Name": ele?.Category,
                    "Reporter Name": ele?.ReporterName,
                    Summary: (
                      <span
                        id={`summary-${index}`}
                        targrt={`summary-${index}`}
                        title={ele?.summary}
                      >
                        {shortenName(ele?.summary)}
                      </span>
                    ),
                    Status: ele?.Status,
                    "Date Submitted": ele?.AssignedDate,
                    "Delivery Date": ele?.CurrentDeliveryDate,
                    "Change Action": (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginRight: "3px",
                        }}
                      >
                        <div style={{ width: "100%" }} className="d-flex">
                          <ReactSelect
                            style={{ width: "50%", marginLeft: "10px" }}
                            height={"6px"}
                            name="TableStatus"
                            id="TableStatus"
                            respclass="width100px"
                            placeholderName="ChangeAction"
                            dynamicOptions={[
                              { label: "Move", value: "Move" },
                              { label: "Assign", value: "Assign" },
                              { label: "Close", value: "Close" },
                              { label: "Resolve", value: "Resolve" },
                              { label: "UpdateStatus", value: "UpdateStatus" },
                              {
                                label: "UpdateCategory",
                                value: "UpdateCategory",
                              },
                              {
                                label: "UpdateDeliveryDate",
                                value: "UpdateDeliveryDate",
                              },
                            ]}
                            // isDisabled={
                            //   ele?.IsActive == "0" || !ele?.IsActive
                            //     ? true
                            //     : false
                            // }
                            value={ele?.TableStatus}
                            handleChange={(name, value) => {
                              const ind =
                                (currentPage - 1) * rowsPerPage + index;
                              handleDeliveryChangeValue(
                                name,
                                value?.value,
                                ind
                              );
                            }}
                          />

                          {ele?.TableStatus == "Move" && (
                            <>
                              <ReactSelect
                                style={{ width: "100%" }}
                                height={"6px"}
                                name="MoveDropDownValue"
                                id="MoveDropDownValue"
                                respclass="width100px"
                                placeholderName="MoveDropDownValue"
                                dynamicOptions={updateProject}
                                value={ele?.MoveDropDownValue}
                                handleChange={(name, value) => {
                                  const ind =
                                    (currentPage - 1) * rowsPerPage + index;
                                  handleAgainChange(name, value, ind);
                                }}
                              />
                            </>
                          )}

                          {ele?.TableStatus == "Close" && (
                            <>
                              <input
                                type="text"
                                className="form-control"
                                id="RefereRCA"
                                name="RefereRCA"
                                lable="Refere RCA"
                                value={ele?.RefereRCA}
                                placeholder="Enter Refere RCA"
                                // respclass="col-md-4 col-12 col-sm-12"
                                style={{ width: "50%" }}
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                className="form-control"
                                id="RefereCode"
                                name="RefereCode"
                                lable="Refere Code"
                                value={ele?.RefereCode}
                                placeholder="Enter Refere Code"
                                // respclass="col-md-4 col-12 col-sm-12"
                                style={{ width: "50%" }}
                                onChange={handleChange}
                              />
                              {/* <div className="col-2"> */}
                              <button
                                className="btn btn-sm btn-success"
                                style={{
                                  marginRight: "1px",
                                  marginLeft: "1px",
                                }}
                                onClick={() => handleResolveElement(ele)}
                              >
                                Close
                              </button>
                              {/* </div> */}
                            </>
                          )}
                          {ele?.TableStatus == "Resolve" && (
                            <>
                              <input
                                type="text"
                                className="form-control"
                                id="RefereRCA"
                                name="RefereRCA"
                                lable="Refere RCA"
                                value={ele?.RefereRCA}
                                placeholder="Enter Refere RCA"
                                // respclass="col-md-4 col-12 col-sm-12"
                                style={{ width: "50%" }}
                                onChange={handleChange}
                              />
                              <input
                                type="text"
                                className="form-control ml-1"
                                id="RefereCode"
                                name="RefereCode"
                                lable="Refere Code"
                                value={ele?.RefereCode}
                                placeholder="Enter Refere Code"
                                // respclass="col-md-4 col-12 col-sm-12"
                                style={{ width: "50%" }}
                                onChange={handleChange}
                              />

                              <button
                                className="btn btn-sm btn-success"
                                style={{
                                  marginRight: "1px",
                                  marginLeft: "1px",
                                }}
                                onClick={() => handleResolveElement(ele)}
                              >
                                Resolve
                              </button>
                            </>
                          )}

                          {ele?.TableStatus == "Assign" && (
                            <>
                              <ReactSelect
                                style={{ width: "100%", marginLeft: "3px" }}
                                height={"6px"}
                                name="AssignDropDownValue"
                                respclass="width100px"
                                id="AssignDropDownValue"
                                placeholderName="AssignDropDownValue"
                                dynamicOptions={assigntoValue}
                                value={ele?.AssignDropDownValue}
                                handleChange={(name, value) => {
                                  const ind =
                                    (currentPage - 1) * rowsPerPage + index;
                                  handleAgainChange(name, value, ind);
                                }}
                              />
                            </>
                          )}
                          {ele?.TableStatus == "UpdateStatus" && (
                            <>
                              <ReactSelect
                                style={{ width: "100%", marginLeft: "3px" }}
                                height={"6px"}
                                name="UpdateStatusValue"
                                respclass="width100px"
                                id="UpdateStatusValue"
                                placeholderName="UpdateStatusValue"
                                dynamicOptions={status}
                                value={ele?.UpdateStatusValue}
                                handleChange={(name, value) => {
                                  const ind =
                                    (currentPage - 1) * rowsPerPage + index;
                                  handleAgainChange(name, value, ind);
                                }}
                              />
                            </>
                          )}
                          {ele?.TableStatus == "UpdateCategory" && (
                            <>
                              <ReactSelect
                                style={{ width: "100%", marginLeft: "3px" }}
                                height={"6px"}
                                name="UpdateCategoryValue"
                                respclass="width100px"
                                id="UpdateCategoryValue"
                                placeholderName="UpdateCategoryValue"
                                dynamicOptions={updatecategory}
                                value={ele?.UpdateCategoryValue}
                                handleChange={(name, value) => {
                                  const ind =
                                    (currentPage - 1) * rowsPerPage + index;
                                  handleAgainChange(name, value, ind);
                                }}
                              />
                            </>
                          )}

                          {ele?.TableStatus == "UpdateDeliveryDate" && (
                            <>
                              <DatePicker
                                placeholder={VITE_DATE_FORMAT}
                                className="custom-calendar"
                                id="UpdatedeliverydateValue"
                                name="UpdatedeliverydateValue"
                                // lable={"Before"}
                                // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                                value={ele?.UpdatedeliverydateValue}
                                handleChange={(name, value) => {
                                  const ind =
                                    (currentPage - 1) * rowsPerPage + index;
                                  handleAgainChange(name, value, ind);
                                }}
                              />
                            </>
                          )}
                        </div>
                        {/* <div style={{ width: "10%", marginRight: "5px" }}>
                          <button
                            disabled={
                              ele?.IsActive == "0" || !ele?.IsActive
                                ? true
                                : false
                            }
                          >
                            Ok
                          </button>
                        </div> */}
                      </div>
                    ),
                    colorcode: ele?.rowColor,
                  }))}
                  tableHeight={"tableHeight"}
                />
              </div>
              <div className="row m-2 d-flex justify-content-between">
                <div className="d-flex">
                  <div style={{ display: "flex" }}>
                    <Input
                      type="checkbox"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    <span style={{ marginRight: "7px", marginLeft: "7px" }}>
                      Select All
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginRight: "3px",
                    }}
                  >
                    <div className="d-flex">
                      <ReactSelect
                        style={{ width: "100%" }}
                        height={"6px"}
                        name="TableStatus"
                        id="TableStatus"
                        respclass="width100px"
                        placeholderName="ChangeAction"
                        dynamicOptions={[
                          { label: "Move", value: "Move" },
                          { label: "Assign", value: "Assign" },
                          { label: "Close", value: "Close" },
                          { label: "Resolve", value: "Resolve" },
                          { label: "UpdateStatus", value: "UpdateStatus" },
                          {
                            label: "UpdateCategory",
                            value: "UpdateCategory",
                          },
                          {
                            label: "UpdateDeliveryDate",
                            value: "UpdateDeliveryDate",
                          },
                        ]}
                        value={formData?.TableStatus}
                        handleChange={(name, value) =>
                          handleDeliveryChangeValueStatus(name, value)
                        }
                      />
                      {formData?.TableStatus?.value == "Move" && (
                        <>
                          <ReactSelect
                            style={{ width: "100%", marginLeft: "5px" }}
                            height={"6px"}
                            name="MoveStatus"
                            respclass="width100px"
                            id="MoveStatus"
                            placeholderName="MoveStatus"
                            dynamicOptions={updateProject}
                            value={formData?.MoveStatus}
                            handleChange={(name, value) =>
                              handleDeliveryChangeValueStatus(name, value)
                            }
                          />
                        </>
                      )}
                      {formData?.TableStatus?.value == "Resolve" && (
                        <>
                          <Input
                            type="text"
                            className="form-control"
                            id="RefereRCA"
                            name="RefereRCA"
                            // lable="Refere RCA"
                            value={formData?.RefereRCA}
                            placeholder="Enter Refere RCA"
                            // respclass="col-md-4 col-12 col-sm-12"
                            style={{ width: "100%", marginLeft: "5px" }}
                            onChange={handleChange}
                          />
                          <Input
                            type="text"
                            className="form-control"
                            id="RefereCode"
                            name="RefereCode"
                            // lable="Refere Code"
                            value={formData?.RefereCode}
                            placeholder="Enter Refere Code"
                            // respclass="col-md-4 col-12 col-sm-12"
                            style={{ width: "100%", marginLeft: "5px" }}
                            onChange={handleChange}
                          />
                          <button
                            className="btn btn-sm btn-info ml-3"
                            onClick={handleResolve}
                          >
                            Resolve
                          </button>
                        </>
                      )}
                      {formData?.TableStatus?.value == "Close" && (
                        <>
                          <Input
                            type="text"
                            className="form-control"
                            id="RefereRCA"
                            name="RefereRCA"
                            // lable="Refere RCA"
                            value={formData?.RefereRCA}
                            placeholder="Enter Refere RCA"
                            // respclass="col-md-4 col-12 col-sm-12"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                          />
                          <Input
                            type="text"
                            className="form-control"
                            id="RefereCode"
                            name="RefereCode"
                            // lable="Refere Code"
                            value={formData?.RefereCode}
                            placeholder="Enter Refere Code"
                            // respclass="col-md-4 col-12 col-sm-12"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                          />
                          <button
                            className="btn btn-sm btn-info ml-3"
                            onClick={handleResolve}
                          >
                            Close
                          </button>
                        </>
                      )}
                      {formData?.TableStatus?.value == "Assign" && (
                        <>
                          <ReactSelect
                            style={{ width: "100%", marginLeft: "5px" }}
                            height={"6px"}
                            name="AssignedToStatus"
                            respclass="width100px"
                            id="AssignedToStatus"
                            placeholderName="AssignedToStatus"
                            dynamicOptions={assigntoValue}
                            value={formData?.AssignedToStatus}
                            handleChange={(name, value) =>
                              handleDeliveryChangeValueStatus(name, value)
                            }
                          />
                        </>
                      )}
                      {formData?.TableStatus?.value == "UpdateStatus" && (
                        <>
                          <ReactSelect
                            style={{ width: "100%", marginLeft: "3px" }}
                            height={"6px"}
                            name="UpdateToStatus"
                            respclass="width100px"
                            id="UpdateToStatus"
                            placeholderName="UpdateToStatus"
                            dynamicOptions={status}
                            value={formData?.UpdateToStatus}
                            handleChange={(name, value) =>
                              handleDeliveryChangeValueStatus(name, value)
                            }
                          />
                        </>
                      )}
                      {formData?.TableStatus?.value == "UpdateCategory" && (
                        <>
                          <ReactSelect
                            style={{ width: "100%", marginLeft: "3px" }}
                            height={"6px"}
                            name="UpdateToCategory"
                            respclass="width100px"
                            id="UpdateToCategory"
                            placeholderName="UpdateToCategory"
                            dynamicOptions={updatecategory}
                            value={formData?.UpdateToCategory}
                            handleChange={(name, value) =>
                              handleDeliveryChangeValueStatus(name, value)
                            }
                          />
                        </>
                      )}
                      {formData?.TableStatus?.value == "UpdateDeliveryDate" && (
                        <>
                          <DatePicker
                            placeholder={VITE_DATE_FORMAT}
                            className="custom-calendar"
                            id="DeliveryToStatus"
                            name="DeliveryToStatus"
                            // lable={"Before"}
                            // respclass="col-xl-2.5 col-md-3 col-sm-6 col-12"
                            value={formData?.DeliveryToStatus}
                            handleChange={(name, value) =>
                              handleDeliveryChangeValueStatus(name, value)
                            }
                          />
                        </>
                      )}
                    </div>
                    {/* <div style={{ width: "10%", marginRight: "5px" }}>
                          <button
                            disabled={
                              ele?.IsActive == "0" || !ele?.IsActive
                                ? true
                                : false
                            }
                          >
                            Ok
                          </button>
                        </div> */}
                  </div>
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={handleDelete}
                  >
                    Delete Ticket
                  </button>
                </div>

                <div
                  className="pagination"
                  style={{ float: "right", marginTop: "0px" }}
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
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewIssues;
