import { LOGIN, REGISTER, SIGN_OUT } from 'store/actionTypes/authActionTypes';

const initialState = {
  error: null,
  pending: false,
};

const createCommonReducer = (state, action, prefix) => {
  const newState = { ...state };

  switch (action.type) {
    case `${prefix}_SEND`:
      newState.pending = true;
      break;
    case `${prefix}_SUCCESS`:
      newState.error = null;
      newState.pending = false;
      break;
    case `${prefix}_ERROR`:
      newState.error = action.error.message;
      newState.pending = false;
      break;
    default:
      break;
  }

  return newState;
};

const reducer = (state = initialState, action) => {
  if (action.type.indexOf(LOGIN) !== -1) {
    return createCommonReducer(state, action, LOGIN);
  }

  if (action.type.indexOf(REGISTER) !== -1) {
    return createCommonReducer(state, action, REGISTER);
  }

  if (action.type.indexOf(SIGN_OUT) !== -1) {
    return createCommonReducer(state, action, SIGN_OUT);
  }

  return state;
};

export default reducer;
