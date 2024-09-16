import React, { useState } from 'react'
import Heading from '../../components/UI/Heading'
import { useTranslation } from 'react-i18next';
import ReactSelect from '../../components/formComponent/ReactSelect';
import Tables from '../../components/UI/customTable';
import LabeledInput from '../../components/formComponent/LabeledInput';

export default function PackageDetailOPD() {
    const [t] = useTranslation();

    const [bodyData, setBodyData] = useState([
        {
            "S.No.": 1,
            "Package Name": "ASHWINI EXECUTIVE HEALTH CHECK UP",
            "Valid From": "23-Apr-2023",
            "Valid To ": "31-Dec-2029	",
            "Investigation Name": "BLOOD GROUPING (ABO AND RH)"
        },
    ]);

    // Dynamically generate THEAD using bodyData keys
    const THEAD = Object.keys(bodyData[0]).map((key) => {
        // Capitalize first letter and replace underscores with spaces
        return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
    });

    return (
        <>
            <div className='card patient_registration border'>
                <Heading isBreadcrumb={true} />

                <div className="row p-2">
                    <ReactSelect
                        placeholderName={t("helpDesk.PackageDetailOPD.Package_Name")}
                        id={"Type"}
                        searchable={true}
                        respclass="col-xl-3 col-md-3 col-sm-4 col-12"

                    />

                    <div className="col-2 ">
                        <LabeledInput label={t("helpDesk.PackageDetailOPD.rate")} value={"100"} />
                    </div>

                </div>
                <Tables thead={THEAD} tbody={bodyData} fs={"12"} />


            </div>
        </>
    )
}
