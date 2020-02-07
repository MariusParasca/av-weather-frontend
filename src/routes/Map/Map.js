import React, { useEffect, useState } from 'react';
import HereMaps from 'utils/HereMapsInstance';
// import PropTypes from 'prop-types';

import styles from './Map.module.css';

const Map = props => {
  const [currentMap, setCurrentMap] = useState(null);

  useEffect(() => {
    const layer = HereMaps.createDefaultLayers();
    const container = document.getElementById('here-map');

    const berlinMarker = new window.H.map.Marker({ lat: 52.5166, lng: 13.3833 });
    const parisMarker = new window.H.map.Marker({ lat: 48.8567, lng: 2.3508 });
    const madridMarker = new window.H.map.Marker({ lat: 40.4, lng: -3.6833 });

    const map = new window.H.Map(container, layer.vector.normal.map, {
      center: { lat: 50, lng: 5 },
      zoom: 4,
    });

    map.addObject(berlinMarker);
    map.addObject(parisMarker);
    map.addObject(madridMarker);

    setCurrentMap(map);
  }, []);

  return (
    <div id="here-map" className={styles.container} style={{ width: '100%', height: '600px', background: 'grey' }} />
  );
};

export default Map;
