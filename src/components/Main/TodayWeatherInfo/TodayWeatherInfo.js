import React from 'react';
import PropTypes from 'prop-types';

const TodayWeatherInfo = props => {
  const { weatherInfo } = props;

  return <div>{JSON.stringify(weatherInfo)}</div>;
};

TodayWeatherInfo.propTypes = {
  weatherInfo: PropTypes.shape({
    maxWind: PropTypes.number,
    humidity: PropTypes.number,
    precipitation: PropTypes.number,
    uvIndex: PropTypes.number,
    cloudCover: PropTypes.number,
    pressure: PropTypes.number,
    visibility: PropTypes.number,
    dewPoint: PropTypes.number,
    sunriseTime: PropTypes.number,
    sunsetTime: PropTypes.number,
  }).isRequired,
};

export default TodayWeatherInfo;
