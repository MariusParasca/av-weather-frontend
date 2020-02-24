import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Button } from '@material-ui/core';

import darkSkyAxios from 'axios/darkSky';
import useHttp from 'hooks/useHttp';
import { getTimeFromDate, getTimeBasedOnTimeZone } from 'utils/dateTimeUtils';
import StarIcon from '@material-ui/icons/Star';
import Spinner from 'components/Spinner/Spinner';
import styles from './FavoriteCity.module.css';

const useStyles = makeStyles(() => ({
  starButtonRoot: {
    padding: 0,
    minWidth: 0,
  },
}));

const FavoriteCity = props => {
  const { city, country, utcOffset, latitude, longitude, onClickIcon } = props;

  const classes = useStyles();

  const darkSkyHttp = useHttp();
  const { sendRequest: sendRequestDarkSky } = darkSkyHttp;

  const [time, setTime] = useState('00:00');
  const [degreeValue, setDegreeValue] = useState('');

  const getWeatherByDarkSky = useCallback(
    async (currentLatitude, currentLongitude) => {
      sendRequestDarkSky(
        darkSkyAxios,
        [`/${currentLatitude},${currentLongitude}`, { params: { units: 'si', exclude: '[minutely, hourly, daily]' } }],
        'get',
      );
    },
    [sendRequestDarkSky],
  );

  useEffect(() => {
    if (latitude && longitude) {
      getWeatherByDarkSky(latitude, longitude);
    }
  }, [getWeatherByDarkSky, latitude, longitude]);

  useEffect(() => {
    if (darkSkyHttp.data) {
      setDegreeValue(Math.round(darkSkyHttp.data.currently.temperature));
    }
  }, [darkSkyHttp.data]);

  const startClock = useCallback(() => {
    const date = getTimeBasedOnTimeZone(utcOffset);
    if (date) {
      setTime(getTimeFromDate(date));
    }

    return date.getSeconds();
  }, [utcOffset]);

  useEffect(() => {
    const seconds = startClock();
    const firstClockAfter = 60 - seconds;
    const interval = setTimeout(startClock, firstClockAfter * 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [time, startClock]);

  return (
    <div className={styles.container}>
      <div className={styles.localTimeContainer}>
        <Typography variant="h6">Local time: {time}</Typography>
        {onClickIcon && (
          <Button classes={{ root: classes.starButtonRoot }} onClick={onClickIcon}>
            <StarIcon />
          </Button>
        )}
      </div>
      <Typography variant="h4">{`${city}, ${country}`}</Typography>
      <div className={styles.valueContainer}>
        <div className={styles.degreeValue}>
          {darkSkyHttp.isLoading ? <Spinner /> : <Typography variant="h1">{degreeValue}°C</Typography>}
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} alt="weather type" src="https://via.placeholder.com/200x150.jpg" />
        </div>
      </div>
    </div>
  );
};

FavoriteCity.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  utcOffset: PropTypes.number,
  onClickIcon: PropTypes.func,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

FavoriteCity.defaultProps = {
  utcOffset: undefined,
  onClickIcon: undefined,
};

export default FavoriteCity;
