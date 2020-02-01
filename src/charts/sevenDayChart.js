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
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'Day',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: dayData,
      },
      {
        name: 'Night',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: nightData,
      },
    ],
  };

  return option;
};

export default get7DaysChartOption;
