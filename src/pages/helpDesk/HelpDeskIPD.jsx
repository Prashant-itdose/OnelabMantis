import React from "react";
import Heading from "@app/components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "@app/components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import DatePicker from "../../components/formComponent/DatePicker"; 
import HelpDeskIPDTable from "../../components/UI/customTable/helpDesk/HelpDeskIPDTable/index"

const HelpDeskIPD = () => {
  const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  return (
    <>
      <div className="m-2 spatient_registration_card">
        <form className="patient_registration card">
          {/* <OPDSearchSetellment /> */}
          <Heading isBreadcrumb={true} />
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1 g-4 p-2 p-2">
            <ReactSelect
              placeholderName={t("helpDesk.HelpDeskIPD.Status")}
              id={"Status"}
              searchable={true}
              respclass="col-xl-2.5 col-md-2 colt-sm-6 col-12"
            />
            <Input
              type="text"
              className="form-control"
              id="UHID"
              name="UHID"
              lable={t("helpDesk.HelpDeskIPD.UHID")}
              placeholder=" "
              required={true}
              respclass="col-xl-2.5 col-md-2 colt-sm-6 col-12"
            />
            <Input
              type="text"
              className="form-control"
              id="Name"
              name="Name"
              lable={t("helpDesk.HelpDeskIPD.Name")}
              placeholder=" "
              required={true}
              respclass="col-xl-2.5 col-md-2 colt-sm-6 col-12"
            />
            <Input
              type="text"
              className="form-control"
              id="ContactNo"
              name="ContactNo"
              lable={t("helpDesk.HelpDeskIPD.ContactNo")}
              placeholder=" "
              required={true}
              respclass="col-xl-2.5 col-md-2 colt-sm-6 col-12"
            />
            <Input
              type="text"
              className="form-control"
              id="City"
              name="City"
              lable={t("helpDesk.HelpDeskIPD.City")}
              placeholder=" "
              required={true}
              respclass="col-xl-2.5 col-md-2 colt-sm-6 col-12"
            />
            <DatePicker
              className="custom-calendar"
              respclass="col-xl-2.5 col-md-3 col-sm-4 col-12"
              id="fromDate"
              name="fromDate"
              lable={t("helpDesk.HelpDeskIPD.fromDate")}
              placeholder={VITE_DATE_FORMAT}
              showTime={true}
              hourFormat="12"
            />
            <DatePicker
              className="custom-calendar"
              respclass="col-xl-2.5s col-md-3 col-sm-4 col-12"
              id="toDate"
              name="toDate"
              lable={t("helpDesk.HelpDeskIPD.toDate")}
              placeholder={VITE_DATE_FORMAT}
              showTime={true}
              hourFormat="12"
            />
            <ReactSelect
              placeholderName={t("helpDesk.HelpDeskIPD.Centre")}
              id={"Centre"}
              searchable={true}
              respclass="col-xl-2.5 col-md-2 colt-sm-6 col-12"
            />
            <div className="col-xl-1 col-md-2 col-sm-6 col-12">
              <button className="btn btn-sm btn-primary ml-2" type="button">
                {t("helpDesk.HelpDeskIPD.Search")}
              </button>
            </div>
            <div className="col-xl-1 col-md-2 col-sm-6 col-12">
              <button className="btn btn-sm btn-primary ml-2" type="button">
                {t("helpDesk.HelpDeskIPD.Report")}
              </button>
            </div>
          </div>
        </form>
      </div>
      <HelpDeskIPDTable />
    </>
  );
};

export default HelpDeskIPD;
