import React, { useEffect, useState } from "react";
import ReactSelect from "../../formComponent/ReactSelect";
import Input from "../../formComponent/Input";
import { headers } from "../../../utils/apitools";
import axios from "axios";
import { toast } from "react-toastify";
import { PINCODE_VALIDATION_REGX } from "../../../utils/constant";
import { inputBoxValidation } from "../../../utils/utils";
import Loading from "../../loader/Loading";
import { apiUrls } from "../../../networkServices/apiEndpoints";
const LocalityUpdateTab = (showData) => {
  console.log(showData);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [district, setDistrict] = useState([]);
  const [city, setCity] = useState([]);
  const [productversion, setProductVersion] = useState([]);
  const [formData, setFormData] = useState({
    Country: "",
    State: "",
    District: "",
    City: "",
    ProductVersion: "",
    ClientAddress: "",
    PinCode: "",
  });
  const handleDeliveryChange = (name, e) => {
    const { value } = e;
    if (name == "Country") {
      setFormData({
        ...formData,
        [name]: value,
        State: "",
        District: "",
        City: "",
      });
      setState([]);
      setDistrict([]);
      setCity([]);
      getState(value);
    } else if (name == "State") {
      setFormData({ ...formData, [name]: value, District: "", City: "" });
      setDistrict([]);
      setCity([]);
      getDistrict(formData?.Country,value);
    } else if (name == "District") {
      setFormData({ ...formData, [name]: value, City: "" });
      getCity(formData?.Country,formData?.State,value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSelectChange = (e) => {
    const { name, value, checked, type } = e?.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? "1" : "0") : value,
    });
  };

  const getCountry = () => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      axios
        .post(
         apiUrls?.GetCountry,
          form,
          { headers }
        )
        .then((res) => {
          const countrys = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.CountryID };
          });
          setCountry(countrys);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getState = (value) => {
    let form = new FormData();
    form.append("CountryID", value),
      axios
        .post(
        apiUrls?.GetState,
          form,
          { headers }
        )
        .then((res) => {
          const states = res?.data.data.map((item) => {
            return { label: item?.StateName, value: item?.StateID };
          });
          setState(states);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getDistrict = (country,state) => {
    let form = new FormData();
    form.append("CountryID", formData?.Country?formData?.Country:country),
      form.append("StateID", state),
      axios
        .post(
         apiUrls?.GetDistrict,
          form,
          { headers }
        )
        .then((res) => {
          const states = res?.data.data.map((item) => {
            return { label: item?.District, value: item?.DistrictID };
          });
          setDistrict(states);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getCity = (country,state,district) => {
    let form = new FormData();
    form.append("CountryID", formData?.Country?formData?.Country:country),
      form.append("StateID", formData?.State?formData?.State:state),
      form.append("DistrictID", district),
      axios
        .post(apiUrls?.GetCity, form, {
          headers,
        })
        .then((res) => {
          const states = res?.data.data.map((item) => {
            return { label: item?.City, value: item?.ID };
          });
          setCity(states);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  const getProduct = (value) => {
    let form = new FormData();
    form.append("ID", localStorage?.getItem("ID")),
      form.append("LoginName", localStorage?.getItem("realname")),
      axios
        .post(
          apiUrls?.GetProductVersion,
          form,
          {
            headers,
          }
        )
        .then((res) => {
          const states = res?.data.data.map((item) => {
            return { label: item?.NAME, value: item?.id };
          });
          setProductVersion(states);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  function getlabel(id, dropdownData) {
    const ele = dropdownData.filter((item) => item.value === id);
    return ele.length > 0 ? ele[0].label : "";
  }
  const handleUpdateLocality = () => {
    console.log(formData)
    if (formData?.Country == "") {
      toast.error("Please Select Country.");
    } else if (formData?.State == "") {
      toast.error("Please Select State.");
    } else if (formData?.District == "") {
      toast.error("Please Select District.");
    } else if (formData?.City == "") {
      toast.error("Please Select City.");
    } else {
      setLoading(true);
      let form = new FormData();
      form.append("ID", localStorage?.getItem("ID")),
        form.append("LoginName", localStorage?.getItem("realname")),
        form.append("ProjectID", showData?.tableData?.Id),
        form.append("Country", getlabel(formData?.Country, country)),
        form.append("State", getlabel(formData?.State, state)),
        form.append("District", getlabel(formData?.District, district)),
        form.append("City", getlabel(formData?.City, city)),
        form.append("ProducVersiontId", formData?.ProductVersion),
        form.append("ClientAddress", formData?.ClientAddress),
        form.append("Pincode", formData?.PinCode),
        form.append("CountryID", formData?.Country),
        form.append("StateId", formData?.State),
        form.append("DistrictID", formData?.District),
        form.append("CityId", formData?.City),
        axios
          .post(
           apiUrls?.UpdateLocality,
            form,
            {
              headers,
            }
          )
          .then((res) => {
            toast.success(res?.data?.message);
            // setFormData({
            //   ...formData,
            //   Country: "",
            //   State: "",
            //   District: "",
            //   City: "",
            //   ProductVersion: "",
            //   ClientAddress: "",
            //   PinCode: "",
            // });
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
    }
  };
  const filldetails = () => {
    getState(showData?.tableData?.CountryID);
    getDistrict(showData?.tableData?.CountryID,showData?.tableData?.StateID);
    getCity(showData?.tableData?.CountryID,showData?.tableData?.StateID,showData?.tableData?.DistrictID);
    setFormData({
      ...formData,
      Country: showData?.tableData?.CountryID,
      State: showData?.tableData?.StateID,
      District: showData?.tableData?.DistrictID,
      City: showData?.tableData?.CityID,
      ProductVersion: showData?.tableData?.productid,
      ClientAddress: showData?.tableData?.Address,
      PinCode: showData?.tableData?.pincode,
      ProjectID: showData?.tableData?.Id,
    });
  };

  useEffect(() => {
    getCountry();
    getProduct();
    filldetails();
  }, []);
  return (
    <>
      <div className="card LocalityCard border p-2">
        <div className="row">
          <ReactSelect
            respclass="col-md-4 col-12 col-sm-12"
            name="Country"
            placeholderName="Country"
            dynamicOptions={country}
            handleChange={handleDeliveryChange}
            value={formData.Country}
          />
          <ReactSelect
            respclass="col-md-4 col-12 col-sm-12"
            name="State"
            placeholderName="State"
            dynamicOptions={state}
            handleChange={handleDeliveryChange}
            value={formData.State}
          />
          <ReactSelect
            respclass="col-md-4 col-12 col-sm-12"
            name="District"
            placeholderName="District"
            dynamicOptions={district}
            handleChange={handleDeliveryChange}
            value={formData.District}
          />
          <ReactSelect
            respclass="col-md-4 col-12 col-sm-12"
            name="City"
            placeholderName="City"
            dynamicOptions={city}
            handleChange={handleDeliveryChange}
            value={formData.City}
          />
          <ReactSelect
            respclass="col-md-4 col-12 col-sm-12"
            name="ProductVersion"
            placeholderName="ProductVersion"
            dynamicOptions={productversion}
            handleChange={handleDeliveryChange}
            value={formData.ProductVersion}
          />
          <Input
            type="text"
            className="form-control"
            id="ClientAddress"
            name="ClientAddress"
            lable="Client Address"
            placeholder=" "
            max={20}
            onChange={handleSelectChange}
            value={formData?.ClientAddress}
            respclass="col-md-4 col-12 col-sm-12"
          />
          <Input
            type="text"
            className="form-control"
            id="PinCode"
            name="PinCode"
            lable="PinCode"
            placeholder=" "
            max={20}
            onChange={(e) => {
              inputBoxValidation(
                PINCODE_VALIDATION_REGX,
                e,
                handleSelectChange
              );
            }}
            value={formData?.PinCode}
            respclass="col-md-4 col-12 col-sm-12"
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="col-2">
              <button
                className="btn btn-sm btn-success"
                onClick={handleUpdateLocality}
              >
                Update
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default LocalityUpdateTab;
