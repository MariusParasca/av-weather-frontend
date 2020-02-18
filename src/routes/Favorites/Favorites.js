import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FETCH_FAVORITES_SEND,
  DELETE_FAVORITE_LOCALLY_SEND,
  DELETE_FAVORITE_SEND,
} from 'store/actionTypes/favoritesActionTypes';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import Spinner from 'components/Spinner/Spinner';
import styles from './Favorites.module.css';

const Favorites = props => {
  const { favorites, getFavorites, deleteFavorite, deleteFavoriteLocally, isLoggedIn } = props;
  const { data, dataLocally, pending } = favorites;

  const mapFunction = favorite => (
    <FavoriteCity
      key={favorite.city}
      utcOffset={favorite.utcOffset}
      city={favorite.city}
      country={favorite.country}
      latitude={favorite.latitude}
      longitude={favorite.longitude}
      onClickIcon={isLoggedIn ? () => deleteFavorite(favorite.id) : () => deleteFavoriteLocally(favorite.id)}
    />
  );

  useEffect(() => {
    if (isLoggedIn) getFavorites();
  }, [getFavorites, isLoggedIn]);

  return (
    <div className={styles.container}>
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
  deleteFavoriteLocally: PropTypes.func.isRequired,
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
    deleteFavoriteLocally: id => dispatch({ type: DELETE_FAVORITE_LOCALLY_SEND, id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
