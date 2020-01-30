import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';

import styles from './Forecast.module.css';
import DayWeather from './DayWeather/DayWeather';

const Forecast = props => {
  const { forecastTemperature } = props;

  return (
    <div className={styles.container}>
      <DayWeather key="Yesterday" label="Yesterday" temperatureDay={3} temperatureNight={-1} />
      <Divider orientation="vertical" variant="middle" />
      {forecastTemperature.map(day => (
        <DayWeather
          key={day.label}
          label={day.label}
          temperatureDay={day.temperatureDay}
          temperatureNight={day.temperatureNight}
        />
      ))}
    </div>
  );
};

Forecast.propTypes = {
  forecastTemperature: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, temperatureNight: PropTypes.number, temperatureDay: PropTypes.number }),
  ).isRequired,
};

export default Forecast;
