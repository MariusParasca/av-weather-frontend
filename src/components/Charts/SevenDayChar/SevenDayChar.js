import React from 'react';
import PropTypes from 'prop-types';
import get7DaysChartOption from 'charts/sevenDayChart';

import ReactEcharts from 'echarts-for-react';

const SevenDayChar = props => {
  const { data } = props;

  const xLabel = [];
  const dayData = [];
  const nightData = [];

  for (let i = 0; i < data.length; i += 1) {
    const dataElement = data[i];
    xLabel.push(dataElement.label);
    dayData.push(Math.round(dataElement.temperatureDay));
    nightData.push(Math.round(dataElement.temperatureNight));
  }

  return <ReactEcharts option={get7DaysChartOption(xLabel, dayData, nightData)} />;
};

SevenDayChar.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      temperatureDay: PropTypes.number,
      temperatureNight: PropTypes.number,
    }),
  ).isRequired,
};

export default SevenDayChar;
