import {
  FETCH_FAVORITES_SET_DATA,
  FETCH_FAVORITES_FAILED,
  DELETE_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAILED,
} from 'store/actionTypes/favoritesActionTypes';

const initialState = {
  data: [],
  pending: true,
  error: null,
  message: '',
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
      break;
    case DELETE_FAVORITE_FAILED:
      newState.error = action.error.message;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
