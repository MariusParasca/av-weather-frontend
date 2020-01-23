import React from 'react';
import PropTypes from 'prop-types';

import styles from './CircularProgress.module.css';

const CircularProgress = props => {
  const { size, strokeWidth, percent, activeColor, inactiveColor } = props;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const stopOffset = circumference * (1 - percent / 100);

  return (
    <svg
      className={styles.svg}
      width={size}
      height={size}
      viewPort="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle r={radius} cx={size / 2} cy={size / 2} fill="none" stroke={inactiveColor} strokeWidth={strokeWidth} />
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        fill="none"
        stroke={activeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${stopOffset}`}
        strokeDashoffset={circumference}
      />
    </svg>
  );
};

CircularProgress.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  percent: PropTypes.number,
};

CircularProgress.defaultProps = {
  size: 65,
  strokeWidth: 9,
  activeColor: '#FF9F1E',
  inactiveColor: '#e6e6e6',
  percent: 0,
};

export default CircularProgress;
