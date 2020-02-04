import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getBarChartOption from 'charts/barChartOption';

const BarChart = props => {
  const { xLabels, fullBarArray, dataArray } = props;

  return <ReactEcharts option={getBarChartOption(xLabels, fullBarArray, dataArray)} />;
};

BarChart.propTypes = {
  xLabels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  fullBarArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  dataArray: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BarChart;
