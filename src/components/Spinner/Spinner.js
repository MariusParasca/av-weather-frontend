import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

import styles from './Spinner.module.css';

const Spinner = props => {
  const { size } = props;

  return (
    <div className={styles.container}>
      <CircularProgress
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 40,
};

export default Spinner;
