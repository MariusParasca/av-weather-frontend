const get7DaysChartOption = (xLabel, dayData, nightData) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}: {c0}° C<br />{a1}: {c1}° C',
    },
    legend: {
      data: ['Day', 'Night'],
      orient: 'vertical',
      left: 20,
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: xLabel,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#999',
          },
        },
      },
    ],
    series: [
      {
        name: 'Day',
        type: 'line',
        areaStyle: {},
        data: dayData,
      },
      {
        name: 'Night',
        type: 'line',
        areaStyle: {},
        data: nightData,
      },
    ],
  };

  return option;
};

export default get7DaysChartOption;
