import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import {
  FETCH_FAVORITES_SEND,
  DELETE_FAVORITE_LOCALLY_SEND,
  DELETE_FAVORITE_SEND,
} from 'store/actionTypes/favoritesActionTypes';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import Spinner from 'components/Spinner/Spinner';
import styles from './Favorites.module.css';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites);
  const isLoggedIn = useSelector(state => state.authData.isLoggedIn);
  const { data, dataLocally, pending } = favorites;

  const dispatch = useDispatch();

  const mapFunction = favorite => (
    <FavoriteCity
      key={favorite.city}
      utcOffset={favorite.utcOffset}
      city={favorite.city}
      country={favorite.country}
      latitude={favorite.latitude}
      longitude={favorite.longitude}
      onClickIcon={
        isLoggedIn
          ? () => dispatch({ type: DELETE_FAVORITE_SEND, id: favorite.id })
          : () => dispatch({ type: DELETE_FAVORITE_LOCALLY_SEND, id: favorite.id })
      }
    />
  );

  useEffect(() => {
    if (isLoggedIn) dispatch({ type: FETCH_FAVORITES_SEND });
  }, [dispatch, isLoggedIn]);

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

export default Favorites;
