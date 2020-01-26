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
