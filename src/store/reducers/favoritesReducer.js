import {
  FETCH_FAVORITES_SET_DATA,
  FETCH_FAVORITES_FAILED,
  DELETE_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAILED,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILED,
  ADD_FAVORITE_WARNING,
} from 'store/actionTypes/favoritesActionTypes';

const initialState = {
  data: [],
  dataLocally: [],
  pending: true,
  error: null,
  message: '',
  messageType: '',
  dataLoaded: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  newState.error = null;

  switch (action.type) {
    case FETCH_FAVORITES_SET_DATA:
      newState.data = action.data;
      newState.pending = false;
      newState.dataLoaded = true;
      break;
    case FETCH_FAVORITES_FAILED:
      newState.error = action.error.message;
      break;
    case DELETE_FAVORITE_SUCCESS:
      newState.data = action.data;
      newState.message = 'Successfully deleted';
      newState.messageType = 'success';
      break;
    case DELETE_FAVORITE_FAILED:
      newState.error = action.error.message;
      break;
    case ADD_FAVORITE_SUCCESS:
      newState.data = action.data;
      newState.message = 'Successfully added';
      newState.messageType = 'success';
      break;
    case ADD_FAVORITE_FAILED:
      newState.error = action.error;
      break;
    case ADD_FAVORITE_WARNING:
      newState.message = 'City already exists';
      newState.messageType = 'warning';
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
