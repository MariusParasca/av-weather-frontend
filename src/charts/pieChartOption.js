const getPieChartOption = params => {
  return {
    title: {
      text: 'Average per month',
      left: '20',
      top: '25',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: ['1', '2', '3'],
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data: [
          { value: 33.33, selected: true, name: 'Sunny' },
          { value: 33.33, name: 'Cloudy' },
          { value: 33.33, name: 'Rainy' },
        ],
        label: {
          show: true,
          position: 'inside',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
};

export default getPieChartOption;
