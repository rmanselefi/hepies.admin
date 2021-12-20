import axios from "axios";
import { PRES_ERROR, GET_PRESCRIPTIONS, GET_PRESCRIPTION_PAPER } from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getPrescriptions = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/prescription");
    console.log(res.data);

    dispatch({
      type: GET_PRESCRIPTIONS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getPrescriptionPaper = (code) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/prescription/paper/" + code);
    console.log(res.data);

    dispatch({
      type: GET_PRESCRIPTION_PAPER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
