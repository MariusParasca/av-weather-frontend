import { takeEvery, put, select, call, fork, all } from 'redux-saga/effects';

import {
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
import firestore from 'utils/firestore';
import { getUid } from 'utils/stateGetters';
import { getWeatherUnits } from 'utils/helperFunctions';
import { SEND_NOTIFICATION } from 'store/actionTypes/notificationActionTypes';

async function changeDefaultView(uid, data) {
  try {
    await firestore
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('defaultView')
      .set(data);
    return null;
  } catch (error) {
    return error;
  }
}

function* changeDefaultViewSaga(action) {
  const uid = yield select(getUid);
  if (uid) {
    const error = yield call(changeDefaultView, uid, { url: action.url });
    if (error) {
      yield put({ type: SEND_NOTIFICATION });
    }
  }
  yield put({ type: CHANGE_DEFAULT_VIEW_DONE });
  yield put({ type: CHANGE_DEFAULT_VIEW_LOCALLY, url: action.url });
}

function* watchDefaultView() {
  yield takeEvery(CHANGE_DEFAULT_VIEW_SEND, changeDefaultViewSaga);
}

async function changeDefaultLocation(uid, data) {
  try {
    await firestore
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('defaultLocation')
      .set(data);
    return null;
  } catch (error) {
    return error;
  }
}

function* changeDefaultLocationSaga(action) {
  const uid = yield select(getUid);
  if (uid) {
    const error = yield call(changeDefaultLocation, uid, action.data);
    if (error) {
      yield put({ type: SEND_NOTIFICATION });
    }
  }
  yield put({ type: CHANGE_DEFAULT_LOCATION_DONE });
  yield put({ type: CHANGE_DEFAULT_LOCATION_LOCALLY, data: action.data });
}

function* watchDefaultLocation() {
  yield takeEvery(CHANGE_DEFAULT_LOCATION_SEND, changeDefaultLocationSaga);
}

async function changeWeatherScale(uid, isCelsius) {
  try {
    await firestore
      .collection('users')
      .doc(uid)
      .collection('settings')
      .doc('weatherUnits')
      .set(getWeatherUnits(isCelsius));
    return null;
  } catch (error) {
    return error;
  }
}

function* changeWeatherScaleSaga(action) {
  const uid = yield select(getUid);
  if (uid) {
    const error = yield call(changeWeatherScale, uid, action.isCelsius);
    if (error) {
      yield put({ type: SEND_NOTIFICATION });
    }
  }
  yield put({ type: CHANGE_WEATHER_SCALE_DONE });
  yield put({ type: CHANGE_WEATHER_SCALE_LOCALLY, isCelsius: action.isCelsius });
}

function* watchWeatherChangeScale() {
  yield takeEvery(CHANGE_WEATHER_SCALE_SEND, changeWeatherScaleSaga);
}

function* watchAll() {
  yield all([fork(watchWeatherChangeScale), fork(watchDefaultLocation), fork(watchDefaultView)]);
}

export default watchAll;
