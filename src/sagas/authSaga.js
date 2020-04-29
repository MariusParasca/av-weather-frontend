import { takeEvery, all, fork, select, call, put } from 'redux-saga/effects';
import { LOGIN_SEND, LOGIN, REGISTER, REGISTER_SEND, SIGN_OUT, SIGN_OUT_SEND } from 'store/actionTypes/authActionTypes';
import firebase from 'firebase/app';
import firestore from 'utils/firestore';
import { createCommonSaga } from 'utils/sagaHelper';
import { getFavoritesLocal, getUid, getUserSettings } from 'utils/stateGetters';
import { addFavorite } from 'utils/commonAsync';
import { SEND_NOTIFICATION } from 'store/actionTypes/notificationActionTypes';

async function syncFavorites(favorites, uid) {
  const promises = [];
  for (let i = 0; i < favorites.length; i += 1) {
    const favorite = favorites[i];
    promises.push(
      addFavorite({
        uid,
        action: {
          favoriteCity: favorite,
        },
      }),
    );
  }

  const responses = await Promise.all(promises);

  for (let i = 0; i < responses.length; i += 1) {
    const response = responses[i];
    if (response !== null) return response;
  }

  return null;
}

async function syncSettings(settings, uid) {
  try {
    const userRef = firestore.collection('users').doc(uid);
    const promises = [
      userRef
        .collection('settings')
        .doc('weatherUnits')
        .set(settings.weatherUnits),
      userRef
        .collection('settings')
        .doc('defaultLocation')
        .set(settings.defaultLocation),
      userRef
        .collection('settings')
        .doc('defaultView')
        .set(settings.defaultView),
    ];
    await Promise.all(promises);
    return null;
  } catch (error) {
    return error;
  }
}

async function sync(favorites, userSettings, uid) {
  const errorFavorites = await syncFavorites(favorites, uid);
  if (errorFavorites) return errorFavorites;
  const errorSettings = await syncSettings(userSettings.settings, uid);
  if (errorSettings) return errorSettings;
  return null;
}

function* syncSaga() {
  const favorites = yield select(getFavoritesLocal);
  const uid = yield select(getUid);
  const userSettings = yield select(getUserSettings);

  const error = yield call(sync, favorites, userSettings, uid);

  if (error) {
    yield put({ type: SEND_NOTIFICATION, status: 'error', message: 'Synced failed' });
  } else {
    yield put({ type: SEND_NOTIFICATION, status: 'success', message: 'Synced successfully' });
  }
}

async function signOut() {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    return error;
  }
  return null;
}

function* signOutSaga(action) {
  yield createCommonSaga(action, SIGN_OUT, signOut);
}

function* watchSignOut() {
  yield takeEvery(SIGN_OUT_SEND, signOutSaga);
}

async function register(action) {
  try {
    const data = await firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
    firestore
      .collection('users')
      .doc(data.user.uid)
      .set({ userId: data.user.uid });
  } catch (error) {
    return error;
  }
  return null;
}

function* registerSaga(action) {
  yield createCommonSaga(action, REGISTER, register, syncSaga);
}

function* watchRegister() {
  yield takeEvery(REGISTER_SEND, registerSaga);
}

async function login(action) {
  try {
    await firebase.auth().signInWithEmailAndPassword(action.email, action.password);
  } catch (error) {
    return error;
  }
  return null;
}

function* loginSaga(action) {
  yield createCommonSaga(action, LOGIN, login, syncSaga);
}

function* watchLogin() {
  yield takeEvery(LOGIN_SEND, loginSaga);
}

function* watchAll() {
  yield all([fork(watchLogin), fork(watchRegister), fork(watchSignOut)]);
}

export default watchAll;
