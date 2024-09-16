import React from "react";
import Heading from "@app/components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "@app/components/formComponent/ReactSelect";
import Input from "../../components/formComponent/Input";
import DatePicker from "../../components/formComponent/DatePicker";
import CostEstimationReprintTable from "../../components/UI/customTable/helpDesk/CostEstimationReprint/index"
const CostEstimationReprint = () => {
    const { VITE_DATE_FORMAT } = import.meta.env;
  const [t] = useTranslation();
  return (
    <>
      <div className="m-2 spatient_registration_card">
        <form className="patient_registration card">
          {/* <OPDSearchSetellment /> */}
          <Heading isBreadcrumb={true} />
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1 g-4 p-2 p-2">
          <Input
              type="text"
              className="form-control"
              id="UHID"
              name="UHID"
              lable={t("UHID")}
              placeholder=" "
              required={true}
              respclass="col-xl-2.5 col-md-2 colt-sm-6 col-12"
            />
            <DatePicker
            className="custom-calendar"
            respclass="col-xl-2.5 col-md-3 col-sm-4 col-12"
            id="From_Date"
            name="From_Date"
            lable={t("FrontOffice.OPD.CardPrint.From_Date")}
            placeholder={VITE_DATE_FORMAT}
          />
            <DatePicker
            className="custom-calendar"
            respclass="col-xl-2.5 col-md-3 col-sm-4 col-12"
            id="From_Date"
            name="From_Date"
            lable={t("FrontOffice.OPD.CardPrint.From_Date")}
            placeholder={VITE_DATE_FORMAT}
          />
            <Input
              type="text"
              className="form-control"
              id="UHID"
              name="UHID"
              lable={t("UHID")}
              placeholder=" "
              required={true}
              respclass="col-xl-2.5 col-md-2 colt-sm-6 col-12"
            />
          
            <div className="col-xl-1 col-md-2 col-sm-6 col-12">
              <button className="btn btn-sm btn-primary ml-2" type="button">
                {/* {t("helpDesk.doctortiming.Save")} */}
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <CostEstimationReprintTable />
    </>
  );
};

export default CostEstimationReprint;
