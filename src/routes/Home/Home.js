import React from 'react';
import PropTypes from 'prop-types';

import Forecast from 'components/Forecast/Forecast';
import TodayWeatherInfo from 'components/TodayWeatherInfo/TodayWeatherInfo';

import SevenDayChar from 'components/Charts/SevenDayChar/SevenDayChar';
import styles from './Home.module.css';

const Home = props => {
  const { weatherForecast, todayWeather } = props;

  return (
    <div className={styles.container}>
      <div className={styles.forecastContainer}>
        <div className={styles.chartContainer}>
          <SevenDayChar data={weatherForecast} />
        </div>
        <Forecast forecastTemperature={weatherForecast} />
      </div>
      <TodayWeatherInfo isLoading={false} weatherInfo={todayWeather} />
    </div>
  );
};

Home.propTypes = {
  todayWeather: PropTypes.shape({
    maxWind: PropTypes.number,
    humidity: PropTypes.number,
    precipitation: PropTypes.number,
    uvIndex: PropTypes.number,
    cloudCover: PropTypes.number,
    pressure: PropTypes.number,
    visibility: PropTypes.number,
    dewPoint: PropTypes.number,
  }).isRequired,
  weatherForecast: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      temperatureNight: PropTypes.number,
      temperatureDay: PropTypes.number,
    }),
  ).isRequired,
};

export default Home;
