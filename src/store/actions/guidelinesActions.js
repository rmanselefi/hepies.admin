import firebase from "../../components/config/firebase";
import {
  UPDATE_DATA,
  ADD_USER,
  POST_ERROR,
  DELETE_DATA,
  GET_DATAS,
} from "./types";
import axios from "axios";
import { apiUrl, localUrl } from "./constant";
import setAuthToken from "../../components/utils/setAuthToken";

export const getGuidelines = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/guidelines");
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
export const saveGuideline = (guideline) => async (dispatch) => {
  try {
    if (guideline.image != null) {
      const uploadTask = firebase
        .storage()
        .ref(`$guideline_images/${guideline.image.name}`)
        .put(guideline.image);
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
          var path = `$guideline_images`;
          firebase
            .storage()
            .ref(path)
            .child(guideline.image.name)
            .getDownloadURL()
            .then(async (urls) => {
              if (urls != null) {
                const formData = {
                  name: guideline.image.name,
                  url: urls,
                };
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                  },
                };
                try {
                  const res = await axios.post(
                    apiUrl + "/guidelines",
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
              }
            });
        }
      );
      return guideline;
    }
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: "Drug is not saved",
      },
    });
  }
};

export const deleteGuideline = (guideId) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/guidelines/${guideId}`);

    dispatch({
      type: DELETE_DATA,
      payload: guideId,
    });
    return guideId;
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
