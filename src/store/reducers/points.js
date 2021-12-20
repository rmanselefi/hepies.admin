import {
 
  GET_POINTS,
  ADD_POINT,
  DELETE_POINT,
  POINT_ERROR,
  UPDATE_POINT,
} from "../actions/types";
const initialState = {
  points: [],
  point: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POINTS:
      return {
        ...state,
        points: payload,
        loading: false,
      };
    case ADD_POINT:
      return {
        ...state,
        points: [payload, ...state.points],
        loading: false,
      };
    case DELETE_POINT:
      return {
        ...state,
        points: state.points.filter((post) => post.id !== payload),
        loading: false,
      };
    case POINT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_POINT:
      return {
        ...state,
        points: state.lookups.map((lookup) =>
          lookup.id === payload.id
            ? {
                ...lookup,
                point: payload.point,
                when: payload.when,
                to: payload.to,
              }
            : lookup
        ),
        loading: false,
      };
    default:
      return state;
  }
}
