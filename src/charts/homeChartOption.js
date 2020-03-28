const get7DaysChartOption = (xLabel, actualTemp, apparentTemperature) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
        },
      },
    },
    grid: {
      top: '10%',
      left: '0%',
      right: '20px',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: xLabel,
        boundaryGap: true,
        axisLabel: {
          color: '#ffffff',
          show: true,
          padding: [5, 0, 0, 0],
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          inside: true,
          lineStyle: {
            color: '#ffffff',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3A3966',
            width: 3,
          },
          onZero: false,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3A3966',
            width: 3,
          },
          onZero: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          interval: 10,
          show: true,
          color: '#ffffff',
          padding: [0, 10, 0, 0],
        },
        min: 'dataMin',
        max: 'dataMax',
      },
    ],
    series: [
      {
        name: 'Temperature',
        type: 'bar',
        data: actualTemp,
        areaStyle: {},
        showSymbol: false,
      },
      {
        name: 'Feels like',
        type: 'bar',
        data: apparentTemperature,
        areaStyle: {},
        showSymbol: false,
      },
    ],
  };

  return option;
};

export default get7DaysChartOption;
