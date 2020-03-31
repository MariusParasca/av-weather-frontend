import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getMapChartOption from 'charts/mapChartOption';

const MapChart = props => {
  const { data } = props;

  return (
    <ReactEcharts
      style={{
        height: '100%',
        width: '100%',
      }}
      option={getMapChartOption(data)}
    />
  );
};

MapChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MapChart;
