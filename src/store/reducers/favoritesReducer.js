import { REHYDRATE } from 'redux-persist/lib/constants';

import {
  FETCH_FAVORITES_SEND,
  FETCH_FAVORITES_SET_DATA,
  FETCH_FAVORITES_FAILED,
  DELETE_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAILED,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILED,
  ADD_FAVORITE_LOCALLY,
  DELETE_FAVORITE_LOCALLY,
  DELETE_SYNCED_FAVORITES,
  FETCH_FAVORITES_ALREADY_FETCHED,
} from 'store/actionTypes/favoritesActionTypes';

const initialState = {
  data: [],
  dataLocally: [],
  pending: false,
  error: null,
  dataLoaded: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  newState.error = null;

  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        dataLocally: action.payload ? action.payload.favorites.dataLocally : [],
      };
    case FETCH_FAVORITES_SEND:
      newState.pending = true;
      break;
    case FETCH_FAVORITES_ALREADY_FETCHED:
      newState.pending = false;
      break;
    case FETCH_FAVORITES_SET_DATA:
      newState.data = action.data;
      newState.pending = false;
      newState.dataLoaded = true;
      break;
    case FETCH_FAVORITES_FAILED:
      newState.error = action.error;
      newState.pending = false;
      newState.dataLoaded = false;
      break;
    case DELETE_FAVORITE_SUCCESS:
      newState.data = action.data;
      break;
    case DELETE_FAVORITE_FAILED:
      newState.error = action.error;
      break;
    case ADD_FAVORITE_SUCCESS:
      newState.data = action.data;
      break;
    case ADD_FAVORITE_FAILED:
      newState.error = action.error;
      break;
    case ADD_FAVORITE_LOCALLY:
      newState.dataLocally = action.dataLocally;
      break;
    case DELETE_FAVORITE_LOCALLY:
      newState.dataLocally = action.dataLocally;
      break;
    case DELETE_SYNCED_FAVORITES:
      newState.data = [];
      newState.dataLoaded = false;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
