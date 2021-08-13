import {
  GET_DATAS,
  POST_ERROR,
  UPDATE_DATA,
  DELETE_DATA,
  GET_USERS,
  ADD_USER,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";
const initialState = {
  datas: [],
  data: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DATAS:
      return {
        ...state,
        datas: payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        datas: [payload, ...state.datas],
        loading: false,
      };
    case DELETE_DATA:
      return {
        ...state,
        datas: state.datas.filter((post) => post.id !== payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_DATA:
      return {
        ...state,
        datas: state.datas.map((post) =>
          post.id === payload.id
            ? { ...post, user: {...post.user, active: !payload.user.active } }
            : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id
            ? {
                ...post,
                comments: payload.comments,
              }
            : post
        ),
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
