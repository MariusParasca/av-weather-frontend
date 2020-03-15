import echarts from 'echarts/lib/echarts';

const getHourlyChartOption = (timeline, hourly, feelsLike, colorHot, colorCool) => {
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
    markLine: {
      lineStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'red', // color at 0% position
            },
            {
              offset: 1,
              color: 'blue', // color at 100% position
            },
          ],
          global: false, // false by default
        },
      },
    },
    series: [
      {
        name: 'Temperature',
        type: 'bar',
        // itemStyle: {
        //   shadowBlur: 1,
        //   shadowColor: 'rgba(0, 0, 0, 0.6)',
        //   shadowOffsetX: 1,
        //   shadowOffsetY: 1,
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
        //     {
        //       offset: 0,
        //       color: colorHot,
        //     },
        //     {
        //       offset: 1,
        //       color: colorCool,
        //     },
        //   ]),
        // },
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
