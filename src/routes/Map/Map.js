import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HereMaps from 'utils/HereMapsInstance';
import { FETCH_FAVORITES_SEND } from 'store/actionTypes/favoritesActionTypes';
import Spinner from 'components/Spinner/Spinner';
import FavoriteCity from 'components/FavoriteCity/FavoriteCity';
import styles from './Map.module.css';

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

  const setFavoritesMarkers = useCallback(
    favoritesArray => {
      const markers = [];

      for (const favorite of favoritesArray) {
        const marker = new window.H.map.Marker({ lat: favorite.latitude, lng: favorite.longitude });
        marker.setData(favorite.city);
        markers.push(marker);
      }

      const group = new window.H.map.Group({ objects: markers });

      group.addEventListener('tap', evt => {
        if (isLoggedIn) {
          setFavoriteClicked(findByCity(data, evt.target.getData()));
        } else {
          setFavoriteClicked(findByCity(dataLocally, evt.target.getData()));
        }
      });

      currentMap.getViewModel().setLookAtData({
        bounds: group.getBoundingBox(),
      });

      currentMap.addObject(group);
    },
    [currentMap, data, dataLocally, isLoggedIn],
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
