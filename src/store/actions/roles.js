import axios from "axios";
import { GET_DATAS, POST_ERROR, ADD_USER, DELETE_DATA } from "./types";
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
      type: GET_DATAS,
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

//Add Post
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
      type: ADD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return null;
  }
};

//Add Post
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
      type: ADD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return null;
  }
};

//DELETE PATIENT
export const deleteRole = (id) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/roles/${id}`);
    dispatch({
      type: DELETE_DATA,
      payload: id,
    });
    return id;
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
    return null;
  }
};
