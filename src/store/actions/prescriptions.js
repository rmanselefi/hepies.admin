import axios from 'axios';
import {
    GET_DATAS,
    GET_USER,
    POST_ERROR,   
    ADD_COMMENT,
    ADD_USER
} from './types';
import setAuthToken from '../../components/utils/setAuthToken'

export const getPrescriptions = () => async dispatch => {
    try {
        if (localStorage.getItem('token')) {
            setAuthToken(localStorage.getItem('token'));
        }
        const res = await axios.get('http://localhost:3500/api/prescription');
        console.log(res.data);
        
        dispatch({
            type: GET_DATAS,
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
    }
};

// export const addLike = id => async dispatch => {
    
//     try {
//         const res = await axios.put(`http://localhost:5000/post/like/${id}`);
//         console.log(res.data)
//         dispatch({
//             type: UPDATE_LIKES,
//             payload: { id,likes:res.data}
//         });
//     } catch (error) {
//         dispatch({
//             type: POST_ERROR,
//             payload: {
//                 msg: error.response.statusText,
//                 status: error.response.status

//             }
//         })
//     }
// };

// export const removeLike = id => async dispatch => {
//     try {
//         const res = await axios.put(`http://localhost:5000/post/unlike/${id}`);
//         dispatch({
//             type: UPDATE_LIKES,
//             payload: { id, likes: res.data }
//         });
//     } catch (error) {
//         dispatch({
//             type: POST_ERROR,
//             payload: {
//                 msg: error.response.statusText,
//                 status: error.response.status

//             }
//         })
//     }
// };
// //DELETE POST
// export const deletePost = id => async dispatch => {
//     try {
//          await axios.delete(`http://localhost:5000/post/${id}`);
//         dispatch({
//             type: DELETE_POST,
//             payload: id
//         });
//         dispatch(setAlert('Post Removed', 'success'));
//     } catch (error) {
//         dispatch({
//             type: POST_ERROR,
//             payload: {
//                 msg: error.response.statusText,
//                 status: error.response.status

//             }
//         })
//     }
// };

//Add Post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('http://localhost:5000/post/create', formData, config);
        console.log(res.data)
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
    }
};

export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/post/${id}`);
        dispatch({
            type: GET_USER,
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
    }
};

//Add Comment
export const addComment =( postId , formData ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`http://localhost:5000/post/comment/${postId}`, formData, config);
        console.log(res.data)
        dispatch({
            type: ADD_COMMENT,
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
    }
};

//Delete Comment
// export const deleteComment = (postId, commentId) => async dispatch => {
   
//     try {
//         const res = await axios.delete(`http://localhost:5000/post/comment/${postId}/${commentId}`);
//         console.log(res.data)
//         dispatch({
//             type: REMOVE_COMMENT,
//             payload: commentId
//         });
//         dispatch(setAlert('Comment Removed', 'success'));
//     } catch (error) {
//         dispatch({
//             type: POST_ERROR,
//             payload: {
//                 msg: error.response.statusText,
//                 status: error.response.status

//             }
//         })
//     }
// };

