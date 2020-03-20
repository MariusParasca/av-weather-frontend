import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

import darkSkyAxios from 'axios/darkSky';
import useHttp from 'hooks/useHttp';
import { getTimeFromDate, getTimeBasedOnTimeZone } from 'utils/dateTimeUtils';
import { ReactComponent as StarFilledSvg } from 'svgs/Favorites/star_filled.svg';
import WithSvg from 'components/WithSvg/WithSvg';
import rain from 'images/TypeOfWeather/rain.png';
import { useSelector } from 'react-redux';
import styles from './HomeFavorite.module.css';

const useStyles = makeStyles(() => ({
  timeTypo: {
    fontSize: '0.7rem',
  },
  cityTypo: {
    fontSize: '1.2rem',
  },
  tempTypo: {
    fontSize: '2.4rem',
  },
}));

const HomeFavorite = props => {
  const { utcOffset, latitude, longitude, city, onClickIcon, className } = props;

  const favorites = useSelector(state => state.favorites);

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

  console.log('favorites', favorites);

  const classes = useStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.timeContainer}>
        <Typography variant="caption" color="primary" classes={{ root: classes.timeTypo }}>
          {time}
        </Typography>
        <div onClick={onClickIcon}>
          <WithSvg component={StarFilledSvg} size={13} />
        </div>
      </div>
      <Typography variant="subtitle1" classes={{ root: classes.cityTypo }}>
        {city}
      </Typography>
      <div className={styles.temperatureContainer}>
        <Typography variant="h2" classes={{ root: classes.tempTypo }}>
          {darkSkyHttp.isLoading ? <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : degreeValue}°
        </Typography>
        <div className={styles.imageContainer}>
          <img className={styles.imageResponsive} alt="weather icon" src={rain} />
        </div>
      </div>
    </div>
  );
};

HomeFavorite.propTypes = {
  utcOffset: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  onClickIcon: PropTypes.func.isRequired,
  className: PropTypes.string,
};

HomeFavorite.defaultProps = {
  className: '',
};

export default HomeFavorite;
