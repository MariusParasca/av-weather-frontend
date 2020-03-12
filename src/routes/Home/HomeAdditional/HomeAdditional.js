import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Divider } from '@material-ui/core';
import SunInfo from 'components/SunInfo/SunInfo';

import { STANDARD_WEATHER_TYPE, WIND_WEATHER_TYPE } from 'constants/constants';
import { useSelector } from 'react-redux';
import WeatherInfo from 'components/TodayWeatherInfo/WeatherInfo/WeatherInfo';
import WithSvg from 'components/WithSvg/WithSvg';
import Wind from 'components/Wind/Wind';
import styles from './HomeAdditional.module.css';

const useStyles = makeStyles(() => ({
  dividerRoot: {
    marginTop: '15px',
    marginBottom: '15px',
  },
}));

const HomeAdditional = props => {
  const { sunriseTime, sunsetTime } = props;
  const classes = useStyles();

  const userFavoriteWeatherInfo = useSelector(state => state.userSettings.favoriteWeatherInfoLocally);

  let weatherComponent;

  if (userFavoriteWeatherInfo.weatherType === STANDARD_WEATHER_TYPE) {
    weatherComponent = (
      <WeatherInfo
        isOnFavorite
        circularSize={150}
        circularStrokeWidth={16}
        progressValue={userFavoriteWeatherInfo.progressValue}
        text={userFavoriteWeatherInfo.text}
        withPercent={userFavoriteWeatherInfo.withPercent}
        progressText={userFavoriteWeatherInfo.progressText}
      >
        <WithSvg component={userFavoriteWeatherInfo.svg} size={20} />
      </WeatherInfo>
    );
  } else if (userFavoriteWeatherInfo.weatherType === WIND_WEATHER_TYPE) {
    weatherComponent = (
      <Wind isOnFavorite strokeWidth={18} circularProgressSize={150} maxWind={userFavoriteWeatherInfo.progressValue} />
    );
  }

  return (
    <div>
      <div className={styles.airGaugeContainer}>{weatherComponent}</div>
      <SunInfo sunriseTime={sunriseTime} sunsetTime={sunsetTime} />
      <Divider variant="middle" classes={{ root: classes.dividerRoot }} />
    </div>
  );
};

HomeAdditional.propTypes = {
  sunriseTime: PropTypes.number.isRequired,
  sunsetTime: PropTypes.number.isRequired,
};

export default HomeAdditional;
