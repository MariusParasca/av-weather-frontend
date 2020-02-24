import {
  WEATHER_SET_DATA,
  WEATHER_API_FAILED,
  WEATHER_DATA_ALREADY_FETCHED,
  WEATHER_API_SEND,
} from 'store/actionTypes/weatherAPIActionTypes';
import { DAY_NO_HOURS, WEEK_DAYS } from 'constants/constants';

import { getHourFromEpoch, createDateFromEpoch } from 'utils/dateTimeUtils';

const initialState = {
  ipStack: {
    latitude: 0,
    longitude: 0,
    city: '',
    country: '',
    ip: '',
    dataLoaded: false,
  },
  weather: {
    currently: {
      maxWind: 0,
      humidity: 0,
      precipitation: 0,
      uvIndex: 0,
      cloudCover: 0,
      pressure: 0,
      visibility: 0,
      dewPoint: 0,
      sunriseTime: 0,
      sunsetTime: 0,
      temperature: 0,
      feelsLike: 0,
      description: '',
      airQuality: 0,
      dataLoaded: false,
    },
    hourly: [],
    daily: [],
  },
  error: null,
  pending: true,
};

const createCurrentlyWeather = data => {
  return {
    maxWind: data.windSpeed,
    humidity: data.humidity,
    precipitation: data.precipProbability,
    uvIndex: data.uvIndex,
    cloudCover: data.cloudCover,
    pressure: data.pressure,
    dewPoint: data.dewPoint,
    sunriseTime: data.sunriseTime,
    sunsetTime: data.sunsetTime,
    visibility: data.visibility,
    temperature: data.temperature,
    description: data.summary,
    feelsLike: data.apparentTemperature,
    airQuality: data.airQuality,
  };
};

const createHourlyWeather = data => {
  return data.data
    .slice(0, DAY_NO_HOURS + 1)
    .map(el => ({ ...el, hour: `${getHourFromEpoch(el.time)}:00`, temperature: Math.round(el.temperature) }));
};

const createDailyWeather = data => {
  return data.data.map((el, index) => ({
    ...el,
    label: index === 0 ? 'Today' : WEEK_DAYS[createDateFromEpoch(el.time).getDay()],
  }));
};

const createIpStack = data => {
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    city: data.city,
    country: data.country,
    ip: data.ip,
  };
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  let newStateIpStack = { ...state.ipStack };
  const newStateWeather = { ...state.weather };

  switch (action.type) {
    case WEATHER_API_SEND:
      newState.pending = true;
      break;
    case WEATHER_SET_DATA:
      newStateIpStack = createIpStack(action.data.ipStack);
      newStateWeather.currently = createCurrentlyWeather({
        ...action.data.weather.currently,
        sunriseTime: action.data.weather.daily.data[0].sunriseTime,
        sunsetTime: action.data.weather.daily.data[0].sunsetTime,
      });
      newStateWeather.hourly = createHourlyWeather(action.data.weather.hourly);
      newStateWeather.daily = createDailyWeather(action.data.weather.daily);
      newState.pending = false;
      newStateIpStack.dataLoaded = true;
      break;
    case WEATHER_API_FAILED:
      newState.error = action.data.error;
      break;
    case WEATHER_DATA_ALREADY_FETCHED:
      newState.pending = false;
      break;
    default:
      break;
  }

  newState.weather = newStateWeather;
  newState.ipStack = newStateIpStack;

  return newState;
};

export default reducer;
