import axios from "axios";
import {
  GET_POINTS,
  POINT_ERROR,
  ADD_POINT,
  UPDATE_POINT,
  DELETE_POINT,
} from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getPoints = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/points");
    console.log(res.data);

    dispatch({
      type: GET_POINTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POINT_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

//Add Point
export const addPoint = (formData) => async (dispatch) => {
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
    const res = await axios.post(apiUrl + "/points", formData, config);
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: ADD_POINT,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: POINT_ERROR,
      payload: {
        msg: "error",
        status: "400"
      },
    });
    return null;
  }
};

//Update Point
export const updatePoint = (formData) => async (dispatch) => {
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
      apiUrl + "/points/" + formData.id,
      formData,
      config
    );
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: UPDATE_POINT,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: POINT_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};

//Delete Point
export const deletePoint = (id) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/points/${id}`);

    dispatch({
      type: DELETE_POINT,
      payload: id,
    });
    return id;
  } catch (error) {
    dispatch({
      type: POINT_ERROR,
      payload: {
        msg: "error",
        status:"400"
      },
    });
    return null;
  }
};
