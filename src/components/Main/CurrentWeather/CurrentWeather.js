import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getTimeFromDate } from 'utils/dateTimeUtils';
import { Typography } from '@material-ui/core';
import HereMaps from 'utils/HereMapsInstance';
import styles from './CurrentWeather.module.css';
import './CurrentWeatherMapStyle.css';
import SunInfo from 'components/SunInfo/SunInfo';
import { useSelector } from 'react-redux';
import iconTest from './icon.png';

const CurrentWeather = props => {
  const { city, country, weatherData, className, sunriseTime, sunsetTime } = props;

  const currentLocation = useSelector(state => state.data.ipStack);
  const [isMapCreated, setIsMapCreated] = useState(false);

  console.log('currentLocation', currentLocation);

  const [currentTime, setCurrentTime] = useState('00:00');

  const startClock = () => {
    const currentDate = new Date();

    setCurrentTime(getTimeFromDate(currentDate));
    return currentDate.getSeconds();
  };

  useEffect(() => {
    if (!isMapCreated) {
      const layer = HereMaps.createDefaultLayers();
      const container = document.getElementById('home-here-map');

      // eslint-disable-next-line no-unused-vars
      const map = new window.H.Map(container, layer.vector.normal.map, {
        zoom: 13,
        center: { lat: currentLocation.latitude, lng: currentLocation.longitude },
        pixelRatio: window.devicePixelRatio || 1,
      });
      map.getViewPort().resize();
      window.addEventListener('resize', function() {
        map.getViewPort().resize();
      });
      setIsMapCreated(true);
    }
  }, [currentLocation, isMapCreated]);

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
        style={{ width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.2)', borderRadius: '20px' }}
      />
      <div className={styles.mainInfoContainer}>
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
        <div className={styles.imageContainer}>
          <img className={styles.image} alt="weather icon" src={iconTest} />
        </div>
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
