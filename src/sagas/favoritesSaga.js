import { takeEvery, put, select } from 'redux-saga/effects';

import { DELETE_FAVORITE_SEND, DELETE_FAVORITE } from 'store/actionTypes/favoritesActionTypes';
import firestore from 'utils/firestore';
import { getUid } from 'utils/stateGetters';
import { createRequestCallbackSaga } from 'utils/sagaHelper';
import { WEATHER_MAP_DELETE_BY_INDEX } from 'store/actionTypes/weatherMapActionTypes';

async function deleteFavorite(options) {
  try {
    await firestore
      .collection('users')
      .doc(options.uid)
      .collection('favoritesData')
      .doc(options.action.id)
      .delete();
    return null;
  } catch (error) {
    return error;
  }
}

function* deleteFavoriteSaga(action) {
  const uid = yield select(getUid);
  if (uid) {
    console.log('in if');
    yield createRequestCallbackSaga(action, DELETE_FAVORITE, deleteFavorite, { uid });
  }
  yield put({ type: `${DELETE_FAVORITE}_LOCALLY`, index: action.index });
  yield put({ type: WEATHER_MAP_DELETE_BY_INDEX, index: action.index });
}

function* watchDeleteFavorite() {
  yield takeEvery(DELETE_FAVORITE_SEND, deleteFavoriteSaga);
}

export default watchDeleteFavorite;
