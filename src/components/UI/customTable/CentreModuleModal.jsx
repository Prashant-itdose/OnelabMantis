import React, { useEffect, useState } from "react";
import Input from "../../formComponent/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { headers } from "../../../utils/apitools";
import Tables from ".";
import { centreTHEAD } from "../../modalComponent/Utils/HealperThead";
import { Link } from "react-router-dom";
import Loading from "../../loader/Loading";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const CentreModuleModal = (showData) => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    CentreName: "",
  });
  const [editMode, setEditMode] = useState(false);
  const handleSelectChange = (e) => {
    const { name, value } = e?.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", showData?.showData?.ProjectID),
      form.append("CentreName", formData?.CentreName),
      axios
        .post(
          apiUrls?.CreateClientCentre,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
  };
  
  const handleUpdate = () => {
    setLoading(true);
    let form = new FormData();
    console.log(showData);
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      form.append("ProjectID", formData?.ProjectID),
      form.append("CentreName", formData?.CentreName),
      form.append("DtCentreNameId", formData?.DtCentreNameId),
      axios
        .post(
         apiUrls?.UpdateClientCentre,
          form,
          { headers }
        )
        .then((res) => {
          toast.success(res?.data?.message);
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
      CentreName: ele?.Centre,
      ProjectID: ele?.ProjectID,
      DtCentreNameId: ele?.DtCentreNameId,
    });
    setEditMode(true);
  };
  useEffect(() => {
    setTableData([...tableData, ...showData?.showData?.showData]);
  }, []);
  console.log(showData?.showData?.showData);
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
      <div className="card LocalityCard border p-2">
        <div className="row">
          <Input
            type="text"
            className="form-control"
            id="CentreName"
            name="CentreName"
            lable="Centre"
            onChange={handleSelectChange}
            value={formData?.CentreName}
            respclass="col-md-4 col-12 col-sm-12"
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="col-2">
              {editMode ? (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleAdd}
                >
                  Create
                </button>
              )}
            </div>
          )}
        </div>
        <Tables
          thead={centreTHEAD}
          tbody={currentData?.map((ele, index) => ({
            "S.No.": (currentPage - 1) * rowsPerPage + index + 1,
            CentreName: ele?.Centre,
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
    </>
  );
};

export default CentreModuleModal;
