import Input from "@app/components/formComponent/Input";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactSelect from "../formComponent/ReactSelect";
import PaymentTable from "../UI/customTable/paymentTable";
import Modal from "../modalComponent/Modal";
import {
  BindPaymentModePanelWise,
  GetConversionFactor,
  LoadCurrencyDetail,
  getBankMaster,
  getConvertCurrency,
} from "../../networkServices/PaymentGatewayApi";
import {
  handleReactSelectDropDownOptions,
  inputBoxValidation,
  notify,
  reactSelectOptionList,
} from "../../utils/utils";
import {
  AMOUNT_REGX,
  OBJECT_PAYMENTMODE,
  ROUNDOFF_VALUE,
} from "../../utils/constant";
import store from "../../store/store";
import { GetSwipMachine } from "../../networkServices/opdserviceAPI";

const PaymentGateway = (props) => {
  const {
    screenType,
    setScreenType,
    button,
    paymentMethod,
    setPaymentMethod,
    discounts,
  } = props;
  const [t] = useTranslation();

  const [dropDown, setDropDown] = useState({
    currencyDetail: [],
    getBindPaymentMode: [],
    getBankMasterData: [],
    getMachineData: [],
  });

  const [currencyData, setCurrencyData] = useState({
    getConvertCurrecncyValue: null,
    selectedCurrency: null,
    apivalue: null,
    notation: null,
    defaultCurrency: null,
  });

  const [handleModelData, setHandleModelData] = useState({});

  const handleModel = (label, width, type, isOpen, Component) => {
    setHandleModelData({
      label: label,
      width: width,
      type: type,
      isOpen: isOpen,
      Component: Component,
    });
  };

  const setIsOpen = () => {
    setHandleModelData((val) => ({ ...val, isOpen: false }));
  };

  /**
   *
   * @param {API Call Conversion factor} data
   */
  const handleGetConversionFactor = async (data) => {
    const { CountryID } = data;
    try {
      const apiResponse = await GetConversionFactor(CountryID);
      return apiResponse?.data;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   * @param {API Call Convert Currency} data
   */
  const handlegetConvertCurrency = async (data, balanceAmount) => {
    const { CountryID } = data;
    try {
      const data = await getConvertCurrency(CountryID, balanceAmount);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Function to add payment mode
  const handleAddPaymentMode = async (e, currencyData) => {
    if (
      paymentMethod.some(
        (data) =>
          data?.PaymentMode === e.label &&
          data?.PaymentModeID === e.value &&
          data?.S_CountryID === currencyData?.defaultCurrency
      )
    ) {
      return store.dispatch(notify("paymentMode is already exist!", "error"));
    }
    const addObject = { ...OBJECT_PAYMENTMODE };
    const appendData = Number(e.value) === 4 ? [] : [...paymentMethod];

    addObject.PaymentMode = e.label;
    addObject.PaymentModeID = e.value;

    addObject.S_Amount =
      Number(e.value) === 4 ? 0 : currencyData?.getConvertCurrecncyValue;

    addObject.BaseCurrency = currencyData?.notation;

    addObject.S_Notation = currencyData?.selectedCurrency;

    addObject.C_Factor = currencyData?.apivalue;

    addObject.Amount = parseFloat(
      Number(addObject.S_Amount) * Number(addObject.C_Factor)
    ).toFixed(ROUNDOFF_VALUE);

    appendData.push(addObject);

    settleValue(appendData, currencyData);
    setPaymentMethod(appendData);
  };

  console.log("paymentMethod", paymentMethod);

  /**
   *
   * @param {React Select Handle Change}
   * @param {is handle change per meri handleGetConversionFactor & handlegetConvertCurrency yeh dono api call ho rahi hai...}
   * @param {isme handleAddPaymentMode() yeh function table add kar raha hai}
   */

  const currencyfunctionCall = async (e) => {
    const data = await handleGetConversionFactor(e);

    const { balanceAmountValue } = calculateNetAmountAndRoundOff(
      screenType?.billAmount,
      Number(screenType?.discountAmount),
      screenType?.constantMinimumPayableAmount,
      paymentMethod
    );

    debugger
    const secondData = await handlegetConvertCurrency(e, balanceAmountValue);

    OBJECT_PAYMENTMODE.S_Currency = e.label;
    OBJECT_PAYMENTMODE.S_CountryID = e.value;

    return { data, secondData };
  };

  const PaymentModefunctionCall = async (e, currencyData) => {
    if (e.label && e.value) {
      await handleAddPaymentMode(e, currencyData);
    } else {
      settleValue(paymentMethod, currencyData);
    }
  };

  const handleReactChange = async (name, e) => {
    console.log(e);
    switch (name) {
      case "currency":
        const response = await currencyfunctionCall(e);

        setCurrencyData({
          selectedCurrency: e.Currency,
          apivalue: response?.data,
          notation: e.B_Currency,
          getConvertCurrecncyValue: response?.secondData,
          defaultCurrency: e.value,
        });

        break;
      case "PaymentMode":
        if (
          [0, "0", "", null].includes(currencyData?.getConvertCurrecncyValue) &&
          Number(e.value) !== 4
        ) {
          notify("Amount is Fully Paid", "error");
          return;
        }
        PaymentModefunctionCall(e, currencyData);

        setCurrencyData({ ...currencyData, defaultPaymentMode: e.value });
        break;

      default:
        return () => {}; // Return a no-op function for the default case
    }
  };

  // Payment Control  API Implement...

  const fetchCurrencyDetail = async () => {
    try {
      const data = await LoadCurrencyDetail();
      return data?.data;
    } catch (error) {
      console.error("Failed to load currency detail:", error);
    }
  };

  const fetchPaymentMode = async () => {
    try {
      const data = await BindPaymentModePanelWise({
        PanelID: screenType?.panelID,
      });
      return data?.data;
    } catch (error) {
      console.error("Failed to load currency detail:", error);
    }
  };

  const fetchGetBankMaster = async () => {
    try {
      const data = await getBankMaster();
      return data?.data;
    } catch (error) {
      console.error("Failed to load currency detail:", error);
    }
  };

  const fetchGetSwipMachine = async () => {
    try {
      const data = await GetSwipMachine();
      return data?.data;
    } catch (error) {
      console.error("Failed to load currency detail:", error);
    }
  };

  const FetchAllDropDown = async () => {
    try {
      const response = await Promise.all([
        fetchCurrencyDetail(),
        fetchPaymentMode(),
        fetchGetBankMaster(),
        fetchGetSwipMachine(),
      ]);

      setDropDown({
        ...dropDown,
        currencyDetail: response[0],
        getBindPaymentMode: response[1],
        getBankMasterData: response[2],
        getMachineData: response[3],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    FetchAllDropDown();

    return () => {
      OBJECT_PAYMENTMODE.S_Currency = "";
      OBJECT_PAYMENTMODE.S_CountryID = "";
    };
  }, []);

  // Function to check and return the net amount or minimum payable amount
  const checkerNetAmountandPatientPayable = (
    netAmount,
    minimumPayableAmount
  ) => {
    if (netAmount > minimumPayableAmount) {
      return minimumPayableAmount;
    } else {
      return netAmount;
    }
  };

  // Function to calculate various amounts including net amount, round off, etc.
  const calculateNetAmountAndRoundOff = (
    grossAmount,
    DiscountAmount,
    constantMinimumPayableAmount,
    paymentModeList
  ) => {
    const netAmount = Math.round(
      parseFloat(grossAmount) - parseFloat(DiscountAmount)
    ).toFixed(ROUNDOFF_VALUE);

    const minimumPayableAmount = checkerNetAmountandPatientPayable(
      netAmount,
      constantMinimumPayableAmount
    );

    const roundOff = (
      netAmount -
      (parseFloat(grossAmount) - parseFloat(DiscountAmount))
    ).toFixed(ROUNDOFF_VALUE);

    const { discountPercentage } = calculateDiscountPercentage(
      parseFloat(DiscountAmount).toFixed(ROUNDOFF_VALUE),
      grossAmount
    );

    const panelPayable = (netAmount - minimumPayableAmount).toFixed(
      ROUNDOFF_VALUE
    );

    const paidAmount = findPaidAmount(paymentModeList).toFixed(ROUNDOFF_VALUE);

    const balanceAmount = (minimumPayableAmount - paidAmount).toFixed(
      ROUNDOFF_VALUE
    ); // paidamount;

    const coPayAmount = (
      screenType?.coPayAmount ? Number(screenType?.coPayAmount) : 0.0
    ).toFixed(ROUNDOFF_VALUE);

    const coPayPercent = (
      screenType?.coPayPercent ? Number(screenType?.coPayPercent) : 0.0
    ).toFixed(ROUNDOFF_VALUE);

    return {
      roundOffValue: roundOff,
      netAmountValue: netAmount,
      panelPayableValue: panelPayable,
      paidAmountValue: paidAmount,
      minimumPayableAmountValue: minimumPayableAmount,
      balanceAmountValue: balanceAmount,
      discountPercentageValue: discountPercentage.toFixed(ROUNDOFF_VALUE),
      coPayAmount: coPayAmount,
      coPayPercent: coPayPercent,
    };
  };

  // Function to calculate discount percentage
  const calculateDiscountPercentage = (discountAmount, grossAmount) => {
    const discountPercentage =
      grossAmount > 0
        ? ((discountAmount * 100) / grossAmount).toFixed(ROUNDOFF_VALUE)
        : (0.0).toFixed(ROUNDOFF_VALUE);
    return { discountPercentage: Number(discountPercentage) };
  };

  // Function to calculate discount amount based on percentage
  const calculateDiscountAmount = (percentage, grossAmount) => {
    return ((grossAmount * percentage) / 100).toFixed(ROUNDOFF_VALUE);
  };

  // Function to calculate co-pay percentage

  const calculateCoPayPercent = (copay, netAmount) => {
    const discountPercentage = ((copay * 100) / netAmount).toFixed(
      ROUNDOFF_VALUE
    );
    return discountPercentage;
  };

  // Function to calculate co-pay amount based on percentage

  const calaculateCoPayAmount = (coPayPercent, netAmount) => {
    return (netAmount * coPayPercent) / 100;
  };

  // Function to find total paid amount from the payment mode list

  const findPaidAmount = (paymentModeList) => {
    return paymentModeList?.length > 0
      ? paymentModeList?.reduce(
          (acc, current) => acc + Number(current?.Amount),
          0
        )
      : 0;
  };

  // Function to handle change in co-pay percentage amount

  const handleCoPayPercentageAmt = (e) => {
    const { name, value } = e.target;
    setPaymentMethod([]);
    if (value <= 100) {
      const copayAmount = calaculateCoPayAmount(value, screenType?.netAmount);
      const {
        roundOffValue,
        netAmountValue,
        panelPayableValue,
        paidAmountValue,
        balanceAmountValue,
        discountPercentageValue,
        minimumPayableAmountValue,
      } = calculateNetAmountAndRoundOff(
        screenType?.billAmount,
        Number(screenType?.discountAmount),
        Number(copayAmount)
          ? Number(copayAmount)
          : screenType?.constantMinimumPayableAmount,
        paymentMethod
      );

      setScreenType({
        ...screenType,
        roundOff: roundOffValue,
        netAmount: netAmountValue,
        panelPayable: panelPayableValue,
        balanceAmount: balanceAmountValue,
        discountPercentage: discountPercentageValue,
        minimumPayableAmount: minimumPayableAmountValue,
        paidAmount: paidAmountValue,
        coPayAmount: copayAmount,
        [name]: value,
      });
    }
  };

  // Function to settle values in the screen type state

  const settleValue = async (paymentModeList, currencyDatas) => {
    const {
      roundOffValue,
      netAmountValue,
      panelPayableValue,
      balanceAmountValue,
      paidAmountValue,
      discountPercentageValue,
      minimumPayableAmountValue,
      coPayAmount,
      coPayPercent,
    } = calculateNetAmountAndRoundOff(
      screenType?.billAmount,
      Number(screenType?.discountAmount),
      screenType?.constantMinimumPayableAmount,
      paymentModeList
    );
    setScreenType({
      ...screenType,
      roundOff: roundOffValue,
      netAmount: netAmountValue,
      panelPayable: panelPayableValue,
      balanceAmount: balanceAmountValue,
      paidAmount: paidAmountValue,
      discountPercentage: discountPercentageValue,
      minimumPayableAmount: minimumPayableAmountValue,
      coPayAmount: coPayAmount,
      coPayPercent: coPayPercent,
    });

    const data = await handlegetConvertCurrency(
      { CountryID: currencyDatas?.defaultCurrency },
      balanceAmountValue
    );

    const finalData = {
      ...currencyDatas,
      getConvertCurrecncyValue: data,
    };

    setCurrencyData(finalData);
  };

  // Function to handle change in various amounts

  const handleCoPayAmount = (e) => {
    const { name, value } = e.target;
    setPaymentMethod([]);
    if (value <= screenType?.netAmount) {
      const copayPercentageValue = calculateCoPayPercent(
        Number(value),
        screenType?.netAmount
      );
      const {
        roundOffValue,
        netAmountValue,
        panelPayableValue,
        paidAmountValue,
        balanceAmountValue,
        discountPercentageValue,
        minimumPayableAmountValue,
      } = calculateNetAmountAndRoundOff(
        screenType?.billAmount,
        Number(screenType?.discountAmount),
        Number(value)
          ? Number(value)
          : screenType?.constantMinimumPayableAmount,
        paymentMethod
      );

      setScreenType({
        ...screenType,
        roundOff: roundOffValue,
        netAmount: netAmountValue,
        panelPayable: panelPayableValue,
        balanceAmount: balanceAmountValue,
        discountPercentage: discountPercentageValue,
        paidAmount: paidAmountValue,
        minimumPayableAmount: minimumPayableAmountValue,
        coPayPercent: copayPercentageValue,
        [name]: value,
      });
    }
  };

  const handleChangeDiscountAmt = async (e) => {
    const { name, value } = e.target;
    const floatValue = value;
    setPaymentMethod([]);
    debugger;

    if (
      Number(floatValue).toFixed(ROUNDOFF_VALUE) <=
      Number(screenType?.billAmount)
    ) {
      const {
        roundOffValue,
        netAmountValue,
        panelPayableValue,
        balanceAmountValue,
        paidAmountValue,
        discountPercentageValue,
        minimumPayableAmountValue,
      } = calculateNetAmountAndRoundOff(
        screenType?.billAmount,
        Number(floatValue),
        screenType?.constantMinimumPayableAmount,
        []
      );

      setScreenType({
        ...screenType,
        roundOff: roundOffValue,
        netAmount: netAmountValue,
        panelPayable: panelPayableValue,
        paidAmount: paidAmountValue,
        balanceAmount: balanceAmountValue,
        discountPercentage: discountPercentageValue,
        minimumPayableAmount: minimumPayableAmountValue,
        coPayAmount: 0.0,
        coPayPercent: 0.0,
        [name]: floatValue,
      });
    }
  };

  const handleChangeDiscount = (e) => {
    let { name, value } = e.target;
    if (name === "discountPercentage") {
      value =
        value > discounts?.Eligible_DiscountPercent
          ? discounts?.Eligible_DiscountPercent
          : value;
    }
    setPaymentMethod([]);
    if (value <= 100) {
      const amount = calculateDiscountAmount(value, screenType?.billAmount);
      const {
        roundOffValue,
        netAmountValue,
        panelPayableValue,
        balanceAmountValue,
        paidAmountValue,
        minimumPayableAmountValue,
      } = calculateNetAmountAndRoundOff(
        screenType?.billAmount,
        Number(amount),
        screenType?.constantMinimumPayableAmount,
        []
      );

      setScreenType({
        ...screenType,
        discountAmount: amount,
        roundOff: roundOffValue,
        netAmount: netAmountValue,
        panelPayable: panelPayableValue,
        paidAmount: paidAmountValue,
        balanceAmount: balanceAmountValue,
        minimumPayableAmount: minimumPayableAmountValue,
        coPayAmount: 0.0,
        coPayPercent: 0.0,
        [name]: value,
      });
    }
  };

  const handlePaymentTableChange = (e, index) => {
    const { name, value } = e.target;
    const data = JSON.parse(JSON.stringify([...paymentMethod]));
    if (name === "S_Amount") {
      data[index]["Amount"] = parseFloat(
        Number(value) * data[index]["C_Factor"]
      ).toFixed(ROUNDOFF_VALUE);

      const paidAmount = findPaidAmount(data);

      if (Number(paidAmount) <= Number(screenType?.minimumPayableAmount)) {
        data[index][name] = value;
        setPaymentMethod(data);
        settleValue(data, currencyData);
      }
    } else {
      data[index][name] = value;
      setPaymentMethod(data);
    }
  };

  const handlePaymentRemove = (index) => {
    const data = JSON.parse(JSON.stringify([...paymentMethod]));
    const filterData = data.filter((_, ind) => ind !== index);
    setPaymentMethod(filterData);
    settleValue(filterData, currencyData);
  };

  useEffect(() => {
    asyncEffect();
  }, [screenType?.constantMinimumPayableAmount, screenType?.billAmount]);

  const asyncEffect = async () => {
    if (
      dropDown?.currencyDetail?.length > 0 &&
      dropDown?.getBindPaymentMode?.length > 0
    ) {
      const data = handleReactSelectDropDownOptions(
        dropDown?.currencyDetail,
        "Currency",
        "CountryID"
      )?.find((ele) => ele?.IsBaseCurrency);

      const secondData = dropDown?.getBindPaymentMode.find(
        (ele) => ele?.PaymentModeID === Number(screenType?.autoPaymentMode)
      );

      const response1 = await currencyfunctionCall(data);

      const finalResponse = {
        selectedCurrency: data.Currency,
        apivalue: response1?.data,
        notation: data.B_Currency,
        getConvertCurrecncyValue: response1?.secondData,
        defaultCurrency: data.value,
        defaultPaymentMode: screenType?.autoPaymentMode,
      };

      await PaymentModefunctionCall(
        {
          label: secondData?.PaymentMode,
          value: secondData?.PaymentModeID,
        },
        finalResponse
      );
    }
  };

  const handleBlurFunction = async () => {
    debugger;
    // document.getElementById("defaultPaymentMode").value = null;
    const data = handleReactSelectDropDownOptions(
      dropDown?.currencyDetail,
      "Currency",
      "CountryID"
    )?.find((ele) => ele?.IsBaseCurrency);

    const secondData = dropDown?.getBindPaymentMode.find(
      (ele) => ele?.PaymentModeID === Number(screenType?.autoPaymentMode)
    );
    // // document.getElementById("defaultCurrency").value = data?.value;
    const response1 = await currencyfunctionCall(data);

    const finalResponse = {
      selectedCurrency: data.Currency,
      apivalue: response1?.data,
      notation: data.B_Currency,
      getConvertCurrecncyValue: response1?.secondData,
      defaultCurrency: data.value,
      defaultPaymentMode: null,
    };

    await PaymentModefunctionCall(
      {
        label: secondData?.PaymentMode,
        value: secondData?.PaymentModeID,
      },
      finalResponse
    );
  };

  const handlePaymentModeDropdOwnFilter = (dropdownData, type) => {
    switch (type) {
      case 1:
        return dropdownData.filter((item) => item?.IsForRefund === 1);
      case 2:
        return dropdownData.filter((item) => item?.IsForAdvance === 1);
      case 3:
        return dropdownData.filter((item) => item?.PaymentModeID !== 4);
      default:
        return dropdownData;
    }
  };

  const handlePaymentDropdown = useMemo(() => {
    const dropDownData = handlePaymentModeDropdOwnFilter(
      dropDown?.getBindPaymentMode,
      screenType?.refund
    );

    return dropDownData?.map((ele) => {
      return {
        label:
          ele?.PaymentModeID === 7
            ? `${ele?.PaymentMode}  (${screenType?.patientAdvanceAmount})`
            : ele?.PaymentMode,
        value: ele?.PaymentModeID,
      };
    });
  }, [dropDown?.getBindPaymentMode, screenType?.refund]);

  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    const data = value
      ? Number(
          Number(value).toFixed(ROUNDOFF_VALUE) - screenType?.paidAmount
        ).toFixed(ROUNDOFF_VALUE)
      : "";
    setScreenType({ ...screenType, [name]: data });
  };

  console.log(screenType);

  return screenType?.billAmount ? (
    <>
      <div className="row  g-4 pt-2 ">
        <div className="col-md-7 col-sm-12">
          <div className="card">
            <div className="row p-2">
              <div className="col-md-2">
                <ReactSelect
                  placeholderName={t(
                    "FrontOffice.OPD.PaymentGateway.label.Currency"
                  )}
                  searchable="true"
                  respclass=""
                  name="currency"
                  id={"Currency"}
                  dynamicOptions={handleReactSelectDropDownOptions(
                    dropDown?.currencyDetail,
                    "Currency",
                    "CountryID"
                  )}
                  value={currencyData?.defaultCurrency}
                  handleChange={handleReactChange}
                />
              </div>
              <div className="col-md-3">
                <ReactSelect
                  placeholderName={t(
                    "FrontOffice.OPD.PaymentGateway.label.PaymentMode"
                  )}
                  searchable="true"
                  respclass=""
                  name="PaymentMode"
                  id={"defaultPaymentMode"}
                  dynamicOptions={handlePaymentDropdown}
                  value={currencyData?.defaultPaymentMode}
                  handleChange={handleReactChange}
                />
              </div>

              <Input
                type="text"
                className="form-control "
                id="CurrencyRound"
                name="CurrencyRound"
                removeFormGroupClass={false}
                lable={t("FrontOffice.OPD.PaymentGateway.label.Remark")}
                placeholder=" "
                required={true}
                respclass="col-md-3"
                // onKeyDown={Tabfunctionality}
              />

              <div className="col-md-4">
                <label className="inrkey mx-2">
                  <span>
                    {Number(currencyData?.getConvertCurrecncyValue).toFixed(4)}{" "}
                  </span>
                  <span>{currencyData?.selectedCurrency}</span>
                </label>

                <label>
                  {t("FrontOffice.OPD.PaymentGateway.label.Factor")} :
                </label>
                <label>
                  1 <span>{currencyData?.selectedCurrency}</span> ={" "}
                  <span>{currencyData?.apivalue}</span>{" "}
                  <span>{currencyData?.notation}</span>
                </label>
              </div>
            </div>

            <PaymentTable
              getBankMasterData={dropDown?.getBankMasterData}
              getMachineData={dropDown?.getMachineData}
              tbody={paymentMethod}
              handleChange={handlePaymentTableChange}
              handlePaymentRemove={handlePaymentRemove}
            />
          </div>
        </div>
        <div className="col-md-5 col-sm-12">
          <div className="card">
            <div className="row p-2">
              <Input
                type="text"
                className="form-control "
                id="billAmount"
                name="billAmount"
                removeFormGroupClass={false}
                lable={t("FrontOffice.OPD.PaymentGateway.label.Gross_Amount")}
                placeholder=""
                display="right"
                required={true}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                disabled={true}
                value={screenType?.billAmount}
              />
              <Input
                type="text"
                className="form-control "
                id="DiscountAmt"
                name="discountAmount"
                removeFormGroupClass={false}
                display="right"
                lable={t("FrontOffice.OPD.PaymentGateway.label.Discount_Amt")}
                placeholder=" "
                value={screenType?.discountAmount}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                disabled={
                  screenType?.discountIsDefault === 1
                    ? true
                    : screenType?.disableDiscount
                }
                onChange={(e) => {
                  inputBoxValidation(
                    AMOUNT_REGX(100),
                    e,
                    handleChangeDiscountAmt
                  );
                }}
                // onChange={handleChangeDiscountAmt}
                onBlur={() => {
                  handleBlurFunction();
                }}
              />

              <Input
                type="text"
                className="form-control "
                id="NetAmount"
                name="netAmount"
                removeFormGroupClass={false}
                lable={t("FrontOffice.OPD.PaymentGateway.label.Net_Amount")}
                placeholder=" "
                display="right"
                value={screenType?.netAmount}
                required={true}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                disabled={true}
              />

              <Input
                type="text"
                className="form-control "
                id="Co-PayAmount"
                removeFormGroupClass={false}
                name="coPayAmount"
                lable={t("FrontOffice.OPD.PaymentGateway.label.Co-Pay_Amount")}
                placeholder=" "
                required={true}
                display="right"
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                disabled={screenType?.coPayIsDefault === 1 ? true : false}
                value={screenType?.coPayAmount}
                onChange={(e) => {
                  inputBoxValidation(AMOUNT_REGX(100), e, handleCoPayAmount);
                }}
                onBlur={handleBlurFunction}
              />

              <Input
                type="text"
                className="form-control"
                id="Discountin"
                removeFormGroupClass={false}
                lable={t("FrontOffice.OPD.PaymentGateway.label.Discount_in%")}
                placeholder=" "
                required={true}
                display="right"
                name={"discountPercentage"}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                disabled={
                  screenType?.discountIsDefault === 1
                    ? true
                    : screenType?.disableDiscount
                }
                value={screenType?.discountPercentage}
                onChange={(e) => {
                  inputBoxValidation(AMOUNT_REGX(100), e, handleChangeDiscount);
                }}
                onBlur={handleBlurFunction}
              />

              <Input
                type="text"
                className="form-control"
                id="PatientPayable"
                name="PatientPayable"
                removeFormGroupClass={false}
                lable={t(
                  "FrontOffice.OPD.PaymentGateway.label.Patient_Payable"
                )}
                display="right"
                placeholder=" "
                required={true}
                value={screenType?.minimumPayableAmount}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                // onKeyDown={Tabfunctionality}
                disabled={true}
              />
              {/* //// */}
              <Input
                type="text"
                className="form-control "
                id="Co-PayPercent"
                name="coPayPercent"
                lable={t("FrontOffice.OPD.PaymentGateway.label.Co-Pay_Percent")}
                placeholder=" "
                required={true}
                display="right"
                removeFormGroupClass={false}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                disabled={screenType?.coPayIsDefault === 1 ? true : false}
                value={screenType?.coPayPercent}
                onChange={(e) => {
                  inputBoxValidation(
                    AMOUNT_REGX(100),
                    e,
                    handleCoPayPercentageAmt
                  );
                }}
                onBlur={handleBlurFunction}
              />

              <Input
                type="text"
                className="form-control "
                id="RoundOff"
                name="RoundOff"
                lable={t("FrontOffice.OPD.PaymentGateway.label.Round_Off")}
                placeholder=" "
                removeFormGroupClass={false}
                display="right"
                value={screenType?.roundOff}
                required={true}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                disabled={true}
              />

              <Input
                type="text"
                className="form-control "
                id="PanelPayable"
                name="PanelPayable"
                lable={t("FrontOffice.OPD.PaymentGateway.label.Panel_Payable")}
                placeholder=" "
                removeFormGroupClass={false}
                required={true}
                display="right"
                value={screenType?.panelPayable}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                disabled={true}
              />

              <Input
                type="text"
                className="form-control "
                id="PaidAmount"
                name="PaidAmount"
                removeFormGroupClass={false}
                lable={t("FrontOffice.OPD.PaymentGateway.label.Paid_Amount")}
                placeholder=" "
                required={true}
                display="right"
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                // onKeyDown={Tabfunctionality}
                disabled={true}
                value={screenType?.paidAmount}
              />

              <Input
                type="text"
                className="form-control "
                id="BalanceAmount"
                name="balanceAmount"
                removeFormGroupClass={false}
                lable={t("FrontOffice.OPD.PaymentGateway.label.Balance_Amount")}
                placeholder=" "
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                disabled={true}
                display="right"
                value={screenType?.balanceAmount}
              />
              <div className="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12">
                <div className="row">
                  <Input
                    type="text"
                    className="form-control"
                    lable={t("FrontOffice.OPD.PaymentGateway.label.Charge")}
                    respclass="col-6"
                    name="charge"
                    display="right"
                    onChange={(e) => {
                      inputBoxValidation(
                        AMOUNT_REGX(100),
                        e,
                        handleAmountChange
                      );
                    }}
                  />

                  <Input
                    type="text"
                    className="form-control text-danger"
                    value={screenType?.charge}
                    lable={t("FrontOffice.OPD.PaymentGateway.label.Return")}
                    respclass="col-6"
                    display="right"
                    disabled={true}
                  />
                </div>
              </div>

              <ReactSelect
                placeholderName={"Discount Reason"}
                id={"SR"}
                searchable={true}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                isDisabled={screenType?.discountAmount > 0 ? false : true}
                dynamicOptions={reactSelectOptionList(
                  discounts?.discountReasonList,
                  "DiscountReason",
                  "ID"
                )}
                // respclass="col-xl-2.5 col-md-3 col-sm-4 col-12 input-text"
              />

              <ReactSelect
                placeholderName={"Approved By"}
                id={"AB"}
                searchable={true}
                respclass="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12"
                isDisabled={screenType?.discountAmount > 0 ? false : true}
                dynamicOptions={reactSelectOptionList(
                  discounts?.discountApprovalList,
                  "ApprovalType",
                  "ID"
                )}
                // respclass="col-xl-2.5 col-md-3 col-sm-4 col-12 input-text"
              />

              <div class="col-xl-4 col-sm-6 col-lg-4 col-md-4 col-lg-4 col-xl-4 col-xxl-3 col-6 col-12 formsec1">
                {button}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {handleModelData?.isOpen && (
        <Modal
          visible={handleModelData?.isOpen}
          setVisible={setIsOpen}
          modalWidth={handleModelData?.width}
          Header={t(handleModelData?.label)}
        >
          {handleModelData?.Component}
        </Modal>
      )}
    </>
  ) : (
    <></>
  );
};

export default PaymentGateway;
