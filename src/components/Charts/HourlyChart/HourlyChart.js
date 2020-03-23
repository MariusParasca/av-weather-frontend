import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getHourlyChartOption from 'charts/hourlyChart';
import { createBarChartWithGradient } from 'utils/helperFunctions';

const HourlyChart = props => {
  const { timeline, hourly, feelsLike, style, min, max, minFeelsTemp, maxFeelsTemp } = props;

  const hourlyData = [];
  const feelsLikeData = [];

  for (let i = 0; i < hourly.length; i += 1) {
    const hourTemp = hourly[i];
    const feelLike = feelsLike[i];
    hourlyData.push(createBarChartWithGradient(hourTemp, min, max));
    feelsLikeData.push(
      createBarChartWithGradient(feelLike, minFeelsTemp, maxFeelsTemp, { opacity: 0.75, shadowBlur: 1 }),
    );
  }

  return <ReactEcharts style={style} option={getHourlyChartOption(timeline, hourlyData, feelsLikeData)} />;
};

HourlyChart.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.number).isRequired,
  timeline: PropTypes.arrayOf(PropTypes.string).isRequired,
  feelsLike: PropTypes.arrayOf(PropTypes.number).isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  minFeelsTemp: PropTypes.number.isRequired,
  maxFeelsTemp: PropTypes.number.isRequired,
};

HourlyChart.defaultProps = {
  style: {
    height: '100%',
  },
};

export default HourlyChart;
