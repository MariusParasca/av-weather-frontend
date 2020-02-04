const getBarChartOption = xLabels => {
  return {
    color: ['#3398DB'],
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['yesterday', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
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
        // For shadow
        type: 'bar',
        itemStyle: {
          color: 'rgba(0,0,0,0.05)',
        },
        barGap: '-100%',
        barWidth: '40',
        animation: false,
        data: [100, 100, 100, 100, 100, 100, 100, 100],
      },
      {
        type: 'bar',
        emphasis: {},
        barWidth: '40',
        data: [2, 10, 52, 20, 33, 90, 30, 20],
      },
    ],
  };
};

export default getBarChartOption;
