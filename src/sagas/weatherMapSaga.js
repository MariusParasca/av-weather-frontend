import { takeEvery, put, call, select } from 'redux-saga/effects';

import {
  WEATHER_MAP_API_SEND,
  WEATHER_MAP_API_FAILED,
  WEATHER_MAP_SET_DATA,
} from 'store/actionTypes/weatherMapActionTypes';
import darkSkyAxios from 'axios/darkSky';
import { getWeatherUnitsType, getFavoritesLocal } from 'utils/stateGetters';

async function makeWeatherRequest(favorites, units) {
  try {
    const promises = [];
    for (const favorite of favorites) {
      promises.push(
        darkSkyAxios.get(`/${favorite.latitude},${favorite.longitude}`, {
          params: {
            units,
            exclude: '[minutely, alerts, flags]',
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

function* apiRequest(action) {
  let units;
  if (!action.units) units = yield select(getWeatherUnitsType);
  else units = action.units;
  let favorites = [];
  if (!action.favorites) favorites = yield select(getFavoritesLocal);
  else favorites = action.favorites;

  const { data, error } = yield call(makeWeatherRequest, favorites, units);

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
