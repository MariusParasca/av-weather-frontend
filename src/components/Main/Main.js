import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';

import weatherStackAxios from 'axios/weatherStack';
import ipStackAxios from 'axios/ipStack';
import { DRAWER_WIDTH } from 'constants/constants';
import useHttp from 'hooks/useHttp';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH})`,
    },
  },
}));

const Main = () => {
  const styles = useStyles();

  const [currentTime, setCurrentTime] = useState('00:00');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});

  const weatherHttp = useHttp();
  const { sendRequest: sendRequestWeather } = weatherHttp;
  const ipStackHttp = useHttp();
  const { sendRequest: sendRequestIpStack } = ipStackHttp;

  const getWeatherForecast = useCallback(
    cityQuery => {
      sendRequestWeather(weatherStackAxios, ['forecast', { params: { query: cityQuery } }], 'get');
    },
    [sendRequestWeather],
  );

  const startClock = useCallback(() => {
    const currentDate = new Date();
    const currentHours = `0${currentDate.getHours()}`.slice(-2);
    const currentMinutes = `0${currentDate.getMinutes()}`.slice(-2);

    setCurrentTime(`${currentHours}:${currentMinutes}`);
  }, []);

  useEffect(() => {
    startClock();
    setInterval(startClock, 60 * 1000);
    sendRequestIpStack(ipStackAxios, ['check'], 'get');
  }, [sendRequestIpStack, startClock]);

  useEffect(() => {
    if (ipStackHttp.data) {
      setCity(ipStackHttp.data.city);
      setCountry(ipStackHttp.data.country_name);
    }
  }, [ipStackHttp.data]);

  useEffect(() => {
    if (weatherHttp.data) {
      setCurrentWeatherData(weatherHttp.data.current);
      setWeatherForecast(weatherHttp.data.forecast);
    }
  }, [weatherHttp.data]);

  useEffect(() => {
    if (city && country) {
      getWeatherForecast(`${city}, ${country}`);
    }
  }, [city, country, getWeatherForecast]);

  return (
    <div className={styles.container}>
      <p>{currentTime}</p>
      <p>Hour: to be</p>
      <p>
        Location: {country}, {city}
      </p>
      <p>Weather data: {JSON.stringify(currentWeatherData)}</p>
      <p>Weather forecast: {JSON.stringify(weatherForecast)}</p>
    </div>
  );
};

export default Main;
