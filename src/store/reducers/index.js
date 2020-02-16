import { combineReducers } from 'redux';

import ipStackReducer from 'store/reducers/weatherAPIReducer';

export default combineReducers({
  data: ipStackReducer,
});
