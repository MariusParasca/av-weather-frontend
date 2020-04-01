import { takeEvery, put, call } from 'redux-saga/effects';

import {
  WEATHER_MAP_API_SEND,
  WEATHER_MAP_API_FAILED,
  WEATHER_MAP_SET_DATA,
} from 'store/actionTypes/weatherMapActionTypes';
import darkSkyAxios from 'axios/darkSky';

async function makeWeatherRequest(latitude, longitude) {
  try {
    const response = await darkSkyAxios.get(`/${latitude},${longitude}`, {
      params: {
        units: 'si',
        exclude: '[minutely, alerts, flags, currently]',
        extend: 'hourly',
      },
    });

    return { data: response.data };
  } catch (error) {
    return { error };
  }
}

function* apiRequest(action) {
  const { data, error } = yield call(makeWeatherRequest, action.latitude, action.longitude);

  if (data) {
    yield put({ type: WEATHER_MAP_SET_DATA, data });
  } else {
    yield put({ type: WEATHER_MAP_API_FAILED, error });
  }
}

function* watchApiSend() {
  yield takeEvery(WEATHER_MAP_API_SEND, apiRequest);
}

export default watchApiSend;
