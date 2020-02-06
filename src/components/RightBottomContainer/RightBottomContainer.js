import React from 'react';
import PropTypes from 'prop-types';

import styles from './RightBottomContainer.module.css';

const RightBottomContainer = props => {
  const { children, className } = props;

  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

RightBottomContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

RightBottomContainer.defaultProps = {
  className: '',
};

export default RightBottomContainer;
