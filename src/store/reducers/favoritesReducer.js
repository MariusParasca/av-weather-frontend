import { REHYDRATE } from 'redux-persist/lib/constants';

import { ADD_FAVORITE_LOCALLY, DELETE_FAVORITE_LOCALLY } from 'store/actionTypes/favoritesActionTypes';

const initialState = {
  data: [],
  dataLocally: [],
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

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  newState.error = null;

  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        dataLocally: action.payload ? action.payload.favorites.dataLocally : [],
      };
    case ADD_FAVORITE_LOCALLY:
      newState.dataLocally = getNewFavorites(newState.dataLocally, action.favoriteCity);
      break;
    case DELETE_FAVORITE_LOCALLY:
      newState.dataLocally.splice(action.index, 1);
      break;
    default:
      break;
  }

  return newState;
};

export default reducer;
