import React from 'react';
import PropTypes from 'prop-types';
import AirQualityChart from 'components/Charts/AirQualityChart/AirQualityChart';

const AirGauge = props => {
  const { airQuality, stroke, pointerWidth, showDetail } = props;

  return <AirQualityChart value={airQuality} stroke={stroke} pointerWidth={pointerWidth} showDetail={showDetail} />;
};

AirGauge.propTypes = {
  airQuality: PropTypes.number,
  stroke: PropTypes.number,
  pointerWidth: PropTypes.number,
  showDetail: PropTypes.bool,
};

AirGauge.defaultProps = {
  airQuality: 0,
  stroke: 18,
  pointerWidth: undefined,
  showDetail: true,
};

export default AirGauge;
