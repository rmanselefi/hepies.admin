import axios from "axios";
import firebase from "../../components/config/firebase";
import { GET_DATAS, POST_ERROR, ADD_USER, DELETE_DATA } from "./types";
import setAuthToken from "../../components/utils/setAuthToken";
import { apiUrl } from "./constant";

export const getConsults = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/consulting");
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
export const addConsult = (formData) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (formData.image != null) {
      const uploadTask = firebase
        .storage()
        .ref(`$consult_images/${formData.image.name}`)
        .put(formData.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          console.log(snapshot.state);
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        () => {
          var path = `$consult_images`;
          firebase
            .storage()
            .ref(path)
            .child(formData.image.name)
            .getDownloadURL()
            .then(async (urls) => {
              if (urls != null) {
                const formData = {
                  topic: formData.topic,
                  image: urls,
                };
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                  },
                };

                const res = await axios.post(
                  apiUrl + "/consulting",
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
              }
            });
        }
      );
    } else {
      const res = await axios.post(apiUrl + "/consulting", formData, config);
      if (res.data != null) {
        return res.data;
      }
      dispatch({
        type: ADD_USER,
        payload: res.data,
      });
    }
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
export const updateConsult = (formData, isUrl) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (formData.image != null && !isUrl) {
      const uploadTask = firebase
        .storage()
        .ref(`$consult_images/${formData.image.name}`)
        .put(formData.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          console.log(snapshot.state);
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        () => {
          var path = `$consult_images`;
          firebase
            .storage()
            .ref(path)
            .child(formData.image.name)
            .getDownloadURL()
            .then(async (urls) => {
              if (urls != null) {
                const formData = {
                  topic: formData.topic,
                  image: urls,
                };
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                  },
                };
                const res = await axios.put(
                  apiUrl + "/consulting/" + formData.id,
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
              }
            });
        }
      );
    } else {
      const res = await axios.put(
        apiUrl + "/consulting/" + formData.id,
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
    }
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

//DELETE CONSULT
export const deleteConsult = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(apiUrl + `/consulting/${id}`);   
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
