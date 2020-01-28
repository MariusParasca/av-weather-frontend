import React from 'react';
import PropTypes from 'prop-types';

const WithSvg = ({ component: Svg, size, className, width, height }) => {
  let actualWidth = width;
  let actualHeight = height;
  if (size && !width && !height) {
    actualWidth = size;
    actualHeight = size;
  }

  const SvgIcon = () => {
    return <Svg width={actualWidth} height={actualHeight} className={className} />;
  };

  return <SvgIcon />;
};

WithSvg.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
WithSvg.defaultProps = {
  size: 32,
  className: '',
  width: undefined,
  height: undefined,
};

export default WithSvg;
