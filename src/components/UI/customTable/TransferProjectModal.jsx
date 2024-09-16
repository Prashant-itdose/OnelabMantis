import React, { useEffect, useState } from "react";
import { headers } from "../../../utils/apitools";
import ReactSelect from "../../formComponent/ReactSelect";
import Heading from "../Heading";
import axios from "axios";
import Loading from "../../loader/Loading";
import { toast } from "react-toastify";
import { apiUrls } from "../../../networkServices/apiEndpoints";

const TransferProjectModal = (tableData) => {
    const [loading, setLoading] = useState(false)
    const [reporter, setReporter] = useState([]);
    const [formData, setFormData] = useState({
        DocumentType: "",
        SelectFile: "",
        SourceUser: "",
        TargetUser: ""
    })
    const getReporter = () => {
        let form = new FormData();
        form.append("ID", localStorage?.getItem("ID")),
            axios
                .post(
                   apiUrls?.Reporter_Select,
                    form,
                    { headers }
                )
                .then((res) => {
                    const reporters = res?.data.data.map((item) => {
                        return { label: item?.NAME, value: item?.ID };
                    });
                    setReporter(reporters);
                })
                .catch((err) => {
                    console.log(err);
                });
    };
    const handleDeliveryChange = (name, e) => {
        const { value } = e;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleusermapping = () => {
        setLoading(true)

        let form = new FormData();
        form.append("ID", localStorage?.getItem("ID")),
            form.append("LoginName", localStorage?.getItem("realname")),
            form.append("UserID", formData?.SourceUser),
            form.append("Status", "Transfer"),
            form.append("TargetUserID", formData?.TargetUser),
            form.append("ProjectID", "2"),
            axios
                .post(
                    apiUrls?.UserVsProjectMapping,
                    form,
                    { headers }
                )
                .then((res) => {
                    toast.success(res?.data?.message)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                });

    }

    useEffect(() => {
        getReporter()
    }, [])
    return (
        <>
            <div className="card ViewIssues border p-3">
                {/* <Heading
                    title="User Vs Project Mapping"
                /> */}
                <div className="row d-flex">
                    <div className="col-md-5 col-sm-6">
                        <ReactSelect
                            name="SourceUser"
                            respclass=" col-12"
                            placeholderName="Source User"
                            dynamicOptions={reporter}
                            value={formData?.SourceUser}
                            handleChange={handleDeliveryChange}
                        />
                    </div>
                    <div className="col-2" style={{ textAlign: "center" }}>
                        {/* {loading ? (
                            <Loading />
                        ) : (<i className="fa fa-arrow-down" onClick={handleusermapping} style={{cursor:"pointer"}}></i>)} */}
                    </div>
                    <div className="col-md-5 col-sm-6">
                        <ReactSelect
                            name="TargetUser"
                            respclass=" col-12"
                            placeholderName="Target User"
                            dynamicOptions={reporter}
                            value={formData?.TargetUser}
                            handleChange={handleDeliveryChange}
                        />
                    </div>

                </div>
                <div className="col-2" style={{margin:"auto"}}>
                    <button
                        className="btn btn-sm btn-info"
                        onClick={handleusermapping}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    )
}
export default TransferProjectModal;