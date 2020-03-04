import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getHomeChartOption from 'charts/homeChartOption';

const HomeChart = props => {
  const { data } = props;

  const xLabel = [];
  const actualTemp = [];
  const feelsLike = [];

  for (let i = 1; i < data.length; i += 1) {
    const dataElement = data[i];
    xLabel.push('');
    actualTemp.push(Math.round(dataElement.temperature));
    feelsLike.push(Math.round(dataElement.apparentTemperature));
  }

  return (
    <ReactEcharts
      style={{
        height: '120%',
      }}
      option={getHomeChartOption(xLabel, actualTemp, feelsLike)}
    />
  );
};

HomeChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeChart;
