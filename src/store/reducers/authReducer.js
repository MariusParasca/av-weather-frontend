import { REGISTER_SUCCESSFULLY, REGISTER_FAILED } from 'store/actionTypes/authActionTypes';

const initialState = {
  email: '',
  password: '',
  error: null,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case REGISTER_SUCCESSFULLY:
      newState.email = action.email;
      newState.password = action.password;
      break;
    case REGISTER_FAILED:
      newState.error = action.error;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
