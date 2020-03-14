import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getHourlyChartOption from 'charts/hourlyChart';
import { getChartColor, increaseBrightness } from 'utils/helperFunctions';

const HourlyChart = props => {
  const { timeline, hourly, feelsLike, style, min, max } = props;

  console.log(increaseBrightness(getChartColor(max), 50));

  return (
    <ReactEcharts
      style={style}
      option={getHourlyChartOption(
        timeline,
        hourly,
        feelsLike,
        increaseBrightness(getChartColor(max), -30),
        getChartColor(min > 0 ? -1 : min),
      )}
    />
  );
};

HourlyChart.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.number).isRequired,
  timeline: PropTypes.arrayOf(PropTypes.string).isRequired,
  feelsLike: PropTypes.arrayOf(PropTypes.number).isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

HourlyChart.defaultProps = {
  style: {
    height: '100%',
  },
};

export default HourlyChart;
