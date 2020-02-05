import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getHourlyChartOption from 'charts/hourlyChart';

const HomeChart = props => {
  const { timeline, hourly } = props;

  return <ReactEcharts option={getHourlyChartOption(timeline, hourly)} />;
};

HomeChart.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  timeline: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HomeChart;
