import { combineReducers } from 'redux';

import weatherReducer from 'store/reducers/weatherAPIReducer';
import favoriteReducer from 'store/reducers/favoritesReducer';
import userSettingsReducer from 'store/reducers/userSettingsReducer';
import weatherMapReducer from 'store/reducers/weatherMapReducer';

export default combineReducers({
  data: weatherReducer,
  favorites: favoriteReducer,
  userSettings: userSettingsReducer,
  weatherMap: weatherMapReducer,
});
