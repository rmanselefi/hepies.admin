import axios from "axios";
import {
  GET_LOOKUPS,
  LOOKUP_ERROR,
  ADD_LOOKUP,
  UPDATE_LOOKUP,
  DELETE_LOOKUP,
} from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getLookups = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/lookup");
    console.log(res.data);

    dispatch({
      type: GET_LOOKUPS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOOKUP_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

//Add Post
export const addLookup = (formData) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(apiUrl + "/lookup", formData, config);
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: ADD_LOOKUP,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: LOOKUP_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};

//UPDATE LOOKUP
export const updateLookup = (formData) => async (dispatch) => {
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
      apiUrl + "/lookup/" + formData.id,
      formData,
      config
    );
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: UPDATE_LOOKUP,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: LOOKUP_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};

//DELETE LOOKUP
export const deleteLookup = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3500/api/lookup/${id}`);

    dispatch({
      type: DELETE_LOOKUP,
      payload: id,
    });
    return id;
  } catch (error) {
    dispatch({
      type: LOOKUP_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};
