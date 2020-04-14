const getHourlyChartOption = (timeline, hourly, feelsLike) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}: {c0}° C<br />{a1}: {c1}° C',
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: [
      {
        name: 'Hours',
        type: 'category',
        boundaryGap: true,
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#ffffff',
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3A3966',
            width: 2,
          },
          onZero: false,
        },
        data: timeline,
      },
    ],
    yAxis: [
      {
        splitArea: { show: false },
        type: 'value',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3A3966',
            width: 2,
          },
          onZero: false,
        },
        axisLabel: {
          formatter: '{value}°',
          color: '#ffffff',
        },
      },
    ],
    series: [
      {
        name: 'Temperature',
        type: 'bar',
        data: hourly,
      },
      {
        name: 'Feels like',
        type: 'bar',
        data: feelsLike,
      },
    ],
  };

  return option;
};

export default getHourlyChartOption;
