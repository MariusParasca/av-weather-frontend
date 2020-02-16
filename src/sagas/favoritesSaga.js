import { takeEvery, put, call, select, all, fork } from 'redux-saga/effects';

import { LOCATIONS } from 'constants/collections';
import db from 'utils/firebaseFirestore';
import {
  FETCH_FAVORITES_SEND,
  FETCH_FAVORITES_SET_DATA,
  FETCH_FAVORITES_FAILED,
  DELETE_FAVORITE_SEND,
  DELETE_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAILED,
} from 'store/actionTypes/favoritesActionTypes';

const getCurrentStateData = state => state.favorites.data;

async function firestoreRequest() {
  try {
    const dbFavorites = await db.collection(LOCATIONS).get();
    const docs = [];
    for (const doc of dbFavorites.docs) {
      const data = doc.data();
      docs.push({ ...data, id: doc.id });
    }
    return { data: docs };
  } catch (error) {
    return { error };
  }
}

function* firestoreRequestSaga() {
  const { data, error } = yield call(firestoreRequest);

  if (data) {
    yield put({ type: FETCH_FAVORITES_SET_DATA, data });
  } else {
    yield put({ type: FETCH_FAVORITES_FAILED, error });
  }
}

async function deleteFavorite(favorites, id) {
  try {
    await db
      .collection(LOCATIONS)
      .doc(id)
      .delete();
    return { data: favorites.filter(favorite => favorite.id !== id) };
  } catch (error) {
    return { error };
  }
}

function* deleteFavoriteSaga(action) {
  const { id } = action;
  const favoritesData = yield select(getCurrentStateData);

  const { data, error } = yield call(deleteFavorite, favoritesData, id);

  if (data) {
    yield put({ type: DELETE_FAVORITE_SUCCESS, data });
  } else {
    yield put({ type: DELETE_FAVORITE_FAILED, error });
  }
}

function* watchFetchFavorites() {
  yield takeEvery(FETCH_FAVORITES_SEND, firestoreRequestSaga);
}

function* watchDeleteFavorite() {
  yield takeEvery(DELETE_FAVORITE_SEND, deleteFavoriteSaga);
}

function* favoritesRootSaga() {
  yield all([fork(watchFetchFavorites), fork(watchDeleteFavorite)]);
}

export default favoritesRootSaga;
