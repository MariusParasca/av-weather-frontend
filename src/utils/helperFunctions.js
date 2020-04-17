/* eslint-disable prefer-template */
import ts from '@mapbox/timespace';
import echarts from 'echarts/lib/echarts';
import { store } from 'store/store';

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
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
    return '#d9d9eb';
  }
  if (value >= -40 && value < -30) {
    return '#d1d1e7';
  }
  if (value >= -30 && value < -25) {
    return '#c0c0df';
  }
  if (value >= -25 && value < -20) {
    return '#b0b0d7';
  }
  if (value >= -20 && value < -15) {
    return '#a3a3d1';
  }
  if (value >= -15 && value < -10) {
    return '#9797cb';
  }
  if (value >= -10 && value < -5) {
    return '#8989c4';
  }
  if (value >= -5 && value < 0) {
    return '#8383c1';
  }
  if (value >= 0 && value < 5) {
    return '#8585c3';
  }
  if (value >= 5 && value < 10) {
    return '#6d6db7';
  }
  if (value >= 10 && value < 15) {
    return '#6160b1';
  }
  if (value >= 15 && value < 20) {
    return '#5453ab';
  }
  if (value >= 20 && value < 25) {
    return '#4846a5';
  }
  if (value >= 25 && value < 30) {
    return '#3c399f';
  }
  return '#302c99';
};

export const convertHexToRgb = hex => {
  const match = hex.replace(/#/, '').match(/.{1,2}/g);
  return {
    r: parseInt(match[0], 16),
    g: parseInt(match[1], 16),
    b: parseInt(match[2], 16),
  };
};

export const findColorBetween = (left, right, percentage) => {
  const leftRgb = convertHexToRgb(left);
  const rightRgb = convertHexToRgb(right);
  const newColor = {};
  const components = ['r', 'g', 'b'];
  for (let i = 0; i < components.length; i += 1) {
    const c = components[i];
    newColor[c] = Math.round(leftRgb[c] + ((rightRgb[c] - leftRgb[c]) * percentage) / 100);
  }

  return 'rgb(' + newColor.r + ', ' + newColor.g + ', ' + newColor.b + ')';
};

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

// const simpleNormalization = (value, min, max) => {
//   return (value - min) / (max - min);
// };

export const getMinArray = (array, callback) => {
  return array.reduce((min, el) => (callback(el) < min ? callback(el) : min), callback(array[0]));
};

export const getMaxArray = (array, callback) => {
  return array.reduce((max, el) => (callback(el) > max ? callback(el) : max), callback(array[0]));
};

export const nearest = (number, roundTo) => {
  let numberAux = number / roundTo;
  numberAux = (numberAux < 0 ? Math.floor(numberAux) : Math.ceil(numberAux)) * roundTo;
  return numberAux;
};

const fToC = value => Math.round(((value - 32) * 5) / 9);

export const createBarChartWithGradient = (value, min, max, itemStyleRest = {}) => {
  const isCelsius = store.getState().userSettings.settings.weatherUnits.temperature === 'C';
  const toGetColorMin = min > 0 ? -1 : min;

  const colorMax = getChartColor(isCelsius ? max : fToC(max));
  const colorMin = getChartColor(isCelsius ? toGetColorMin : fToC(toGetColorMin));

  const brightnessPercent =
    normalizeVar(isCelsius ? value : fToC(value), isCelsius ? min : fToC(min), isCelsius ? max : fToC(max), -40, 40) *
    0.01;
  return {
    value,
    itemStyle: {
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowBlur: 2,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
        {
          offset: 0,
          color: increaseBrightness(colorMax, brightnessPercent),
        },
        {
          offset: 1,
          color: increaseBrightness(colorMin, brightnessPercent),
        },
      ]),
      ...itemStyleRest,
    },
  };
};

export const getWeatherUnitsType = state => state.userSettings.settings.weatherUnits.type;

export const getWeatherUnits = state => state.userSettings.settings.weatherUnits;
