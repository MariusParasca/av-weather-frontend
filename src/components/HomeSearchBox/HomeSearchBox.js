import React, { useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as SettingsSvg } from 'svgs/Appbar/settings.svg';
import SearchBox from 'components/SearchBox/SearchBox';
import { SEARCH_PLACEHOLDER } from 'constants/constants';
import { FETCH_FAVORITES_SEND, DELETE_FAVORITE_LOCALLY_SEND } from 'store/actionTypes/favoritesActionTypes';
import { Typography, Grid, makeStyles } from '@material-ui/core';
import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
import WithSvg from 'components/WithSvg/WithSvg';
import HomeFavorite from 'components/HomeFavorite/HomeFavorite';
import styles from './HomeSearchBox.module.css';

const useStyles = makeStyles(() => ({
  gridRoot: {
    height: '123px',
    overflow: 'hidden',
  },
  gridItem: {
    '&:first-child': {
      padding: '0 8px 0 0',
    },
    padding: '0 8px',
  },
}));

const HomeSearchBox = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites);
  const { dataLocally } = favorites;
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

  useEffect(() => {
    if (isLoggedIn) dispatch({ type: FETCH_FAVORITES_SEND });
  }, [dispatch, isLoggedIn]);

  return (
    <div className={styles.rightWeatherContainer}>
      <SearchBox className={styles.searchBoxContainer} placeholder={SEARCH_PLACEHOLDER} />
      <div className={styles.favoriteContainer}>
        <div className={styles.textContainer}>
          <Typography variant="subtitle1">Frequent locations</Typography>
          <WithSvg component={SettingsSvg} size={15} className={styles.icon} />
        </div>
        <div className={styles.favorites}>
          <Grid container classes={{ root: classes.gridRoot }}>
            {dataLocally.slice(0, 5).map((fav, index) => (
              <Grid item key={`${fav.city}`} classes={{ root: classes.gridItem }}>
                <HomeFavorite
                  city={fav.city}
                  latitude={fav.latitude}
                  longitude={fav.longitude}
                  utcOffset={fav.utcOffset}
                  onClickIcon={() => dispatch({ type: DELETE_FAVORITE_LOCALLY_SEND, index })}
                  onClickContainer={() => onClickCity(fav)}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

HomeSearchBox.propTypes = {};

export default HomeSearchBox;
