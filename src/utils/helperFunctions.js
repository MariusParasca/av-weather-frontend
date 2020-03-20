/* eslint-disable prefer-template */
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

export const resetTextFieldError = (errorSetState, helperTextSetState) => {
  errorSetState(false);
  helperTextSetState('');
};

export const setTextFieldError = (errorSetState, helperTextSetState, text) => {
  errorSetState(true);
  helperTextSetState(text);
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
    imageName: data.icon,
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
    return '#f0f6f8';
  }
  if (value >= -30 && value < -20) {
    return '#e9f2f5';
  }
  if (value >= -20 && value < -10) {
    return '#cbdcf2';
  }
  if (value >= -10 && value < 0) {
    return '#91b2ed';
  }
  if (value >= 0 && value < 10) {
    return '#608ee9';
  }
  if (value >= 10 && value < 20) {
    return '#306be2';
  }
  if (value >= 20 && value < 30) {
    return '#1154e1';
  }
  if (value >= 30 && value < 40) {
    return '#1154e1';
  }
  if (value >= 30 && value < 40) {
    return '#0048df';
  }
  return '#2578FF';
};

// export const increaseBrightness = (hex, percent) => {
//   // strip the leading # if it's there
//   hex = hex.replace(/^\s*#|\s*$/g, '');

//   // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
//   if (hex.length == 3) {
//     hex = hex.replace(/(.)/g, '$1$1');
//   }

//   const r = parseInt(hex.substr(0, 2), 16);
//   const g = parseInt(hex.substr(2, 2), 16);
//   const b = parseInt(hex.substr(4, 2), 16);

//   return (
//     '#' +
//     (0 | ((1 << 8) + r + ((256 - r) * percent) / 100)).toString(16).substr(1) +
//     (0 | ((1 << 8) + g + ((256 - g) * percent) / 100)).toString(16).substr(1) +
//     (0 | ((1 << 8) + b + ((256 - b) * percent) / 100)).toString(16).substr(1)
//   );
// };

export function increaseBrightness(hex, lum) {
  // Validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  lum = lum || 0;
  // Convert to decimal and change luminosity
  let rgb = '#';
  let c;
  for (let i = 0; i < 3; ++i) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }
  return rgb;
}

export const normalizeVar = (value, min, max, minNormalize, maxNormalize) => {
  return ((maxNormalize - minNormalize) * (value - min)) / (max - min) + minNormalize;
};
