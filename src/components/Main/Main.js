import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';

import darkSkyAxios from 'axios/darkSky';
import hereWeatherAxios from 'axios/hereWeather';
import ipStackAxios from 'axios/ipStack';
import { LEFT_DRAWER_WIDTH, RIGHT_DRAWER_WIDTH } from 'constants/constants';
import useHttp from 'hooks/useHttp';

import { zeroPadTime } from 'utils/dateTimeUtils';
import CircularProgress from 'components/CircularProgress/CircularProgress';
import Forecast from './Forecast/Forecast';
import TodayWeatherInfo from './TodayWeatherInfo/TodayWeatherInfo';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${LEFT_DRAWER_WIDTH}px - ${RIGHT_DRAWER_WIDTH}px - ${2 * theme.spacing(6)}px)`,
    },
  },
}));

const Main = () => {
  const classes = useStyles();

  const [currentTime, setCurrentTime] = useState('00:00');

  const [locationData, setLocationData] = useState({ latitude: 0, longitude: 0, city: '', country: '' });

  const [currentWeather, setCurrentWeather] = useState({
    temperature: 0,
    feelsLike: 0,
    description: '',
    airQuality: 0,
  });
  const [todayWeather, setTodayWeather] = useState({
    maxWind: 0,
    humidity: 0,
    precipitation: 0,
    uvIndex: 0,
    cloudCover: 0,
    pressure: 0,
    visibility: 0,
    dewPoint: 0,
    sunriseTime: 0,
    sunsetTime: 0,
  });
  const [weatherForecast, setWeatherForecast] = useState([]);

  const hereWeatherHttp = useHttp();
  const { sendRequest: sendRequestHereWeather } = hereWeatherHttp;
  const ipStackHttp = useHttp();
  const { sendRequest: sendRequestIpStack } = ipStackHttp;
  const darkSkyHttp = useHttp();
  const { sendRequest: sendRequestDarkSky } = darkSkyHttp;

  const getWeatherForecast = useCallback(
    cityQuery => {
      sendRequestHereWeather(
        hereWeatherAxios,
        ['', { params: { name: cityQuery, product: 'forecast_7days_simple' } }],
        'get',
      );
      // SendRequestWeather(weatherStackAxios, ['/forecast', { params: { query: cityQuery } }], 'get');
    },
    [sendRequestHereWeather],
  );

  const getWeatherByDarkSky = useCallback(
    (latitude, longitude) => {
      sendRequestDarkSky(
        darkSkyAxios,
        [`/${latitude},${longitude}`, { params: { units: 'si', exclude: '[minutely,hourly]' } }],
        'get',
      );
    },
    [sendRequestDarkSky],
  );

  const startClock = useCallback(() => {
    const currentDate = new Date();
    const currentHours = zeroPadTime(currentDate.getHours());
    const currentMinutes = zeroPadTime(currentDate.getMinutes());

    setCurrentTime(`${currentHours}:${currentMinutes}`);
  }, []);

  useEffect(() => {
    startClock();
    setInterval(startClock, 60 * 1000);
    sendRequestIpStack(ipStackAxios, ['/check'], 'get');
  }, [sendRequestIpStack, startClock]);

  useEffect(() => {
    if (ipStackHttp.data) {
      setLocationData({
        city: ipStackHttp.data.city,
        country: ipStackHttp.data.country_name,
        latitude: ipStackHttp.data.latitude,
        longitude: ipStackHttp.data.longitude,
      });
    }
  }, [ipStackHttp.data]);

  const tackleCurrentWeather = useCallback(data => {
    setCurrentWeather({
      temperature: data.temperature,
      description: data.summary,
      feelsLike: data.apparentTemperature,
    });
    setTodayWeather({
      maxWind: data.windSpeed,
      humidity: data.humidity,
      precipitation: data.precipProbability,
      uvIndex: data.uvIndex,
      cloudCover: data.cloudCover,
      pressure: data.pressure,
      dewPoint: data.dewPoint,
      sunriseTime: data.sunriseTime,
      sunsetTime: data.sunsetTime,
      visibility: data.visibility,
    });
  }, []);

  const tackleForecastWeather = useCallback(dataArray => {
    setWeatherForecast(
      dataArray.map(el => ({ temperatureNight: el.temperatureLow, temperatureDay: el.temperatureHigh })),
    );
  }, []);

  useEffect(() => {
    if (hereWeatherHttp.data && darkSkyHttp.data) {
      const today = darkSkyHttp.data.daily.data[0];
      tackleCurrentWeather({
        ...darkSkyHttp.data.currently,
        sunriseTime: today.sunriseTime,
        sunsetTime: today.sunsetTime,
      });
      tackleForecastWeather(darkSkyHttp.data.daily.data);
    }
  }, [darkSkyHttp.data, hereWeatherHttp.data, tackleForecastWeather, tackleCurrentWeather]);

  useEffect(() => {
    if (locationData.city) {
      getWeatherForecast(locationData.city);
      getWeatherByDarkSky(locationData.latitude, locationData.longitude);
    }
  }, [locationData.city, getWeatherForecast, locationData.latitude, locationData.longitude, getWeatherByDarkSky]);

  return (
    <>
      <div className={classes.container}>
        <div>
          <p>Local Time: {currentTime}</p>
          <p>
            Location: {locationData.city}, {locationData.country}
          </p>
          <p>Temperature: {currentWeather.temperature} </p>
          <p>Description: {currentWeather.description} </p>
          <p>Feels like: {currentWeather.feelsLike} </p>
        </div>
        <CircularProgress percent={2} />
        <Forecast daysTemperature={weatherForecast} />
      </div>

      <TodayWeatherInfo weatherInfo={todayWeather} />
    </>
  );
};

export default Main;
