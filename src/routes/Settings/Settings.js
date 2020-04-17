import React, { useState, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { Switch, Typography, Grid, makeStyles, TextField, MenuItem } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_WEATHER_SCALE, CHANGE_DEFAULT_LOCATION } from 'store/actionTypes/userSettingsActionTypes';
import { EUROPEAN_UNITS } from 'constants/constants';
import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
import styles from './Settings.module.css';

const useStyles = makeStyles(theme => ({
  switchBase: {
    color: theme.palette.primary.main,
  },
  track: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Settings = props => {
  const settings = useSelector(state => state.userSettings.settings);
  const unitType = settings.weatherUnits.type;
  const { defaultLocation } = settings;
  const favorites = useSelector(state => state.favorites);

  const [locationIndex, setLocationIndex] = useState(
    favorites.dataLocally.findIndex(fav => fav.city === defaultLocation.city),
  );

  //

  const [isCelsius, setIsCelsius] = useState(unitType === EUROPEAN_UNITS);

  const dispatch = useDispatch();

  const classes = useStyles();

  const changeIsCelsius = useCallback(() => {
    setIsCelsius(!isCelsius);
    dispatch({ type: CHANGE_WEATHER_SCALE, isCelsius: !isCelsius });
  }, [dispatch, isCelsius]);

  const changeCityCountry = useCallback(
    event => {
      const indexLocation = event.target.value;
      setLocationIndex(indexLocation);
      dispatch({ type: CHANGE_DEFAULT_LOCATION, data: favorites.dataLocally[indexLocation] });
      dispatch({
        type: WEATHER_API_SEND,
        payload: {
          latitude: favorites.dataLocally[indexLocation].latitude,
          longitude: favorites.dataLocally[indexLocation].longitude,
          city: favorites.dataLocally[indexLocation].city,
          country: favorites.dataLocally[indexLocation].country,
        },
      });
    },
    [dispatch, favorites.dataLocally],
  );

  return (
    <div className={styles.container}>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Farhenheit</Grid>
          <Grid item>
            <Switch
              classes={{ switchBase: classes.switchBase, track: classes.track }}
              color="primary"
              checked={isCelsius}
              onChange={changeIsCelsius}
            />
          </Grid>
          <Grid item>Celsius</Grid>
        </Grid>
      </Typography>
      <TextField select fullWidth onChange={changeCityCountry} value={locationIndex}>
        {favorites.dataLocally.map((fav, index) => (
          <MenuItem key={`${fav.latitude}${fav.longitude}`} value={index}>
            {fav.city}, {fav.country}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

Settings.propTypes = {};

export default Settings;