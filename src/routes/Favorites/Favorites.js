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
  const { favorites, getFavorites, deleteFavorite } = props;
  const { data, error, pending } = favorites;

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [notificationColor, setNotificationColor] = useState('');

  const setNotification = useCallback((text, color) => {
    setNotificationText(text);
    setNotificationColor(color);
    setIsNotificationOpen(true);
  }, []);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  useEffect(() => {
    if (favorites.error) {
      setNotification(favorites.error.message, 'error');
    } else if (favorites.message) {
      setNotification(favorites.message, 'success');
    }
  }, [favorites, setNotification]);

  return (
    <div className={styles.container}>
      <Notification
        isOpen={isNotificationOpen}
        handleClose={() => setIsNotificationOpen(false)}
        text={notificationText}
        color={notificationColor}
      />
      {pending ? (
        <Spinner />
      ) : (
        <>
          {favorites.data.map(favorite => (
            <FavoriteCity
              key={favorite.city}
              utcOffset={favorite.utcOffset}
              city={favorite.city}
              country={favorite.country}
              latitude={favorite.latitude}
              longitude={favorite.longitude}
              onClickIcon={() => deleteFavorite(favorite.id)}
            />
          ))}
          {favorites.length === 0 && <Typography variant="h2">No favorite places</Typography>}
        </>
      )}
    </div>
  );
};

Favorites.propTypes = {};

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFavorites: () => dispatch({ type: FETCH_FAVORITES_SEND }),
    deleteFavorite: id => dispatch({ type: DELETE_FAVORITE_SEND, id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
