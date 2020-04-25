import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getTimeFromDate } from 'utils/dateTimeUtils';
import { Typography, makeStyles } from '@material-ui/core';
import styles from './CurrentWeather.module.css';
import './CurrentWeatherMapStyle.css';
import SunInfo from 'components/SunInfo/SunInfo';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  timeTypo: {
    fontSize: '2.2vh',
  },
  cityTypo: {
    marginBottom: '1.7%',
  },
}));

const CurrentWeather = props => {
  const { city, country, weatherData, className, sunriseTime, sunsetTime, imageName } = props;

  const classes = useStyles();

  const [image, setImage] = useState('');

  const temperatureScale = useSelector(state => state.userSettings.settings.weatherUnits.temperature);

  const [currentTime, setCurrentTime] = useState('00:00');

  const startClock = () => {
    const currentDate = new Date();

    setCurrentTime(getTimeFromDate(currentDate));
    return currentDate.getSeconds();
  };

  // useEffect(() => {
  //   if (!isMapCreated) {
  //     const layer = HereMaps.createDefaultLayers();
  //     const container = document.getElementById('home-here-map');

  //     // eslint-disable-next-line no-unused-vars
  //     const map = new window.H.Map(container, layer.vector.normal.map, {
  //       zoom: 13,
  //       center: { lat: currentLocation.latitude, lng: currentLocation.longitude },
  //       pixelRatio: window.devicePixelRatio || 1,
  //     });
  //     map.getViewPort().resize();
  //     window.addEventListener('resize', function() {
  //       map.getViewPort().resize();
  //     });
  //     setIsMapCreated(true);
  //   }
  // }, [currentLocation, isMapCreated]);

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
      const imageImported = await import(`../../images/TypeOfWeather/${image}.png`);
      setImage(imageImported);
    };
    if (imageName) getImage(imageName);
  }, [imageName]);

  const content = (
    <>
      <div className={styles.infoContainer}>
        <div className={styles.dataWrapper}>
          <Typography variant="subtitle1" classes={{ root: classes.timeTypo }}>
            Local Time: {currentTime}
          </Typography>
          <div className={styles.locationContainer}>
            <Typography variant="h2" classes={{ root: classes.cityTypo }}>
              {city}
            </Typography>
            <Typography variant="h2">{country}</Typography>
          </div>
          <div className={styles.temperatureContainer}>
            <Typography variant="h1">{`${Math.round(weatherData.temperature)}°${temperatureScale}`}</Typography>
          </div>
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
};

CurrentWeather.defaultProps = {
  className: '',
};

export default CurrentWeather;
