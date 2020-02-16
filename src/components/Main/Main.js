import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { PageRoute } from 'utils/routes';
import { topContainerRoutes, bottomContainerRoutes } from 'constants/routes';
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
  const { locationData, weatherData, pending } = props;
  const [error, setError] = useState(false);

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <div className={styles.container}>
      <Notification isOpen={error} handleClose={handleCloseError} />
      <>
        <Route exact path={topContainerRoutes}>
          <div className={styles.topContainer}>
            {pending ? (
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
          <Route exact path={bottomContainerRoutes}>
            {pending ? (
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

Main.propTypes = {
  locationData: PropTypes.objectOf(PropTypes.any).isRequired,
  weatherData: PropTypes.shape({
    currently: PropTypes.objectOf(PropTypes.any),
    hourly: PropTypes.arrayOf(PropTypes.any),
    daily: PropTypes.array,
  }).isRequired,
  pending: PropTypes.bool.isRequired,
};

export default Main;
