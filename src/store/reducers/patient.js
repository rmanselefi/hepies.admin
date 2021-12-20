import {
  GET_PATIENTS,
  ADD_PATIENT,
  DELETE_PATIENT,
  UPDATE_PATIENT,
  PATIENT_ERROR,
} from "../actions/types";
const initialState = {
  patients: [],
  patient: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: payload,
        loading: false,
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: [payload, ...state.patients],
        loading: false,
      };
    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter((post) => post.id !== payload),
        loading: false,
      };
    case PATIENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map((patient) =>
          patient.id === payload.id
            ? {
                ...patient,
                name: payload.name,
                fathername: payload.fathername,
                grandfathername: payload.grandfathername,
                age: payload.age,
                sex: payload.sex,
                weight: payload.weight,
                phone: payload.phone,
                dx: payload.dx,
              }
            : patient
        ),
        loading: false,
      };
    default:
      return state;
  }
}
