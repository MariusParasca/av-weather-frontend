import { REHYDRATE } from 'redux-persist/lib/constants';

import {
  SET_FAVORITE_WEATHER_INFO,
  SET_OTHER_WEATHER_INFO_ARRAY,
  CHANGE_WEATHER_SCALE_SEND,
  CHANGE_DEFAULT_LOCATION_SEND,
  CHANGE_DEFAULT_VIEW_SEND,
  CHANGE_WEATHER_SCALE_DONE,
  CHANGE_DEFAULT_LOCATION_DONE,
  CHANGE_DEFAULT_VIEW_DONE,
  CHANGE_WEATHER_SCALE_LOCALLY,
  CHANGE_DEFAULT_LOCATION_LOCALLY,
  CHANGE_DEFAULT_VIEW_LOCALLY,
} from 'store/actionTypes/userSettingsActionTypes';
import { getWeatherUnits } from 'utils/helperFunctions';
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
  pending: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  if ([CHANGE_WEATHER_SCALE_SEND, CHANGE_DEFAULT_LOCATION_SEND, CHANGE_DEFAULT_VIEW_SEND].includes(action.type)) {
    newState.pending = true;
  }

  if ([CHANGE_WEATHER_SCALE_DONE, CHANGE_DEFAULT_LOCATION_DONE, CHANGE_DEFAULT_VIEW_DONE].includes(action.type)) {
    newState.pending = false;
  }

  switch (action.type) {
    case REHYDRATE:
      newState.favoriteWeatherInfo = action.payload
        ? action.payload.userSettings.favoriteWeatherInfo
        : initialState.favoriteWeatherInfo;
      newState.settings = action.payload ? action.payload.userSettings.settings : initialState.settings;
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
    case CHANGE_WEATHER_SCALE_LOCALLY:
      newState.settings.weatherUnits = getWeatherUnits(action.isCelsius);
      break;
    case CHANGE_DEFAULT_LOCATION_LOCALLY:
      newState.settings.defaultLocation = action.data;
      break;
    case CHANGE_DEFAULT_VIEW_LOCALLY:
      newState.settings.defaultView.url = action.url;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
