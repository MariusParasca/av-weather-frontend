import { REHYDRATE } from 'redux-persist/lib/constants';

import {
  SET_FAVORITE_WEATHER_INFO,
  SET_FAVORITE_WEATHER_INFO_DATA,
  SET_DAYS_HIGHLIGHT,
} from 'store/actionTypes/userSettingsActionTypes';

const initialState = {
  favoriteWeatherInfo: {
    progressValue: '',
    text: '',
    svg: '',
    progressText: '',
    withPercent: false,
    weatherType: '',
  },
  favoriteWeatherInfoLocally: {
    progressValue: '',
    text: '',
    svg: '',
    progressText: '',
    withPercent: false,
    weatherType: '',
  },
  data: [],
  weekDaysHighLight: [false, false, false, false, false, false, false],
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        favoriteWeatherInfoLocally: action.payload
          ? action.payload.userSettings.favoriteWeatherInfoLocally
          : initialState.favoriteWeatherInfoLocally,
      };
    case SET_FAVORITE_WEATHER_INFO:
      newState.favoriteWeatherInfoLocally.progressValue = action.progressValue;
      newState.favoriteWeatherInfoLocally.text = action.text;
      newState.favoriteWeatherInfoLocally.svg = action.svg;
      newState.favoriteWeatherInfoLocally.progressText = action.progressText;
      newState.favoriteWeatherInfoLocally.withPercent = action.withPercent;
      newState.favoriteWeatherInfoLocally.weatherType = action.weatherType;
      break;
    case SET_FAVORITE_WEATHER_INFO_DATA:
      newState.data = action.data;
      break;
    case SET_DAYS_HIGHLIGHT:
      newState.weekDaysHighLight = action.weekDaysHighLight;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
