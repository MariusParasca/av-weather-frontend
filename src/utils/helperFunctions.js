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
