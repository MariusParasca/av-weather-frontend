import { ONE_MINUTE_IN_MILLISECONDS } from 'constants/constants';

export const createDateFromEpoch = utcSeconds => {
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(utcSeconds);
  return dateTime;
};

const formatAMPM = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
};

export const zeroPadTime = number => {
  return `0${number}`.slice(-2);
};

export const formatHourAMPM = hour => {
  let newHour = hour;
  const ampm = newHour >= 12 ? 'PM' : 'AM';
  newHour %= 12;
  newHour = newHour || 12;
  return `${zeroPadTime(newHour)}${ampm}`;
};

export const getTimeFromDate = (date, isAmPm = true) => {
  if (!isAmPm) return `${zeroPadTime(date.getHours())}:${zeroPadTime(date.getMinutes())}`;
  return formatAMPM(date);
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
