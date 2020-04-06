import React from 'react';
import PropTypes from 'prop-types';

const DashedCircularProgress = props => {
  const { size, strokeWidth, percent, activeColor, inactiveColor, text, className, isOnFavorite } = props;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const stopOffset = circumference * (1 - percent / 100);

  console.log('circumference', circumference);
  console.log('stopOffset', stopOffset);

  console.log('object', circumference - stopOffset);

  return (
    <svg width={size} height={size} version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        fill="none"
        stroke={inactiveColor}
        strokeWidth={strokeWidth}
        strokeDasharray="5 5"
      />
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        fill="none"
        stroke={activeColor}
        strokeWidth={strokeWidth}
        strokeDasharray="5 5 5 5 10"
        strokeDashoffset={0}
      />
    </svg>
  );
};

DashedCircularProgress.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  percent: PropTypes.number,
  text: PropTypes.string,
  className: PropTypes.string,
  isOnFavorite: PropTypes.bool,
};

DashedCircularProgress.defaultProps = {
  size: 70,
  strokeWidth: 9,
  activeColor: 'red', // '#6C66FA',
  inactiveColor: 'blue', // '#29294E',
  percent: 25,
  text: '',
  className: '',
  isOnFavorite: false,
};

export default DashedCircularProgress;
