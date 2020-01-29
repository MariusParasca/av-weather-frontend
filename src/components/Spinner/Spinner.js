import React from 'react';
import { CircularProgress } from '@material-ui/core';

import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  );
};

export default Spinner;
