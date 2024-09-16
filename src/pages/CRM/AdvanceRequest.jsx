import React, { useState } from "react";
import DatePicker from "../../components/formComponent/DatePicker";
import ReactSelect from "../../components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import Heading from "../../components/UI/Heading";

const AdvanceRequest = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [formData, setFormData] = useState({
    AdvanceType: "",
    AdvanceAmountRequired: "",
    PurposeOfAdvance: "",
    AdvanceExpectedDate: new Date(),
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const searchHandleChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };
  return (
    <>
      <div className="card">
        <Heading title={"Advance Request"}/>
        <div className="row g-4 m-2">
          <ReactSelect
            name="AdvanceType"
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            placeholderName="Advance Type"
            dynamicOptions={[{ label: "TA DA", value: "TADA" }]}
            value={formData?.AdvanceType}
            handleChange={handleDeliveryChange}
          />
          <Input
            type="text"
            className="form-control"
            id="AdvanceAmountRequired"
            name="AdvanceAmountRequired"
            placeholder="Advance Amount Required"
            onChange={searchHandleChange}
            value={formData?.AdvanceAmountRequired}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <Input
            type="text"
            className="form-control"
            id="PurposeOfAdvance"
            name="PurposeOfAdvance"
            placeholder="Purpose Of Advance"
            onChange={searchHandleChange}
            value={formData?.PurposeOfAdvance}
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
          />
          <DatePicker
            className="custom-calendar"
            id="AdvanceExpectedDate"
            name="AdvanceExpectedDate"
            placeholder={VITE_DATE_FORMAT}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            value={formData?.AdvanceExpectedDate}
            lable="Advance Expected Date"
            handleChange={searchHandleChange}
          />
          <div className="col-2">
            <button className="btn btn-sm btn-success">Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvanceRequest;
