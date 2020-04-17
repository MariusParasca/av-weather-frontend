import React, { useEffect, useCallback, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

// import { ReactComponent as SettingsSvg } from 'svgs/Appbar/settings.svg';
import SearchBox from 'components/SearchBox/SearchBox';
import { SEARCH_PLACEHOLDER } from 'constants/constants';
import { FETCH_FAVORITES_SEND, DELETE_FAVORITE_LOCALLY_SEND } from 'store/actionTypes/favoritesActionTypes';
import { Grid, makeStyles } from '@material-ui/core';
import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
// import WithSvg from 'components/WithSvg/WithSvg';
import HomeFavorite from 'components/HomeFavorite/HomeFavorite';
import styles from './HomeSearchBox.module.css';

const useStyles = makeStyles(() => ({
  gridRoot: {},
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

  const favoriteRef = useRef();

  const [numberOfFavorites, setNumberOfFavorites] = useState(0);

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

  useEffect(() => {
    const numberOfFavoritesSetter = () => {
      const boxWidth = window.innerHeight * 0.16 + 16; // 0.16 means 16% from view height (home favorite width = 16vh), 16 is the grid spacing (padding)
      console.log('boxWidth', boxWidth);
      console.log('favoriteRef.current.offsetWidth', favoriteRef.current.offsetWidth);
      setNumberOfFavorites(Math.floor(favoriteRef.current.offsetWidth / boxWidth));
    };

    numberOfFavoritesSetter();

    if (favoriteRef && favoriteRef.current) {
      window.addEventListener('resize', numberOfFavoritesSetter);
    }

    return () => {
      window.removeEventListener('resize', numberOfFavoritesSetter);
    };
  });

  return (
    <div className={styles.rightWeatherContainer}>
      <SearchBox className={styles.searchBoxContainer} placeholder={SEARCH_PLACEHOLDER} />
      <div className={styles.favoriteContainer} ref={favoriteRef}>
        {/* <div className={styles.textContainer}>
          <Typography variant="subtitle1">Frequent locations</Typography>
          <WithSvg component={SettingsSvg} size={15} className={styles.icon} />
        </div> */}
        <Grid container classes={{ root: classes.gridRoot }}>
          {dataLocally.slice(0, numberOfFavorites).map((fav, index) => (
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
  );
};

HomeSearchBox.propTypes = {};

export default HomeSearchBox;
