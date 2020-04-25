import { combineReducers } from 'redux';
import { firebaseReducer as firebase } from 'react-redux-firebase';
import { persistReducer } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import storage from 'redux-persist/lib/storage';

import weatherReducer from 'store/reducers/weatherAPIReducer';
import favoriteReducer from 'store/reducers/favoritesReducer';
import userSettingsReducer from 'store/reducers/userSettingsReducer';
import weatherMapReducer from 'store/reducers/weatherMapReducer';
import locationReducer from './location';

export default function makeRootReducer() {
  return combineReducers({
    weatherData: weatherReducer,
    favorites: favoriteReducer,
    userSettings: userSettingsReducer,
    weatherMap: weatherMapReducer,
    firebase: persistReducer({ key: 'firebaseState', storage, stateReconciler: hardSet }, firebase),
    location: locationReducer,
  });
}
