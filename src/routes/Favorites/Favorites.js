import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FETCH_FAVORITES_SEND, DELETE_FAVORITE_SEND } from 'store/actionTypes/favoritesActionTypes';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import Spinner from 'components/Spinner/Spinner';
import Notification from 'components/Notification/Notification';
import styles from './Favorites.module.css';

const Favorites = props => {
  const { favorites, getFavorites, deleteFavorite, isLoggedIn } = props;
  const { data, dataLocally, error, pending, message } = favorites;

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notificationColor, setNotificationColor] = useState('');

  const mapFunction = favorite => (
    <FavoriteCity
      key={favorite.city}
      utcOffset={favorite.utcOffset}
      city={favorite.city}
      country={favorite.country}
      latitude={favorite.latitude}
      longitude={favorite.longitude}
      onClickIcon={() => deleteFavorite(favorite.id)}
    />
  );

  const setNotification = useCallback((text, color) => {
    setNotificationText(text);
    setNotificationColor(color);
    setIsNotificationOpen(true);
  }, []);

  useEffect(() => {
    if (isLoggedIn) getFavorites();
  }, [getFavorites, isLoggedIn]);

  useEffect(() => {
    if (error) {
      setNotification(error.message, 'error');
    } else if (message) {
      setNotification(message, 'success');
    }
  }, [error, message, setNotification]);

  return (
    <div className={styles.container}>
      <Notification
        isOpen={isNotificationOpen}
        handleClose={() => setIsNotificationOpen(false)}
        text={notificationText}
        color={notificationColor}
      />
      {!isLoggedIn && dataLocally.map(mapFunction)}
      {pending && isLoggedIn ? (
        <Spinner />
      ) : (
        <>
          {data.map(mapFunction)}
          {data.length === 0 && dataLocally.length === 0 && <Typography variant="h2">No favorite places</Typography>}
        </>
      )}
    </div>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.objectOf(PropTypes.any).isRequired,
  getFavorites: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    isLoggedIn: state.authData.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFavorites: () => dispatch({ type: FETCH_FAVORITES_SEND }),
    deleteFavorite: id => dispatch({ type: DELETE_FAVORITE_SEND, id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
