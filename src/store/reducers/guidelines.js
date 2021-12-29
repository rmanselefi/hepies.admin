import {
  GET_GUIDELINES,
  ADD_GUIDELINE,
  DELETE_GUIDELINE,
  GUIDELINE_ERROR,
  UPDATE_GUIDELINE,
  LOADING_TOGGLE,
} from "../actions/types";
const initialState = {
  guidelines: [],
  guideline: null,
  loading: false,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GUIDELINES:
      return {
        ...state,
        guidelines: payload,
        loading: false,
      };
    case ADD_GUIDELINE:
      return {
        ...state,
        guidelines: [payload, ...state.guidelines],
        loading: false,
      };
    case DELETE_GUIDELINE:
      return {
        ...state,
        guidelines: state.guidelines.filter((post) => post.id !== payload),
        loading: false,
      };
    case LOADING_TOGGLE:
      return {
        ...state,
        loading: payload
      }
    case GUIDELINE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_GUIDELINE:
      return {
        ...state,
        guidelines: state.guidelines.map((guideline) =>
          guideline.id === payload.id
            ? {
                ...guideline,
                name: payload.name,
                url: payload.url,
              }
            : guideline
        ),
        loading: false,
      };
    default:
      return state;
  }
}
