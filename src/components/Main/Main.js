import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';

import darkSkyAxios from 'axios/darkSky';
import hereWeatherAxios from 'axios/hereWeather';
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
import Notification from 'components/Notification/Notification';
import HomeAdditional from 'routes/Home/HomeAdditional/HomeAdditional';
import HistoryAdditional from 'routes/History/HistoryAdditional/HistoryAdditional';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import styles from './Main.module.css';

// Calendar dumb data
const february = [
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 9, nightTemperature: -5 },
  { dayTemperature: 3, nightTemperature: -2 },
  { dayTemperature: 12, nightTemperature: -9 },
  { dayTemperature: 3, nightTemperature: -1 },
  { dayTemperature: 1, nightTemperature: 3 },
  { dayTemperature: 7, nightTemperature: 2 },
  { dayTemperature: 8, nightTemperature: 13 },
  { dayTemperature: 2, nightTemperature: 14 },
  { dayTemperature: 5, nightTemperature: -3 },
  { dayTemperature: 5, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
  { dayTemperature: 2, nightTemperature: -3 },
];

const Main = props => {
  const { ipStackHttp, location } = props;
  const [error, setError] = useState(false);

  const handleCloseError = () => {
    setError(false);
  };

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
    if (ipStackHttp.error || darkSkyHttp.error) {
      setError(true);
    }
  }, [darkSkyHttp.error, ipStackHttp.error]);

  useEffect(() => {
    setIsLoading(true);
  }, [ipStackHttp.loading]);

  useEffect(() => {
    if (ipStackHttp.data) {
      const data = {
        city: ipStackHttp.data.city,
        country: ipStackHttp.data.country_name,
        latitude: ipStackHttp.data.latitude,
        longitude: ipStackHttp.data.longitude,
      };
      setLocationData(data);
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
    const isOnTheCorrectRoute =
      [PageRoute.home, PageRoute.history].includes(location.pathname) || location.pathname.includes(PageRoute.charts);
    if (locationData.city && isOnTheCorrectRoute) {
      // getWeatherForecast(locationData.city);
      getWeatherByDarkSky(locationData.latitude, locationData.longitude);
    }
  }, [
    locationData.city,
    getWeatherForecast,
    locationData.latitude,
    locationData.longitude,
    getWeatherByDarkSky,
    location.pathname,
  ]);

  return (
    <div className={styles.container}>
      <Notification isOpen={error} handleClose={handleCloseError} />
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
            {isLoading ? (
              <Spinner />
            ) : (
              <>
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
              </>
            )}
          </div>
        </Route>
        <div className={styles.bottomContainer}>
          {isLoading && !location.pathname.includes(PageRoute.favorites) ? (
            <Spinner />
          ) : (
            <>
              <Route exact path={PageRoute.home}>
                <Home weatherForecast={weatherForecast} todayWeather={todayWeather} />
              </Route>
              <Route path={PageRoute.charts}>
                <Charts hourly={currentWeather.hourly} daily={weatherForecast} />
              </Route>
              <Route path={PageRoute.history}>
                <History
                  monthTemperature={february}
                  maxWind={todayWeather.maxWind}
                  humidity={todayWeather.humidity}
                  precipitation={todayWeather.precipitation}
                />
              </Route>
            </>
          )}
          <Route path={PageRoute.favorites}>
            <Favorites city={locationData.city} />
          </Route>
          <Route path={PageRoute.map}>
            <Map />
          </Route>
        </div>
      </>
    </div>
  );
};

Main.propTypes = {
  ipStackHttp: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(Main);
