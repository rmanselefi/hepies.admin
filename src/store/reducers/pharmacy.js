import {
  GET_PHARMACY,
  ADD_PHARMACY,
  DELETE_PHARMACY,
  PHARMACY_ERROR,
  UPDATE_PHARMACY,
} from "../actions/types";
const initialState = {
  pharmacies: [],
  pharmacy: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PHARMACY:
      return {
        ...state,
        pharmacies: payload,
        loading: false,
      };
    case ADD_PHARMACY:
      return {
        ...state,
        pharmacies: [payload, ...state.pharmacies],
        loading: false,
      };
    case DELETE_PHARMACY:
      return {
        ...state,
        pharmacies: state.pharmacies.filter((post) => post.id !== payload),
        loading: false,
      };
    case PHARMACY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_PHARMACY:
      return {
        ...state,
        pharmacies: state.pharmacies.map((pharmacy) =>
          pharmacy.id === payload.id
            ? {
                ...pharmacy,
                name: payload.name,
                fathername: payload.fathername,
                grandfathername: payload.grandfathername,
                age: payload.age,
                sex: payload.sex,
                weight: payload.weight,
                phone: payload.phone,
                dx: payload.dx,
              }
            : pharmacy
        ),
        loading: false,
      };
    default:
      return state;
  }
}
