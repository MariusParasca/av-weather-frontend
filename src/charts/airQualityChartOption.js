import { MAX_AIQ } from 'constants/constants';

const getAirQualityChartOption = (valueAir, stroke = 18, pointerWidth = 8, showDetail = true) => ({
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    containLabel: false,
  },
  series: [
    {
      name: '',
      type: 'gauge',
      radius: `80%`,
      startAngle: 180,
      endAngle: 0,
      data: [{ value: (valueAir * 100) / MAX_AIQ }],
      detail: { formatter: `${valueAir} AIQ`, color: 'black', show: showDetail },
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
        length: stroke,
        lineStyle: {
          width: 2,
          color: 'auto',
        },
      },
      axisTick: {
        length: stroke,
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
        width: pointerWidth,
      },
      itemStyle: {
        color: '#FF9F1E',
      },
    },
  ],
});

export default getAirQualityChartOption;
