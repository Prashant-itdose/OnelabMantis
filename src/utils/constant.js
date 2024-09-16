import moment from "moment";
export const PATIENT_DETAILS = {
  patientID: "",
  oldPatientID: "",
  Barcode: "",
  Title: "",
  PFirstName: "",
  PLastName: "",
  PName: "",
  Gender: "",
  DOB: "",
  Age: "",
  Type: "YRS",
  Relation: "",
  InternationalCountryID: 0,
  HospPatientType:"0",
  Mobile: "",
  Phone: "",
  Email: "",
  MaritalStatus: "",
  parmanentAddress: "",
  Country: "",
  CountryID: "",
  State: "",
  StateID: "",
  District: "",
  districtID: "",
  City: "",
  cityID: "",
  Policy_No: "",
  PanelGroup: "",
};

export const AGE_TYPE = [
  {
    label: "YRS",
    value: "YRS",
  },
  {
    label: "MONTH(S)",
    value: "MONTH(S)",
  },
  {
    label: "DAYS(S)",
    value: "DAYS(S)",
  },
];

export const BIND_TABLE_OLDPATIENTSEARCH = [
  {
    field: "MRNo",
    title: "UHID",
  },
  {
    field: "PatientName",
    title: "Patient Name",
  },
  {
    field: "ContactNo",
    title: "Contact No.",
  },
  {
    field: "AgeGender",
    title: "Age/Gender",
  },
  // {
  //   field: "",
  //   title: "Gender",
  // },
  // {
  //   field: "DATE",
  //   title: "Date",
  // },
  {
    field: "House_No",
    title: "Address",
  },
];
export const BIND_TABLE_OLDPATIENTSEARCH_REG = [
  {
    field: "MRNo",
    title: "UHID",
  },
  {
    field: "PatientName",
    title: "Patient Name",
  },
  {
    field: "ContactNo",
    title: "Contact No.",
  },
  {
    field: "AgeGender",
    title: "Age/Gender",
  },
  // {
  //   field: "",
  //   title: "Gender",
  // },
  // {
  //   field: "DATE",
  //   title: "Date",
  // },
  {
    field: "House_No",
    title: "Address",
  },
  // {
  //   field: "Title",
  //   title: "Title",
  // },
  // {
  //   field: "PFirstName",
  //   title: "First Name",
  // },
  // {
  //   field: "PLastName",
  //   title: "Last Name",
  // },
  // {
  //   field: "MRNo",
  //   title: "UHID",
  // },
  // {
  //   field: "Age",
  //   title: "Age",
  // },
  // {
  //   field: "Gender",
  //   title: "Gender",
  // },
  // {
  //   field: "DATE",
  //   title: "Date",
  // },
  // {
  //   field: "Address",
  //   title: "Address",
  // },
  // {
  //   field: "ContactNo",
  //   title: "Contact No.",
  // },
];

export const OPDServiceTableData = [
  {
    "S.no": 1,
    Type: "123",
    code: "Asdas",
    value: 0,
    "Item Name": 0,
    Doctor: 1,
    Remarks: 1,
    Rate: 100,
    Qty: 1,
    "Dis(%)": 2,
    "Dis. Amt.": 2,
    Amount: 3,
    u: 3,
    Action: 1,
  },
];

export const THEAD = [
  "Slot",
  "Type",
  "Code",
  " ",
  "Item Name",
  "Last Token",
  "Doctor",
  "Tax Type",
  "Tax (%)",
  "Rate",
  "Qty",
  "Dis(%)",
  "Dis. Amt.",
  "Amount",
  "Tax Amount",
  "Pat.Payable",
  "u",
  "Action",
];

export const ROUNDOFF_VALUE = 2;

export const OBJECT_PAYMENTMODE = {
  Amount: "",
  BaseCurrency: "",
  BankName: "",
  C_Factor: "",
  PaymentMode: "",
  PaymentModeID: "",
  PaymentRemarks: "",
  RefNo: "",
  S_Amount: "",
  S_CountryID: "",
  S_Currency: "",
  S_Notation: "",
  swipeMachine: "",
};

export const PAYMENT_OBJECT = {
  panelID: 1,
  billAmount: 0.0,
  discountAmount: 0.0,
  isReceipt: true,
  patientAdvanceAmount: 0.0,
  autoPaymentMode: 0,
  minimumPayableAmount: null,
  panelAdvanceAmount: 0.0,
  disableDiscount: false,
  refund: false,
  constantMinimumPayableAmount: null,
  coPayPercent: 0.0,
  coPayAmount: 0.0,
};

export const SEARCH_BY_TEST = [
  {
    label: "Name",
    value: 1,
  },
  {
    label: "Code",
    value: 2,
  },
];

export const Reason_list = {
  Reason: "",
  Type: { label: "Advance", value: 1 },
  amount: null,
};

export const Type_list = [
  {
    label: "Refund",
    value: 2,
  },
  {
    label: "Advance",
    value: 1,
  },
];
// Expense Voucher

export const SAVE_EXPENSE = {
  amountPaid: "",
  amtCash: "",
  expenceTypeId: "",
  expenceType: "",
  expenceToId: "",
  expenceTo: "",
  roleID: "",
  employeeID: "",
  naration: "",
  approvedBy: "",
  receivedAgainstReceiptNo: "",
  employeeName: "",
  employeeType: "",
  paymentType: 1,
};

export const OPD_SETTLEMENT_DETAILS = {
  mrNo: "",
  billNo: "",
  centreId: {},
  panelID: {},
  fromDate: moment().format("DD-MMM-YYYY"),
  toDate: moment().format("DD-MMM-YYYY"),
};

export const number = (e, sliceValue, valueGreater) => {
  if (handleCheckDot(e)) {
    return (e.target.value = e.target.value.replace(".", ""));
  } else {
    if (valueGreater) {
      return e.target.value > valueGreater
        ? (e.target.value = e.target.value.slice(0, e.target.value.length - 1))
        : (e.target.value = e.target.value.slice(0, sliceValue));
    } else {
      return (e.target.value = e.target.value.slice(0, sliceValue));
    }
  }
};

const handleCheckDot = (e) => {
  const data = [...e.target.value];
  return data.includes(".");
};

export const DIRECT_PATIENT_SEARCH_TYPE = {
  Barcode: 1,
  Mobile: 2,
  PFirstName: 3,
};

export const OPDCONFIRMATIONSTATE = {
  doctorID: "",
  fromDate: moment().format("YYYY-MM-DD"),
  toDate: moment().format("YYYY-MM-DD"),
  appointmentNo: "",
  isConform: "",
  visitType: "",
  status: "",
  doctorDepartmentID: "",
  pname: "",
};

const rblCon = "1";

export const RECEIPT_REPRINT_PAYLOAD = {
  fromDate: moment().format("DD-MMM-YYYY"),
  toDate: moment().format("DD-MMM-YYYY"),
  receiptNo: "",
  billNo: "",
  patientName: "",
  patientID: "",
  rblCon: "1",
  PrintType: rblCon === "1" ? "1" : rblCon === "0" ? "0" : "1",
};

export const RADIOLOGYCONFIRMATIONSTATE = {
  fromDate: moment().format("YYYY-MM-DD"),
  toDate: moment().format("YYYY-MM-DD"),
  uhid: "",
  pName: "",
  mobile: "",
  subCategoryID: "",
  labNo: "",
  tokenNo: "",
  isConform: "",
  status: "",
};

// end

// Token Management

export const Save_Modality = {
  subcategoryid: "0",
  modalityName: "",
  floor: "",
  floorid: "",
  roomno: "",
  modalityID: "",
  active: "",
  btnvalue: "Save",
  centreID: 1,
};

// Token Management / Reciept Token Master

export const Reciept_Token_Master = {
  centre: "",
  category: "",
  resetTime: "",
  groupName: "",
  tokenPrefix: "",
  mainCategoryName: "",
  subcatid: "",
};

export const MOBILE_NUMBER_VALIDATION_REGX = /^\d{0,10}$/;
export const PINCODE_VALIDATION_REGX = /^\d{0,6}$/;
export const AADHARCARD_VALIDATION_REGX = /^\d{0,12}$/;
export const PANCARD_VALIDATION_REGX = /^[a-zA-Z0-9]{0,10}$/;
export const GST_VALIDATION_REGX = /^[a-zA-Z0-9]{0,15}$/;
// export const GSTPERCENT_VALIDATION_REGX = /^\d{0,2}$/;


export const NUMBER_VALIDATION_REGX = /^\d+$/;
// export const AMOUNT_REGX=new RegExp(`^\\d{0,6}(\\.\\d{0,${decimalPlaces}})?$`);

export const AMOUNT_REGX = (validDigit) => {
  const patern = new RegExp(
    `^\\d{0,${validDigit}}(\\.\\d{0,${ROUNDOFF_VALUE}})?$`
  );
  return patern;
};

export const SEARCHBY = [
  {
    label: "Bill",
    value: "1",
  },
  {
    label: "Receipt",
    value: "0",
  },
];
export const BillPRINTTYPE = [
  {
    label: "Bill",
    value: "1",
  },
  {
    label: "OPD Card",
    value: "0",
  },
];
export const ReceiptPRINTTYPE = [
  {
    label: "Receipt",
    value: "1",
  },
  {
    label: "OPD Card",
    value: "0",
  },
];

export const TYPECREDITDEBITLIST = [
  {
    label: "Credit Note on Rate",
    value: 1,
  },
  {
    label: "Credit Note on Discount",
    value: 2,
  },
  {
    label: "Debit Note on Rate",
    value: 3,
  },
  {
    label: "Debit Note on Discount",
    value: 4,
  },
];

export const DOCTOR_TIMING_COLOR = {
  0: "#8a847c", //expired
  1: "#07812b", //available,
  3: "blue", //seen
  4: "#d377c4", //waiting
  5: "purple", //Triage
  6: "#11c8df", //confirm
  7: "#da7f17", //total
  8: "red", //notaAvailable
  9: "#96a708", // booked
  10: "#df667b", // unconfirmed
  11: "#953403", // recheduled
};

// export const DOCTOR_TIMING_COLOR_TEXT_COLOR = {
//   0: "#ffffff", //expired
//   1: "#07812b", //available,
//   3: "blue", //seen
//   4: "#d377c4", //waiting
//   5: "purple", //Triage
//   6: "#11c8df", //confirm
//   7: "#da7f17", //total
//   8: "red", //notaAvailable
//   9: "#96a708", // booked
//   10: "#df667b", // unconfirmed
//   11: "#953403", // recheduled
// };



export const VIEWSTATUS = [
  { value: "0", label: "Pending" },
  { value: "1", label: "Closed" },
  { value: "2", label: "All" },
];


// Reports

export const Revenue_Analysis_Report = {
  centre: "",
  category:"",
  subCategory:"",
  item:"",
  doctor:"",
  panel:"",
  dateFilterType:"",
  patientType:"",
  reportType:"",
  subType:"",
  UHID:"",
  printType:"",
  fromDate: moment().format("YYYY-MM-DD"),
  toDate: moment().format("YYYY-MM-DD"),
};


export const Registration_Report = {
  centre: "",
  country: "",
  state: "",
  district: "",
  city: "",
  printType: "",
  fromDate: moment().format("YYYY-MM-DD"),
  toDate: moment().format("YYYY-MM-DD"),
};


export const  print_Type = [
  {
    name:"PDF",
    ID:"1"
  },
  {
    name:"Excel",
    ID:"2"
  },
  {
    name:"Word",
    ID:"3"
  },
]