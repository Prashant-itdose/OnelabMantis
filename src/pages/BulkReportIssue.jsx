import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../components/UI/Heading";
import Input from "../components/formComponent/Input";
import { FaTrash } from 'react-icons/fa'
import { useFormik } from "formik";
import {
  MOBILE_NUMBER_VALIDATION_REGX,
  RECEIPT_REPRINT_PAYLOAD,
  SEARCHBY,
} from "../utils/constant";
import { ReceiptDetailnew } from "../networkServices/opdserviceAPI";
import moment from "moment";
import ReactSelect from "../components/formComponent/ReactSelect";
import TextEditor from "../components/formComponent/TextEditor";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import axios from "axios";
import { headers } from "../utils/apitools";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NewTicketModal from "../components/UI/customTable/NetTicketModal";
import Modal from "../components/modalComponent/Modal";
import * as XLSX from 'xlsx';
import { inputBoxValidation } from "../utils/utils";
import BrowseButton from "../components/formComponent/BrowseButton";
import Tables from "../components/UI/customTable";
import TableSelect from "../components/formComponent/TableSelect";

const BulkReportIssue = () => {
  const [errors, setErros] = useState({});
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [ticketid, setticketid] = useState("");
  const [formData, setFormData] = useState({
    ProjectID: "",
    Category: "",
    AssignedTo: "",
    Priority: "",
    ReportedName: "",
    ReportedMobile: "",
    Description: "",
    Summary: "",
  });
  const [tableData,setTableData]=useState([])
  const [project, setProject] = useState([]);
  const [category, setCategory] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const [priority, setPriority] = useState([]);

  const [rowHandler, setRowHandler] = useState({
    SummaryShow: false,
    DateSubmittedShow: false,
    TextEditorShow: false,
  });

  const handleDeliveryButton2 = () => {
    setRowHandler({
      ...rowHandler,
      TextEditorShow: !rowHandler?.TextEditorShow,
    });
  };
  const handleSummaryShow = () => {
    setRowHandler({ ...rowHandler, SummaryShow: !rowHandler?.SummaryShow });
  };

  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 

  const getProject = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
          "/CRMAPI/API/MasterBind/Project_Select",
          form,
          { headers }
        )
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.Project, value: item?.ProjectId };
          });
          getCategory(poc3s[0]?.value);
          setProject(poc3s);
          // if (poc3s.length == 1)
          setFormData({ ...formData, ProjectID: poc3s[0]?.value });
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function removeHtmlTags(text) {
    return text?.replace(/<[^>]*>?/gm, "");
  }

  const getCategory = (proj) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("ProjectID", proj),
      axios
        .post(
          "/CRMAPI/API/MasterBind/Category_Select",
          form,
          { headers }
        )
        .then((res) => {
          const poc3s = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setCategory(poc3s);
          setFormData({ ...formData, Category: poc3s[0]?.value,ProjectID:proj });
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
          "/CRMAPI/API/MasterBind/AssignTo_Select",
          form,
          { headers }
        )
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setAssignedto(assigntos);
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
          "/CRMAPI/API/MasterBind/Priority_Select",
          form,
          { headers }
        )
        .then((res) => {
          const assigntos = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setPriority(assigntos);
          setFormData({ ...formData, Priority: assigntos[0]?.value });
        })
        .catch((err) => {
          console.log(err);
        });
  };

  
  const transformData = (data) => {
    const headers = data[0]; // First array is the header
    const rows = data.slice(1); // Remaining arrays are the data rows

    return rows.map(row => {
        let obj = {};
        row.forEach((value, index) => {
            obj[headers[index]] = value;
        });
        return obj;
    });
};






  


  const getReportNote = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Assuming the first sheet is the one you want
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
  
      // Convert the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
         const mappedData = transformData(jsonData).map((ele, index) => {
            const categoryOption = category.find(option => option.label === ele?.Category);
            const assignToOption = assignto.find(option => option.label === ele?.AssignTo);
            const priorityOption = priority.find(option => option.label === ele?.Priority);
          
            return {
              "S.No.": index + 1,
              "Category": {
                value: categoryOption ? categoryOption.value : null, // Use the ID if found, otherwise null
                label: ele?.Category,
                isValid: !!categoryOption // true if categoryOption exists, otherwise false
              },
              "AssignTo": {
                value: assignToOption ? assignToOption.value : null, // Use the ID if found, otherwise null
                label: ele?.AssignTo,
                isValid: !!assignToOption // true if assignToOption exists, otherwise false
              },
              "Email":ele?.Email,
              "Priority": {
                value: priorityOption ? priorityOption.value : null, // Use the ID if found, otherwise null
                label: ele?.Priority,
                isValid: !!priorityOption // true if priorityOption exists, otherwise false
              },
              "Summary": ele?.Summary,
              "ReportedByName": ele?.ReportedByName,
              "ReportedByMobile": ele?.ReportedByMobile,
              "ValidMobile":isValidMobile(ele?.ReportedByMobile),
              "ValidReporter":ele?.ReportedByName?.length>0?true:false,
              'ValidSummary':ele?.Summary?.length>0?true:false
            };
          });
           
       setTableData(mappedData);
       event.target.value = null;
    };
  
    reader.readAsArrayBuffer(file);
  };
  

  

const fetchemptyexcel = () => {
  // Define the columns for your Excel sheet
  const data = [
    ['Category', 'AssignTo', 'Priority', 'Summary', 'ReportedByName','ReportedByMobile','Email'],
  ];

  // Create a worksheet from the data
  const worksheet = XLSX.utils.aoa_to_sheet(data);

  // Create a new workbook and add the worksheet to it
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

  // Convert the workbook to a binary Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  // Create a Blob from the binary Excel file
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // Create a download link and trigger the download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Template.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  useEffect(() => {
    getProject();
    getAssignTo();
    getPriority();
  }, []);


  const ValidationForm = (formData) => {
    let err = "";
    if (formData?.ReportedName === "") {
      err = { ...err, ReportedName: "Please Enter ReportedName." };
    }
  
    if (
      formData?.ReportedMobile?.length >= 0 &&
      formData?.ReportedMobile.length < 10
    ) {
      err = {
        ...err,
        ReportedMobile: "Mobile No. Must be of 10 Digit",
      };
    }
    // if (payload?.Address === "") {
    //   err = { ...err, Address: "This Field is Required" };
    // }
    // if (payload?.AutoReceive === "") {
    //   err = { ...err, AutoReceive: "This Field is Required" };
    // }
    // if (payload?.ContactPersonEmail.trim() === "") {
    //   err = { ...err, ContactPersonEmail: "This Field is Required" };
    // }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(payload?.ContactPersonEmail)) {
    //   err = { ...err, Emailvalid: "Enter a valid email address" };
    // }
    return err;
  };
  const handleInputChange = (index, field, selectedOption) => {
    const newData = [...tableData];

    // Update the value and validation status
    newData[index][field].value = selectedOption ? selectedOption.value : null;
    newData[index][field].isValid = selectedOption ? true : false;

    setTableData(newData);
};
const handleChange=(index,name,value)=>{

    const newData = [...tableData];
    newData[index][name]=value
    setTableData(newData)

}

const handleSave=()=>{
    function transformPayload(originalPayload, projectId) {
        return originalPayload.map(item => ({
          CategoryId: item.Category.value,
            AssignTo: item.AssignTo.value,
            PriorityID: item.Priority.value,
            Summary: item.Summary,
            ReporterName: item.ReportedByName,
            ReporterMobile: String(item.ReportedByMobile),  
            Description: "" 
        }));
    }
const valid=validateIssues(tableData);
if(valid==true)
{    

    console.log(tableData);
    const form = new FormData()
    form.append('ID',localStorage?.getItem('ID'))
    form.append('ProjectID',formData?.ProjectID)
    form.append('TicketData',JSON.stringify(transformPayload(tableData)))
    
   axios
   .post(
     "/CRMAPI/API/BugReport/BulkNewTicket",
     form,
     { headers }
   )
   .then((res) => {
    if(res?.data?.status==true)
    {    
        toast.success(res?.data?.message)
        setTableData([])
    }
     
   })
   .catch((err) => {
     console.log(err);
   });
  

}
else {
    console.log(valid)
    setTableData(valid)
}
    
}


  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });
  const handleDeleteRow = (index) => {
    // Create a new array by filtering out the row at the specified index
    const newData = tableData.filter((_, i) => i !== index);
  
    // Update the state with the new data
    setTableData(newData);
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
  function validateIssues(issues) {
    let allValid = true;
  
    const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
  
    const validatedIssues = issues.map(issue => {
      const isValidCategory = issue.Category?.value !== null && issue.Category?.value !== undefined;
      const isValidAssignTo = issue.AssignTo?.value !== null && issue.AssignTo?.value !== undefined;
      const isValidPriority = issue.Priority?.value !== null && issue.Priority?.value !== undefined;
      const isValidMobileNumber = isValidMobile(issue.ReportedByMobile);
      const isValidreporter=issue?.ReportedByName?.length>0?true:false
  
      const isRowValid = isValidCategory && isValidAssignTo && isValidPriority && isValidMobileNumber&&isValidreporter;
  
      if (!isRowValid) {
        allValid = false;
      }
  
      return {
        ...issue,
        Category: { ...issue.Category, isValid: isValidCategory },
        AssignTo: { ...issue.AssignTo, isValid: isValidAssignTo },
        Priority: { ...issue.Priority, isValid: isValidPriority },
        ReportedByMobile: issue.ReportedByMobile,
        ValidMobile:isValidMobileNumber ?true:false,
        ValidReporter:isValidreporter?true:false,
        ValidSummary:issue?.Summary?.length>0?true:false
      };
    });
  
    return allValid ? true : validatedIssues;
  }
  
  
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header="Preview NewTicket Details"
        >
          <NewTicketModal
            visible={visible}
            id={ticketid}
            setVisible={setVisible}
          />
        </Modal>
      )}
      <div className="card patient_registration border">
        <Heading title={t("Report Issue")} isBreadcrumb={true} />
        <div className="row g-4 m-2">
          <ReactSelect
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="ProjectID"
            placeholderName="Project"
            dynamicOptions={project}
            value={formData?.ProjectID}
            handleChange={handleDeliveryChange}
            isDisabled={tableData.length>0}
          />
          <div className=" d-flex col-2">
            <button className="btn btn-sm btn-success mr-2" onClick={fetchemptyexcel}>
              Template Download
            </button>
            <div>
            <BrowseButton handleImageChange={getReportNote} accept="xls/*" />
            </div>
            
            {/* <button className="btn btn-sm btn-success ml-2"  onClick={() => {
                          setVisible({ showVisible: true,  });
                        }} >
              Preview
            </button> */}
          </div>
          
        </div>
        </div>
        <div className="card">
        {tableData.length>0 && 
        <>
        <Heading title="BulkTicket Details"/>
        
      
      <div >
      <Tables 
  thead={["S.No.", "Category", "AssignTo", "Priority", "Summary", "ReportedByName", "ReportedByMobile", "Action"]}
  tbody={tableData?.map((ele, index) => ({
    "S.No.": index + 1,
    "Category": (
      <TableSelect
        dynamicOptions={category}
        name="Category"
        value={ele.Category.value}
        respclass={ele.Category.isValid ? "" : "border-red"}
        handleChange={(name, selectedOption) => handleInputChange(index, name, selectedOption)}
      />
    ),
    "AssignTo": (
      <TableSelect
        dynamicOptions={assignto}
        name="AssignTo"
        placeholder=""
        respclass={ele.AssignTo.isValid ? "" : "border-red"}
        value={ele.AssignTo.value} 
        handleChange={(name, selectedOption) => handleInputChange(index, name, selectedOption)}
      />
    ),
    "Priority": (
      <TableSelect
        dynamicOptions={priority}
        placeholder=""
        respclass={ele.Priority.isValid ? "" : "border-red"}
        name="Priority"
        value={ele.Priority.value} 
        handleChange={(name, selectedOption) => handleInputChange(index, name, selectedOption)}
      />
    ),
    "Summary": (
      <Input
        type="text" 
        className={`form-control ${!ele?.ValidSummary ?'border-red' : ''}`}
        value={ele.Summary} 
        onChange={(e) => handleChange(index, 'Summary', e.target.value)} 
      />
    ),
    "ReportedByName": (
      <Input
        type="text" 
        
        value={ele.ReportedByName} 
        name="ReportedByName"
        className={`form-control ${!ele?.ValidReporter ?'border-red' : ''}`}
        onChange={(e) => handleChange(index, 'ReportedByName', e.target.value)} 
      />
    ),
    "ReportedByMobile": (
      <Input
        type="text" 
        name="ReportedByMobile"
        className={`form-control ${!ele?.ValidMobile ?'border-red' : ''}`}
        value={ele.ReportedByMobile} 

        onChange={(e) => handleChange(index, 'ReportedByMobile', e.target.value)} 
      />
    ),
    "Action": (
      <div style={{ width: '10px', textAlign: 'center' }}>
        <i
          className="fa fa-trash text-danger"
          aria-hidden="true"
          onClick={() => handleDeleteRow(index)}
        />
      </div>
    )
  }))}
 />
 <div className="pagination ml-auto mb-1">
          
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
         
          <button style={{float:"right",marginLeft:'auto'}}  className="btn btn-sm btn-success mb-2" onClick={handleSave}>
      Submit Issues
    </button>
        </div>
      </div>

        </>}
      </div>
    </>
  );
};

export default BulkReportIssue;
