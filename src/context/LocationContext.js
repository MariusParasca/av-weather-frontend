import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const LocationContext = React.createContext({
  latitude: null,
  longitude: null,
  login: () => {},
});

const LocationContextProvider = props => {
  const { children } = props;

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.error('Geolocation is not supported by this browser!');
    }
  }, []);
  return <LocationContext.Provider value={{ latitude, longitude }}>{children}</LocationContext.Provider>;
};

LocationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocationContextProvider;
