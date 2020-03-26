import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';

import { getMinArray, getMaxArray, nearest } from 'utils/helperFunctions';
import getHomeChartOption from 'charts/homeChartOption';

const HomeChart = props => {
  const { xLabel, actualTemp, feelsLike } = props;

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    if (actualTemp.length > 0 && feelsLike.length > 0) {
      const minAux = getMinArray([...actualTemp, ...feelsLike], el => el.value);
      const maxAux = getMaxArray([...actualTemp, ...feelsLike], el => el.value);
      setMin(nearest(minAux, 10));
      setMax(nearest(maxAux, 10));
    }
  }, [actualTemp, feelsLike]);

  return (
    <ReactEcharts
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
      option={getHomeChartOption(xLabel, actualTemp, feelsLike, min, max)}
    />
  );
};

HomeChart.propTypes = {
  xLabel: PropTypes.arrayOf(PropTypes.string).isRequired,
  actualTemp: PropTypes.arrayOf(PropTypes.object).isRequired,
  feelsLike: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeChart;
