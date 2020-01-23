import React from 'react';
import PropTypes from 'prop-types';

const WithSvg = ({ component: Svg, size }) => {
  const SvgIcon = () => {
    return <Svg width={size} height={size || 32} />;
  };

  return <SvgIcon />;
};

WithSvg.propTypes = {};

export default WithSvg;
