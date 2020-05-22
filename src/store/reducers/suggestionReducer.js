import {
  POST_SUGGESTION,
  UP_VOTE_SUGGESTION,
  DOWN_VOTE_SUGGESTION,
  EDIT_SUGGESTION,
} from 'store/actionTypes/suggestionActionTypes';

const initialState = {
  pending: false,
  pendingEdit: false,
  pendingDownVote: false,
  pendingUpVote: false,
  error: null,
};

const createReducerSuggestion = (state, action, prefix, pending = 'pending') => {
  const newState = { ...state };

  switch (action.type) {
    case `${prefix}_SEND`:
      newState[pending] = true;
      break;
    case `${prefix}_SUCCESS`:
      newState.error = null;
      newState[pending] = false;
      break;
    case `${prefix}_ERROR`:
      newState.error = action.error;
      newState[pending] = false;
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
    return createReducerSuggestion(state, action, UP_VOTE_SUGGESTION, 'pendingUpVote');
  }

  if (action.type.indexOf(DOWN_VOTE_SUGGESTION) !== -1) {
    return createReducerSuggestion(state, action, DOWN_VOTE_SUGGESTION, 'pendingDownVote');
  }
  if (action.type.indexOf(EDIT_SUGGESTION) !== -1) {
    return createReducerSuggestion(state, action, EDIT_SUGGESTION, 'pendingEdit');
  }

  return state;
};

export default reducer;
