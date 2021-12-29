import {
  GET_CONSULTS,
  ADD_CONSULT,
  DELETE_CONSULT,
  CONSULT_ERROR,
  UPDATE_CONSULT,
  GET_COMMENTS,
  GET_LIKES
} from "../actions/types";
const initialState = {
  consults: [],
  comments: [],
  likes:[],
  consult: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONSULTS:
      return {
        ...state,
        consults: payload,
        loading: false,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case GET_LIKES:
      return {
        ...state,
        likes: payload,
        loading: false,
      };
    case ADD_CONSULT:
      return {
        ...state,
        consults: [payload, ...state.consults],
        loading: false,
      };
    case DELETE_CONSULT:
      return {
        ...state,
        consults: state.consults.filter((post) => post.id !== payload),
        loading: false,
      };
    case CONSULT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_CONSULT:
      return {
        ...state,
        consults: state.consults.map((post) =>
          post.id === payload.id
            ? { ...post, topic: payload.topic, image: payload.image }
            : post
        ),
        loading: false,
      };
    default:
      return state;
  }
}
