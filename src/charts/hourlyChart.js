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
    series: [
      {
        name: 'Temperature',
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorHot,
            },
            {
              offset: 1,
              color: colorCool,
            },
          ]),
        },
        data: hourly,
      },
      {
        name: 'Feels like',
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
            {
              offset: 0,
              color: colorHot,
            },
            {
              offset: 1,
              color: colorCool,
            },
          ]),
          opacity: 0.55,
        },
        // itemStyle: {
        //   color: new echarts.graphic.LinearGradient(0, 0, 0, 5, [
        //     {
        //       offset: 0,
        //       color: '#ffffff',
        //     },
        //     {
        //       offset: 1,
        //       color: '#28c9fa',
        //     },
        //   ]),
        // },
        data: feelsLike,
      },
    ],
  };

  return option;
};

export default getHourlyChartOption;
