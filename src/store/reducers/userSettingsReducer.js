import { REHYDRATE } from 'redux-persist/lib/constants';

import {
  SET_FAVORITE_WEATHER_INFO,
  SET_FAVORITE_WEATHER_INFO_DATA,
  CHANGE_WEATHER_SCALE,
  CHANGE_DEFAULT_LOCATION,
} from 'store/actionTypes/userSettingsActionTypes';
import { AMERICAN_UNITS, EUROPEAN_UNITS } from 'constants/constants';

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
  settings: {
    weatherUnits: {
      type: 'si',
      temperature: 'C',
      distance: 'km',
    },
    defaultLocation: {},
  },
  data: [],
};

const getWeatherUnits = isCelsius => {
  return isCelsius
    ? {
        type: EUROPEAN_UNITS,
        temperature: 'C',
        distance: 'km',
      }
    : {
        type: AMERICAN_UNITS,
        temperature: 'F',
        distance: 'mi',
      };
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
        settings: action.payload ? action.payload.userSettings.settings : initialState.settings,
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
    case CHANGE_WEATHER_SCALE:
      newState.settings.weatherUnits = getWeatherUnits(action.isCelsius);
      break;
    case CHANGE_DEFAULT_LOCATION:
      newState.settings.defaultLocation = action.data;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
