import { takeLatest, put } from 'redux-saga/effects';

import { SET_FAVORITE_WEATHER_INFO, SET_FAVORITE_WEATHER_INFO_SEND } from 'store/actionTypes/userSettingsActionTypes';

function* watchSetFavoriteWeatherInfo(action) {
  yield put({
    type: SET_FAVORITE_WEATHER_INFO,
    value: action.value,
    text: action.text,
    svg: action.svg,
    progressText: action.progressText,
    withPercent: action.withPercent,
  });
}

function* watchFavoriteWeatherInfo() {
  yield takeLatest(SET_FAVORITE_WEATHER_INFO_SEND, watchSetFavoriteWeatherInfo);
}

export default watchFavoriteWeatherInfo;
