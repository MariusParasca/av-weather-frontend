import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getTimeFromDate } from 'utils/dateTimeUtils';
import { Typography, makeStyles } from '@material-ui/core';
import HereMaps from 'utils/HereMapsInstance';
import styles from './CurrentWeather.module.css';
import './CurrentWeatherMapStyle.css';
import SunInfo from 'components/SunInfo/SunInfo';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  timeTypo: {
    fontSize: '1.3rem',
  },
}));

const CurrentWeather = props => {
  const { city, country, weatherData, className, sunriseTime, sunsetTime, imageName } = props;

  const classes = useStyles();

  const currentLocation = useSelector(state => state.data.ipStack);
  const [isMapCreated, setIsMapCreated] = useState(false);
  const [image, setImage] = useState('');

  console.log('image', image);

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

  useEffect(() => {
    const getImage = async image => {
      const imageImported = await import(`../../../images/TypeOfWeather/${image}.png`);
      setImage(imageImported);
    };
    if (imageName) getImage(imageName);
  }, [imageName]);

  const content = (
    <>
      <div className={styles.infoContainer}>
        <Typography variant="subtitle1" classes={{ root: classes.timeTypo }}>
          Local Time: {currentTime}
        </Typography>
        <div className={styles.locationContainer}>
          <Typography variant="h2">{`${city}, ${country.toUpperCase()}`}</Typography>
        </div>
        <div className={styles.temperatureContainer}>
          <Typography variant="h1">{`${Math.round(weatherData.temperature)}°C`}</Typography>
        </div>
        <SunInfo sunriseTime={sunriseTime} sunsetTime={sunsetTime} />
      </div>
      <div className={styles.imageContainer}>
        {image && <img className={styles.imageResponsive} alt="weather icon" src={image.default} />}
      </div>
    </>
  );

  return (
    <div className={`${styles.container} ${className}`}>
      <div
        id="home-here-map"
        className={styles.mapContainer}
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, borderRadius: '20px' }}
      />
      <div className={`${styles.mainInfoContainer} ${styles.mainInfoContainerOverlay}`}>{content}</div>
      <div className={styles.mainInfoContainer}>{content}</div>
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
  imageName: PropTypes.string.isRequired,
};

CurrentWeather.defaultProps = {
  className: '',
};

export default CurrentWeather;
