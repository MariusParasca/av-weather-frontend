import { MAX_AIQ } from 'constants/constants';

const getAirQualityChartOption = valueAir => ({
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
      detail: { formatter: `${valueAir} AQI`, color: 'black' },
      data: [{ value: (valueAir * 100) / MAX_AIQ }],
      axisLine: {
        show: true,
        lineStyle: {
          width: 0,
          color: [
            [valueAir / MAX_AIQ, '#FF9F1E'],
            [1, '#E6E6E6'],
          ],
        },
      },
      splitLine: {
        length: 18,
        lineStyle: {
          width: 2,
          color: 'auto',
        },
      },
      axisTick: {
        length: 18,
        splitNumber: 7,
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
        color: '#FF9F1E',
      },
    },
  ],
});

export default getAirQualityChartOption;
