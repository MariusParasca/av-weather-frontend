import React from 'react';
import PropTypes from 'prop-types';
import AirQualityChart from 'components/Charts/AirQualityChart/AirQualityChart';

const AirGauge = props => {
  const { className, airQuality } = props;

  return (
    <div className={className}>
      <AirQualityChart value={airQuality} />
    </div>
  );
};

AirGauge.propTypes = {
  className: PropTypes.string,
  airQuality: PropTypes.number,
};

AirGauge.defaultProps = {
  className: '',
  airQuality: 0,
};

export default AirGauge;
