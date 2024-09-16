import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../components/UI/Heading";
import { useFormik } from "formik";
import { RECEIPT_REPRINT_PAYLOAD, SEARCHBY } from "../utils/constant";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import MisReportTable from "../components/UI/customTable/MisReportTable";
import { headers } from "../utils/apitools";
import Loading from "../components/loader/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrls } from "../networkServices/apiEndpoints";
import { ExportToExcel } from "../networkServices/Tools";
import excelimg from "../../src/assets/image/excel.png"
const AutoBackupStatusSheet = () => {
  const [t] = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: [],
    VerticalID: [],
    TeamID: [],
    WingID: [],
    POC1: [],
    POC2: [],
    POC3: [],
  });
  const [vertical, setVertical] = useState([]);
  const [team, setTeam] = useState([]);
  const [wing, setWing] = useState([]);
  const [poc1, setPoc1] = useState([]);
  const [poc2, setPoc2] = useState([]);
  const [poc3, setPoc3] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSearch = (code) => {
    setLoading(true);
    let form = new FormData();
    form.append("ID", localStorage.getItem("ID")),
      form.append("ProjectID", formData?.ProjectID),
      form.append("VerticalID", formData?.VerticalID),
      form.append("TeamID", formData?.TeamID),
      form.append("WingID", formData?.WingID),
      form.append("POC1", formData?.POC1),
      form.append("POC2", formData?.POC2),
      form.append("POC3", formData?.POC3),
      form.append("StatusCode", code ? code : ""),
      axios
        .post(
         apiUrls?.AutobackupSearch,
          form,
          { headers }
        )
        .then((res) => {
          if (res?.data?.data?.length > 0) {
            setTableData(res?.data?.data);
          }
          // setFormData({
          //     VerticalID: [],
          //     TeamID: [],
          //     WingID: [],
          //     POC1: [],
          //     POC2: [],
          //     POC3: []
          // })
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

  const THEAD = [
    t("S.No."),
    t("Vertical"),
    t("Team"),
    t("Wing"),
    t("Project Name"),
    t("Last AB Date"),
    t("Last AB Done By"),
    t("SPOC_Name"),
    t("SPOC_Email"),
    t("SPOC_Mobile"),
    t("Edit"),
    t("Show Log")
  ];

  const filterByColor = (color) => {
    const data = tableData?.filter((ele) => ele?.colorcode == color);
    setTableData(data);
    handleSearch();
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

  useEffect(() => {
    getVertical(), getTeam(), getWing(), getPOC1(), getPOC2(), getPOC3();
  }, []);


  return (
    <>
      <div className="card ViewIssues border">
        <Heading title={t("AutoBackupStatusSheet")} isBreadcrumb={true} />

        <div className="row g-4 m-2">
          <MultiSelectComp
            respclass="col-xl-2 col-md-4 col-sm-6 col-12"
            name="VerticalID"
            placeholderName="Vertical"
            dynamicOptions={vertical}
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

          <div className="col-xl-2 col-md-4 col-sm-4 col-12">
            <div className="d-flex ">
              <button
                className="btn btn-lg btn-info "
                onClick={() => handleSearch()}
              >
                Search
              </button>
              {/* <button
                style={{ color: "white" }}
                className="btn btn-lg btn-warning ml-2"
                onClick={() => ExportToExcel(tableData)}
              >
                Excel
              </button> */}
              <img src={excelimg}  className=" ml-2" style={{width:"24px",height:"24px",cursor:"pointer"}}  onClick={() => ExportToExcel(tableData)}></img>
            </div>
          </div>
          <div className="row g-4">
            <div className="d-flex flex-wrap align-items-center">
              <div
                className="d-flex "
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <div
                  className="legend-circle"
                  style={{
                    backgroundColor: "#FFC0CB",
                    borderColor: "#FFC0CB",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSearch("-1")}
                ></div>
                <span
                  className="legend-label"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {t("AB Not Required")}
                </span>
              </div>
              <div
                className="d-flex "
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <div
                  className="legend-circle"
                  style={{
                    backgroundColor: "white",
                    borderColor: "black",
                    border: "1px solid grey",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSearch("0")}
                ></div>
                <span
                  className="legend-label"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {t("AB Not Done")}
                </span>
              </div>
              <div
                className="d-flex "
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <div
                  className="legend-circle"
                  style={{ backgroundColor: "#FFFF00", cursor: "pointer" }}
                  onClick={() => handleSearch("180")}
                ></div>
                <span
                  className="legend-label"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {t("AB Not Done 180 Days")}
                </span>
              </div>
              <div
                className="d-flex "
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <div
                  className="legend-circle"
                  style={{ backgroundColor: "#FFE4C4", cursor: "pointer" }}
                  onClick={() => handleSearch("90")}
                ></div>
                <span
                  className="legend-label"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {t("AB Not Done 90 Days")}
                </span>
              </div>
              <div
                className="d-flex "
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <div
                  className="legend-circle"
                  style={{ backgroundColor: "#FFA500", cursor: "pointer" }}
                  onClick={() => handleSearch("75")}
                ></div>
                <span
                  className="legend-label"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {t("AB Not Done 75 Days")}
                </span>
              </div>
              <div
                className="d-flex "
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <div
                  className="legend-circle"
                  style={{
                    backgroundColor: "#90EE90",
                    cursor: "pointer",
                    border: "1px solid #90EE90",
                  }}
                  onClick={() => handleSearch("1")}
                ></div>
                <span
                  className="legend-label"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {t("AB Verified")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          {tableData?.length > 0 && (
            <div
              className="card ViewIssues border mt-2 table-responsive"
              style={{ overflowX: "auto" }}
            >
              <div
                className="col-sm-12"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{fontWeight:"bold"}}>Details Found</div>
                <div style={{fontWeight:"bold"}}>Total Count : {tableData?.length}</div>
              </div>
              <div
                className="patient_registration_card bootable tabScroll"
                style={{ overflowX: "auto" }}
              >
                <MisReportTable
                  THEAD={THEAD}
                  tbody={tableData}
                  setBodyData={setTableData}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AutoBackupStatusSheet;
