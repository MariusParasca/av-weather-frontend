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
  ADD_FAVORITE_SEND,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILED,
  FETCH_FAVORITES_ALREADY_FETCHED,
  SYNC_FAVORITES,
  SYNC_FAILED,
  SYNC_SUCCESSFULLY,
  ADD_FAVORITE_LOCALLY,
  ADD_FAVORITE_LOCALLY_SEND,
  DELETE_FAVORITE_LOCALLY_SEND,
  DELETE_FAVORITE_LOCALLY,
} from 'store/actionTypes/favoritesActionTypes';

import { SEND_NOTIFICATIONS } from 'store/actionTypes/notificationActionTypes';

const getCurrentState = state => state.favorites;

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
  const state = yield select(getCurrentState);

  if (state.dataLoaded) {
    yield put({ type: FETCH_FAVORITES_ALREADY_FETCHED });
  } else {
    const { data, error } = yield call(firestoreRequest);

    if (data) {
      yield put({ type: FETCH_FAVORITES_SET_DATA, data });
    } else {
      yield put({ type: FETCH_FAVORITES_FAILED, error });
    }
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
  const state = yield select(getCurrentState);

  const { data, error } = yield call(deleteFavorite, state.data, id);

  if (data) {
    yield put({ type: DELETE_FAVORITE_SUCCESS, data });
    yield put({ type: SEND_NOTIFICATIONS, notificationType: 'success', message: 'City deleted!' });
  } else {
    yield put({ type: DELETE_FAVORITE_FAILED, error });
    yield put({ type: SEND_NOTIFICATIONS, notificationType: 'error', message: 'Something went wrong!' });
  }
}

async function addFavorite(data) {
  const locationRef = db.collection(LOCATIONS);
  try {
    const response = await locationRef.where('city', '==', data.city).get();
    if (response.empty) {
      await locationRef.add(data);
      return { status: true };
    }
    return { status: false };
  } catch (error) {
    return { error };
  }
}

function* addFavoriteSaga(action) {
  const { data } = action;
  const state = yield select(getCurrentState);
  const { status, error } = yield call(addFavorite, data);

  if (error) {
    yield put({ type: ADD_FAVORITE_FAILED, error });
    yield put({ type: SEND_NOTIFICATIONS, notificationType: 'error', message: 'Error adding a new city!' });
  } else if (status) {
    const newData = state.data;
    newData.push(data);
    yield put({ type: ADD_FAVORITE_SUCCESS, data: newData });
    yield put({ type: SEND_NOTIFICATIONS, notificationType: 'success', message: 'City added!' });
  } else {
    yield put({ type: SEND_NOTIFICATIONS, notificationType: 'warning', message: 'City already exists!' });
  }
}

async function simpleAddFavorite(favorite) {
  const locationRef = db.collection(LOCATIONS);
  locationRef.add(favorite);
}

function getNewFavoritesPromises(data, dataLocally) {
  const newFavoritesPromises = [];

  for (const favorite of dataLocally) {
    if (!data.some(el => el.city === favorite.city)) {
      newFavoritesPromises.push(simpleAddFavorite(favorite));
    }
  }

  return newFavoritesPromises;
}

function* syncFavoritesSaga() {
  const state = yield select(getCurrentState);
  const { data, error } = yield call(firestoreRequest);

  if (data) {
    const promises = getNewFavoritesPromises(data, state.dataLocally);
    try {
      yield call(() => Promise.all(promises));
      yield put({ type: SYNC_SUCCESSFULLY });
    } catch (errorSecond) {
      yield put({ type: SYNC_FAILED, errorSecond });
    }
  } else {
    yield put({ type: SYNC_FAILED, error });
  }
}

function* watchFetchFavorites() {
  yield takeEvery(FETCH_FAVORITES_SEND, firestoreRequestSaga);
}

function* watchDeleteFavorite() {
  yield takeEvery(DELETE_FAVORITE_SEND, deleteFavoriteSaga);
}

function* watchAddFavorite() {
  yield takeEvery(ADD_FAVORITE_SEND, addFavoriteSaga);
}

function* watchSync() {
  yield takeEvery(SYNC_FAVORITES, syncFavoritesSaga);
}

function* watchAddFavoriteLocallySaga(action) {
  const state = yield select(getCurrentState);
  const newDataLocally = [...state.dataLocally];
  for (const item of newDataLocally) {
    if (item.city === action.favoriteCity.city) {
      yield put({ type: SEND_NOTIFICATIONS, notificationType: 'warning', message: 'City already exists!' });
      break;
    }
  }
  newDataLocally.push(action.favoriteCity);

  yield put({ type: ADD_FAVORITE_LOCALLY, dataLocally: newDataLocally });
  yield put({ type: SEND_NOTIFICATIONS, notificationType: 'success', message: 'City added!' });
}

function* watchDeleteFavoriteLocallySaga(action) {
  const state = yield select(getCurrentState);
  const newDataLocally = [...state.dataLocally];
  newDataLocally.splice(action.index, 1);
  yield put({ type: DELETE_FAVORITE_LOCALLY, dataLocally: newDataLocally });
  yield put({ type: SEND_NOTIFICATIONS, notificationType: 'success', message: 'City deleted!' });
}

function* watchDeleteFavoriteLocally() {
  yield takeEvery(DELETE_FAVORITE_LOCALLY_SEND, watchDeleteFavoriteLocallySaga);
}

function* watchAddFavoriteLocally() {
  yield takeEvery(ADD_FAVORITE_LOCALLY_SEND, watchAddFavoriteLocallySaga);
}

function* favoritesRootSaga() {
  yield all([
    yield fork(watchDeleteFavorite),
    yield fork(watchFetchFavorites),
    yield fork(watchAddFavorite),
    yield fork(watchSync),
    yield fork(watchAddFavoriteLocally),
    yield fork(watchDeleteFavoriteLocally),
  ]);
}

export default favoritesRootSaga;
