import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getTimeFromDate } from 'utils/dateTimeUtils';
import { Typography } from '@material-ui/core';
import WithSvg from 'components/WithSvg/WithSvg';
import HereMaps from 'utils/HereMapsInstance';
import styles from './CurrentWeather.module.css';
import './CurrentWeatherMapStyle.css';
import SunInfo from 'components/SunInfo/SunInfo';
import { useSelector } from 'react-redux';

const CurrentWeather = props => {
  const { city, country, weatherData, className, sunriseTime, sunsetTime } = props;

  const currentLocation = useSelector(state => state.data.ipStack);

  console.log('currentLocation', currentLocation);

  const [currentTime, setCurrentTime] = useState('00:00');

  const startClock = () => {
    const currentDate = new Date();

    setCurrentTime(getTimeFromDate(currentDate));
    return currentDate.getSeconds();
  };

  useEffect(() => {
    const layer = HereMaps.createDefaultLayers();
    const container = document.getElementById('home-here-map');

    console.log('container', container);

    const map = new window.H.Map(container, layer.vector.normal.map, {
      zoom: 5,
      padding: { top: 80, left: 80, bottom: 80, right: 80 },
      pixelRatio: window.devicePixelRatio || 1,
    });
  }, []);

  useEffect(() => {
    const seconds = startClock();
    const firstClockAfter = 60 - seconds;
    const interval = setTimeout(startClock, firstClockAfter * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`${styles.container} ${className}`}>
      <div />
      <div
        id="home-here-map"
        className={styles.mapContainer}
        style={{ width: '100%', height: '100%', background: 'grey', borderRadius: '20px' }}
      />
      <div className={styles.infoContainer}>
        <Typography variant="subtitle1">Local Time: {currentTime}</Typography>
        <div className={styles.locationContainer}>
          <Typography variant="h4">{`${city}, ${country}`.toUpperCase()}</Typography>
        </div>
        <div className={styles.temperatureContainer}>
          <Typography variant="h1">{`${Math.round(weatherData.temperature)}°C`}</Typography>
        </div>
        <SunInfo sunriseTime={sunriseTime} sunsetTime={sunsetTime} />
      </div>
    </div>
  );
};

CurrentWeather.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  className: PropTypes.string,
  weatherData: PropTypes.shape({
    temperature: PropTypes.number,
    description: PropTypes.string,
    airQuality: PropTypes.number,
    feelsLike: PropTypes.number,
    sunriseTime: PropTypes.number.isRequired,
    sunsetTime: PropTypes.number.isRequired,
  }).isRequired,
};

CurrentWeather.defaultProps = {
  className: '',
};

export default CurrentWeather;
