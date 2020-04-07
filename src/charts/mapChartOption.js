const getMapChartOption = data => {
  const option = {
    grid: {
      top: '0%',
      left: '1%',
      right: '1%',
      containLabel: false,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
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
