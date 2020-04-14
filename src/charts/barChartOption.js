const getBarChartOption = (xLabels, fullBarArray, dataArray) => {
  return {
    plugins: {
      datalabels: {
        display: true,
        align: 'center',
        anchor: 'center',
      },
    },
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
        data: xLabels,
        axisLabel: {
          color: '#ffffff',
        },
        axisTick: {
          alignWithLabel: true,
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3A3966',
            width: 2,
          },
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
    ],
    series: [
      {
        // For shadow
        type: 'bar',
        itemStyle: {
          color: 'rgba(0,0,0,0.05)',
        },
        label: {
          show: false,
        },
        // barGap: '-100%',
        // barWidth: '40',
        animation: false,
        data: fullBarArray,
      },
      {
        type: 'bar',
        // barWidth: '40',
        label: {
          show: true,
          position: 'top',
          // color: 'red',
          formatter: '{c}%',
          // verticalAlign: 'top',
        },
        data: dataArray,
      },
    ],
  };
};

export default getBarChartOption;
