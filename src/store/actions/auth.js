import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE,
} from './types';
import setAuthToken from '../../components/utils/setAuthToken'

import { apiUrl } from './constant'
//Load User
 
export const loadUser = () => async dispatch => {
    console.log("i have go here");
    if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
    }
    try {
        const res = await axios.post(apiUrl+'/auth/me');

        dispatch({
            type: USER_LOADED,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
           
        })
    }
}

//REgister user

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({
        name,
        email,
        password
    }) 
    try {
        const res = await axios.post(apiUrl+'/users/signup', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;
        
        dispatch({
            type:REGISTER_FAIL
        })
    }
}

//Login User

export const login = (username, password, history ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({
        username,
        password
    });
      try {
        const res = await axios.post(apiUrl+'/auth/admin-login', body, config);
               
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        history.push('/admin/users');
        return res;
        
    } catch (error) {   
         dispatch({
            type: LOGIN_FAIL
        })
        return null;
    }
}

//Logout 

export const logout = (history)=>dispatch => {
   
    dispatch({
        type: LOGOUT
    });
    dispatch({
        type: CLEAR_PROFILE
    });
    history.push('/auth/login');

};
