import {
  GET_DRUGS,
  ADD_DRUG,
  DELETE_DRUG,
  DRUG_ERROR,
  UPDATE_DRUG,
  GET_INSTRUMENT,
} from "../actions/types";
const initialState = {
  drugs: [],
  instruments: [],
  drug: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DRUGS:
      return {
        ...state,
        drugs: payload,
        loading: false,
      };
    case GET_INSTRUMENT:
      return {
        ...state,
        instruments: payload,
        loading: false,
      };
    case ADD_DRUG:
      return {
        ...state,
        drugs: [payload, ...state.drugs],
        loading: false,
      };
    case DELETE_DRUG:
      return {
        ...state,
        drugs: state.drugs.filter((post) => post.id !== payload),
        loading: false,
      };
    case DRUG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_DRUG:
      return {
        ...state,
        drugs: state.drugs.map((drug) =>
          drug.id === payload.id
            ? {
                ...drug,
                name: payload.name,
                category: payload.category,
                strength: payload.strength,
                unit: payload.unit,
                about: payload.about,
                route: payload.route,
              }
            : drug
        ),
        loading: false,
      };
    default:
      return state;
  }
}
