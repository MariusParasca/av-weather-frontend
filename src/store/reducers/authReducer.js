import { LOGIN_SUCCESSFULLY, LOGIN_FAILED } from 'store/actionTypes/authActionTypes';

const initialState = {
  user: null,
  error: null,
  pending: true,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case LOGIN_SUCCESSFULLY:
      newState.user = action.user;
      newState.pending = false;
      break;
    case LOGIN_FAILED:
      newState.error = action.error;
      newState.pending = false;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
