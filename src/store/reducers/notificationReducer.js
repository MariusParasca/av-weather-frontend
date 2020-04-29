import { SEND_NOTIFICATION, CLOSE_NOTIFICATION } from 'store/actionTypes/notificationActionTypes';

const initialState = {
  message: '',
  status: 'error',
  open: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case SEND_NOTIFICATION:
      newState.open = true;
      newState.message = action.message ? action.message : 'Something went wrong!';
      newState.status = action.status ? action.status : 'error';
      break;
    case CLOSE_NOTIFICATION:
      newState.open = false;
      newState.message = '';
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
