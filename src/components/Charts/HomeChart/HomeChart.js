import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getHomeChartOption from 'charts/homeChartOption';

const HomeChart = props => {
  const { xLabel, actualTemp, feelsLike } = props;

  return (
    <ReactEcharts
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
      option={getHomeChartOption(xLabel, actualTemp, feelsLike)}
    />
  );
};

HomeChart.propTypes = {
  xLabel: PropTypes.arrayOf(PropTypes.string).isRequired,
  actualTemp: PropTypes.arrayOf(PropTypes.object).isRequired,
  feelsLike: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeChart;
