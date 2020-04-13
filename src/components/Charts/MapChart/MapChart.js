import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getMapChartOption from 'charts/mapChartOption';
import { withWidth } from '@material-ui/core';

const MapChart = props => {
  const { data, width } = props;

  return (
    <ReactEcharts
      style={{
        height: width === 'md' ? '135%' : '125%',
        width: '100%',
      }}
      option={getMapChartOption(data)}
    />
  );
};

MapChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(MapChart);
