import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getHomeChartOption from 'charts/homeChartOption';

const HomeChart = props => {
  const { xLabel, actualTemp, feelsLike } = props;

  return (
    <ReactEcharts
      style={{
        height: 'calc(120% - 20px)',
      }}
      option={getHomeChartOption(xLabel, actualTemp, feelsLike)}
    />
  );
};

HomeChart.propTypes = {
  xLabel: PropTypes.arrayOf(PropTypes.string).isRequired,
  actualTemp: PropTypes.arrayOf(PropTypes.number).isRequired,
  feelsLike: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default HomeChart;
