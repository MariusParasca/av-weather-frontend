import echarts from 'echarts/lib/echarts';

const get7DaysChartOption = (xLabel, dayData, nightData) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}: {c0}° C<br />{a1}: {c1}° C',
    },
    // legend: {
    //   data: ['Day', 'Night'],
    //   orient: 'vertical',
    //   left: 20,
    // },
    grid: {
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true,
    },
    // dataZoom: [
    //   {
    //     type: 'slider',
    //     xAxisIndex: [0, 1],
    //     realtime: false,
    //     start: 20,
    //     end: 70,
    //     top: 65,
    //     height: 20,
    //     handleIcon:
    //       'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    //     handleSize: '120%',
    //   },
    //   {
    //     type: 'inside',
    //     xAxisIndex: [0, 1],
    //     start: 40,
    //     end: 70,
    //     top: 30,
    //     height: 20,
    //   },
    // ],
    xAxis: [
      {
        type: 'category',
        data: xLabel,
        boundaryGap: false,
        axisLine: { lineStyle: { color: '#777' } },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          show: true,
        },
      },
      // {
      //   type: 'category',
      //   boundaryGap: true,
      //   data: xLabel,
      //   axisTick: {
      //     show: false,
      //   },
      //   axisLine: {
      //     show: true,
      //   },
      // },
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#999',
          },
        },
      },
    ],
    series: [
      {
        name: 'Day',
        type: 'bar',
        // areaStyle: {
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
        data: dayData,
      },
      // {
      //   name: 'Night',
      //   type: 'line',
      //   areaStyle: {},
      //   data: nightData,
      // },
    ],
  };

  return option;
};

export default get7DaysChartOption;
