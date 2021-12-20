import {
  GET_LOOKUPS,
  ADD_LOOKUP,
  DELETE_LOOKUP,
  LOOKUP_ERROR,
  UPDATE_LOOKUP,
} from "../actions/types";
const initialState = {
  lookups: [],
  lookup: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOOKUPS:
      return {
        ...state,
        lookups: payload,
        loading: false,
      };
    case ADD_LOOKUP:
      return {
        ...state,
        lookups: [payload, ...state.lookups],
        loading: false,
      };
    case DELETE_LOOKUP:
      return {
        ...state,
        lookups: state.lookups.filter((post) => post.id !== payload),
        loading: false,
      };
    case LOOKUP_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LOOKUP:
      return {
        ...state,
        lookups: state.lookups.map((lookup) =>
          lookup.id === payload.id
            ? {
                ...lookup,
                name: payload.name,
                url: payload.url,
              }
            : lookup
        ),
        loading: false,
      };
    default:
      return state;
  }
}
