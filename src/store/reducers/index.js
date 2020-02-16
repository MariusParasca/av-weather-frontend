import { combineReducers } from 'redux';

import ipStackReducer from 'store/reducers/weatherAPIReducer';
import authReducer from 'store/reducers/authReducer';

export default combineReducers({
  data: ipStackReducer,
  authData: authReducer,
});
