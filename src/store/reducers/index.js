import { combineReducers } from 'redux';

import ipStackReducer from 'store/reducers/weatherAPIReducer';
import authReducer from 'store/reducers/authReducer';
import favoriteReducer from 'store/reducers/favoritesReducer';
import userSettingsReducer from 'store/reducers/userSettingsReducer';
import weatherMapReducer from 'store/reducers/weatherMapReducer';

export default combineReducers({
  data: ipStackReducer,
  authData: authReducer,
  favorites: favoriteReducer,
  userSettings: userSettingsReducer,
  weatherMap: weatherMapReducer,
});
