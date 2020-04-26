import { FAVORITES_DATA } from 'constants/reduxState';

export const getCurrentStateData = state => state.weatherData;

export const getUserSettings = state => state.userSettings;

export const getDefaultLocation = state => state.userSettings.settings.defaultLocation;

export const getUid = state => state.firebase.auth.uid;

export const getWeatherUnitsType = state => state.userSettings.settings.weatherUnits.type;

export const getWeatherUnits = state => state.userSettings.settings.weatherUnits;

export const getFavoritesLocal = state => state.favorites[FAVORITES_DATA];

export const getFavoritesDB = state => state.firestore.ordered[FAVORITES_DATA];
