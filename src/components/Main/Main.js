import React, { useEffect, useState, useCallback } from 'react';
import { Route } from 'react-router-dom';

import darkSkyAxios from 'axios/darkSky';
import hereWeatherAxios from 'axios/hereWeather';
import ipStackAxios from 'axios/ipStack';
import { DAY_NO_HOURS, WEEK_DAYS } from 'constants/constants';
import useHttp from 'hooks/useHttp';
import { PageRoute, ChartsRoute } from 'utils/routes';

import { createDateFromEpoch, getHourFromEpoch } from 'utils/dateTimeUtils';
import Spinner from 'components/Spinner/Spinner';
import Home from 'routes/Home/Home';
import Charts from 'routes/Charts/Charts';
import History from 'routes/History/History';
import Favorites from 'routes/Favorites/Favorites';
import Map from 'routes/Map/Map';
import AirGauge from 'components/AirGauge/AirGauge';
import HomeAdditional from 'routes/Home/HomeAdditional/HomeAdditional';
import HistoryAdditional from 'routes/History/HistoryAdditional/HistoryAdditional';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import styles from './Main.module.css';

const Main = () => {
  const [locationData, setLocationData] = useState({ latitude: 0, longitude: 0, city: '', country: '' });

  const [currentWeather, setCurrentWeather] = useState({
    temperature: 0,
    feelsLike: 0,
    description: '',
    airQuality: 0,
    sunriseTime: 0,
    sunsetTime: 0,
    hourly: [],
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
    async cityQuery => {
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
    async (latitude, longitude) => {
      sendRequestDarkSky(
        darkSkyAxios,
        [`/${latitude},${longitude}`, { params: { units: 'si', exclude: '[minutely]' } }],
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
    }
  }, [ipStackHttp.data]);

  const tackleCurrentWeather = useCallback(data => {
    setCurrentWeather({
      temperature: data.temperature,
      description: data.summary,
      feelsLike: data.apparentTemperature,
      sunriseTime: data.sunriseTime,
      sunsetTime: data.sunsetTime,
      hourly: data.hourly,
      // air
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
      dataArray.map((el, index) => ({
        ...el,
        label: index === 0 ? 'Today' : WEEK_DAYS[createDateFromEpoch(el.time).getDay()],
      })),
    );
  }, []);

  useEffect(() => {
    if (darkSkyHttp.data) {
      const today = darkSkyHttp.data.daily.data[0];
      tackleCurrentWeather({
        ...darkSkyHttp.data.currently,
        hourly: darkSkyHttp.data.hourly.data
          .slice(0, DAY_NO_HOURS + 1)
          .map(el => ({ ...el, hour: `${getHourFromEpoch(el.time)}:00`, temperature: Math.round(el.temperature) })),
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
    <div className={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Route
            exact
            path={[
              PageRoute.home,
              PageRoute.map,
              `${PageRoute.charts}${ChartsRoute.temperature}`,
              `${PageRoute.charts}${ChartsRoute.precipitation}`,
              `${PageRoute.charts}${ChartsRoute.humidity}`,
              `${PageRoute.charts}${ChartsRoute.wind}`,
              `${PageRoute.charts}${ChartsRoute.pressure}`,
              PageRoute.history,
            ]}
          >
            <div className={styles.topContainer}>
              <div className={styles.todayContainer}>
                <CurrentWeather
                  className={styles.leftWeatherContainer}
                  city={locationData.city}
                  country={locationData.country}
                  weatherData={currentWeather}
                />
                <Route exact path={PageRoute.home}>
                  <AirGauge className={styles.rightWeatherContainer} airQuality={73} />
                </Route>
              </div>
              <Route exact path={PageRoute.home}>
                <div className={styles.additionalContainer}>
                  <HomeAdditional sunsetTime={currentWeather.sunsetTime} sunriseTime={currentWeather.sunriseTime} />
                </div>
              </Route>
              <Route path={PageRoute.history}>
                <div className={styles.additionalContainer}>
                  <HistoryAdditional />
                </div>
              </Route>
            </div>
          </Route>
          <div className={styles.bottomContainer}>
            <Route exact path={PageRoute.home}>
              <Home weatherForecast={weatherForecast} todayWeather={todayWeather} />
            </Route>
            <Route path={PageRoute.map}>
              <Map />
            </Route>
            <Route path={PageRoute.charts}>
              <Charts hourly={currentWeather.hourly} daily={weatherForecast} />
            </Route>
            <Route path={PageRoute.history}>
              <History />
            </Route>
            <Route path={PageRoute.favorites}>
              <Favorites />
            </Route>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
