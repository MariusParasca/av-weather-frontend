export const createChartData = (
  array,
  { label, propName },
  { round = false, toPercent = true, additionalArray = false },
) => {
  const newXLabels = [];
  const newDataArray = [];
  const newFullBarArray = [];

  for (const day of array) {
    newXLabels.push(day[label]);
    let value = day[propName];
    if (toPercent) {
      value *= 100;
    }
    if (round) {
      value = Math.round(value);
    }

    newDataArray.push(value);
    if (additionalArray) {
      newFullBarArray.push(100);
    }
  }

  return [newXLabels, newDataArray, newFullBarArray];
};

export const name = params => {};
