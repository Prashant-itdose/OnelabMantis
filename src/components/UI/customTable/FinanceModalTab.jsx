import React, { useEffect, useState } from "react";
import Input from "../../formComponent/Input";
import ReactSelect from "../../formComponent/ReactSelect";
import axios from "axios";
import { headers } from "../../../utils/apitools";
import DatePicker from "../../formComponent/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const FinanceModalTab = (tableData) => {
  console.log(tableData);

  const { VITE_DATE_FORMAT } = import.meta.env;
  const [tax, setTax] = useState([]);
  const [oldlis, setOldLis] = useState([]);
  const [amcstatus, setAmcStatus] = useState([]);
  const [formData, setFormData] = useState({
    PurchageOrderAmount: "",
    CashAmount: "",
    ChequeAmount: "",
    Tax: "",
    GSTPercent: "",
    StartDate: "",
    PoDate: "",
    LiveDate: "",
    OnSupportDate: "",
    AmcDate: "",
    AmcStMonth: "",
    AmcAmount: "",
    AmcStatus: "",
    AmcTo: "",
    OldLis: "",
    TotalPoAmount: "",
    TotalGstVatAmount: "",
    NetPoAmount: "",
  });
  useEffect(() => {
    setFormData({
      ...formData,
      TotalPoAmount:
        Number(formData?.CashAmount) + Number(formData?.ChequeAmount),
    });
  }, [formData?.CashAmount, formData?.ChequeAmount]);
  useEffect(() => {
    if (formData?.Tax) {
      const calculate =
        (Number(formData?.TotalPoAmount) * Number(formData?.Tax)) / 100;
      setFormData({
        ...formData,
        TotalGstVatAmount: calculate,
        NetPoAmount: calculate + formData?.TotalPoAmount,
      });
    }
  }, [formData?.TotalPoAmount]);

  const searchHandleChange = (e) => {
    const { name, value } = e?.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (e) => {
    const { name, value } = e?.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name == "Tax") {
      const calculate = (Number(formData?.TotalPoAmount) * Number(value)) / 100;
      setFormData({
        ...formData,
        [name]: value,
        TotalGstVatAmount: calculate,
        NetPoAmount: calculate + formData?.TotalPoAmount,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const getTax = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      axios
        .post(
         apiUrls?.GetGstTaxAndOldLisID,
          form,
          { headers }
        )
        .then((res) => {
          const taxes = res?.data?.Tax?.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setTax(taxes);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getAmcStatus = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      axios
        .post(
         apiUrls?.AMCType_Select,
          form,
          { headers }
        )
        .then((res) => {
          const taxes = res?.data?.data?.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setAmcStatus(taxes);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getOLDLIS = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      axios
        .post(
         apiUrls?.GetGstTaxAndOldLisID,
          form,
          { headers }
        )
        .then((res) => {
          const taxes = res?.data?.LIS?.map((item) => {
            return { label: item?.NAME, value: item?.ID };
          });
          setOldLis(taxes);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const filldetails = () => {
    setFormData({
      ...formData,
      PurchageOrderAmount: tableData?.tableData?.NetPoAmt,
      CashAmount: tableData?.tableData?.PoCashAmt,
      ChequeAmount: tableData?.tableData?.PoChequeAmt,
      Tax: tableData?.tableData?.GstpercentId,

      StartDate: tableData?.tableData?.startdate
        ? moment(tableData?.tableData?.startdate, "YYYY-MM-DD").toDate()
        : new Date(),
      PoDate: tableData?.tableData?.PODate
        ? moment(tableData?.tableData?.PODate, "YYYY-MM-DD").toDate()
        : new Date(),

      LiveDate: tableData?.tableData?.Livedate
        ? moment(tableData?.tableData?.Livedate, "YYYY-MM-DD").toDate()
        : new Date(),

      OnSupportDate: tableData?.tableData?.OnsiteSupportDate
        ? moment(tableData?.tableData?.OnsiteSupportDate, "YYYY-MM-DD").toDate()
        : new Date(),
      AmcDate: tableData?.tableData?.AMC_StartDate
        ? moment(tableData?.tableData?.AMC_StartDate, "YYYY-MM-DD").toDate()
        : new Date(),
      AmcStMonth: tableData?.tableData?.AMCStartmonth,
      AmcAmount: tableData?.tableData?.AMCAmount,
      AmcStatus: tableData?.tableData?.Amcid,
      AmcTo: tableData?.tableData?.AMCper,
      OldLis: tableData?.tableData?.OLDLISID,
      GSTPercent: tableData?.tableData?.Gstpercent,
      ProjectID: tableData?.tableData?.Id,
      AMCper: tableData?.tableData?.AMCper,
      AMC: tableData?.tableData?.AMC,
      Amcid: tableData?.tableData?.Amcid,
      CurrentStatus: tableData?.tableData?.CurrentStatus,
    });
  };

  function formatDate(dateString) {
    let date = new Date(dateString);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  const handleUpdate = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", formData?.ProjectID),
      form.append("PoCashAmt", formData?.CashAmount),
      form.append("PoChequeAmt", formData?.ChequeAmount),
      form.append("NetPoAmt", formData?.NetPoAmount),
      form.append("CurrentStatus", formData?.CurrentStatus),
      form.append("startdate", formatDate(formData?.StartDate)),
      form.append("Livedate", formatDate(formData?.LiveDate)),
      form.append("OnsiteSupportDate", formatDate(formData?.OnSupportDate)),
      form.append("AMCStartDate", formatDate(formData?.AmcDate)),
      form.append("AMCAmount", formData?.AmcAmount),
      form.append("AMCStartmonth", formData?.AmcStMonth),
      form.append("AMC", formData?.AMC),
      form.append("Amcid", formData?.Amcid),
      form.append("AMCper", formData?.AMCper),
      form.append("OLDLISID", formData?.OldLis),
      form.append("PODate", formatDate(formData?.PoDate)),
      form.append("GstpercentId", formData?.Tax),
      form.append("Gstpercent", formData?.Tax);
    axios
      .post(
        apiUrls?.UpdateFinancialInfo,
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

  useEffect(() => {
    getTax();
    getAmcStatus();
    getOLDLIS();
    filldetails();
  }, []);
  const formattedPoDate = formData?.PoDate
    ? moment(formData.PoDate, "YYYY-MM-DD").format(VITE_DATE_FORMAT)
    : moment().format(VITE_DATE_FORMAT);
  return (
    <>
      <div className="card border p-2">
        <div className="row">
          <Input
            type="text"
            className="form-control"
            id="CashAmount"
            name="CashAmount"
            lable="PO Cash"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.CashAmount}
            respclass="col-md-2 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="ChequeAmount"
            name="ChequeAmount"
            lable="PO Cheque"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.ChequeAmount}
            respclass="col-md-2 col-12 col-sm-12"
          />
          <ReactSelect
            style={{ marginLeft: "20px" }}
            name="Tax"
            respclass="col-md-4 col-12 col-sm-12"
            placeholderName="Tax"
            dynamicOptions={tax}
            value={formData?.Tax}
            handleChange={handleDeliveryChange}
          />
          <Input
            type="text"
            className="form-control"
            id="TotalPoAmount"
            name="TotalPoAmount"
            lable="Total Po Amount"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.TotalPoAmount}
            respclass="col-md-4 col-12 col-sm-12"
            disabled={true}
          />
          <Input
            type="text"
            className="form-control"
            id="TotalGstVatAmount"
            name="TotalGstVatAmount"
            lable="Total Gst/Vat Amount"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.TotalGstVatAmount}
            respclass="col-md-4 col-12 col-sm-12"
            disabled={true}
          />
          <Input
            type="text"
            className="form-control"
            id="NetPoAmount"
            name="NetPoAmount"
            lable="Net Po Amount"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.NetPoAmount}
            respclass="col-md-4 col-12 col-sm-12"
            disabled={true}
          />
          <DatePicker
            className="custom-calendar"
            id="StartDate"
            name="StartDate"
            lable="StartDate"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.StartDate}
            respclass="col-md-4 col-12 col-sm-12"
            handleChange={searchHandleChange}
          />
          <DatePicker
            className="custom-calendar"
            id="PoDate"
            name="PoDate"
            lable="PoDate"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.PoDate}
            respclass="col-md-4 col-12 col-sm-12"
            handleChange={searchHandleChange}
          />
          <DatePicker
            className="custom-calendar"
            id="LiveDate"
            name="LiveDate"
            lable="LiveDate"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.LiveDate}
            respclass="col-md-4 col-12 col-sm-12"
            handleChange={searchHandleChange}
          />
          <DatePicker
            className="custom-calendar"
            id="OnSupportDate"
            name="OnSupportDate"
            lable="OnSupportDate"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.OnSupportDate}
            respclass="col-md-4 col-12 col-sm-12"
            handleChange={searchHandleChange}
          />
          <DatePicker
            className="custom-calendar"
            id="AmcDate"
            name="AmcDate"
            lable="AmcDate"
            placeholder={VITE_DATE_FORMAT}
            value={formData?.AmcDate}
            respclass="col-md-4 col-12 col-sm-12"
            handleChange={searchHandleChange}
          />
          <Input
            type="text"
            className="form-control"
            id="AmcStMonth"
            name="AmcStMonth"
            lable="AmcStartMonth"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.AmcStMonth}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="AmcAmount"
            name="AmcAmount"
            lable="AmcAmount"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.AmcAmount}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <ReactSelect
            style={{ marginLeft: "20px" }}
            name="AmcStatus"
            respclass="col-md-4 col-12 col-sm-12"
            placeholderName="AmcStatus"
            dynamicOptions={amcstatus}
            value={formData?.AmcStatus}
            handleChange={handleDeliveryChange}
          />
          <Input
            type="text"
            className="form-control"
            id="AmcTo"
            name="AmcTo"
            lable="Amc Percent"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.AmcTo}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <ReactSelect
            style={{ marginLeft: "20px" }}
            name="OldLis"
            respclass="col-md-4 col-12 col-sm-12"
            placeholderName="OldLis"
            dynamicOptions={oldlis}
            value={formData?.OldLis}
            handleChange={handleDeliveryChange}
          />
        </div>
        <div className="ml-auto m-0 p-0">
          <button className="btn btn-sm btn-success" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default FinanceModalTab;
