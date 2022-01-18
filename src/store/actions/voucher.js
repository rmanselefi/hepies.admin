import axios from "axios";
import {
  GET_VOUCHERS,
  VOUCHER_ERROR,
  ADD_VOUCHER,
  UPDATE_VOUCHER,
  DELETE_VOUCHER,
} from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getVouchers = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/voucher");
    console.log(res.data);

    dispatch({
      type: GET_VOUCHERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: VOUCHER_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

//Add Voucher
export const addVoucher = (formData) => async (dispatch) => {
  delete formData.id;
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(apiUrl + "/voucher", formData, config);
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: ADD_VOUCHER,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: VOUCHER_ERROR,
      payload: {
        msg: "error",
        status: "400"
      },
    });
    return null;
  }
};

//Update Voucher
export const updateVoucher = (formData) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      apiUrl + "/voucher/" + formData.id,
      formData,
      config
    );
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: UPDATE_VOUCHER,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: VOUCHER_ERROR,
      payload: {
        msg:"error",
        status: "400"
      },
    });
    return null;
  }
};

//DELETE VOUCHER
export const deleteVoucher = (id) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/voucher/${id}`);
    dispatch({
      type: DELETE_VOUCHER,
      payload: id,
    });
    return id;
  } catch (error) {
    dispatch({
      type: VOUCHER_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};
