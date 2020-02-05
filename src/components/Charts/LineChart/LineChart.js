import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getLineChartOption from 'charts/lineChartOption';

const LineChart = props => {
  const { xLabels, dataArray } = props;

  return <ReactEcharts option={getLineChartOption(xLabels, dataArray)} />;
};

LineChart.propTypes = {
  xLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataArray: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default LineChart;
