import firebase from "../../components/config/firebase";
import {
  GET_GUIDELINES,
  GUIDELINE_ERROR,
  ADD_GUIDELINE,
  DELETE_GUIDELINE,
  LOADING_TOGGLE,
  UPLOAD_STATUS,
} from "./types";
import axios from "axios";
import { apiUrl } from "./constant";
import setAuthToken from "../../components/utils/setAuthToken";

export const getGuidelines = () => async (dispatch) => {
  dispatch({
    type: LOADING_TOGGLE,
    payload: true,
  });
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get(apiUrl + "/guidelines");
    console.log(res.data);

    dispatch({
      type: GET_GUIDELINES,
      payload: res.data,
    });
    dispatch({
      type: LOADING_TOGGLE,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: LOADING_TOGGLE,
      payload: false,
    });
    dispatch({
      type: GUIDELINE_ERROR,
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
        .ref(`$guideline_files/${guideline.image.name}`)
        .put(guideline.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          const percentUploaded = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // console.log("percentUploaded ====> ", percentUploaded);
          dispatch({
            type: UPLOAD_STATUS,
            payload: percentUploaded,
          });
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        () => {
          var path = `$guideline_files`;
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
                await axios.post(apiUrl + "/guidelines", formData, config);

                dispatch({
                  type: ADD_GUIDELINE,
                  payload: formData,
                });

                dispatch({
                  type: UPLOAD_STATUS,
                  payload: 0,
                });
                
              }
            });
        }
      );
      return guideline;
    }
  } catch (error) {
    dispatch({
      type: GUIDELINE_ERROR,
      payload: {
        msg: "Guideline is not saved",
      },
    });
  }
};

export const deleteGuideline = (guideId) => async (dispatch) => {
  try {
    await axios.delete(apiUrl + `/guidelines/${guideId}`);

    dispatch({
      type: DELETE_GUIDELINE,
      payload: guideId,
    });
    return guideId;
  } catch (error) {
    dispatch({
      type: GUIDELINE_ERROR,
      payload: {
        msg: "error",
        status: "400",
      },
    });
    return null;
  }
};
