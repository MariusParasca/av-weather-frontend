const getLineChartOption = (xLabels, dataArray) => {
  const option = {
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
        show: false,
      },
      data: xLabels,
      axisLabel: {
        color: '#ffffff',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#3A3966',
          width: 2,
        },
      },
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true,
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#ffffff',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#3A3966',
          width: 2,
        },
      },
    },
    series: [
      {
        data: dataArray,
        type: 'line',
        smooth: true,
        label: {
          show: true,
          position: 'top',
          // color: 'red',
          // verticalAlign: 'top',
        },
      },
    ],
  };

  return option;
};

export default getLineChartOption;
