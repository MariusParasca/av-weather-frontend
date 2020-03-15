import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

import getHourlyChartOption from 'charts/hourlyChart';
import { getChartColor, increaseBrightness, normalizeVar } from 'utils/helperFunctions';

const HourlyChart = props => {
  const { timeline, hourly, feelsLike, style, min, max, minFeelsTemp, maxFeelsTemp } = props;

  const hourlyData = [];
  const feelsLikeData = [];
  const colorMax = getChartColor(max);
  const colorMin = getChartColor(min > 0 ? -1 : min);
  const colorFeelsMax = getChartColor(maxFeelsTemp);
  const colorFeelsMin = getChartColor(minFeelsTemp > 0 ? -1 : minFeelsTemp);

  for (let i = 0; i < hourly.length; i += 1) {
    const hourTemp = hourly[i];
    const feelLike = feelsLike[i];
    const hourValue = normalizeVar(hourTemp, min, max, -40, 40) * 0.01;
    const feelsLikeValue = normalizeVar(feelLike, minFeelsTemp, maxFeelsTemp, -40, 40) * 0.01;
    hourlyData.push({
      value: hourTemp,
      itemStyle: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 2,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
          {
            offset: 0,
            color: increaseBrightness(colorMax, hourValue),
          },
          {
            offset: 1,
            color: increaseBrightness(colorMin, hourValue),
          },
        ]),
      },
    });
    feelsLikeData.push({
      value: feelLike,
      itemStyle: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 1,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 2, [
          {
            offset: 0,
            color: increaseBrightness(colorFeelsMax, feelsLikeValue),
          },
          {
            offset: 1,
            color: increaseBrightness(colorFeelsMin, feelsLikeValue),
          },
        ]),
        opacity: 0.75,
      },
    });
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
