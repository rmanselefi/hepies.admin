import axios from "axios";
import { POST_ERROR, ADD_USER, DELETE_DATA, GET_PHARMACY } from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getPharmacies = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/pharmacy");
    console.log(res.data);

    dispatch({
      type: GET_PHARMACY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

export const getMyPharmacyById = (id) => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/pharmacy/" + id);
    console.log(res.data);

    dispatch({
      type: GET_PHARMACY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

export const getPharmacists = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const formData = {
    role: "Pharmacist",
  };
  try {
    const res = await axios.post(apiUrl + "/users/role", formData, config);
    dispatch({
      type: GET_PHARMACY,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};

//Add Post
export const addDrug = (formData) => async (dispatch) => {
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
    const res = await axios.post(apiUrl + "/drugs", formData, config);
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: "error",
        status: "400"
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
      type: ADD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: "error",
        status: "400"
      },
    });
    return null;
  }
};

//DELETE PATIENT
export const deleteDrug = (id) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/pharmacy/${id}`);

    dispatch({
      type: DELETE_DATA,
      payload: id,
    });
    return id;
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};
