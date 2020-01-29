import React, { useEffect, useState, useCallback } from 'react';

import darkSkyAxios from 'axios/darkSky';
import hereWeatherAxios from 'axios/hereWeather';
import ipStackAxios from 'axios/ipStack';
import { WEEK_DAYS } from 'constants/constants';
import useHttp from 'hooks/useHttp';

import { createDateFromEpoch } from 'utils/dateTimeUtils';
import Spinner from 'components/Spinner/Spinner';
import Forecast from './Forecast/Forecast';
import TodayWeatherInfo from './TodayWeatherInfo/TodayWeatherInfo';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import styles from './Main.module.css';

const Main = () => {
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
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);
    sendRequestIpStack(ipStackAxios, ['/check'], 'get');
  }, [sendRequestIpStack]);

  useEffect(() => {
    if (ipStackHttp.data) {
      setLocationData({
        city: ipStackHttp.data.city,
        country: ipStackHttp.data.country_name,
        latitude: ipStackHttp.data.latitude,
        longitude: ipStackHttp.data.longitude,
      });
      console.log('ipstack');
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
      dataArray.map((el, index) => {
        if (index === 0)
          return {
            label: 'Today',
            temperatureNight: el.temperatureLow,
            temperatureDay: el.temperatureHigh,
          };
        return {
          label: WEEK_DAYS[createDateFromEpoch(el.time).getDay()],
          temperatureNight: el.temperatureLow,
          temperatureDay: el.temperatureHigh,
        };
      }),
    );
  }, []);

  useEffect(() => {
    if (darkSkyHttp.data) {
      const today = darkSkyHttp.data.daily.data[0];
      tackleCurrentWeather({
        ...darkSkyHttp.data.currently,
        sunriseTime: today.sunriseTime,
        sunsetTime: today.sunsetTime,
      });
      tackleForecastWeather(darkSkyHttp.data.daily.data);
      setIsLoading(false);
    }
  }, [darkSkyHttp.data, tackleForecastWeather, tackleCurrentWeather]);

  useEffect(() => {
    if (locationData.city) {
      // getWeatherForecast(locationData.city);
      getWeatherByDarkSky(locationData.latitude, locationData.longitude);
    }
  }, [locationData.city, getWeatherForecast, locationData.latitude, locationData.longitude, getWeatherByDarkSky]);

  return (
    <>
      <div className={styles.container}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <CurrentWeather
              className={styles.todayContainer}
              city={locationData.city}
              country={locationData.country}
              weatherData={currentWeather}
            />
            <Forecast forecastTemperature={weatherForecast} />
          </>
        )}
      </div>

      <TodayWeatherInfo isLoading={isLoading} weatherInfo={todayWeather} />
    </>
  );
};

export default Main;
