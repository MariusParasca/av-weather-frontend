import { takeLatest, all, fork } from 'redux-saga/effects';

import firestore from 'utils/firestore';
import { createRequestCallbackSaga } from 'utils/sagaHelper';
import {
  POST_SUGGESTION_SEND,
  POST_SUGGESTION,
  UP_VOTE_SUGGESTION,
  UP_VOTE_SUGGESTION_SEND,
  DOWN_VOTE_SUGGESTION,
  DOWN_VOTE_SUGGESTION_SEND,
} from 'store/actionTypes/suggestionActionTypes';

async function postSuggestion(options) {
  try {
    await firestore.collection('suggestions').add({ text: options.text, votes: 0 });
    return null;
  } catch (error) {
    return error;
  }
}

function* postSuggestionSaga(action) {
  yield createRequestCallbackSaga(action, POST_SUGGESTION, postSuggestion, { text: action.text });
}

function* watchPostSuggestion() {
  yield takeLatest(POST_SUGGESTION_SEND, postSuggestionSaga);
}

async function upDownVoteSuggestion(options) {
  try {
    await firestore
      .collection('suggestions')
      .doc(options.action.id)
      .update({ votes: options.action.votes });
    return null;
  } catch (error) {
    return error;
  }
}

function* upVoteSuggestionSaga(action) {
  yield createRequestCallbackSaga(action, UP_VOTE_SUGGESTION, upDownVoteSuggestion);
}

function* watchUpVoteSuggestion() {
  yield takeLatest(UP_VOTE_SUGGESTION_SEND, upVoteSuggestionSaga);
}

function* downVoteSuggestionSaga(action) {
  yield createRequestCallbackSaga(action, DOWN_VOTE_SUGGESTION, upDownVoteSuggestion);
}

function* watchDownVoteSuggestion() {
  yield takeLatest(DOWN_VOTE_SUGGESTION_SEND, downVoteSuggestionSaga);
}

function* watchAll() {
  yield all([fork(watchPostSuggestion), fork(watchUpVoteSuggestion), fork(watchDownVoteSuggestion)]);
}

export default watchAll;
