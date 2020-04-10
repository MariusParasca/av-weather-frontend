import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getAirQualityChartOption from 'charts/airQualityChartOption';

const AirQualityChart = props => {
  const { value, stroke, height, width, pointerWidth, showDetail } = props;

  return (
    <ReactEcharts
      style={{ height, width }}
      option={getAirQualityChartOption(value, stroke, pointerWidth, showDetail)}
    />
  );
};

AirQualityChart.propTypes = {
  value: PropTypes.number.isRequired,
  stroke: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  pointerWidth: PropTypes.number,
  showDetail: PropTypes.bool,
};

AirQualityChart.defaultProps = {
  height: '130%',
  stroke: 18,
  width: '100%',
  pointerWidth: undefined,
  showDetail: true,
};

export default AirQualityChart;
