import React, { useEffect, useState } from "react";
import Input from "../../formComponent/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { headers } from "../../../utils/apitools";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../../../utils/constant";
import { inputBoxValidation } from "../../../utils/utils";
import Loading from "../../loader/Loading";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const SpocUpdateModal = (showData) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    OwnerName: "",
    OwnerMobile: "",
    OwnerEmail: "",
    ItPersonName: "",
    ItPersonMobile: "",
    ItPersonEmail: "",
    SpocName: "",
    SpocMobile: "",
    SpocEmail: "",
  });
  const handleSelectChange = (e) => {
    const { name, value } = e?.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const filldetails = () => {
    setFormData({
      ...formData,
      OwnerName: showData?.tableData?.Owner_Name,
      OwnerMobile: showData?.tableData?.Owner_Mobile,
      OwnerEmail: showData?.tableData?.Owner_Email,
      ItPersonName: showData?.tableData?.ItPersonName,
      ItPersonMobile: showData?.tableData?.ItPersonMobile,
      ItPersonEmail: showData?.tableData?.ItPersonEmail,
      SpocName: showData?.tableData?.SPOC_Name,
      SpocMobile: showData?.tableData?.SPOC_Mobile,
      SpocEmail: showData?.tableData?.SPOC_EmailID,
    });
  };

  const handleUpdateSPOC = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ProjectID", showData?.tableData?.Id);
    form.append("Owner_Name", formData?.OwnerName);
    form.append("Owner_Mobile", formData?.OwnerMobile);
    form.append("Owner_Email", formData?.OwnerEmail);
    form.append("SPOC_Name", formData?.SpocName);
    form.append("SPOC_Mobile", formData?.SpocMobile);
    form.append("SPOC_EmailID", formData?.SpocEmail);
    form.append("ItPersonName", formData?.ItPersonName);
    form.append("ItPersonMobile", formData?.ItPersonMobile);
    form.append("ItPersonEmail", formData?.ItPersonEmail);

    axios
      .post(
        apiUrls?.SPOC_Update,
        form,
        { headers }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        // setFormData({
        //   ...formData,
        //   OwnerName: "",
        //   OwnerMobile: "",
        //   OwnerEmail: "",
        //   ItPersonName: "",
        //   ItPersonMobile: "",
        //   ItPersonEmail: "",
        //   SpocName: "",
        //   SpocMobile: "",
        //   SpocEmail: "",
        // });
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

  useEffect(() => {
    filldetails();
  }, []);
  return (
    <>
      <div className="card LocalityCard border p-2">
        <div className="row">
          <Input
            type="text"
            className="form-control"
            id="OwnerName"
            name="OwnerName"
            lable="Owner Name"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.OwnerName}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="OwnerMobile"
            name="OwnerMobile"
            lable="Owner Mobile"
            placeholder=" "
            max={20}
            onChange={(e) => {
              inputBoxValidation(
                MOBILE_NUMBER_VALIDATION_REGX,
                e,
                handleSelectChange
              );
            }}
            value={formData?.OwnerMobile}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="OwnerEmail"
            name="OwnerEmail"
            lable="Owner Email"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.OwnerEmail}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="ItPersonName"
            name="ItPersonName"
            lable="ItPerson Name"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.ItPersonName}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="ItPersonMobile"
            name="ItPersonMobile"
            lable="ItPerson Mobile"
            placeholder=" "
            onChange={(e) => {
              inputBoxValidation(
                MOBILE_NUMBER_VALIDATION_REGX,
                e,
                handleSelectChange
              );
            }}
            value={formData?.ItPersonMobile}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="ItPersonEmail"
            name="ItPersonEmail"
            lable="ItPerson Email"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.ItPersonEmail}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="SpocName"
            name="SpocName"
            lable="Spoc Name"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.SpocName}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="SpocMobile"
            name="SpocMobile"
            lable="Spoc Mobile"
            placeholder=" "
            max={20}
            onChange={(e) => {
              inputBoxValidation(
                MOBILE_NUMBER_VALIDATION_REGX,
                e,
                handleSelectChange
              );
            }}
            value={formData?.SpocMobile}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="SpocEmail"
            name="SpocEmail"
            lable="Spoc Email"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.SpocEmail}
            respclass="col-md-4 col-12 col-sm-12"
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="ml-auto" style={{ marginRight: "7px" }}>
              <button
                className="btn btn-sm btn-success"
                onClick={handleUpdateSPOC}
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SpocUpdateModal;
