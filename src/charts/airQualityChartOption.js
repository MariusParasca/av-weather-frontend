const getAirQualityChartOption = value => ({
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    containLabel: true,
  },
  series: [
    {
      name: '',
      type: 'gauge',
      radius: '80%',
      startAngle: 180,
      endAngle: 0,
      detail: { formatter: '{value} AQI', color: 'black' },
      data: [{ value }],
      axisLine: {
        show: true,
        lineStyle: {
          width: 0,
          color: [
            [value / 100, 'red'],
            [1, 'blue'],
          ],
        },
      },
      splitLine: {
        length: 20,
        lineStyle: {
          width: 2,
          color: 'auto',
        },
      },
      axisTick: {
        length: 20,
        lineStyle: {
          width: 2,
          color: 'auto',
        },
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        length: '70%',
      },
      itemStyle: {
        color: '#5B56CF',
      },
    },
  ],
});

export default getAirQualityChartOption;
