import axios from "axios";
import {
  GET_DRUGS,
  DRUG_ERROR,
  ADD_DRUG,
  UPDATE_DRUG,
  DELETE_DRUG,
  GET_INSTRUMENT,
  LOADING_TOGGLE,
} from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getDrugs = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/drugs");
    console.log(res.data);

    dispatch({
      type: GET_DRUGS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DRUG_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

export const getInstruments = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/drugs/instrument");
    console.log(res.data);

    dispatch({
      type: GET_INSTRUMENT,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DRUG_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

//Add Drug
export const addDrug = (formData) => async (dispatch) => {
  delete formData.id;
  dispatch({
    type: LOADING_TOGGLE,
    payload: true,
  });
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(apiUrl + "/drugs", formData, config);
    if (res.data != null) {
      dispatch({
        type: LOADING_TOGGLE,
        payload: false,
      });
      dispatch({
        type: ADD_DRUG,
        payload: formData,
      });
      return res.data;
    }
  } catch (error) {
    dispatch({
      type: LOADING_TOGGLE,
      payload: false,
    });
    dispatch({
      type: DRUG_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};

//Add Post
export const updateDrug = (formData) => async (dispatch) => {
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
      apiUrl + "/drugs/" + formData.id,
      formData,
      config
    );
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: UPDATE_DRUG,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: DRUG_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};

//DELETE PATIENT
export const deleteDrug = (id) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/drugs/${id}`);

    dispatch({
      type: DELETE_DRUG,
      payload: id,
    });
    return id;
  } catch (error) {
    dispatch({
      type: DRUG_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};
