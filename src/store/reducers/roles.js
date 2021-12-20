import {
  GET_ROLES,
  ADD_ROLE,
  DELETE_ROLE,
  ROLE_ERROR,
  UPDATE_ROLE,
} from "../actions/types";
const initialState = {
  roles: [],
  role: null,
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ROLES:
      return {
        ...state,
        roles: payload,
        loading: false,
      };
    case ADD_ROLE:
      return {
        ...state,
        roles: [payload, ...state.roles],
        loading: false,
      };
    case DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter((post) => post.id !== payload),
        loading: false,
      };
    case ROLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        roles: state.roles.map((role) =>
          role.id === payload.id
            ? {
                ...role,
                name: payload.name,
              }
            : role
        ),
        loading: false,
      };
    default:
      return state;
  }
}
