import React from 'react';
import PropTypes from 'prop-types';

import styles from './WeatherInfo.module.css';

const WeatherInfo = props => {
  const { children } = props;

  return (
    <div className={styles.weatherInfoContainer}>
      <div className={styles.circularProgressContainer}>
        {children}
        <span className={styles.centerNumber}>75</span>
      </div>
    </div>
  );
};

WeatherInfo.propTypes = {};

export default WeatherInfo;
