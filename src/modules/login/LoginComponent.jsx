import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { setWindowClass } from "@app/utils/helpers";
import { signInAction } from "../../store/reducers/loginSlice/loginSlice";
import Input from "@app/components/formComponent/Input";
import logoitdose from "@app/assets/image/logoitdose.jpg";
import { useLocalStorage } from "@app/utils/hooks/useLocalStorage";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { apiUrls } from "../../networkServices/apiEndpoints";

const LoginComponent = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [t] = useTranslation();
  const convertToFormData = (obj) => {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        console.log(`Appending ${key}: ${obj[key]}`);
        formData.append(key, obj[key]);
      }
    }

    // Debug: Log FormData entries
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    return formData;
  };
  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .min(5, "Must be 5 characters or more")
    //     .max(30, "Must be 30 characters or less")
    //     .required("Required"),
    // }),
    onSubmit: async (values) => {
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: "",
        };
        console.log(values);
        const newdata = { ...values, client: "b2b" };
        const formdata = convertToFormData(newdata);
        axios
          .post(apiUrls?.login, formdata, headers)
          .then((res) => {
            const responseData = res?.data;
            console.log(responseData);

            if (responseData?.status == true) {
              localStorage.setItem("token", responseData.data[0]?.Token);
              localStorage.setItem("ID", responseData.data[0]?.ID);
              localStorage.setItem("username", responseData.data[0]?.username);
              localStorage.setItem("realname", responseData.data[0]?.realname);
              localStorage.setItem("AmountSubmissionIsCancel",responseData.data[0]?.AmountSubmissionIsCancel)
              localStorage.setItem("CrmEmployeeID",responseData.data[0]?.CrmEmployeeID)
              // localStorage.setItem("panelID",responseData.data[0]?.Panel_ID)
              useLocalStorage("theme", "set", "default_theme");

              setWindowClass("hold-transition login-page default_theme");
              navigate("/dashboard");
            } else {
              toast.error(responseData?.message);
            }
          })
          .catch((err) => {
            console.error("Error:", err);
          });
        // await dispatch(signInAction(values));
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
  });
 

  return (
    <>
      <form className="card-primary text-center py-3" onSubmit={handleSubmit}>
        <div className="card-body">
          <h5 className="cardTitle my-3">Welcome to </h5>
          <Link to="/">
            <img className="logoStyle" src={logoitdose} />
          </Link>
          {/* <h5 className="cardTitle my-3"> Sign in to start your session</h5> */}
          <div className="row">
            <div className="col-sm-12 d-flex mt-4">
              <div className="maindiv">
                <Input
                  type="text"
                  className="form-control"
                  id="text"
                  name="username"
                  // lable={t("Username")}
                  placeholder="Enter Username"
                  value={values?.username}
                  onChange={handleChange}
                />
              </div>
              <div className="icondiv">
                <i className="fas fa-envelope" />
              </div>
              {/* {touched.email && errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                ) : ( */}
            </div>
            <div className="col-sm-12 d-flex mt-4">
              <div className="maindiv">
                <Input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  // lable={t("Password")}
                  placeholder="Enter Password"
                  value={values?.password}
                  onChange={handleChange}
                />
              </div>
              <div className="icondiv">
                <i className="fas fa-lock" />
              </div>
              {/* {touched.password && errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                ) : ( */}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 mt-4">
              <button
                className=" btn btn-sm btn-primary btn-block"
                // onClick={handleSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginComponent;
