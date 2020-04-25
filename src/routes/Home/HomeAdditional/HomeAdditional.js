import React from 'react';

import { STANDARD_WEATHER_TYPE, WIND_WEATHER_TYPE } from 'constants/constants';
import { useSelector } from 'react-redux';
import WeatherInfo from 'components/TodayWeatherInfo/WeatherInfo/WeatherInfo';
import WithSvg from 'components/WithSvg/WithSvg';
import Wind from 'components/Wind/Wind';
import styles from './HomeAdditional.module.css';

const HomeAdditional = () => {
  const userFavoriteWeatherInfo = useSelector(state => state.userSettings.favoriteWeatherInfo);

  let weatherComponent;

  if (userFavoriteWeatherInfo.weatherType === STANDARD_WEATHER_TYPE) {
    weatherComponent = (
      <WeatherInfo
        isOnFavorite
        circularSize={120}
        circularStrokeWidth={15}
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
      <Wind isOnFavorite strokeWidth={15} circularProgressSize={120} maxWind={userFavoriteWeatherInfo.progressValue} />
    );
  }

  return <div className={styles.container}>{weatherComponent}</div>;
};

HomeAdditional.propTypes = {};

export default HomeAdditional;
