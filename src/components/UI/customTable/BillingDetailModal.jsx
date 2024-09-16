import React, { useEffect, useState } from "react";
import Input from "../../formComponent/Input";
import Tables from ".";
import { billingTHEAD } from "../../modalComponent/Utils/HealperThead";
import { toast } from "react-toastify";
import { inputBoxValidation } from "../../../utils/utils";
import {
  GST_VALIDATION_REGX,
  PANCARD_VALIDATION_REGX,
} from "../../../utils/constant";
import { headers } from "../../../utils/apitools";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../loader/Loading";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const BillingDetailModal = (showData, visible) => {
  const [loading, setLoading] = useState(false);
  console.log(visible);
  console.log(showData);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    BillingCompanyName: "",
    BillingAddress: "",
    GstNumber: "",
    PanCardNo: "",
  });
  const handleSelectChange = (e) => {
    const { name, value } = e?.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleAddData = () => {
    if (formData?.BillingCompanyName == "") {
      toast.error("Please Enter Billing Comapny Name.");
    } else if (formData?.BillingAddress == "") {
      toast.error("Please Enter Billing Address.");
    } else if (formData?.GstNumber == "") {
      toast.error("Please Enter GST Number.");
    } else if (formData?.PanCardNo == "") {
      toast.error("Please Enter PanCardNo.");
    } else {
      setLoading(true);
      let form = new FormData();
      form.append("ID", localStorage?.getItem("ID")),
        form.append("LoginName", localStorage?.getItem("realname")),
        form.append("ProjectID", showData?.showData?.ProjectID),
        form.append("BillingCompanyName", formData?.BillingCompanyName),
        form.append("BillingAddress", formData?.BillingAddress),
        form.append("GSTNo", formData?.GstNumber),
        form.append("PanCardNo", formData?.PanCardNo),
        axios
          .post(
            apiUrls?.CreateBilling,
            form,
            { headers }
          )
          .then((res) => {
            toast.success(res?.data?.message);
            setLoading(false);
            // setFormData({
            //   BillingCompanyName: "",
            //   BillingAddress: "",
            //   GstNumber: "",
            //   PanCardNo: "",
            // });
            // handleViewProject();
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      //   setTableData([...tableData, formData]);
    }
  };

console.log(showData?.showData?.ProjectID)
  const handleUpdate = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID")),
      form.append("LoginName", localStorage.getItem("realname")),
      form.append("ProjectID", formData?.ProjectID);
    form.append("BillingId", formData?.ID);
    form.append("BillingCompanyName", formData?.BillingCompanyName),
      form.append("BillingAddress", formData?.BillingAddress),
      form.append("GSTNo", formData?.GstNumber),
      form.append("PanCardNo", formData?.PanCardNo),
      axios
        .post(
          apiUrls?.UpdateBilling,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          // setFormData({
          //   BillingCompanyName: "",
          //   BillingAddress: "",
          //   GstNumber: "",
          //   PanCardNo: "",
          // });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };

  const handleBillingEdit = (ele) => {
    console.log("editdetails", ele);
    setFormData({
      ...formData,
      BillingCompanyName: ele?.BillingCompanyName,
      BillingAddress: ele?.BillingAddress,
      GstNumber: ele?.GSTNo,
      PanCardNo: ele?.PanCardNo,
      ID: ele?.BillingID,
      ProjectID: ele?.ProjectID,
    });
  };
  useEffect(() => {
    setTableData([...tableData, ...showData?.showData?.showData ]);
  }, []);
 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
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
      <div className="card border p-2">
        <div className="row">
          <Input
            type="text"
            className="form-control"
            id="BillingCompanyName"
            name="BillingCompanyName"
            lable="Billing Company Name"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.BillingCompanyName}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="BillingAddress"
            name="BillingAddress"
            lable="Billing Address"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.BillingAddress}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="GstNumber"
            name="GstNumber"
            lable="Gst Number"
            placeholder=" "
            max={20}
            onChange={(e) => {
              inputBoxValidation(GST_VALIDATION_REGX, e, handleSelectChange);
            }}
            value={formData?.GstNumber}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="PanCardNo"
            name="PanCardNo"
            lable="PanCardNo"
            placeholder=" "
            max={20}
            onChange={(e) => {
              inputBoxValidation(
                PANCARD_VALIDATION_REGX,
                e,
                handleSelectChange
              );
            }}
            value={formData?.PanCardNo}
            respclass="col-md-4 col-12 col-sm-12"
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="col-2">
              {formData?.ID ? (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleAddData}
                >
                  Create
                </button>
              )}
            </div>
          )}
        </div>
        <div className="card">
          <Tables
            thead={billingTHEAD}
            tbody={currentData?.map((ele, index) => ({
              "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
              "Billing CompanyName": ele.BillingCompanyName,
              "Billing Address": ele.BillingAddress,
              "GST Number": ele.GSTNo,
              "PanCardNo.": ele.PanCardNo,
              Action: (
                <i
                className="fa fa-edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleBillingEdit(ele)}
                >
                
                </i>
              ),
            }))}
            tableHeight={"tableHeight"}
          />
           <div className="pagination ml-auto">
          <div>
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
      </div>
    </>
  );
};

export default BillingDetailModal;
