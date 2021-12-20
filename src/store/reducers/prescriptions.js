import { GET_PRESCRIPTIONS, GET_PRESCRIPTION_PAPER } from "../actions/types";
const initialState = {
  prescriptions: [],
  paper: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: payload,
        loading: false,
      };
    case GET_PRESCRIPTION_PAPER:
      return {
        ...state,
        paper: payload,
        loading: false,
      };

    default:
      return state;
  }
}
