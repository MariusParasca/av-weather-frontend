import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import WithSvg from 'components/WithSvg/WithSvg';
import { ReactComponent as PartlyCloudyDaySvg } from 'svgs/weatherTypes/partly-cloudy-day.svg';
import styles from './DayWeather.module.css';

const DayWeather = props => {
  const { label, temperatureDay, temperatureNight } = props;

  return (
    <div className={styles.mainContainer} key={label}>
      <Typography variant="h5" align="center">
        {label}
      </Typography>
      <div className={styles.iconContainer}>
        <WithSvg component={PartlyCloudyDaySvg} size={55} />
      </div>
      <div className={styles.dayContainer}>
        <Typography variant="h5">{Math.round(temperatureDay)}°</Typography>
        <Typography variant="subtitle1"> Day</Typography>
      </div>
      <div className={styles.nightContainer}>
        <Typography variant="subtitle1">{Math.round(temperatureNight)}°</Typography>
        <Typography variant="subtitle1"> Night</Typography>
      </div>
    </div>
  );
};

DayWeather.propTypes = {
  label: PropTypes.string.isRequired,
  temperatureNight: PropTypes.number.isRequired,
  temperatureDay: PropTypes.number.isRequired,
};

export default DayWeather;
