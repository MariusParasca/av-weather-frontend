import { REHYDRATE } from 'redux-persist/lib/constants';

import {
  SET_FAVORITE_WEATHER_INFO,
  SET_OTHER_WEATHER_INFO_ARRAY,
  CHANGE_WEATHER_SCALE,
  CHANGE_DEFAULT_LOCATION,
  CHANGE_DEFAULT_VIEW,
} from 'store/actionTypes/userSettingsActionTypes';
import { AMERICAN_UNITS, EUROPEAN_UNITS } from 'constants/constants';
import { PageRoute } from 'utils/routes';

const initialState = {
  favoriteWeatherInfo: {
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
    defaultView: {
      url: PageRoute.home,
    },
  },
  otherWeatherInfo: [],
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
      // newState.favoriteWeatherInfo = action.payload
      //   ? action.payload.userSettings.favoriteWeatherInfo
      //   : initialState.favoriteWeatherInfo;
      // newState.settings = action.payload ? action.payload.userSettings.settings : initialState.settings;
      break;
    case SET_FAVORITE_WEATHER_INFO:
      newState.favoriteWeatherInfo.progressValue = action.progressValue;
      newState.favoriteWeatherInfo.text = action.text;
      newState.favoriteWeatherInfo.svg = action.svg;
      newState.favoriteWeatherInfo.progressText = action.progressText;
      newState.favoriteWeatherInfo.withPercent = action.withPercent;
      newState.favoriteWeatherInfo.weatherType = action.weatherType;
      break;
    case SET_OTHER_WEATHER_INFO_ARRAY:
      newState.otherWeatherInfo = action.data;
      break;
    case CHANGE_WEATHER_SCALE:
      newState.settings.weatherUnits = getWeatherUnits(action.isCelsius);
      break;
    case CHANGE_DEFAULT_LOCATION:
      newState.settings.defaultLocation = action.data;
      break;
    case CHANGE_DEFAULT_VIEW:
      newState.settings.defaultView.url = action.url;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
