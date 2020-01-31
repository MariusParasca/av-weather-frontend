import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Switch } from '@material-ui/core';

import HourlyChart from 'components/Charts/HourlyChart/HourlyChart';
import Forecast from 'components/Forecast/Forecast';
import TodayWeatherInfo from 'components/TodayWeatherInfo/TodayWeatherInfo';

import SevenDayChar from 'components/Charts/SevenDayChar/SevenDayChar';
import styles from './Home.module.css';

const Home = props => {
  const { hourly, weatherForecast, todayWeather } = props;
  const [isHourlySet, setIsHourlySet] = useState(false);

  const onClickSwitch = () => {
    setIsHourlySet(!isHourlySet);
  };

  return (
    <div className={styles.container}>
      <div className={styles.forecastContainer}>
        <div>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>7 Days</Grid>
              <Grid item>
                <Switch checked={isHourlySet} onChange={onClickSwitch} value="isHourlySet" />
              </Grid>
              <Grid item>24 H</Grid>
            </Grid>
          </Typography>
        </div>
        <div className={styles.chartContainer}>
          {isHourlySet ? <HourlyChart hourlyData={hourly} /> : <SevenDayChar data={weatherForecast} />}
        </div>
        <Forecast forecastTemperature={weatherForecast} />
      </div>
      <TodayWeatherInfo isLoading={false} weatherInfo={todayWeather} />
    </div>
  );
};

Home.propTypes = {};

export default Home;
