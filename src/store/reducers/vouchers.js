import {
  GET_VOUCHERS,
  ADD_VOUCHER,
  DELETE_VOUCHER,
  VOUCHER_ERROR,
  UPDATE_VOUCHER,
  LOADING_TOGGLE
} from "../actions/types";
const initialState = {
  vouchers: [],
  voucher: null,
  loading: false,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VOUCHERS:
      return {
        ...state,
        vouchers: payload,
        loading: false,
      };
    case ADD_VOUCHER:
      return {
        ...state,
        vouchers: [payload, ...state.roles],
        loading: false,
      };
    case LOADING_TOGGLE:
      return {
        ...state,
        loading: payload,
      };
    case DELETE_VOUCHER:
      return {
        ...state,
        vouchers: state.vouchers.filter((post) => post.id !== payload),
        loading: false,
      };
    case VOUCHER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_VOUCHER:
      return {
        ...state,
        vouchers: state.vouchers.map((role) =>
          role.id === payload.id
            ? {
                ...role,
                code: payload.code,
                amount: payload.amount,
              }
            : role
        ),
        loading: false,
      };
    default:
      return state;
  }
}
