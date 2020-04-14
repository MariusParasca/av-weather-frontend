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
        axisTick: {
          alignWithLabel: true,
          show: false,
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
          formatter: '{c} %',
          // verticalAlign: 'top',
        },
        data: dataArray,
      },
    ],
  };
};

export default getBarChartOption;
