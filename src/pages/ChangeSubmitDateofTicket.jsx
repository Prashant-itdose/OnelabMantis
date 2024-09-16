import React, { useState } from "react";
import Heading from "../components/UI/Heading";
import Input from "../components/formComponent/Input";
import DatePicker from "../components/formComponent/DatePicker";
import { headers } from "../utils/apitools";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "../components/loader/Loading";
import { apiUrls } from "../networkServices/apiEndpoints";

const ChangeSubmitDateofTicket = () => {
  const [loading, setLoading] = useState(false);
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [formData, setFormData] = useState({
    TicketNo: "",
    DeliveryDate: ""
  })

  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitTicket = () => {
    setLoading(true)
    if (formData?.Reporter == "") {
      toast.error("Ticket ID(s) can not be blank");
      setLoading(false)
    } else {
      let form = new FormData();
      form.append("ID", localStorage?.getItem("ID")),
        form.append("LoginName", localStorage?.getItem("realname")),
        form.append("TicketIDs", formData?.TicketNo),
        form.append("dtSubmit",
          formData?.DeliveryDate != ""
            ? new Date(formData?.DeliveryDate)?.toISOString()?.split("T")[0]
            : ""
        ),
        axios
          .post(
           apiUrls?.ChangeSubmitDate,
            form,
            { headers }
          )
          .then((res) => {
            if (res?.data?.status == false) {
              toast.error(res?.data?.message)
            } else if (res?.data?.status == true) {
              toast.success(res?.data?.message)
            }
            setLoading(false)
          })
          .catch((err) => {
            console.log(err);
            setLoading(false)
          });
    };
  }
  return (
    <>
      <div className="card ViewIssues border">
        <Heading
          title="Search Criteria"
        />
        <div className="row g-4 m-2">
          <Input
            type="text"
            className="form-control"
            id="TicketNo"
            name="TicketNo"
            lable="TicketNo"
            placeholder=" "
            max={20}
            onChange={searchHandleChange}
            value={formData?.TicketNo}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
          />
          <DatePicker
            className="custom-calendar"
            id="DeliveryDate"
            name="DeliveryDate"
            lable="Delivery Date"
            placeholder={VITE_DATE_FORMAT}
            respclass="col-xl-2 col-md-4 col-sm-4 col-12"
            value={formData?.DeliveryDate}
            handleChange={searchHandleChange}
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="col-3 col-sm-4 d-flex">
              <button
                className="btn btn-sm btn-success ml-2"
                onClick={handleSubmitTicket}
              >
                Save
              </button>
            </div>)}
        </div>
      </div>
    </>
  )
}

export default ChangeSubmitDateofTicket;