import { takeEvery, put, call, select } from 'redux-saga/effects';

import {
  WEATHER_API_SEND,
  WEATHER_SET_DATA,
  WEATHER_API_FAILED,
  WEATHER_DATA_ALREADY_FETCHED,
} from 'store/actionTypes/weatherAPIActionTypes';
import {
  MAX_UV,
  MAX_PRESSURE,
  MAX_VISIBILITY,
  MAX_DEW_POINT,
  MAX_AIQ,
  STANDARD_WEATHER_TYPE,
  WIND_WEATHER_TYPE,
} from 'constants/constants';
// import ipStackAxios from 'axios/location';
import darkSkyAxios from 'axios/darkSky';
import airQualityInstance from 'axios/airQuality';
import { replaceDiacritics, getUtcOffsetByCoordinates, createCurrentlyWeather } from 'utils/helperFunctions';
import { ADD_FAVORITE } from 'store/actionTypes/favoritesActionTypes';
import {
  SET_FAVORITE_WEATHER_INFO,
  SET_OTHER_WEATHER_INFO_ARRAY,
  CHANGE_DEFAULT_LOCATION,
} from 'store/actionTypes/userSettingsActionTypes';
import { createPostSaga } from 'utils/sagaHelper';
import firestore from 'utils/firestore';
import {
  getCurrentStateData,
  getUserSettings,
  getDefaultLocation,
  getUid,
  getWeatherUnitsType,
  getWeatherUnits,
} from 'utils/stateGetters';

async function makeWeatherRequest(latitude, longitude, city, units) {
  try {
    const darkSkyPromise = await darkSkyAxios.get(`/${latitude},${longitude}`, {
      params: {
        units,
        exclude: '[minutely, alerts, flags]',
        extend: 'hourly',
      },
    });

    const ariQualityPromise = airQualityInstance.get(`/${replaceDiacritics(encodeURI(city.toLowerCase()))}/`);

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

async function locationRequest() {
  // try {
  // const response = await ipStackAxios.get();
  // const location = response.data.loc.split(',');
  // const latitude = Number(location[0]);
  // const longitude = Number(location[1]);

  return {
    data: {
      // location: {
      //   latitude,
      //   longitude,
      //   city: response.data.city,
      //   country: response.data.country,
      //   ip: response.data.ip,
      // },
      location: {
        latitude: 40.71455,
        longitude: -74.00714,
        city: 'New York',
        country: 'USA',
        ip: '31.5.170.101',
      },
    },
  };
  // } catch (error) {
  //   return { error };
  // }
}

function getWeatherInfoArray(data, weatherUnits) {
  const { maxWind, humidity, precipitation, uvIndex, cloudCover, pressure, visibility, dewPoint, airQuality } = data;

  const tempAir = airQuality || 0;

  return [
    {
      progressValue: (tempAir / MAX_AIQ) * 100,
      progressText: String(tempAir),
      text: 'Air Quality',
      svg: 'svgs/WeatherInfo/air.svg',
      weatherType: STANDARD_WEATHER_TYPE,
    },
    {
      text: 'wind',
      progressValue: maxWind,
      weatherType: WIND_WEATHER_TYPE,
    },
    {
      progressValue: humidity * 100,
      text: 'Humidity',
      svg: 'svgs/WeatherInfo/humidity.svg',
      withPercent: true,
      weatherType: STANDARD_WEATHER_TYPE,
    },
    {
      progressValue: precipitation * 100,
      text: 'Precipitation',
      svg: 'svgs/WeatherInfo/precipitation.svg',
      withPercent: true,
      weatherType: STANDARD_WEATHER_TYPE,
    },
    {
      progressValue: (uvIndex / MAX_UV) * 100,
      progressText: String(uvIndex),
      text: 'UV index',
      svg: 'svgs/WeatherInfo/uv_index.svg',
      weatherType: STANDARD_WEATHER_TYPE,
    },
    {
      progressValue: cloudCover * 100,
      text: 'Cloud cover',
      svg: 'svgs/WeatherInfo/cloud_cover.svg',
      withPercent: true,
      weatherType: STANDARD_WEATHER_TYPE,
    },
    {
      progressValue: (pressure / MAX_PRESSURE) * 100,
      progressText: String(Math.round(pressure)),
      text: 'Pressure',
      svg: 'svgs/WeatherInfo/pressure.svg',
      weatherType: STANDARD_WEATHER_TYPE,
    },
    {
      progressValue: (visibility / MAX_VISIBILITY) * 100,
      progressText: `${Math.round(visibility)}${weatherUnits.distance}`,
      text: 'Visibility',
      svg: 'svgs/WeatherInfo/visibility.svg',
      weatherType: STANDARD_WEATHER_TYPE,
    },
    {
      progressValue: (dewPoint < 0 ? -1 : 1) * (dewPoint / MAX_DEW_POINT) * 100,
      progressText: `${Number(dewPoint).toFixed(2)}°`,
      text: 'Dew Point',
      svg: 'svgs/WeatherInfo/dew_point.svg',
      weatherType: STANDARD_WEATHER_TYPE,
    },
  ];
}

function* setWeatherData(data) {
  const userSettings = yield select(getUserSettings);
  const weatherUnits = yield select(getWeatherUnits);

  const weatherData = [];
  let favoriteYieldObj = null;

  for (const item of getWeatherInfoArray(createCurrentlyWeather(data.currently), weatherUnits)) {
    if (item.text === userSettings.favoriteWeatherInfo.text && userSettings.favoriteWeatherInfo.text) {
      favoriteYieldObj = {
        type: SET_FAVORITE_WEATHER_INFO,
        progressValue: item.progressValue,
        text: item.text,
        svg: item.svg,
        withPercent: item.withPercent,
        progressText: item.progressText,
        weatherType: item.weatherType,
      };
    } else {
      weatherData.push(item);
    }
  }

  if (!favoriteYieldObj) {
    yield put({
      type: SET_FAVORITE_WEATHER_INFO,
      progressValue: data.currently.airQuality || 0,
      text: 'Air Quality',
      svg: 'svgs/WeatherInfo/air.svg',
      weatherType: STANDARD_WEATHER_TYPE,
    });
    yield put({ type: SET_OTHER_WEATHER_INFO_ARRAY, data: weatherData.slice(1, weatherData.length) });
  } else {
    yield put(favoriteYieldObj);
    yield put({ type: SET_OTHER_WEATHER_INFO_ARRAY, data: weatherData });
  }
}

async function addFavorite(options) {
  try {
    const favoritesRef = firestore
      .collection('users')
      .doc(options.uid)
      .collection('favoritesData');
    const response = await favoritesRef.where('city', '==', options.action.favoriteCity.city).get();
    if (response.empty) {
      favoritesRef.add(options.action.favoriteCity);
    }
    return null;
  } catch (error) {
    return error;
  }
}

function* weatherRequestGenerator(latitude, longitude, city, location = {}) {
  const units = yield select(getWeatherUnitsType);
  const uid = yield select(getUid);

  const { data, error } = yield call(makeWeatherRequest, latitude, longitude, city, units);
  if (data) {
    yield put({ type: WEATHER_SET_DATA, data: { weather: data, location } });
    yield setWeatherData(data);
    const favorite = {
      city: location.city,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      utcOffset: getUtcOffsetByCoordinates(location.latitude, location.longitude),
      dateTime: new Date(),
    };
    if (uid) {
      yield createPostSaga({ favoriteCity: favorite }, ADD_FAVORITE, addFavorite, { uid });
    }
    yield put({ type: `${ADD_FAVORITE}_LOCALLY`, favoriteCity: favorite });
  } else {
    yield put({ type: WEATHER_API_FAILED, error });
  }
}

function* weatherApiRequest(action) {
  const state = yield select(getCurrentStateData);
  const defaultLocation = yield select(getDefaultLocation);

  if (action.payload) {
    yield call(weatherRequestGenerator, action.payload.latitude, action.payload.longitude, action.payload.city, {
      ...state.location,
      city: action.payload.city,
      country: action.payload.country,
    });
  } else if (!state.location.dataLoaded) {
    const { data: locationData, error: locationError } = yield call(locationRequest);
    if (locationError) {
      yield put({ type: WEATHER_API_FAILED, locationError });
      return;
    }
    if (defaultLocation.city) {
      yield call(
        weatherRequestGenerator,
        defaultLocation.latitude,
        defaultLocation.longitude,
        defaultLocation.city,
        defaultLocation,
      );
    } else {
      yield put({ type: CHANGE_DEFAULT_LOCATION, data: locationData.location });
      yield call(
        weatherRequestGenerator,
        locationData.location.latitude,
        locationData.location.longitude,
        locationData.location.city,
        locationData.location,
      );
    }
  } else {
    yield put({ type: WEATHER_DATA_ALREADY_FETCHED });
  }
}

function* watchApiSend() {
  yield takeEvery(WEATHER_API_SEND, weatherApiRequest);
}

export default watchApiSend;
