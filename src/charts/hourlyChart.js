const getHourlyChartOption = (timeline, hourly, feelsLike) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}: {c0}° C<br />{a1}: {c1}° C',
    },
    grid: {
      left: '0%',
      right: '5%',
      bottom: '1%',
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
          show: true,
        },
        axisLine: { onZero: true },
        data: timeline,
      },
    ],
    yAxis: [
      {
        splitArea: { show: false },
        name: 'Degree',
        type: 'value',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: { onZero: true },
        axisLabel: {
          formatter: '{value}° C',
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
