import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getBarChartOption from 'charts/barChartOption';

const BarChart = props => {
  const { xLabels } = props;

  return <ReactEcharts option={getBarChartOption(xLabels)} />;
};

BarChart.propTypes = {
  xLabels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
};

export default BarChart;
