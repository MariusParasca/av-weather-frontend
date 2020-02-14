import { IP_STACK_SET_DATA, IP_STACK_API_FAILED } from 'store/actionTypes/ipStackActionTypes';

const initialState = { latitude: 0, longitude: 0, city: '', country: '', error: null, pending: true };

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case IP_STACK_SET_DATA:
      newState.latitude = action.data.latitude;
      newState.longitude = action.data.longitude;
      newState.city = action.data.city;
      newState.country = action.data.country_name;
      newState.pending = false;
      break;
    case IP_STACK_API_FAILED:
      newState.error = action.error;
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
