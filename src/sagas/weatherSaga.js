import { takeEvery, put, call, select } from 'redux-saga/effects';

import {
  WEATHER_API_SEND,
  WEATHER_SET_DATA,
  WEATHER_API_FAILED,
  WEATHER_DATA_ALREADY_FETCHED,
} from 'store/actionTypes/weatherAPIActionTypes';
import ipStackAxios from 'axios/ipStack';
import darkSkyAxios from 'axios/darkSky';

const getCurrentStateData = state => state.data;

async function makeWeatherRequest(latitude, longitude) {
  try {
    const response = await darkSkyAxios.get(`/${latitude},${longitude}`, {
      params: {
        units: 'si',
        exclude: '[minutely]',
      },
    });

    return { data: response.data };
  } catch (error) {
    return { error };
  }
}

async function makeRequest() {
  try {
    const response = await ipStackAxios.get('/check');
    const weatherResponse = await makeWeatherRequest(response.data.latitude, response.data.longitude);
    if (weatherResponse.error) {
      return { error: weatherResponse.error };
    }

    return { data: { ipStack: response.data, weather: weatherResponse.data } };
  } catch (error) {
    return { error };
  }
}

function* apiRequest() {
  const state = yield select(getCurrentStateData);

  if (!state.dataLoaded) {
    const { data, error } = yield call(makeRequest);
    if (data) {
      yield put({ type: WEATHER_SET_DATA, data });
    } else {
      yield put({ type: WEATHER_API_FAILED, error });
    }
  } else {
    yield put({ type: WEATHER_DATA_ALREADY_FETCHED });
  }
}

function* watchApiSend() {
  yield takeEvery(WEATHER_API_SEND, apiRequest);
}

export default watchApiSend;
