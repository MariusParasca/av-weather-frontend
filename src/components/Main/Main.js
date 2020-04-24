import React from 'react';
// import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { PageRoute, MapsRoute } from 'utils/routes';
import Spinner from 'components/Spinner/Spinner';
import Home from 'routes/Home/Home';
import Charts from 'routes/Charts/Charts';
// import History from 'routes/History/History';
import Favorites from 'routes/Favorites/Favorites';
import Map from 'routes/Map/Map';
import Account from 'routes/Account/Account';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import TodayWeatherInfo from 'components/TodayWeatherInfo/TodayWeatherInfo';
import Settings from 'routes/Settings/Settings';

import { useSelector } from 'react-redux';
import styles from './Main.module.css';

// Calendar dumb data
// const february = [
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 9, nightTemperature: -5 },
//   { dayTemperature: 3, nightTemperature: -2 },
//   { dayTemperature: 12, nightTemperature: -9 },
//   { dayTemperature: 3, nightTemperature: -1 },
//   { dayTemperature: 1, nightTemperature: 3 },
//   { dayTemperature: 7, nightTemperature: 2 },
//   { dayTemperature: 8, nightTemperature: 13 },
//   { dayTemperature: 2, nightTemperature: 14 },
//   { dayTemperature: 5, nightTemperature: -3 },
//   { dayTemperature: 5, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
//   { dayTemperature: 2, nightTemperature: -3 },
// ];

const Main = () => {
  const pending = useSelector(state => state.data.pending);

  return (
    <div className={styles.container}>
      <div className={styles.wrapperContainer}>
        {pending ? (
          <Spinner />
        ) : (
          <>
            <Route exact path={PageRoute.home}>
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            </Route>
            <Route path={PageRoute.charts}>
              <ErrorBoundary>
                <Charts />
              </ErrorBoundary>
            </Route>
            {/* <Route path={PageRoute.history}>
                <ErrorBoundary>
                  <History
                    monthTemperature={february}
                    maxWind={weatherData.currently.maxWind}
                    humidity={weatherData.currently.humidity}
                    precipitation={weatherData.currently.precipitation}
                  />
                </ErrorBoundary>
              </Route> */}
            <Route
              path={[
                `${PageRoute.map}${MapsRoute.cloudCover}`,
                `${PageRoute.map}${MapsRoute.temperature}`,
                `${PageRoute.map}${MapsRoute.wind}`,
                `${PageRoute.map}${MapsRoute.precipitation}`,
                `${PageRoute.map}${MapsRoute.pressure}`,
              ]}
            >
              <ErrorBoundary>
                <Map />
              </ErrorBoundary>
            </Route>
          </>
        )}
        <Route path={PageRoute.favorites}>
          <ErrorBoundary>
            <Favorites />
          </ErrorBoundary>
        </Route>
        <Route path={[PageRoute.account, PageRoute.register, PageRoute.login]}>
          <ErrorBoundary>
            <Account />
          </ErrorBoundary>
        </Route>
        <Route path={PageRoute.settings}>
          <Settings />
        </Route>
      </div>
      {pending ? null : (
        <div className={styles.rightToTheWrapper}>
          <Route exact path={PageRoute.home}>
            <TodayWeatherInfo />
          </Route>
        </div>
      )}
    </div>
  );
};

Main.propTypes = {};

export default Main;
