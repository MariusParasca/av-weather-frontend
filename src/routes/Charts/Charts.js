import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem, Typography, Grid, makeStyles } from '@material-ui/core';
import PinDropIcon from '@material-ui/icons/PinDrop';
import MapIcon from '@material-ui/icons/Map';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { PageRoute, ChartsRoute } from 'utils/routes';
import { CHART_OPTIONS, CHART_SUB_PAGE_TITLES } from 'constants/constants';
import MenuButton from 'components/MenuButton/MenuButton';
import CurrentWeather from 'components/Main/CurrentWeather/CurrentWeather';
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
}));

const Charts = props => {
  const { hourly, daily, locationData, currently } = props;
  const [currentOption, setCurrentOption] = useState(1);

  const classes = useStyles();

  const changeOption = event => {
    setCurrentOption(event.target.value);
  };

  return (
    <Router>
      <div className={styles.container}>
        <Grid container spacing={2} classes={{ root: classes.gridContainer }}>
          {/* <Grid item xs={4}>
            <div className={styles.chartContainer}>
              <CurrentWeather
                // className={styles.leftWeatherContainer}
                city={locationData.city}
                country={locationData.country}
                imageName={currently.imageName}
                weatherData={currently}
                sunsetTime={currently.sunsetTime}
                sunriseTime={currently.sunriseTime}
              />
              <div className={styles.selectContainer}>
                <TextField select fullWidth onChange={changeOption} value={currentOption}>
                  {CHART_OPTIONS.map((option, index) => (
                    <MenuItem key={option} value={index}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </Grid> */}
          <Grid item xs={4} classes={{ root: classes.gridItem }}>
            <div className={styles.chartContainer}>
              <Temperature hourly={hourly} daily={daily} option={currentOption} />
            </div>
          </Grid>
          <Grid item xs={4} classes={{ root: classes.gridItem }}>
            <div className={styles.chartContainer}>
              <Precipitation hourly={hourly} daily={daily} option={currentOption} />
            </div>
          </Grid>
          <Grid item xs={4} classes={{ root: classes.gridItem }}>
            <div className={styles.chartContainer}>
              <Humidity hourly={hourly} daily={daily} option={currentOption} />
            </div>
          </Grid>
          <Grid item xs={4} classes={{ root: classes.gridItem }}>
            <div className={styles.chartContainer}>
              <Wind hourly={hourly} daily={daily} option={currentOption} />
            </div>
          </Grid>
          <Grid item xs={4} classes={{ root: classes.gridItem }}>
            <div className={styles.chartContainer}>
              <Pressure hourly={hourly} daily={daily} option={currentOption} />
            </div>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

Charts.propTypes = {
  hourly: PropTypes.arrayOf(PropTypes.object).isRequired,
  daily: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Charts;
