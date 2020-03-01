import { REHYDRATE } from 'redux-persist/lib/constants';

import { SET_FAVORITE_WEATHER_INFO } from 'store/actionTypes/userSettingsActionTypes';

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
    default:
      break;
  }

  return newState;
};

export default reducer;
