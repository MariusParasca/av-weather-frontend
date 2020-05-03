import React, { useState, useCallback, useEffect } from 'react';
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
import { getUid, getUserSettingsDB, getFavoritesDB, getFavoritesLocal } from 'utils/stateGetters';
import { getSettingsQuery, getFavoritesQuery } from 'utils/firestoreQueries';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import Spinner from 'components/Spinner/Spinner';
import { getWeatherUnits } from 'utils/helperFunctions';
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
  const uid = useSelector(getUid);

  useFirestoreConnect(getSettingsQuery(uid));

  const settingsLocal = useSelector(state => state.userSettings.settings);
  const settingsDB = useSelector(getUserSettingsDB);

  useFirestoreConnect(getFavoritesQuery(uid));

  const favoritesDB = useSelector(getFavoritesDB);
  const favoritesLocal = useSelector(getFavoritesLocal);

  let favoritesData = [];

  let settings = {};

  if (uid) {
    favoritesData = favoritesDB || [];
    settings = settingsDB || {};
  } else {
    favoritesData = favoritesLocal;
    settings = settingsLocal;
  }

  const [locationIndex, setLocationIndex] = useState(0);

  const [defaultViewIndex, setDefaultViewIndex] = useState(0);

  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if (uid) {
      if (isLoaded(settingsDB) && isLoaded(favoritesDB)) {
        setLocationIndex(favoritesData.findIndex(fav => fav.city === settings.defaultLocation.city));
        setDefaultViewIndex(
          Object.keys(DEFAULT_VIEWS_MAP_OBJECT).findIndex(
            view => DEFAULT_VIEWS_MAP_OBJECT[view] === settings.defaultView.url,
          ),
        );
        setIsCelsius(settings.weatherUnits.type === EUROPEAN_UNITS);
      }
    } else {
      setLocationIndex(favoritesData.findIndex(fav => fav.city === settings.defaultLocation.city));
      setDefaultViewIndex(
        Object.keys(DEFAULT_VIEWS_MAP_OBJECT).findIndex(
          view => DEFAULT_VIEWS_MAP_OBJECT[view] === settings.defaultView.url,
        ),
      );
      setIsCelsius(settings.weatherUnits.type === EUROPEAN_UNITS);
    }
  }, [favoritesDB, favoritesData, settings, settingsDB, uid]);

  const dispatch = useDispatch();

  const classes = useStyles();

  const changeIsCelsius = useCallback(() => {
    setIsCelsius(!isCelsius);
    dispatch({ type: CHANGE_WEATHER_SCALE_SEND, isCelsius: !isCelsius });
    dispatch({
      type: WEATHER_API_SEND,
      payload: {
        latitude: favoritesData[locationIndex].latitude,
        longitude: favoritesData[locationIndex].longitude,
        city: favoritesData[locationIndex].city,
        country: favoritesData[locationIndex].country,
      },
      units: getWeatherUnits(!isCelsius).type,
    });
    dispatch({ type: WEATHER_MAP_API_SEND });
    dispatch({
      type: WEATHER_MAP_API_SEND,
      units: getWeatherUnits(!isCelsius).type,
    });
  }, [dispatch, favoritesData, isCelsius, locationIndex]);

  const changeCityCountry = useCallback(
    event => {
      const indexLocation = event.target.value;
      setLocationIndex(indexLocation);
      dispatch({ type: CHANGE_DEFAULT_LOCATION_SEND, data: favoritesData[indexLocation] });
      dispatch({
        type: WEATHER_API_SEND,
        payload: {
          latitude: favoritesData[indexLocation].latitude,
          longitude: favoritesData[indexLocation].longitude,
          city: favoritesData[indexLocation].city,
          country: favoritesData[indexLocation].country,
        },
      });
      dispatch({ type: WEATHER_MAP_API_SEND });
    },
    [dispatch, favoritesData],
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
      {uid && !isLoaded(settingsDB) && !isLoaded(favoritesDB) ? (
        <Spinner />
      ) : (
        <>
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
              {favoritesData.map((fav, index) => (
                <MenuItem key={`${fav.latitude}${fav.longitude}`} value={index}>
                  {fav.city}, {fav.country}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className={styles.defaultViewContainer}>
            <Typography>Change Default View:</Typography>
            <TextField
              select
              classes={{ root: classes.selector }}
              onChange={changeDefaultView}
              value={defaultViewIndex}
            >
              {DEFAULT_VIEWS.map((view, index) => (
                <MenuItem key={view} value={index}>
                  {view}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </>
      )}
    </div>
  );
};

Settings.propTypes = {};

export default Settings;
