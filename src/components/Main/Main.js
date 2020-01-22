import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';

import weatherStackAxios from 'axios/weatherStack';
import hereAxios from 'axios/here';
import { DRAWER_WIDTH } from 'constants/constants';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH})`,
    },
  },
}));

console.log(new Date());

const Main = () => {
  const styles = useStyles();

  const [currentTime, setCurrentTime] = useState('00:00');
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [weatherForecast, setWeatherForecast] = useState({});

  const getWeatherForecast = useCallback(async cityQuery => {
    try {
      const response = await weatherStackAxios.get('forecast', { params: { query: cityQuery } }); // , forecast_days: 7 need to pay to see forecast
      console.log('forecast', response.data);
      setCurrentWeatherData(response.data.current);
      setWeatherForecast(response.data.forecast);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const geoLocationSetup = useCallback(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
    navigator.geolocation.watchPosition(
      function(position) {
        console.log("i'm tracking you!, TODO");
      },
      function(error) {
        if (error.code === error.PERMISSION_DENIED) console.log('you denied me :-(, TO DO');
      },
    );
  }, []);

  const startClock = useCallback(() => {
    const currentDate = new Date();
    const currentHours = `0${currentDate.getHours()}`.slice(-2);
    const currentMinutes = `0${currentDate.getMinutes()}`.slice(-2);

    setCurrentTime(`${currentHours}:${currentMinutes}`);
  }, []);

  useEffect(() => {
    startClock();
    setInterval(startClock, 60 * 1000);
    if (navigator.geolocation) {
      geoLocationSetup();
    } else {
      console.error('Geolocation is not supported by this browser! TO DO');
    }
  }, [geoLocationSetup, startClock]);

  const getCity = useCallback(async () => {
    try {
      const response = await hereAxios.get('/reversegeocode.json', {
        params: {
          prox: `${location.latitude},${location.longitude},250`,
          maxresults: 1,
          mode: 'retrieveAddresses',
          gen: 9,
        },
      });
      const address = response.data.Response.View[0].Result[0].Location.Address;
      setCountry(address.AdditionalData.filter(el => el.key === 'CountryName')[0].value);
      setCity(address.City);
    } catch (error) {
      console.log(error);
    }
  }, [location.latitude, location.longitude]);

  useEffect(() => {
    if (location.longitude) {
      getCity();
    }
  }, [city, getCity, location]);

  useEffect(() => {
    const fetchData = async () => {
      await getWeatherForecast(city);
    };
    if (city) {
      fetchData();
    }
  }, [city, getWeatherForecast]);

  console.log('country', currentWeatherData);

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
