import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { zeroPadTime } from 'utils/dateTimeUtils';
import { Typography } from '@material-ui/core';
import WithSvg from 'components/WithSvg/WithSvg';
import { ReactComponent as PartlyCloudyDaySvg } from 'svgs/weatherTypes/partly-cloudy-day.svg';
import styles from './CurrentWeather.module.css';

const CurrentWeather = props => {
  const { city, country, weatherData } = props;

  const [currentTime, setCurrentTime] = useState('00:00');

  const startClock = () => {
    const currentDate = new Date();
    const currentHours = zeroPadTime(currentDate.getHours());
    const currentMinutes = zeroPadTime(currentDate.getMinutes());

    setCurrentTime(`${currentHours}:${currentMinutes}`);
  };

  useEffect(() => {
    startClock();
    setInterval(startClock, 60 * 1000);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <Typography variant="subtitle1">Local Time: {currentTime}</Typography>
        <div className={styles.locationContainer}>
          <Typography variant="h4">{`${city}, ${country}`.toUpperCase()}</Typography>
        </div>
        <div className={styles.temperatureContainer}>
          <Typography variant="h1">{`${Math.round(weatherData.temperature)}°C`}</Typography>
          <WithSvg component={PartlyCloudyDaySvg} size={78} className={styles.icon} />
        </div>
        <div className={styles.descriptionContainer}>
          <Typography variant="h5">{weatherData.description} </Typography>
        </div>
        <div className={styles.feelsLikeContainer}>
          <Typography variant="h5">Feels like {Math.round(weatherData.feelsLike)}°</Typography>
        </div>
      </div>
      <div className={styles.rightContainer}>TODO</div>
    </div>
  );
};

CurrentWeather.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  weatherData: PropTypes.shape({
    temperature: PropTypes.number,
    description: PropTypes.string,
    feelsLike: PropTypes.number,
  }).isRequired,
};

export default CurrentWeather;
