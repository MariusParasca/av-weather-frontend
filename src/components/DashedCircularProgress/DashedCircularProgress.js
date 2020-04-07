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
    <svg width={size} height={size} viewBox="0 0 120 120" shapeRendering="geometricPrecision">
      <defs>
        <mask id="circle_mask" x="0" y="0" width="100" height="100" maskUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="51" strokeWidth="0" fill="black" opacity="1" />
          <circle
            id="bar"
            r="50"
            cx="50"
            cy="50"
            fill="transparent"
            strokeDasharray="1"
            strokeDashoffset="1000"
            stroke="white"
            strokeWidth="9"
          />
          className="progress-radial-mask-inner" cx="50" cy="50" r="40" strokeWidth="0" fill="black" opacity="1"/>
        </mask>
      </defs>
      <g mask="url(#circle_mask)">
        <circle className="progress-radial-track" cx="50" cy="50" r="50" opacity="1" fill="#1a3331" />
        <path className="progress-radial-bar" transform="translate(50, 50)" d="M 0 0" fill="#66cdc3" />
      </g>
    </svg>
    // <svg width={size} height={size} version="1.1" xmlns="http://www.w3.org/2000/svg">
    //   <circle
    //     r={radius}
    //     cx={size / 2}
    //     cy={size / 2}
    //     fill="none"
    //     stroke={inactiveColor}
    //     strokeWidth={strokeWidth}
    //     strokeDasharray="5 5"
    //   />
    //   <circle
    //     r={radius}
    //     cx={size / 2}
    //     cy={size / 2}
    //     fill="none"
    //     stroke={activeColor}
    //     strokeWidth={strokeWidth}
    //     strokeDasharray="5 5 5 5 10"
    //     strokeDashoffset={0}
    //   />
    // </svg>
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
