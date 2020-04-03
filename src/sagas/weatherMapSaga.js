import { takeEvery, put, call, select } from 'redux-saga/effects';

import {
  WEATHER_MAP_API_SEND,
  WEATHER_MAP_API_FAILED,
  WEATHER_MAP_SET_DATA,
} from 'store/actionTypes/weatherMapActionTypes';
import darkSkyAxios from 'axios/darkSky';

async function makeWeatherRequest(favorites) {
  try {
    const promises = [];
    for (const favorite of favorites) {
      promises.push(
        darkSkyAxios.get(`/${favorite.latitude},${favorite.longitude}`, {
          params: {
            units: 'si',
            exclude: '[minutely, alerts, flags, currently]',
            extend: 'hourly',
          },
        }),
      );
    }
    const responses = await Promise.all(promises);

    return { data: responses };
  } catch (error) {
    return { error };
  }
}

function* apiRequest() {
  const favorites = yield select(state => state.favorites.dataLocally);
  const { data, error } = yield call(makeWeatherRequest, favorites);

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
