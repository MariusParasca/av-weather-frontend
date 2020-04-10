import { MAX_AIQ } from 'constants/constants';

const getAirQualityChartOption = (valueAir, stroke = 1, pointerWidth = 8, showDetail = true) => ({
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
      detail: { show: false },
      axisLine: {
        show: true,
        lineStyle: {
          width: 0,
          color: [
            [valueAir / MAX_AIQ, '#6C66FA'],
            [1, '#1E1F47'],
          ],
        },
      },
      splitLine: {
        length: stroke,
        lineStyle: {
          width: 1,
          color: 'auto',
        },
      },
      axisTick: {
        length: stroke,
        splitNumber: 3,
        lineStyle: {
          width: 1,
          color: 'auto',
        },
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        length: '50%',
        width: 1.5,
      },
      itemStyle: {
        color: '#6C66FA',
      },
    },
  ],
});

export default getAirQualityChartOption;
