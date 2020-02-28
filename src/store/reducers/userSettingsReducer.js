import { SET_FAVORITE_WEATHER_INFO } from 'store/actionTypes/userSettingsActionTypes';

const initialState = {
  favoriteWeatherInfo: {
    progressValue: '',
    text: '',
    svg: '',
    progressText: '',
    withPercent: false,
  },
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case SET_FAVORITE_WEATHER_INFO:
      newState.favoriteWeatherInfo.progressValue = action.progressValue;
      newState.favoriteWeatherInfo.text = action.text;
      newState.favoriteWeatherInfo.svg = action.svg;
      newState.favoriteWeatherInfo.progressText = action.progressText;
      newState.favoriteWeatherInfo.withPercent = action.withPercent;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
