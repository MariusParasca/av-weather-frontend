import { combineReducers } from 'redux';

import ipStackReducer from 'store/reducers/weatherAPIReducer';
import authReducer from 'store/reducers/authReducer';
import favoriteReducer from 'store/reducers/favoritesReducer';

export default combineReducers({
  data: ipStackReducer,
  authData: authReducer,
  favorites: favoriteReducer,
});
