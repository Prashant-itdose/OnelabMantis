import React, { useEffect, useState } from "react";
import Heading from "../components/UI/Heading";
import Input from "../components/formComponent/Input";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import axios from "axios";
import { headers } from "../utils/apitools";
import { inputBoxValidation } from "../utils/utils";
import { MOBILE_NUMBER_VALIDATION_REGX } from "../utils/constant";
import { toast } from "react-toastify";
import Loading from "../components/loader/Loading";
import ReactSelect from "../components/formComponent/ReactSelect";
import { apiUrls } from "../networkServices/apiEndpoints";

const EmployeeChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [reporter, setReporter] = useState([]);
    const [formData, setFormData] = useState({
        Password: "",
        Reporter: "",
    })
    const handleSelectChange = (e) => {
        const { name, value, checked, type } = e?.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
        });
    };


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
    const getChangePassword = () => {
        setLoading(true)
        if (formData?.Reporter == "") {
            toast.error("Please Select User.");
            setLoading(false)
        } else {
            let form = new FormData();
            form.append("ID", localStorage?.getItem("ID")),
                form.append("LoginName", localStorage?.getItem("realname")),
                form.append("UserID", formData?.Reporter),
                form.append("Password", formData?.Password),
                axios
                    .post(
                        apiUrls?.ChangePassword,
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
        };
    }
    const handleDeliveryChange = (name, e) => {
        const { value } = e;
        console.log(value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(() => {
        getReporter()
    }, [])
    return (
        <>
            <div className="card  border mt-2">
                <Heading title="Basic Information" />
                <div className="row g-4 m-2">
                    <ReactSelect
                        respclass="col-xl-2 col-md-4 col-sm-6 col-12"
                        name="Reporter"
                        placeholderName="User"
                        dynamicOptions={reporter}
                        value={formData?.Reporter}
                        handleChange={handleDeliveryChange}
                    />

                    <Input
                        type="password"
                        className="form-control"
                        id="Password"
                        name="Password"
                        lable="Password"
                        placeholder=" "
                        max={20}
                        // onChange={(e) => {
                        //     inputBoxValidation(
                        //         MOBILE_NUMBER_VALIDATION_REGX,
                        //         e,
                        //         handleSelectChange
                        //     );
                        // }}
                        onChange={handleSelectChange}
                        value={formData?.Password}
                        respclass="col-xl-2 col-md-4 col-sm-4 col-12"
                    />
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="col-3 col-sm-4 d-flex">
                            <button
                                className="btn btn-sm btn-success ml-2"
                                onClick={getChangePassword}
                            >
                                Save
                            </button>
                        </div>)}
                </div>
            </div>
        </>
    )
}

export default EmployeeChangePassword;