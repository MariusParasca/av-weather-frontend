import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import weatherStackAxios from 'axios/weatherStack';
import { DRAWER_WIDTH } from 'constants/constants';
import geocoder from 'utils/geocodingService';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH})`,
    },
  },
}));

console.log(new Date());

const Main = () => {
  const styles = useStyles();
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const getWeatherData = async () => {
    try {
      const response = await weatherStackAxios.get('current', { params: { query: 'New York' } });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  // GetWeatherData();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    } else {
      console.error('Geolocation is not supported by this browser!');
    }
  }, []);

  useEffect(() => {
    if (location.longitude || location.latitude) {
      geocoder.reverseGeocode(
        {
          mode: 'retrieveAddresses',
          maxresults: 1,
          prox: `${location.latitude},${location.longitude}`,
        },
        data => {
          alert(`The nearest address to your location is:\n${data.Response.View[0].Result[0].Location.Address.Label}`);
        },
        error => {
          console.error(error);
        },
      );
    }
  }, [location]);

  return <div className={styles.container}> sunt aici</div>;
};

export default Main;
