import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import weatherReducer from 'store/reducers/weatherAPIReducer';
import favoriteReducer from 'store/reducers/favoritesReducer';
import userSettingsReducer from 'store/reducers/userSettingsReducer';
import weatherMapReducer from 'store/reducers/weatherMapReducer';
import authReducer from 'store/reducers/authReducer';
import notificationReducer from 'store/reducers/notificationReducer';

export default combineReducers({
  weatherData: weatherReducer,
  favorites: favoriteReducer,
  userSettings: userSettingsReducer,
  weatherMap: weatherMapReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  notification: notificationReducer,
});
