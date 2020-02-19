import {
  LOGIN_SUCCESSFULLY,
  LOGIN_FAILED,
  AUTO_LOGIN_FAILED,
  LOGOUT_SUCCESSFULLY,
  LOGOUT_FAILED,
  LOGIN,
  LOGOUT,
} from 'store/actionTypes/authActionTypes';

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
  pending: true,
};

const reducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case LOGIN:
      newState.pending = true;
      break;
    case LOGIN_SUCCESSFULLY:
      newState.user = action.user;
      newState.error = null;
      newState.isLoggedIn = true;
      newState.pending = false;
      break;
    case LOGIN_FAILED:
      newState.error = action.error;
      newState.pending = false;
      newState.isLoggedIn = false;
      break;
    case AUTO_LOGIN_FAILED:
      newState.error = null;
      newState.isLoggedIn = false;
      newState.pending = false;
      break;
    case LOGOUT:
      newState.pending = true;
      break;
    case LOGOUT_SUCCESSFULLY:
      newState = initialState;
      newState.pending = false;
      break;
    case LOGOUT_FAILED:
      newState.pending = false;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
