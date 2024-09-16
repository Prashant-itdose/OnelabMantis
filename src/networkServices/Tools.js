import { setLoading } from "../store/reducers/loadingSlice/loadingSlice";
import store from "../store/store";
import { apiUrls } from "./apiEndpoints";
import makeApiRequest from "./axiosInstance";
import * as XLSX from "xlsx"; // Import the xlsx library
import * as FileSaver from "file-saver";

export const SearchPatient = async (params) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };
    const data = await makeApiRequest(`${apiUrls.SearchPatient}`, options);
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};

export const GetDepartmentWiseDetails = async (
  transactionID,
  Type,
  LedgertransactionNo
) => {
  try {
    const url = `${apiUrls.GetDepartmentWiseDetails}?transactionID=${transactionID}&Type=${Type}&LedgertransactionNo=${LedgertransactionNo}`;
    const data = await makeApiRequest(url, {
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetDepartmentItemDetails = async (params) => {
  store.dispatch(setLoading(true));
  try {
    const options = {
      method: "POST",
      data: params,
    };
    const data = await makeApiRequest(
      `${apiUrls.GetDepartmentItemDetails}`,
      options
    );
    store.dispatch(setLoading(false));
    return data;
  } catch (error) {
    store.dispatch(setLoading(false));
    console.error("Error Found", error);
  }
};

export const GetPanelList = async (
  TransactionID,
  Type,
  LedgerTransactionNo
) => {
  try {
    const url = `${apiUrls.GetPanelList}?TransactionID=${TransactionID}&Type=${Type}&LedgerTransactionNo=${LedgerTransactionNo}`;
    const data = await makeApiRequest(url, {
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const ExportToExcel = async (dataExcel) => {
  const filetype =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  // Convert JSON data to a worksheet
  const ws = XLSX.utils.json_to_sheet(dataExcel);

  // Create a new workbook and append the worksheet
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  // Generate an Excel file in array format
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Create a Blob from the Excel buffer
  const data = new Blob([excelBuffer], { type: filetype });

  // Save the Excel file using FileSaver
  FileSaver.saveAs(data, "excel" + fileExtension);
};

