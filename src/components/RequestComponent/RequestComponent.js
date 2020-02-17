import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
import { LOGIN_CHECK } from 'store/actionTypes/authActionTypes';
import { topContainerRoutes } from 'constants/routes';
import { isCorrectRoute } from 'utils/helperFunctions';
import ApplicationBar from 'components/ApplicationBar/ApplicationBar';
import Main from 'components/Main/Main';
import SearchBox from 'components/SearchBox/SearchBox';

import { ADD_FAVORITE_SEND } from 'store/actionTypes/favoritesActionTypes';
import styles from './RequestComponent.module.css';

const RequestComponent = props => {
  const { location, locationData, getWeather, weatherData, pending, favorites, addFavorite, checkLogin } = props;

  useEffect(() => {
    if (isCorrectRoute(topContainerRoutes, location.pathname)) getWeather();
  }, [getWeather, location.pathname]);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <>
      <div className={styles.app}>
        <ApplicationBar />
        <Main locationData={locationData} weatherData={weatherData} pending={pending} />
      </div>
      {isCorrectRoute(topContainerRoutes, location.pathname) && (
        <SearchBox
          favorites={favorites}
          addFavorite={addFavorite}
          locationData={locationData}
          placeholder="City, postcode or place"
          className={styles.searchBox}
        />
      )}
    </>
  );
};

RequestComponent.propTypes = {
  locationData: PropTypes.objectOf(PropTypes.any).isRequired,
  favorites: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  weatherData: PropTypes.shape({
    currently: PropTypes.objectOf(PropTypes.any),
    hourly: PropTypes.array,
    daily: PropTypes.array,
  }).isRequired,
  pending: PropTypes.bool.isRequired,
  getWeather: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  checkLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    locationData: state.data.ipStack,
    weatherData: state.data.weather,
    pending: state.data.pending,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getWeather: () => dispatch({ type: WEATHER_API_SEND }),
    addFavorite: data => dispatch({ type: ADD_FAVORITE_SEND, data }),
    checkLogin: () => dispatch({ type: LOGIN_CHECK }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestComponent));
