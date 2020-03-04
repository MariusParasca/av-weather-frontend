import { takeLatest, takeEvery, put, select, all, fork } from 'redux-saga/effects';

import {
  SET_FAVORITE_WEATHER_INFO,
  SET_FAVORITE_WEATHER_INFO_SEND,
  SYNC_USER_SETTINGS,
  SYNC_USER_SETTINGS_SUCCESS,
  SYNC_USER_SETTINGS_FAILED,
} from 'store/actionTypes/userSettingsActionTypes';
import db from 'utils/firebaseFirestore';
import { LOCATIONS, USER_SETTINGS } from 'constants/collections';

const getCurrentStateAuth = state => state.authData;
const getCurrentStateUserSettings = state => state.userSettings;

function* watchSetFavoriteWeatherInfo(action) {
  yield put({
    type: SET_FAVORITE_WEATHER_INFO,
    progressValue: action.progressValue,
    text: action.text,
    svg: action.svg,
    progressText: action.progressText,
    withPercent: action.withPercent,
    weatherType: action.weatherType,
  });
}

async function syncSettings(obj, uid) {
  const ref = db
    .collection(LOCATIONS)
    .doc(uid)
    .collection(USER_SETTINGS);
  try {
    await ref.set(obj);
    return { status: true };
  } catch (error) {
    return { error };
  }
}

function* syncSettingsSaga() {
  const auth = yield select(getCurrentStateAuth);
  const userSettings = yield select(getCurrentStateUserSettings);
  const { status, error } = yield select(syncSettings, userSettings.favoriteWeatherInfoLocally, auth.user.uid);
  if (status) {
    yield put({
      type: SYNC_USER_SETTINGS_SUCCESS,
    });
  } else {
    yield put({
      type: SYNC_USER_SETTINGS_FAILED,
      error,
    });
  }
}

function* watchSyncSettings() {
  yield takeEvery(SYNC_USER_SETTINGS, syncSettingsSaga);
}

function* watchFavoriteWeatherInfo() {
  yield takeLatest(SET_FAVORITE_WEATHER_INFO_SEND, watchSetFavoriteWeatherInfo);
}

function* watchAll() {
  yield all([fork(watchSyncSettings), fork(watchFavoriteWeatherInfo)]);
}

export default watchAll;
