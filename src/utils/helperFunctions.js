import ts from '@mapbox/timespace';

export const createChartData = (array, { label, propName }, options) => {
  let currentOptions;
  if (!options) {
    currentOptions = { round: false, toPercent: false, additionalArray: false, toFixed: 0 };
  } else {
    currentOptions = options;
  }
  const newXLabels = [];
  const newDataArray = [];
  const newFullBarArray = [];

  for (const day of array) {
    newXLabels.push(day[label]);
    let value = day[propName];
    if (currentOptions.toFixed) {
      value = value.toFixed(currentOptions.toFixed);
    }

    if (currentOptions.toPercent) {
      value *= 100;
    }

    if (currentOptions.round) {
      value = Math.round(value);
    }

    newDataArray.push(value);
    if (currentOptions.additionalArray) {
      newFullBarArray.push(100);
    }
  }

  return [newXLabels, newDataArray, newFullBarArray];
};

export const isCorrectRoute = (array, route) => {
  for (const item of array) {
    if (item.includes(route)) {
      return true;
    }
  }
  return false;
};

export const updateTextField = (func, resetFunc, error) => ({ target: { value } }) => {
  if (error) {
    resetFunc();
  }
  func(value);
};

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const replaceDiacritics = text => {
  return text.normalize('NFKD').replace(/[^\w]/g, '');
};

export const getUtcOffsetByCoordinates = (latitude, longitude) => {
  const timestamp = Date.now();
  const time = ts.getFuzzyLocalTimeFromPoint(timestamp, [longitude, latitude]);
  return time.utcOffset();
};

export const createCurrentlyWeather = data => {
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

export const compareArrays = (firstArray, secondArray) => {
  const result = firstArray.every(x => {
    return secondArray.includes(x);
  });

  return result;
};

export const flatten = arr => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
};

export const getChartColor = value => {
  if (value >= -50 && value < -40) {
    return '#FFFFFF';
  }
  if (value >= -40 && value < -30) {
    return '#E9F2FF';
  }
  if (value >= -30 && value < -20) {
    return '#D3E4FF';
  }
  if (value >= -20 && value < -10) {
    return '#BED7FF';
  }
  if (value >= -10 && value < 0) {
    return '#A8C9FF';
  }
  if (value >= 0 && value < 10) {
    return '#92BCFF';
  }
  if (value >= 10 && value < 20) {
    return '#7CAEFF';
  }
  if (value >= 20 && value < 30) {
    return '#66A1FF';
  }
  if (value >= 30 && value < 40) {
    return '#5093FF';
  }
  if (value >= 30 && value < 40) {
    return '#3B86FF';
  }
  return '#2578FF';
};
