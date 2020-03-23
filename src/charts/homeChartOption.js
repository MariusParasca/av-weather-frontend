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
    // calculable: true,
    grid: {
      top: '1%',
      left: '0%',
      right: '20px',
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
        // axisPointer: {
        //   show: true,
        // },
        axisLabel: {
          color: '#ffffff',
          // rotate: 30, // If the label names are too long you can manage this by rotating the label.
          show: true,
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
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
        // name: '°C',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3A3966',
            width: 3,
          },
          onZero: false,
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
        min: -30,
        max: 30,
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
