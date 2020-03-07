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
    calculable: true,
    grid: {
      top: '12%',
      left: '1%',
      right: '10%',
      containLabel: true,
    },
    // dataZoom: [
    //   {
    //     show: true,
    //   },
    // ],
    xAxis: [
      {
        type: 'category',
        data: xLabel,
        boundaryGap: true,
        axisPointer: {
          show: true,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: { show: true },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '°C',
        axisLine: {
          show: true,
        },
        axisTick: {
          show: true,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'Temperature',
        type: 'bar',
        data: actualTemp,
      },
      {
        name: 'Feels like',
        type: 'bar',
        data: apparentTemperature,
      },
    ],
  };

  return option;
};

export default get7DaysChartOption;
