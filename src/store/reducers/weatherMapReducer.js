import {
  WEATHER_MAP_API_SEND,
  WEATHER_MAP_API_FAILED,
  WEATHER_MAP_SET_DATA,
  WEATHER_MAP_DELETE_BY_INDEX,
} from 'store/actionTypes/weatherMapActionTypes';
import { createDateFromEpoch } from 'utils/dateTimeUtils';

const initialState = {
  daily: [],
  hourly: [],
  currently: [],
  error: null,
  pending: false,
};

const createHourlySplitted = data => {
  const hourly = [];
  let hourlyPerDay = [];

  const hour = createDateFromEpoch(data[0].time).getHours();
  const indexFirstDay = 24 - hour;

  for (let i = 0; i < indexFirstDay; i += 1) {
    hourlyPerDay.push(data[i]);
  }

  hourly.push(hourlyPerDay);
  hourlyPerDay = [];
  let counter = 0;

  for (let i = indexFirstDay; i < data.length; i += 1) {
    if (counter === 24) {
      hourly.push(hourlyPerDay);
      counter = 1;
      hourlyPerDay = [];
    } else {
      counter += 1;
    }
    hourlyPerDay.push(data[i]);
  }
  hourly.push(hourlyPerDay);

  return hourly;
};

const createHourly = dataArray => {
  const hourly = [];

  for (let i = 0; i < dataArray.length; i += 1) {
    const dataElement = dataArray[i];
    hourly.push(createHourlySplitted(dataElement.data.hourly.data));
  }

  return hourly;
};

const createDaily = dataArray => {
  const daily = [];

  for (let i = 0; i < dataArray.length; i += 1) {
    const dataElement = dataArray[i];
    daily.push(dataElement.data.daily.data);
  }

  return daily;
};

const createCurrently = dataArray => {
  const currently = [];

  for (let i = 0; i < dataArray.length; i += 1) {
    const dataElement = dataArray[i];
    currently.push(dataElement.data.currently);
  }

  return currently;
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case WEATHER_MAP_API_SEND:
      newState.pending = true;
      break;
    case WEATHER_MAP_SET_DATA:
      newState.daily = createDaily(action.data);
      newState.hourly = createHourly(action.data);
      newState.currently = createCurrently(action.data);
      newState.pending = false;
      break;
    case WEATHER_MAP_API_FAILED:
      newState.pending = false;
      newState.error = action.error;
      break;
    case WEATHER_MAP_DELETE_BY_INDEX:
      newState.daily.splice(action.index, 1);
      newState.hourly.splice(action.index, 1);
      newState.currently.splice(action.index, 1);
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
