import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getAirQualityChartOption from 'charts/airQualityChartOption';

const AirQualityChart = props => {
  const { value } = props;

  return <ReactEcharts option={getAirQualityChartOption(73)} />;
};

AirQualityChart.propTypes = {
  value: PropTypes.number.isRequired,
};

export default AirQualityChart;
