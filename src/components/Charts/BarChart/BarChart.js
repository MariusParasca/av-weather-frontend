import React from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import getBarChartOption from 'charts/barChartOption';

const BarChart = props => {
  const { xLabels, fullBarArray, dataArray, style } = props;

  return <ReactEcharts style={style} option={getBarChartOption(xLabels, fullBarArray, dataArray)} />;
};

BarChart.propTypes = {
  xLabels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired,
  fullBarArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  dataArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  style: PropTypes.objectOf(PropTypes.any),
};

BarChart.defaultProps = {
  style: {
    height: '100%',
  },
};

export default BarChart;
