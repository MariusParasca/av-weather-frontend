import { combineReducers } from 'redux';

import ipStackReducer from 'store/reducers/ipStackReducer';
import darkSkyReducer from 'store/reducers/darkSkyReducer';

export default combineReducers({
  location: ipStackReducer,
  weatherData: darkSkyReducer,
});
