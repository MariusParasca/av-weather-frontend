const getMapChartOption = data => {
  const option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        data,
        type: 'line',
        areaStyle: {},
        showSymbol: false,
      },
    ],
  };

  return option;
};

export default getMapChartOption;
