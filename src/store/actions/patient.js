import axios from "axios";
import {
  GET_PATIENTS,  
  PATIENT_ERROR,
  ADD_PATIENT,
  UPDATE_PATIENT,
  DELETE_PATIENT,
} from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getPatients = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/patient");
    console.log(res.data);

    dispatch({
      type: GET_PATIENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

//Add Patient
export const addPatient = (formData) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(apiUrl + "/patient", formData, config);
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: ADD_PATIENT,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};

//Add Patient
export const updatePatient = (formData) => async (dispatch) => {
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
      apiUrl + "/patient/" + formData.id,
      formData,
      config
    );
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: UPDATE_PATIENT,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_ERROR,
      payload: {
        msg: "error",
        status:"400"
      },
    });
    return null;
  }
};

//DELETE PATIENT
export const deletePatient = (id) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/patient/${id}`);

    dispatch({
      type: DELETE_PATIENT,
      payload: id,
    });
    return id;
  } catch (error) {
    dispatch({
      type: PATIENT_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};
