import axios from "axios";
import { GET_DATAS, POST_ERROR, ADD_USER, DELETE_DATA } from "./types";
import setAuthToken from "../../components/utils/setAuthToken";

export const getUsers = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get("http://localhost:3500/api/users");
    console.log(res.data);

    dispatch({
      type: GET_DATAS,
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
    await axios.delete(`http://localhost:3500/api/users/delete/${id}`);
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
    const res = await axios.post(
      "http://localhost:3500/api/users/register",
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
export const updateUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      "http://localhost:3500/api/users/update/" + formData.id,
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
      "http://localhost:3500/api/users/enable/" + row.user.id,
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
