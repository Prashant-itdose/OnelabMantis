import React from "react";
import Heading from "@app/components/UI/Heading";
import { useTranslation } from "react-i18next";
import ReactSelect from "@app/components/formComponent/ReactSelect";
import Tables from "@app/components/UI/customTable";
import PanelDetailTable from "../../components/UI/customTable/helpDesk/panelDetail/index";
const PanelDetail = () => {
  const [t] = useTranslation();

  return (
    <>
      <div className="m-2 spatient_registration_card">
        <form className="patient_registration card">
          {/* <OPDSearchSetellment /> */}
          <Heading
            title={t("helpDesk.PanelDetail.HeadingName")}
            isBreadcrumb={true}
          />
          <div className="row p-2">
            <ReactSelect
              placeholderName={t("helpDesk.PanelDetail.ConpanyName")}
              id={"Title"}
              searchable={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            />
            <ReactSelect
              placeholderName={t("helpDesk.PanelDetail.GroupType")}
              id={"Title"}
              searchable={true}
              respclass="col-xl-2 col-md-2 col-sm-6 col-12"
            />
            <button className="btn btn-sm btn-primary ml-2" type="button">
              {t("helpDesk.PanelDetail.btnName")}
            </button>
          </div>
         
            <PanelDetailTable />
        </form>
      </div>
    </>
  );
};

export default PanelDetail;
