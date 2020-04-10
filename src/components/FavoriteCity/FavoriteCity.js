import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Button, IconButton } from '@material-ui/core';

import darkSkyAxios from 'axios/darkSky';
import useHttp from 'hooks/useHttp';
import { getTimeFromDate, getTimeBasedOnTimeZone } from 'utils/dateTimeUtils';
import { ReactComponent as StarFilledSvg } from 'svgs/Favorites/star_filled.svg';
import { ReactComponent as PrecipitationSvg } from 'svgs/WeatherInfo/precipitation.svg';
import { ReactComponent as PressureSvg } from 'svgs/WeatherInfo/pressure.svg';
import { ReactComponent as HumiditySvg } from 'svgs/WeatherInfo/humidity.svg';
import { ReactComponent as CloudCoverSvg } from 'svgs/WeatherInfo/cloud_cover.svg';
import { ReactComponent as UvIndexSvg } from 'svgs/WeatherInfo/uv_index.svg';
import { ReactComponent as VisibilitySvg } from 'svgs/WeatherInfo/visibility.svg';
import { ReactComponent as dewPointSvg } from 'svgs/WeatherInfo/dew_point.svg';
import WithSvg from 'components/WithSvg/WithSvg';
import Spinner from 'components/Spinner/Spinner';
import exampleImage from 'images/TypeOfWeather/partly-cloudy-day.png';
import LabeledCircularProgress from 'components/LabeledCircularProgress/LabeledCircularProgress';
import styles from './FavoriteCity.module.css';

const useStyles = makeStyles(() => ({
  starButtonRoot: {
    padding: 0,
    minWidth: 0,
  },
  iconButton: {
    padding: '1px',
    paddingTop: 0,
    marginLeft: '2%',
  },
  typoWeatherInfo: {
    color: '#353666',
    fontSize: '1.8vh',
  },
}));

const FavoriteCity = props => {
  const { city, country, utcOffset, latitude, longitude, onClickIcon, isOnMap } = props;

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
      <div className={styles.imageContainer}>
        <img className={styles.imageResponsive} alt="weather icon" src={exampleImage} />
      </div>
      <div className={styles.cityCountryContainer}>
        <Typography variant="h5">Viena, Austria</Typography>
        <IconButton classes={{ root: classes.iconButton }} onClick={onClickIcon}>
          <WithSvg component={StarFilledSvg} size={16} />
        </IconButton>
      </div>
      <Typography variant="h1">11°C</Typography>
      <div className={styles.todayWeatherContainer}>
        <LabeledCircularProgress circularProgressSize={64} progressValue={10} />
        <div className={styles.todayWeatherSubContainer}>
          <div className={styles.todayWeatherIconsContainer}>
            <WithSvg component={PrecipitationSvg} size={20} />
            <WithSvg component={PressureSvg} size={20} />
            <WithSvg component={HumiditySvg} size={20} />
          </div>
          <div className={styles.todayWeatherTextContainer}>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                24%
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                1,046.1
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                62%
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.todayWeatherSubContainer}>
          <div className={styles.todayWeatherIconsContainer}>
            <WithSvg component={CloudCoverSvg} size={20} />
            <WithSvg component={UvIndexSvg} size={20} />
            <WithSvg component={VisibilitySvg} size={20} />
          </div>
          <div className={styles.todayWeatherTextContainer}>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                67%
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                0
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                5km
              </Typography>
            </div>
          </div>
        </div>
        <div className={styles.todayWeatherSubContainer}>
          <div className={styles.todayWeatherIconsContainer}>
            <WithSvg component={PrecipitationSvg} size={20} />
            <WithSvg component={PressureSvg} size={20} />
            <WithSvg component={dewPointSvg} size={20} />
          </div>
          <div className={styles.todayWeatherTextContainer}>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                4°
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                12°
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" classes={{ root: classes.typoWeatherInfo }}>
                -2°
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FavoriteCity.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  onClickIcon: PropTypes.func,
  utcOffset: PropTypes.number,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  isOnMap: PropTypes.bool,
};

FavoriteCity.defaultProps = {
  utcOffset: undefined,
  onClickIcon: undefined,
  isOnMap: false,
};

export default FavoriteCity;
