import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HereMaps from 'utils/HereMapsInstance';
import { FETCH_FAVORITES_SEND } from 'store/actionTypes/favoritesActionTypes';
import Spinner from 'components/Spinner/Spinner';
import styles from './Map.module.css';

const Map = props => {
  const { favorites, getFavorites, isLoggedIn } = props;
  const { data, dataLocally, pending } = favorites;

  const [currentMap, setCurrentMap] = useState(null);

  useEffect(() => {
    if (!pending) {
      const layer = HereMaps.createDefaultLayers();
      const container = document.getElementById('here-map');

      const map = new window.H.Map(container, layer.vector.normal.map, {
        zoom: 1,
        padding: { top: 80, left: 80, bottom: 80, right: 80 },
      });

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

      group.addEventListener('tap', function(evt) {
        // Now lets log the event
        console.log(evt);
      });

      currentMap.getViewModel().setLookAtData({
        bounds: group.getBoundingBox(),
      });

      currentMap.addObject(group);
    },
    [currentMap],
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
    <div id="here-map" className={styles.container} style={{ width: '100%', height: '100%', background: 'grey' }} />
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
