import React from 'react';
import PropTypes from 'prop-types';

import styles from './RightBottomContainer.module.css';

const RightBottomContainer = props => {
  const { children } = props;

  return <div className={styles.container}>{children}</div>;
};

RightBottomContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RightBottomContainer;
