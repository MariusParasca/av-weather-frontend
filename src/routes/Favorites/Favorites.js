import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DELETE_FAVORITE_LOCALLY } from 'store/actionTypes/favoritesActionTypes';

import { WEATHER_MAP_API_SEND, WEATHER_MAP_DELETE_BY_INDEX } from 'store/actionTypes/weatherMapActionTypes';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import Spinner from 'components/Spinner/Spinner';
import { getMinArray, getMaxArray } from 'utils/helperFunctions';
import styles from './Favorites.module.css';

const Favorites = () => {
  const weatherMap = useSelector(state => state.weatherMap);
  const favorites = useSelector(state => state.favorites);

  const [pending, setPending] = useState(true);

  const { favoritesData } = favorites;

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
        dispatch({ type: DELETE_FAVORITE_LOCALLY, id: favorite.id });
      }}
    />
  );

  return pending ? <Spinner /> : <div className={styles.container}>{favoritesData.map(mapFunction)}</div>;
};

export default Favorites;
