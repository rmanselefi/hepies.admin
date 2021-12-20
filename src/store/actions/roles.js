import axios from "axios";
import {
  GET_ROLES,
  ROLE_ERROR,
  ADD_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
} from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getRoles = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/roles");
    console.log(res.data);

    dispatch({
      type: GET_ROLES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ROLE_ERROR,
      payload: {
        msg: error,
        status: error,
      },
    });
  }
};

//Add Role
export const addRole = (formData) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(apiUrl + "/roles", formData, config);
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: ADD_ROLE,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: ROLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return null;
  }
};

//Update Role
export const updateRole = (formData) => async (dispatch) => {
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
      apiUrl + "/roles/" + formData.id,
      formData,
      config
    );
    if (res.data != null) {
      return res.data;
    }
    dispatch({
      type: UPDATE_ROLE,
      payload: formData,
    });
  } catch (error) {
    dispatch({
      type: ROLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return null;
  }
};

//DELETE ROLE
export const deleteRole = (id) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/roles/${id}`);
    dispatch({
      type: DELETE_ROLE,
      payload: id,
    });
    return id;
  } catch (error) {
    dispatch({
      type: ROLE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return null;
  }
};
