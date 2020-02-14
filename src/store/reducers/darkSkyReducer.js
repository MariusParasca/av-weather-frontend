import { DARK_SKY_API_FAILED, DARK_SKY_SET_DATA } from 'store/actionTypes/darkSkyActionTypes';
import { DAY_NO_HOURS, WEEK_DAYS } from 'constants/constants';

import { getHourFromEpoch, createDateFromEpoch } from 'utils/dateTimeUtils';

const initialState = {
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
  },
  hourly: [],
  daily: [],
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

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case DARK_SKY_SET_DATA:
      newState.currently = createCurrentlyWeather({
        ...action.data.currently,
        sunriseTime: action.data.daily.data[0].sunriseTime,
        sunsetTime: action.data.daily.data[0].sunsetTime,
      });
      newState.hourly = createHourlyWeather(action.data.hourly);
      newState.daily = createDailyWeather(action.data.daily);
      newState.pending = false;
      break;
    case DARK_SKY_API_FAILED:
      newState.error = action.error;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
