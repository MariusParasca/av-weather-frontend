const getHourlyChartOption = (timeline, hourly) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: 'Hour: {b0}<br />{a0}: {c0}° C',
    },
    grid: {
      left: '0%',
      right: '0%',
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
        data: timeline,
      },
    ],
    yAxis: [
      {
        name: 'Degree',
        type: 'value',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          formatter: '{value}° C',
        },
      },
    ],
    series: [
      {
        name: 'Temperature',
        type: 'line',
        areaStyle: {},
        data: hourly,
      },
    ],
  };

  return option;
};

export default getHourlyChartOption;
