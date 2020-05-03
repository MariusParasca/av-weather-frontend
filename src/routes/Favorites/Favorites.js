import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

import { DELETE_FAVORITE_SEND } from 'store/actionTypes/favoritesActionTypes';
import { WEATHER_MAP_API_SEND } from 'store/actionTypes/weatherMapActionTypes';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import Spinner from 'components/Spinner/Spinner';
import { getMinArray, getMaxArray } from 'utils/helperFunctions';
import { getFavoritesDB, getFavoritesLocal, getUid, getDefaultLocation } from 'utils/stateGetters';
import { getFavoritesQuery } from 'utils/firestoreQueries';

import { SEND_NOTIFICATION } from 'store/actionTypes/notificationActionTypes';
import styles from './Favorites.module.css';

const Favorites = () => {
  const weatherMap = useSelector(state => state.weatherMap);
  const currentLocation = useSelector(state => state.weatherData.location);
  const defaultLocation = useSelector(getDefaultLocation);

  const uid = useSelector(getUid);

  useFirestoreConnect(getFavoritesQuery(uid));

  const favoritesPending = useSelector(state => state.favorites.pending);

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
    if (uid) {
      if (isLoaded(favoritesDB)) {
        if (weatherMap.daily.length !== favoritesData.length || weatherMap.daily.length === 0) {
          dispatch({
            type: WEATHER_MAP_API_SEND,
            favorites: favoritesData,
          });
        }
      }
    } else if (weatherMap.daily.length === 0 || weatherMap.daily.length !== favoritesData.length) {
      dispatch({
        type: WEATHER_MAP_API_SEND,
      });
    }
  }, [
    favoritesData.length,
    dispatch,
    weatherMap.daily.length,
    weatherMap.hourly.length,
    uid,
    favoritesDB,
    favoritesData,
  ]);

  const mapFunction = (favorite, index) => {
    return (
      <FavoriteCity
        minTemp={getMinArray(weatherMap.hourly[index][0], el => el.temperature)}
        maxTemp={getMaxArray(weatherMap.hourly[index][0], el => el.temperature)}
        key={favorite.city}
        city={favorite.city}
        country={favorite.country}
        currently={weatherMap.currently[index]}
        daily={weatherMap.daily[index]}
        onClickIcon={() => {
          if (
            favoritesData[index].city !== currentLocation.city &&
            favoritesData[index].city !== defaultLocation.city
          ) {
            dispatch({ type: DELETE_FAVORITE_SEND, id: favorite.id, index });
          } else if (favoritesData[index].city === defaultLocation.city) {
            dispatch({ type: SEND_NOTIFICATION, status: 'warning', message: "Can't delete default location" });
          } else {
            dispatch({ type: SEND_NOTIFICATION, status: 'warning', message: "Can't delete current selected location" });
          }
        }}
      />
    );
  };

  return weatherMap.daily.length !== favoritesData.length ||
    weatherMap.pending ||
    !isLoaded(favoritesDB) ||
    favoritesPending ? (
    <Spinner />
  ) : (
    <div className={styles.container}>{favoritesData.map(mapFunction)}</div>
  );
};

export default Favorites;
