import { takeEvery, put, call, select } from 'redux-saga/effects';

import {
  WEATHER_API_SEND,
  WEATHER_SET_DATA,
  WEATHER_API_FAILED,
  WEATHER_DATA_ALREADY_FETCHED,
} from 'store/actionTypes/weatherAPIActionTypes';
import ipStackAxios from 'axios/ipStack';
import darkSkyAxios from 'axios/darkSky';
import airQualityInstance from 'axios/airQuality';
import { replaceDiacritics } from 'utils/helperFunctions';

const getCurrentStateData = state => state.data;

async function makeWeatherRequest(latitude, longitude, city) {
  try {
    const darkSkyPromise = await darkSkyAxios.get(`/${latitude},${longitude}`, {
      params: {
        units: 'si',
        exclude: '[minutely, alerts, flags]',
      },
    });

    const ariQualityPromise = airQualityInstance.get(`/${replaceDiacritics(city)}/`);

    const responses = await Promise.all([darkSkyPromise, ariQualityPromise]);

    return {
      data: {
        currently: { ...responses[0].data.currently, airQuality: responses[1].data.data.aqi },
        hourly: responses[0].data.hourly,
        daily: responses[0].data.daily,
      },
    };
  } catch (error) {
    return { error };
  }
}

async function makeRequest() {
  try {
    const response = await ipStackAxios.get();
    const location = response.data.loc.split(',');
    const latitude = Number(location[0]);
    const longitude = Number(location[1]);

    return {
      data: {
        ipStack: {
          latitude,
          longitude,
          city: response.data.city,
          country: response.data.country,
          ip: response.data.ip,
        },
      },
    };
  } catch (error) {
    return { error };
  }
}

function* weatherRequestGenerator(latitude, longitude, city, ipStack = {}) {
  const { data, error } = yield call(makeWeatherRequest, latitude, longitude, city);
  if (data) {
    yield put({ type: WEATHER_SET_DATA, data: { weather: data, ipStack } });
  } else {
    yield put({ type: WEATHER_API_FAILED, error });
  }
}

function* apiRequest(action) {
  const state = yield select(getCurrentStateData);

  if (action.payload) {
    yield call(weatherRequestGenerator, action.payload.latitude, action.payload.longitude, action.payload.city, {
      ...state.ipStack,
      city: action.payload.city,
      country: action.payload.country,
    });
  } else if (!state.ipStack.dataLoaded) {
    const { data: ipData, error: ipError } = yield call(makeRequest);
    if (ipError) {
      yield put({ type: WEATHER_API_FAILED, ipError });
      return;
    }
    yield call(
      weatherRequestGenerator,
      ipData.ipStack.latitude,
      ipData.ipStack.longitude,
      ipData.ipStack.city,
      ipData.ipStack,
    );
  } else {
    yield put({ type: WEATHER_DATA_ALREADY_FETCHED });
  }
}

function* watchApiSend() {
  yield takeEvery(WEATHER_API_SEND, apiRequest);
}

export default watchApiSend;
