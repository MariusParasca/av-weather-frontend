import {
  LOGIN_SUCCESSFULLY,
  LOGIN_FAILED,
  AUTO_LOGIN_FAILED,
  LOGOUT_SUCCESSFULLY,
  LOGOUT_FAILED,
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
    case LOGOUT_SUCCESSFULLY:
      newState = initialState;
      break;
    case LOGOUT_FAILED:
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
