import {
  WEATHER_MAP_API_SEND,
  WEATHER_MAP_API_FAILED,
  WEATHER_MAP_SET_DATA,
} from 'store/actionTypes/weatherMapActionTypes';
import { createDateFromEpoch } from 'utils/dateTimeUtils';

const initialState = {
  daily: [],
  hourly: [],
  error: null,
  pending: false,
};

const createHourly = data => {
  const hourly = [];
  let hourlyPerDay = [];

  const hour = createDateFromEpoch(data[0].time).getHours();
  const indexFirstDay = 24 - hour;

  for (let i = 0; i < indexFirstDay; i += 1) {
    hourlyPerDay.push(Math.round(data[i].temperature));
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
    hourlyPerDay.push(Math.round(data[i].temperature));
  }
  hourly.push(hourlyPerDay);

  return hourly;
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case WEATHER_MAP_API_SEND:
      newState.pending = true;
      break;
    case WEATHER_MAP_SET_DATA:
      newState.daily = action.data.daily.data;
      newState.hourly = createHourly(action.data.hourly.data);
      newState.pending = false;
      break;
    case WEATHER_MAP_API_FAILED:
      newState.pending = false;
      newState.error = action.error;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
