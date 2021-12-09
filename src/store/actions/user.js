import axios from "axios";
import {
  GET_DATAS,
  POST_ERROR,
  ADD_USER,
  DELETE_DATA,
  GET_USERS,
} from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getUsers = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/users");
    console.log(res.data);

    dispatch({
      type: GET_USERS,
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
  }
};

//DELETE USER
export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/users/delete/${id}`);
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

//Add Post
export const addUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(apiUrl + "/users/register", formData, config);
    console.log(res.data);
    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
    return res.data;
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

//Update user
export const updateUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      apiUrl + "/users/update/" + formData.id,
      formData,
      config
    );
    console.log(res.data);
    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
    return res.data;
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

//Update user
export const enableDisableUser = (row) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    var formData = null;
    if (row.user.active === "false") {
      formData = { active: "true" };
    } else {
      formData = { active: "false" };
    }
    const res = await axios.post(
      apiUrl + "/users/enable/" + row.user.id,
      formData,
      config
    );
    console.log(res.data);
    // dispatch({
    //   type: UPDATE_DATA,
    //   payload: row,
    // });
    return res.data;
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


//Update user
export const canSee = (row) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    var formData = null;
    if (row.user.isFit === "false") {
      formData = { isFit: "true" };
    } else {
      formData = { isFit: "false" };
    }
    const res = await axios.post(
      apiUrl + "/users/cansee/grant/" + row.user.id,
      formData,
      config
    );
    console.log(res.data);
    // dispatch({
    //   type: UPDATE_DATA,
    //   payload: row,
    // });
    return res.data;
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