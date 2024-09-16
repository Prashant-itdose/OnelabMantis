import React, { useEffect, useState } from "react";
import LabeledInput from "../../../../formComponent/LabeledInput";
import Table from "react-bootstrap/Table";

const AppointmentPatientDetail = ({ setActive, bodyData, selectedPatient }) => {
  const [inputValue, setInputValue] = useState({});
  const [newPrescription, setNewPrescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [patientDetail, setPatientDetail] = useState({
    selectedPatient: selectedPatient,
  });
  const [tags, setTags] = useState({
    ChiefComplaint: [],
    PastHistory: [],
    TreatmentHistory: [],
    Allergies: [],
    PersonalHistory: [],
    GeneralExamination: [],
    SystematicExamination: [],
    ProvisionalDiagnosis: [],
    DoctorAdvice: [],
    Inestigation: [],
    Diet: [],
    NextVisit: [],
    TransferReferral: [],
    PrescribedMedicine: [],
  });

  const DoctorPrescription = [
    {
      item: "Chief Complaint",
    },
    {
      item: "Past History",
    },
    {
      item: "Treatment  History",
    },
    {
      item: "Allergies",
    },
    {
      item: "Personal History / Occupational History",
    },
    {
      item: "General Examination",
    },
    {
      item: "Systematic Examination",
    },
    {
      item: "Provisional Diagnosis",
    },
    {
      item: "Doctor Advice",
    },
    {
      item: "Inestigation(Lab & Radio)",
    },
    {
      item: "Prescribed Medicine",
    },
    {
      item: "Diet",
    },
    {
      item: "Next Visit(with calender)",
    },
    {
      item: "Transfer/Referral For Consultation",
    },
    {
      item: "Header For Print",
    },
  ];

  const removeTableData = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };

  const handleInputChange = (e) => {
    setNewPrescription(e.target.value);
  };

  const handleKeyPressTable = (e) => {
    if (e.key === "Enter" && newPrescription.trim()) {
      setTableData([...tableData, newPrescription]);
      setNewPrescription("");
    }
  };

  useEffect(() => {
    let index = bodyData?.findIndex(
      (item) => item?.UHID === selectedPatient?.UHID
    );
    setPatientDetail((val) => ({ ...val, index: index }));
  }, []);

  const reverseTableData = () => {
    if (patientDetail?.index > 0) {
      setPatientDetail((val) => ({
        ...val,
        selectedPatient: bodyData[patientDetail?.index - 1],
        index: patientDetail?.index - 1,
      }));
    }
  };

  const forwardTableData = () => {
    if (patientDetail?.index < bodyData.length - 1) {
      setPatientDetail((val) => ({
        ...val,
        selectedPatient: bodyData[patientDetail?.index + 1],
        index: patientDetail?.index + 1,
      }));
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValue((val) => ({ ...val, [name]: value }));
  };

  const handleKeyPress = (e, category) => {
    if (e.key === "Enter" && inputValue[category]) {
      setTags((prevTags) => ({
        ...prevTags,
        [category]: [...prevTags[category], inputValue[category]],
      }));
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        [category]: "",
      }));
    }
  };

  const removeTag = (category, indexToRemove) => {
    setTags((prevTags) => ({
      ...prevTags,
      [category]: prevTags[category].filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const DoctorDetails = [
    { label: "Doctor Name", value: "Dr. Neha", color: "#da7f17" },
    { label: "Booked", value: "1", color: "#5e99c9" },
    { label: "Confirmed", value: "15", color: "orange" },
    { label: "Seen", value: "22", color: "#d377c4" },
    { label: "Triage", value: "12", color: "#5e99c9" },
    { label: "Waiting", value: "13", color: "#58b674" },
    { label: "Available Slot", value: "90", color: "#5e99c9" },
    { label: "Expired", value: "0", color: "#5e99c9" },
    { label: "Triage", value: "78", color: "#5e99c9" },
    { label: "Triage", value: "56", color: "#5e99c9" },
  ];

  return (
    <>
      <div className="card">
        <div className="row">
          <div
            className="col-sm-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <div className="DataStatus"> */}
            {DoctorDetails.map((ele, index) => (
              <>
                <button
                  className="btn btn-sm btn-block"
                  key={index}
                  style={{ background: ele?.color, color: "white" }}
                >
                  {ele?.label} : {ele?.value}
                </button>
              </>
            ))}
            <i className="fa fa-cog mt-2" aria-hidden="true"></i>
            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row p-2">
          <div className="col-sm-1">
            <div className="row">
              <div className="col-md-12">
                <img
                  src="http://itd2.fw.ondgni.com/Hospedia9.1/Images/no-avatar.gif"
                  className="emp-img"
                  alt="Responsive image"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-11">
            <div className="row my-1">
              <div className="col-2">
                <LabeledInput
                  label={"Patient Name"}
                  value={patientDetail?.selectedPatient?.Name}
                />
              </div>
              <div className="col-2">
                <LabeledInput
                  label={"Age/Gender"}
                  value={patientDetail?.selectedPatient?.AgeOrSex}
                />
              </div>
              <div className="col-1">
                <LabeledInput label={"Mobile"} value={"9867985642"} />
              </div>
              {/* <div className="col-1">
                <LabeledInput
                  label={"App. Date/No"}
                  value={patientDetail?.selectedPatient?.AppDate}
                />
              </div>
              <div className="col-2">
                <LabeledInput
                  label={"Corrent Doctor"}
                  value={patientDetail?.selectedPatient.Doctor}
                />
              </div>
              <div className="col-1">
                <LabeledInput
                  label={"UHID"}
                  value={patientDetail?.selectedPatient?.UHID}
                />
              </div> */}
              <div className="col-1">
                <LabeledInput label={"Payment"} value={"Cash"} />
              </div>
              <div className="col-1">
                <LabeledInput
                  label={"Ref.By"}
                  value={patientDetail?.selectedPatient.Doctor}
                />
              </div>
              <div className="col-1">
                <LabeledInput
                  label={"Panel"}
                  value={patientDetail?.selectedPatient?.Panel}
                />
              </div>
              {/* <div className="col-sm-1 d-flex justify-content-around text-align-right">
                <button
                  className="btn btn-sm m-1"
                  disabled={patientDetail?.index > 0 ? false : true}
                >
                  <i
                    class="fa fa-angle-double-left text-white"
                    aria-hidden="true"
                    onClick={reverseTableData}
                  ></i>
                </button>

                <button
                  className="btn btn-sm d-flex juatify-content-center m-1"
                  disabled={
                    patientDetail?.index < bodyData.length - 1 ? false : true
                  }
                >
                  <i
                    class="fa fa-angle-double-right text-white"
                    aria-hidden="true"
                    onClick={forwardTableData}
                  ></i>
                </button>
              </div> */}
              {/* <div className="col-sm-1">
                <button
                  className="btn btn-sm btn-block btn-primary"
                  onClick={() => {
                    setActive(true);
                  }}
                >
                  Back
                </button>
              </div> */}
              <div className="col-sm-4 d-flex justify-content-between">
              <button
                  className="btn btn-sm m-1"
                  disabled={patientDetail?.index > 0 ? false : true}
                >
                  <i
                    class="fa fa-angle-double-left text-white"
                    aria-hidden="true"
                    onClick={reverseTableData}
                  ></i>
                </button>

                <button
                  className="btn btn-sm d-flex juatify-content-center m-1"
                  disabled={
                    patientDetail?.index < bodyData.length - 1 ? false : true
                  }
                >
                  <i
                    class="fa fa-angle-double-right text-white"
                    aria-hidden="true"
                    onClick={forwardTableData}
                  ></i>
                </button>
                <button
                  className="btn btn- btn-block btn-primary m-1"
                  onClick={() => {
                    setActive(true);
                  }}
                >
                  Back
                </button>
                <button className="btn btn- btn-block btn-primary m-1">
                  Call
                </button>
                <button className="btn btn- btn-block btn-primary m-1">
                  Hold
                </button>
                <button className="btn btn- btn-block btn-primary m-1">
                  In
                </button>
                {/* <button className="btn btn- btn-block btn-primary m-1">Out</button> */}
                <button className="btn btn- btn-block btn-primary m-1">
                  File Closed
                </button>
              </div>
            </div>
            <div className="row pt-2 d-flex justify-content-end">
              <div className="col-sm-7 d-flex justify-content-between">
                <button
                  className="btn btn- btn-block btn-primary m-1"
                  style={{ background: "orange" }}
                >
                  Preview
                </button>
                <button
                  className="btn btn- btn-block btn-success m-1"
                  style={{ background: "green" }}
                >
                  Save
                </button>
                <button
                  className="btn btn- btn-block btn-primary m-1"
                  style={{ background: "#c7c703" }}
                >
                  Draft
                </button>
                <button
                  className="btn btn- btn-block btn-primary m-1"
                  style={{ background: "#df4545" }}
                >
                  Clear
                </button>
                <button
                  className="btn btn- btn-block btn-primary m-1"
                  style={{ background: "#9f53c0" }}
                >
                  Original
                </button>
                <button
                  className="btn btn- btn-block btn-primary m-1"
                  style={{ background: "#ff3100" }}
                >
                  Email
                </button>
                <button
                  className="btn btn- btn-block btn-primary m-1"
                  style={{ background: "#5e99c9" }}
                >
                  Sms
                </button>
                <button
                  className="btn btn- btn-block btn-primary m-1"
                  style={{ background: "#da7f17" }}
                >
                  Video
                </button>
              </div>
            </div>
            {/* <div className="row my-1">
              <div className="col-sm-2 d-flex justify-content-between">
                <button className="btn btn-sm btn-primary">Hold</button>
                <button className="btn btn-sm btn-primary">Out</button>
                <button className="btn btn-sm btn-primary">File Closed</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="row">
          {/* <div className="col-sm-3">
            {DoctorPrescription.map((prescription, item) => (
              <div className="card detail-card mx-1 mt-1 py-1 px-2">
                <span> {prescription?.item}</span>
              </div>
            ))}
          </div> */}
          <div className="col-sm-12">
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label
                  className="col-sm-2 patientLabel"
                  htmlFor="ChiefComplaint"
                >
                  Chief Complaint
                </label>
                {tags.ChiefComplaint.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("ChiefComplaint", index)}
                    >
                      <i className="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="ChiefComplaint"
                  name="ChiefComplaint"
                  value={inputValue.ChiefComplaint}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "ChiefComplaint");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input "
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label className="col-sm-2 patientLabel" htmlFor="PastHistory">
                  Past History
                </label>
                {tags.PastHistory?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("PastHistory", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="PastHistory"
                  name="PastHistory"
                  value={inputValue?.PastHistory}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "PastHistory");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label
                  className="col-sm-2 patientLabel"
                  htmlFor="TreatmentHistory"
                >
                  Treatment History
                </label>
                {tags?.TreatmentHistory?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      PastHistory
                      onClick={() => removeTag("TreatmentHistory", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="TreatmentHistory"
                  name="TreatmentHistory"
                  value={inputValue?.TreatmentHistory}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "TreatmentHistory");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label className="col-sm-2 patientLabel" htmlFor="Allergies">
                  Allergies
                </label>
                {tags?.Allergies?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("Allergies", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="Allergies"
                  name="Allergies"
                  value={inputValue?.Allergies}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "Allergies");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label
                  className="col-sm-2 patientLabel"
                  htmlFor="PersonalHistory"
                >
                  Personal History
                </label>
                {tags?.PersonalHistory?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("PersonalHistory", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="PersonalHistory"
                  name="PersonalHistory"
                  value={inputValue?.PersonalHistory}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "PersonalHistory");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label
                  className="col-sm-2 patientLabel"
                  htmlFor="GeneralExamination"
                >
                  General Examination
                </label>
                {tags?.GeneralExamination?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("GeneralExamination", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="GeneralExamination"
                  name="GeneralExamination"
                  value={inputValue?.GeneralExamination}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "GeneralExamination");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label
                  className="col-sm-2 patientLabel"
                  htmlFor="SystematicExamination"
                >
                  Systematic Examination
                </label>
                {tags?.SystematicExamination?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("SystematicExamination", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="SystematicExamination"
                  name="SystematicExamination"
                  value={inputValue?.SystematicExamination}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "SystematicExamination");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label
                  className="col-sm-2 patientLabel"
                  htmlFor="ProvisionalDiagnosis"
                >
                  Provisional Diagnosis
                </label>
                {tags?.ProvisionalDiagnosis?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("ProvisionalDiagnosis", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="ProvisionalDiagnosis"
                  name="ProvisionalDiagnosis"
                  value={inputValue?.ProvisionalDiagnosis}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "ProvisionalDiagnosis");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label className="col-sm-2 patientLabel" htmlFor="DoctorAdvice">
                  Doctor Advice
                </label>
                {tags?.DoctorAdvice?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("DoctorAdvice", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="DoctorAdvice"
                  name="DoctorAdvice"
                  value={inputValue?.DoctorAdvice}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "DoctorAdvice");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label className="col-sm-2 patientLabel" htmlFor="Inestigation">
                  Inestigation
                </label>
                {tags?.Inestigation?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("Inestigation", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="Inestigation"
                  name="Inestigation"
                  value={inputValue?.Inestigation}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "Inestigation");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label className="col-sm-2 patientLabel" htmlFor="Diet">
                  Diet
                </label>
                {tags?.Diet?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("Diet", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="Diet"
                  name="Diet"
                  value={inputValue?.Diet}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "Diet");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label className="col-sm-2 patientLabel" htmlFor="NextVisit">
                  Next Visit
                </label>
                {tags?.NextVisit?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("NextVisit", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="NextVisit"
                  name="NextVisit"
                  value={inputValue?.NextVisit}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "NextVisit");
                  }}
                  placeholder="Type and Press Enter"
                  className="tag-input"
                />
              </div>
            </div>
            <div className="App py-1 px-2">
              <div className="tag-input-container">
                <label
                  className="col-sm-2 patientLabel"
                  htmlFor="PrescribedMedicine"
                >
                  Prescribed Medicine
                </label>
                <div className="col-sm-6">
                  <div className="App">
                    <Table striped className="mainTable pt-2 pl-2 pr-2">
                      <thead>
                        <tr>
                          <th>Sr No.</th>
                          <th>Prescription</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item}</td>
                            <td>
                              <i
                                className="fa fa-times-circle"
                                aria-hidden="true"
                                onClick={() => removeTableData(index)}
                              ></i>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td>{tableData.length + 1}</td>
                          <td>
                            <input
                              type="text"
                              value={newPrescription}
                              onChange={handleInputChange}
                              onKeyPress={handleKeyPressTable}
                              placeholder="Type and press Enter"
                              className="tag-input"
                            />
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            <div className="App py-1 p-2">
              <div className="tag-input-container">
                <label
                  className="col-sm-2 patientLabel"
                  htmlFor="TransferReferral"
                >
                  TransferReferral
                </label>
                {tags?.TransferReferral?.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <span
                      className="tag-close-icon"
                      onClick={() => removeTag("TransferReferral", index)}
                    >
                      <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  id="TransferReferral"
                  name="TransferReferral"
                  value={inputValue?.TransferReferral}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    handleKeyPress(e, "TransferReferral");
                  }}
                  placeholder="Type and Press Enter"
                  className="form-control tag-input"
                />
              </div>
            </div>

            {/* <div className="App">
              <Table striped className="mainTable pt-2 pl-2 pr-2">
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Prescription</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item}</td>
                      <td>
                        <i
                          className="fa fa-times-circle"
                          aria-hidden="true"
                          onClick={() => removeTableData(index)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>{tableData.length + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={newPrescription}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPressTable}
                        placeholder="Type and press Enter"
                        className="tag-input"
                      />
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentPatientDetail;
