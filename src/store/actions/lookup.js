import axios from "axios";
import { GET_DATAS, POST_ERROR,ADD_USER, DELETE_DATA } from "./types";
import setAuthToken from "../../components/utils/setAuthToken";

export const getLookups = () => async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const res = await axios.get("http://localhost:3500/api/lookup");
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
export const addLookup = formData => async dispatch => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  const config = {
      headers: {
          'Content-Type':'application/json'
      }
  }
  try {
      const res = await axios.post('http://localhost:3500/api/lookup', formData, config);
      if(res.data!=null){
        return res.data
      }
      dispatch({
          type: ADD_USER,
          payload: res.data
      });        
  } catch (error) {
      dispatch({
          type: POST_ERROR,
          payload: {
              msg: error.response.statusText,
              status: error.response.status

          }
      })
      return null;
  }
};


//Add Post
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
      "http://localhost:3500/api/lookup/" + formData.id,
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
export const deleteLookup = id => async dispatch => {
    try {
         const res=await axios.delete(`http://localhost:3500/api/lookup/${id}`);
         console.log('====================================');
         console.log(res.data);
         console.log('====================================');
        dispatch({
            type: DELETE_DATA,
            payload: id
        });
        return id;
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
        return null;
    }
};
