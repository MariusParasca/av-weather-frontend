import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { DELETE_FAVORITE_SEND } from 'store/actionTypes/favoritesActionTypes';
import { WEATHER_MAP_API_SEND, WEATHER_MAP_DELETE_BY_INDEX } from 'store/actionTypes/weatherMapActionTypes';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import Spinner from 'components/Spinner/Spinner';
import { getMinArray, getMaxArray } from 'utils/helperFunctions';
import { getFavoritesDB, getFavoritesLocal, getUid } from 'utils/stateGetters';
import { getFavoritesQuery } from 'utils/firestoreQueries';

import styles from './Favorites.module.css';

const Favorites = () => {
  const weatherMap = useSelector(state => state.weatherMap);

  const [pending, setPending] = useState(true);

  const uid = useSelector(getUid);

  useFirestoreConnect(getFavoritesQuery(uid));

  const favoritesDB = useSelector(getFavoritesDB);
  const favoritesLocal = useSelector(getFavoritesLocal);

  let favoritesData = [];

  if (uid) {
    favoritesData = favoritesDB || [];
  } else {
    favoritesData = favoritesLocal;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      weatherMap.daily.length === 0 ||
      weatherMap.hourly.length === 0 ||
      weatherMap.daily.length !== favoritesData.length
    ) {
      setPending(true);
      dispatch({
        type: WEATHER_MAP_API_SEND,
      });
    } else {
      setPending(false);
    }
  }, [favoritesData.length, dispatch, weatherMap.daily.length, weatherMap.hourly.length]);

  const mapFunction = (favorite, index) => (
    <FavoriteCity
      minTemp={getMinArray(weatherMap.hourly[index][0], el => el.temperature)}
      maxTemp={getMaxArray(weatherMap.hourly[index][0], el => el.temperature)}
      key={favorite.city}
      city={favorite.city}
      country={favorite.country}
      currently={weatherMap.currently[index]}
      daily={weatherMap.daily[index]}
      onClickIcon={() => {
        dispatch({ type: WEATHER_MAP_DELETE_BY_INDEX, index });
        dispatch({ type: DELETE_FAVORITE_SEND, id: favorite.id });
      }}
    />
  );

  return pending ? <Spinner /> : <div className={styles.container}>{favoritesData.map(mapFunction)}</div>;
};

export default Favorites;
