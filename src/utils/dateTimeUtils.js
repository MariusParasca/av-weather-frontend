import { ONE_MINUTE_IN_MILLISECONDS } from 'constants/constants';

export const createDateFromEpoch = utcSeconds => {
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(utcSeconds);
  return dateTime;
};

export const zeroPadTime = number => {
  return `0${number}`.slice(-2);
};

export const getTimeFromDate = date => {
  return `${zeroPadTime(date.getHours())}:${zeroPadTime(date.getMinutes())}`;
};

export const getHourFromEpoch = utcSeconds => {
  return zeroPadTime(createDateFromEpoch(utcSeconds).getHours());
};

export const getTimeBasedOnTimeZone = offset => {
  const date = new Date();
  const utc = date.getTime() + date.getTimezoneOffset() * ONE_MINUTE_IN_MILLISECONDS;
  const newDate = new Date(utc + ONE_MINUTE_IN_MILLISECONDS * offset);

  return newDate;
};
