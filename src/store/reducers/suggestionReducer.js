import { POST_SUGGESTION, UP_VOTE_SUGGESTION, DOWN_VOTE_SUGGESTION } from 'store/actionTypes/suggestionActionTypes';

const initialState = {
  pending: false,
  error: null,
  dataLoaded: false,
};

const createReducerSuggestion = (state, action, prefix) => {
  const newState = { ...state };

  switch (action.type) {
    case `${prefix}_SEND`:
      newState.pending = true;
      break;
    case `${prefix}_SUCCESS`:
      newState.error = null;
      newState.pending = false;
      break;
    case `${prefix}_ERROR`:
      newState.error = action.error;
      newState.pending = false;
      break;
    default:
      break;
  }

  return newState;
};

const reducer = (state = initialState, action) => {
  if (action.type.indexOf(POST_SUGGESTION) !== -1) {
    return createReducerSuggestion(state, action, POST_SUGGESTION);
  }

  if (action.type.indexOf(UP_VOTE_SUGGESTION) !== -1) {
    return createReducerSuggestion(state, action, UP_VOTE_SUGGESTION);
  }

  if (action.type.indexOf(DOWN_VOTE_SUGGESTION) !== -1) {
    return createReducerSuggestion(state, action, DOWN_VOTE_SUGGESTION);
  }

  return state;
};

export default reducer;
