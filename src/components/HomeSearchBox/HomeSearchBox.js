import React, { useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useSelector, useDispatch } from 'react-redux';

import SearchBox from 'components/SearchBox/SearchBox';
import { SEARCH_PLACEHOLDER } from 'constants/constants';
import {
  FETCH_FAVORITES_SEND,
  DELETE_FAVORITE_SEND,
  DELETE_FAVORITE_LOCALLY_SEND,
} from 'store/actionTypes/favoritesActionTypes';
import { IconButton, Typography, makeStyles } from '@material-ui/core';
import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
import styles from './HomeSearchBox.module.css';

const useStyles = makeStyles(() => ({
  typoRoot: {
    cursor: 'pointer',
  },
}));

const HomeSearchBox = props => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites);
  const { data, dataLocally } = favorites;
  const isLoggedIn = useSelector(state => state.authData.isLoggedIn);

  const onClickCity = useCallback(
    favorite => {
      dispatch({
        type: WEATHER_API_SEND,
        payload: {
          latitude: favorite.latitude,
          longitude: favorite.longitude,
          city: favorite.city,
          country: favorite.country,
        },
      });
    },
    [dispatch],
  );

  const mapFunction = favorite => (
    <div className={styles.favoriteContainer} key={`${favorite.city}${favorite.country}`}>
      <IconButton
        size="small"
        onClick={
          isLoggedIn
            ? () => dispatch({ type: DELETE_FAVORITE_SEND, id: favorite.id })
            : () => dispatch({ type: DELETE_FAVORITE_LOCALLY_SEND, id: favorite.id })
        }
      >
        <HighlightOffIcon />
      </IconButton>
      <Typography variant="h5" onClick={() => onClickCity(favorite)} classes={{ root: classes.typoRoot }}>
        {favorite.city}
      </Typography>
    </div>
  );

  useEffect(() => {
    if (isLoggedIn) dispatch({ type: FETCH_FAVORITES_SEND });
  }, [dispatch, isLoggedIn]);

  return (
    <div className={styles.rightWeatherContainer}>
      <SearchBox placeholder={SEARCH_PLACEHOLDER} />
      <div className={styles.favoritesContainer}>
        {!isLoggedIn ? dataLocally.slice(0, 5).map(mapFunction) : data.slice(0, 5).map(mapFunction)}
      </div>
    </div>
  );
};

HomeSearchBox.propTypes = {};

export default HomeSearchBox;
