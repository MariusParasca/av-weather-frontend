import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import { PageRoute, ChartsRoute } from 'utils/routes';
import { isCorrectRoute } from 'utils/helperFunctions';
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
import Register from 'components/Register/Register';
import { DARK_SKY_API_SEND } from 'store/actionTypes/darkSkyActionTypes';
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
  const { ipStackHttp, locationData, weatherData, darkSkySend, latitude, longitude } = props;
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (locationData.latitude && locationData.longitude) {
      darkSkySend(locationData.latitude, locationData.longitude);
    }
  }, [darkSkySend, locationData.latitude, locationData.longitude]);

  useEffect(() => {
    if (!weatherData.pending) {
      setIsLoading(false);
    }
  }, [weatherData.pending]);

  const topContainerRoutes = [
    PageRoute.home,
    PageRoute.map,
    `${PageRoute.charts}${ChartsRoute.temperature}`,
    `${PageRoute.charts}${ChartsRoute.precipitation}`,
    `${PageRoute.charts}${ChartsRoute.humidity}`,
    `${PageRoute.charts}${ChartsRoute.wind}`,
    `${PageRoute.charts}${ChartsRoute.pressure}`,
    PageRoute.history,
  ];

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <div className={styles.container}>
      <Notification isOpen={error} handleClose={handleCloseError} />
      <>
        <Route exact path={topContainerRoutes}>
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
                    weatherData={weatherData.currently}
                  />
                  <Route exact path={PageRoute.home}>
                    <AirGauge className={styles.rightWeatherContainer} airQuality={73} />
                  </Route>
                </div>
                <Route exact path={PageRoute.home}>
                  <div className={styles.additionalContainer}>
                    <HomeAdditional
                      sunsetTime={weatherData.currently.sunsetTime}
                      sunriseTime={weatherData.currently.sunriseTime}
                    />
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
          <Route exact path={[PageRoute.home, PageRoute.charts, PageRoute.history]}>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <Route exact path={PageRoute.home}>
                  <Home weatherForecast={weatherData.daily} todayWeather={weatherData.currently} />
                </Route>
                <Route path={PageRoute.charts}>
                  <Charts hourly={weatherData.hourly} daily={weatherData.daily} />
                </Route>
                <Route path={PageRoute.history}>
                  <History
                    monthTemperature={february}
                    maxWind={weatherData.currently.maxWind}
                    humidity={weatherData.currently.humidity}
                    precipitation={weatherData.currently.precipitation}
                  />
                </Route>
              </>
            )}
          </Route>
          <Route path={PageRoute.favorites}>
            <Favorites />
          </Route>
          <Route path={PageRoute.map}>
            <Map />
          </Route>
          <Route path={PageRoute.register}>
            <Register />
          </Route>
        </div>
      </>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    weatherData: state.weatherData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    darkSkySend: (latitude, longitude) => dispatch({ type: DARK_SKY_API_SEND, latitude, longitude }),
  };
};

Main.propTypes = {
  // ipStackHttp: PropTypes.objectOf(PropTypes.any).isRequired,
  // location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
