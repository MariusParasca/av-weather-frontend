import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Divider } from '@material-ui/core';

import WithSvg from 'components/WithSvg/WithSvg';
import { ReactComponent as PartlyCloudyDaySvg } from 'svgs/weatherTypes/partly-cloudy-day.svg';
import styles from './Forecast.module.css';
import DayWeather from './DayWeather/DayWeather';

const useStyles = makeStyles(theme => ({}));

const Forecast = props => {
  const classes = useStyles();

  const { forecastTemperature } = props;

  console.log(forecastTemperature);

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
