import {
  WEATHER_MAP_API_SEND,
  WEATHER_MAP_API_FAILED,
  WEATHER_MAP_SET_DATA,
} from 'store/actionTypes/weatherMapActionTypes';

const initialState = {
  daily: [],
  error: null,
  pending: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case WEATHER_MAP_API_SEND:
      newState.pending = true;
      break;
    case WEATHER_MAP_SET_DATA:
      newState.daily = action.data.daily.data;
      newState.pending = false;
      break;
    case WEATHER_MAP_API_FAILED:
      newState.pending = false;
      newState.error = action.error;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
