const getMapChartOption = data => {
  const option = {
    grid: {
      top: '0%',
      left: '4%',
      right: '4%',
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
        lineStyle: {
          color: '#333466',
        },
        areaStyle: {
          color: '#1E1F47',
        },
        showSymbol: false,
      },
    ],
  };

  return option;
};

export default getMapChartOption;
