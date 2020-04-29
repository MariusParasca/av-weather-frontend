import React, { useState, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { Switch, Typography, Grid, makeStyles, TextField, MenuItem } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import {
  CHANGE_WEATHER_SCALE_SEND,
  CHANGE_DEFAULT_LOCATION_SEND,
  CHANGE_DEFAULT_VIEW_SEND,
} from 'store/actionTypes/userSettingsActionTypes';
import { EUROPEAN_UNITS, DEFAULT_VIEWS, DEFAULT_VIEWS_MAP_OBJECT } from 'constants/constants';
import { WEATHER_API_SEND } from 'store/actionTypes/weatherAPIActionTypes';
import { WEATHER_MAP_API_SEND } from 'store/actionTypes/weatherMapActionTypes';
import styles from './Settings.module.css';

const useStyles = makeStyles(theme => ({
  switchBase: {
    color: theme.palette.primary.main,
  },
  track: {
    backgroundColor: theme.palette.primary.main,
  },
  selector: {
    marginLeft: 20,
    minWidth: 180,
  },
}));

const Settings = props => {
  const settings = useSelector(state => state.userSettings.settings);
  const defaultViewUrl = settings.defaultView.url;
  const unitType = settings.weatherUnits.type;
  const { defaultLocation } = settings;
  const favorites = useSelector(state => state.favorites);

  const [locationIndex, setLocationIndex] = useState(
    favorites.favoritesData.findIndex(fav => fav.city === defaultLocation.city),
  );

  const [defaultViewIndex, setDefaultViewIndex] = useState(
    Object.keys(DEFAULT_VIEWS_MAP_OBJECT).findIndex(view => DEFAULT_VIEWS_MAP_OBJECT[view] === defaultViewUrl),
  );

  const [isCelsius, setIsCelsius] = useState(unitType === EUROPEAN_UNITS);

  const dispatch = useDispatch();

  const classes = useStyles();

  const changeIsCelsius = useCallback(() => {
    setIsCelsius(!isCelsius);
    dispatch({ type: CHANGE_WEATHER_SCALE_SEND, isCelsius: !isCelsius });
    dispatch({
      type: WEATHER_API_SEND,
      payload: {
        latitude: favorites.favoritesData[locationIndex].latitude,
        longitude: favorites.favoritesData[locationIndex].longitude,
        city: favorites.favoritesData[locationIndex].city,
        country: favorites.favoritesData[locationIndex].country,
      },
    });
    dispatch({
      type: WEATHER_MAP_API_SEND,
    });
  }, [dispatch, favorites.favoritesData, isCelsius, locationIndex]);

  const changeCityCountry = useCallback(
    event => {
      const indexLocation = event.target.value;
      setLocationIndex(indexLocation);
      dispatch({ type: CHANGE_DEFAULT_LOCATION_SEND, data: favorites.favoritesData[indexLocation] });
      dispatch({
        type: WEATHER_API_SEND,
        payload: {
          latitude: favorites.favoritesData[indexLocation].latitude,
          longitude: favorites.favoritesData[indexLocation].longitude,
          city: favorites.favoritesData[indexLocation].city,
          country: favorites.favoritesData[indexLocation].country,
        },
      });
    },
    [dispatch, favorites.favoritesData],
  );

  const changeDefaultView = useCallback(
    event => {
      setDefaultViewIndex(event.target.value);
      dispatch({ type: CHANGE_DEFAULT_VIEW_SEND, url: DEFAULT_VIEWS_MAP_OBJECT[DEFAULT_VIEWS[event.target.value]] });
    },
    [dispatch],
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
      <div className={styles.defaultViewContainer}>
        <Typography>Change Default City:</Typography>
        <TextField select classes={{ root: classes.selector }} onChange={changeCityCountry} value={locationIndex}>
          {favorites.favoritesData.map((fav, index) => (
            <MenuItem key={`${fav.latitude}${fav.longitude}`} value={index}>
              {fav.city}, {fav.country}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={styles.defaultViewContainer}>
        <Typography>Change Default View:</Typography>
        <TextField select classes={{ root: classes.selector }} onChange={changeDefaultView} value={defaultViewIndex}>
          {DEFAULT_VIEWS.map((view, index) => (
            <MenuItem key={view} value={index}>
              {view}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};

Settings.propTypes = {};

export default Settings;
