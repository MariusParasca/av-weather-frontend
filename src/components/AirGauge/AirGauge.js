import React from 'react';
import PropTypes from 'prop-types';
import AirQualityChart from 'components/Charts/AirQualityChart/AirQualityChart';
import { Typography } from '@material-ui/core';

const AirGauge = props => {
  const {
    className,
    classNameTypo,
    onClick,
    airQuality,
    stroke,
    height,
    width,
    pointerWidth,
    showDetail,
    showCustomLabel,
  } = props;

  return (
    <div onClick={onClick} onKeyPress={() => {}} role="button" tabIndex="0" className={className}>
      <AirQualityChart
        value={airQuality}
        stroke={stroke}
        width={width}
        height={height}
        pointerWidth={pointerWidth}
        showDetail={showDetail}
      />
      {showCustomLabel && (
        <Typography variant="subtitle1" className={classNameTypo}>
          {airQuality} Air Quality
        </Typography>
      )}
    </div>
  );
};

AirGauge.propTypes = {
  className: PropTypes.string,
  classNameTypo: PropTypes.string,
  airQuality: PropTypes.number,
  stroke: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  pointerWidth: PropTypes.number,
  onClick: PropTypes.func,
  showDetail: PropTypes.bool,
  showCustomLabel: PropTypes.bool,
};

AirGauge.defaultProps = {
  className: '',
  classNameTypo: '',
  airQuality: 0,
  height: 300,
  stroke: 18,
  width: undefined,
  pointerWidth: undefined,
  onClick: () => {},
  showDetail: true,
  showCustomLabel: false,
};

export default AirGauge;
