import React from 'react';
// import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getPieChartOption from 'charts/pieChartOption';

const PieChart = props => {
  return <ReactEcharts option={getPieChartOption()} />;
};

PieChart.propTypes = {};

export default PieChart;
