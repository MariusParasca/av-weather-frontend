import { REHYDRATE } from 'redux-persist/lib/constants';

import { ADD_FAVORITE, DELETE_FAVORITE } from 'store/actionTypes/favoritesActionTypes';

const initialState = {
  favoritesData: [],
  pending: false,
  error: null,
  dataLoaded: false,
};

function getNewFavorites(cities, newCity) {
  if (cities.length === 0) {
    cities.push(newCity);
    return cities;
  }
  for (let i = 0; i < cities.length; i += 1) {
    const cityData = cities[i];
    if (cityData.city === newCity.city) {
      return cities;
    }
  }

  cities.unshift(newCity);

  return cities;
}

const createAddReducer = (state, action, prefix) => {
  const newState = { ...state };

  switch (action.type) {
    case `${prefix}_SEND`:
      newState.pending = true;
      break;
    case `${prefix}_SUCCESS`:
      newState.error = null;
      newState.favoritesData = getNewFavorites(newState.favoritesData, action.favoriteCity);
      newState.pending = false;
      break;
    case `${prefix}_LOCALLY`:
      newState.favoritesData = getNewFavorites(newState.favoritesData, action.favoriteCity);
      newState.pending = false;
      newState.error = null;
      break;
    case `${prefix}_ERROR`:
      newState.error = action.error.message;
      newState.pending = false;
      break;
    default:
      break;
  }

  return newState;
};

const createDeleteReducer = (state, action, prefix) => {
  const newState = { ...state };

  switch (action.type) {
    case `${prefix}_SEND`:
      newState.pending = true;
      break;
    case `${prefix}_SUCCESS`:
      newState.error = null;
      newState.favoritesData.splice(action.index, 1);
      newState.pending = false;
      break;
    case `${prefix}_LOCALLY`:
      newState.favoritesData.splice(action.index, 1);
      newState.pending = false;
      newState.error = null;
      break;
    case `${prefix}_ERROR`:
      newState.error = action.error.message;
      newState.pending = false;
      break;
    default:
      break;
  }

  return newState;
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  if (action.type === REHYDRATE) {
    newState.favoritesData = action.payload ? action.payload.favorites.favoritesData : [];
  }

  if (action.type.indexOf(ADD_FAVORITE) !== -1) {
    return createAddReducer(state, action, ADD_FAVORITE);
  }

  if (action.type.indexOf(DELETE_FAVORITE) !== -1) {
    return createDeleteReducer(state, action, DELETE_FAVORITE);
  }

  return newState;
};

export default reducer;
