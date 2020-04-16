import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Typography, Grid, makeStyles } from '@material-ui/core';

import { CHART_OPTIONS } from 'constants/constants';
import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
import { getTimeFromDate } from 'utils/dateTimeUtils';
import SunInfo from 'components/SunInfo/SunInfo';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Charts.module.css';
import Temperature from './Temperature/Temperature';
import Precipitation from './Precipitation/Precipitation';
import Humidity from './Humidity/Humidity';
import Wind from './Wind/Wind';
import Pressure from './Pressure/Pressure';

const useStyles = makeStyles(() => ({
  gridContainer: {
    height: '100%',
  },
  gridItem: {
    height: '50%',
  },
  timeTypo: {
    fontSize: '2.2vh',
  },
  cityTypo: {
    marginBottom: '1.7%',
  },
}));

const Charts = props => {
  const { hourly, daily, locationData, currently } = props;

  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites);
  const classes = useStyles();

  const [locationIndex, setLocationIndex] = useState(
    favorites.dataLocally.findIndex(fav => fav.city === locationData.city),
  );

  const [currentOption, setCurrentOption] = useState(1);
  const [image, setImage] = useState('');

  const [currentTime, setCurrentTime] = useState('00:00');

  const startClock = () => {
    const currentDate = new Date();

    setCurrentTime(getTimeFromDate(currentDate));
    return currentDate.getSeconds();
  };

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
    if (currently.imageName) getImage(currently.imageName);
  }, [currently.imageName]);

  const changeOption = event => {
    setCurrentOption(event.target.value);
  };

  const changeCityCountry = useCallback(
    event => {
      const indexLocation = event.target.value;
      setLocationIndex(event.target.value);
      dispatch({
        type: WEATHER_API_SEND,
        payload: {
          latitude: favorites.dataLocally[indexLocation].latitude,
          longitude: favorites.dataLocally[indexLocation].longitude,
          city: favorites.dataLocally[indexLocation].city,
          country: favorites.dataLocally[indexLocation].country,
        },
      });
    },
    [dispatch, favorites.dataLocally],
  );

  return (
    <div className={styles.container}>
      <Grid container spacing={2} classes={{ root: classes.gridContainer }}>
        <Grid item xs={4}>
          <div className={styles.chartContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.dataWrapper}>
                <Typography variant="subtitle1" classes={{ root: classes.timeTypo }}>
                  Local Time: {currentTime}
                </Typography>
                <div className={styles.locationContainer}>
                  <TextField select fullWidth onChange={changeCityCountry} value={locationIndex}>
                    {favorites.dataLocally.map((fav, index) => (
                      <MenuItem key={`${fav.latitude}${fav.longitude}`} value={index}>
                        {fav.city}, {fav.country}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div className={styles.temperatureContainer}>
                  <Typography variant="h1">{`${Math.round(currently.temperature)}°C`}</Typography>
                </div>
              </div>
              <SunInfo sunriseTime={currently.sunriseTime} sunsetTime={currently.sunsetTime} />
            </div>
            <div className={styles.selectContainer}>
              <TextField select fullWidth onChange={changeOption} value={currentOption}>
                {CHART_OPTIONS.map((option, index) => (
                  <MenuItem key={option} value={index}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className={styles.imageContainer}>
              {image && <img className={styles.imageResponsive} alt="weather icon" src={image.default} />}
            </div>
          </div>
        </Grid>
        <Grid item xs={4} classes={{ root: classes.gridItem }}>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitleText}>
              <Typography variant="h6">Temperature</Typography>
            </div>
            <Temperature hourly={hourly} daily={daily} option={currentOption} />
          </div>
        </Grid>
        <Grid item xs={4} classes={{ root: classes.gridItem }}>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitleText}>
              <Typography variant="h6">Precipitation</Typography>
            </div>
            <Precipitation hourly={hourly} daily={daily} option={currentOption} />
          </div>
        </Grid>
        <Grid item xs={4} classes={{ root: classes.gridItem }}>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitleText}>
              <Typography variant="h6">Humidity</Typography>
            </div>
            <Humidity hourly={hourly} daily={daily} option={currentOption} />
          </div>
        </Grid>
        <Grid item xs={4} classes={{ root: classes.gridItem }}>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitleText}>
              <Typography variant="h6">Wind</Typography>
            </div>
            <Wind hourly={hourly} daily={daily} option={currentOption} />
          </div>
        </Grid>
        <Grid item xs={4} classes={{ root: classes.gridItem }}>
          <div className={styles.chartContainer}>
            <div className={styles.chartTitleText}>
              <Typography variant="h6">Pressure</Typography>
            </div>
            <Pressure hourly={hourly} daily={daily} option={currentOption} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Charts.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Charts;
