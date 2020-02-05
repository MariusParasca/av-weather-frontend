import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getHourlyChartOption from 'charts/hourlyChart';

const HourlyChart = props => {
  const { timeline, hourly } = props;

  return <ReactEcharts option={getHourlyChartOption(timeline, hourly)} />;
};

HourlyChart.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.number).isRequired,
  timeline: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HourlyChart;
