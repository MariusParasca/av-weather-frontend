import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HereMaps from 'utils/HereMapsInstance';
import { FETCH_FAVORITES_SEND } from 'store/actionTypes/favoritesActionTypes';
import Spinner from 'components/Spinner/Spinner';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import darkSkyAxios from 'axios/darkSky';
import styles from './Map.module.css';

const markupTemplate =
  '<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="52px"><path d="M 19 31 C 19 32.7 16.3 34 13 34 C 9.7 34 7 32.7 7 31 C 7 29.3 9.7 28 13 28 C 16.3 28 19 29.3 19 31 Z" fill="#000" fill-opacity=".2"/><path d="M 13 0 C 9.5 0 6.3 1.3 3.8 3.8 C 1.4 7.8 0 9.4 0 12.8 C 0 16.3 1.4 19.5 3.8 21.9 L 13 31 L 22.2 21.9 C 24.6 19.5 25.9 16.3 25.9 12.8 C 25.9 9.4 24.6 6.1 22.1 3.8 C 19.7 1.3 16.5 0 13 0 Z" fill="#fff"/><path d="M 13 2.2 C 6 2.2 2.3 7.2 2.1 12.8 C 2.1 16.1 3.1 18.4 5.2 20.5 L 13 28.2 L 20.8 20.5 C 22.9 18.4 23.8 16.2 23.8 12.8 C 23.6 7.07 20 2.2 13 2.2 Z" fill="#18d"/><text x="13" y="19" font-size="12pt" font-weight="bold" text-anchor="middle" fill="#fff">$text</text></svg>';

const findByCity = (favorites, city) => {
  for (const favorite of favorites) {
    if (favorite.city === city) {
      return favorite;
    }
  }
  return null;
};

const Map = props => {
  const { favorites, getFavorites, isLoggedIn } = props;
  const { data, dataLocally, pending } = favorites;

  const [currentMap, setCurrentMap] = useState(null);
  const [favoriteClicked, setFavoriteClicked] = useState(null);
  const wrapperRef = useRef(null);

  const handleClickOutside = useCallback(event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFavoriteClicked(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  useEffect(() => {
    if (!pending) {
      const layer = HereMaps.createDefaultLayers();
      const container = document.getElementById('here-map');

      const map = new window.H.Map(container, layer.vector.normal.map, {
        zoom: 1,
        padding: { top: 80, left: 80, bottom: 80, right: 80 },
        pixelRatio: window.devicePixelRatio || 1,
      });

      // eslint-disable-next-line no-unused-vars
      const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

      map.addEventListener(
        'pointermove',
        event => {
          if (event.target instanceof window.H.map.Marker) {
            map.getViewPort().element.style.cursor = 'pointer';
          } else {
            map.getViewPort().element.style.cursor = 'auto';
          }
        },
        false,
      );

      setCurrentMap(map);
    }
  }, [pending]);

  useEffect(() => {
    if (isLoggedIn) getFavorites();
  }, [getFavorites, isLoggedIn]);

  const makerGroupEventListener = useCallback(
    evt => {
      if (isLoggedIn) {
        const city = findByCity(data, evt.target.getData());
        setFavoriteClicked(city);
        currentMap.setCenter({ lat: city.latitude, lng: city.longitude });
      } else {
        const city = findByCity(dataLocally, evt.target.getData());
        setFavoriteClicked(city);
        currentMap.setCenter({ lat: city.latitude, lng: city.longitude });
      }
    },
    [currentMap, data, dataLocally, isLoggedIn],
  );

  const setFavoritesMarkers = useCallback(
    async favoritesArray => {
      if (favoritesArray.length > 0) {
        const markers = [];
        const promises = [];

        for (const favorite of favoritesArray) {
          promises.push(
            darkSkyAxios.get(`/${favorite.latitude},${favorite.longitude}`, {
              params: { units: 'si', exclude: '[minutely, hourly, daily]' },
            }),
          );
        }

        const results = await Promise.all(promises);
        for (let i = 0; i < results.length; i += 1) {
          const result = results[i];
          const favorite = favoritesArray[i];
          const markup = markupTemplate.replace('$text', Math.round(result.data.currently.temperature));
          const icon = new window.H.map.Icon(markup);
          const marker = new window.H.map.Marker({ lat: favorite.latitude, lng: favorite.longitude }, { icon });
          marker.setData(favorite.city);
          markers.push(marker);
        }

        const group = new window.H.map.Group({ objects: markers });

        group.addEventListener('tap', makerGroupEventListener);

        currentMap.getViewModel().setLookAtData({
          bounds: group.getBoundingBox(),
        });

        currentMap.addObject(group);
      }
    },
    [currentMap, makerGroupEventListener],
  );

  useEffect(() => {
    if (currentMap) {
      if (isLoggedIn) {
        setFavoritesMarkers(data);
      } else {
        setFavoritesMarkers(dataLocally);
      }
    }
  }, [currentMap, data, dataLocally, isLoggedIn, setFavoritesMarkers]);

  return pending ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      {favoriteClicked && (
        <div className={styles.favoriteContainer} ref={wrapperRef}>
          <FavoriteCity
            utcOffset={favoriteClicked.utcOffset}
            city={favoriteClicked.city}
            country={favoriteClicked.country}
            latitude={favoriteClicked.latitude}
            longitude={favoriteClicked.longitude}
            isOnMap
          />
        </div>
      )}
      <div
        id="here-map"
        className={styles.mapContainer}
        style={{ width: '100%', height: '100%', background: 'grey' }}
      />
    </div>
  );
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
  };
};

Map.propTypes = {
  favorites: PropTypes.objectOf(PropTypes.any).isRequired,
  getFavorites: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
