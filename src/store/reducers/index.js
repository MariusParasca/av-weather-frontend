import { combineReducers } from 'redux';

import ipStackReducer from 'store/reducers/weatherAPIReducer';
import authReducer from 'store/reducers/authReducer';
import favoriteReducer from 'store/reducers/favoritesReducer';
import notificationReducer from 'store/reducers/notificationReducer';
import userSettingsReducer from 'store/reducers/userSettingsReducer';

export default combineReducers({
  data: ipStackReducer,
  authData: authReducer,
  favorites: favoriteReducer,
  notification: notificationReducer,
  userSettings: userSettingsReducer,
});
