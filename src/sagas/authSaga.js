import { takeLatest, takeEvery, put, call, select, all, fork } from 'redux-saga/effects';

import {
  LOGIN,
  LOGIN_SUCCESSFULLY,
  LOGIN_FAILED,
  LOGIN_CHECK,
  AUTO_LOGIN_FAILED,
  LOGOUT,
  LOGOUT_SUCCESSFULLY,
  LOGOUT_FAILED,
} from 'store/actionTypes/authActionTypes';
import { EMAIL_ALREADY_USED } from 'constants/constants';
import firebase from 'utils/firebaseInstance';
import ipStackAxios from 'axios/ipStack';
import { DELETE_SYNCED_FAVORITES, SYNC_FAVORITES } from 'store/actionTypes/favoritesActionTypes';

const auth = firebase.auth();

const getCurrentStateData = state => state.data;

async function register(email, password) {
  try {
    const data = await auth.createUserWithEmailAndPassword(email, password);
    return { data };
  } catch (error) {
    return { error };
  }
}

async function login(email, password) {
  try {
    const data = await auth.signInWithEmailAndPassword(email, password);
    return { data };
  } catch (error) {
    return { error };
  }
}

async function makeIpRequest() {
  try {
    const response = await ipStackAxios.get('/check');

    return { ip: response.data.ip };
  } catch (error) {
    return { error };
  }
}

function* loginSaga(action) {
  const { email } = action;
  let password;
  const state = yield select(getCurrentStateData);

  if (!state.dataLoaded) {
    const { ip, error } = yield call(makeIpRequest);
    if (ip) {
      password = ip;
    } else {
      yield put({ type: LOGIN_FAILED, error });
      return;
    }
  } else {
    password = state.ipStack.ip;
  }

  const { data, error } = yield call(register, email, password);

  if (data) {
    yield put({ type: LOGIN_SUCCESSFULLY, user: data });
    yield put({ type: SYNC_FAVORITES });
  } else if (error.code === EMAIL_ALREADY_USED) {
    const { data: dataLogin, error: errorLogin } = yield call(login, email, password);
    if (dataLogin) {
      yield put({ type: LOGIN_SUCCESSFULLY, user: dataLogin });
      yield put({ type: SYNC_FAVORITES });
    } else {
      yield put({ type: LOGIN_FAILED, error: errorLogin });
    }
  } else {
    yield put({ type: LOGIN_FAILED, error });
  }
}

function loginCheckPromise() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error());
      }
    });
  });
}

async function checkLogin() {
  try {
    const data = await loginCheckPromise();
    return { data };
  } catch (error) {
    return { error };
  }
}

function* checkLoginSaga() {
  const { data } = yield call(checkLogin);
  if (data) {
    yield put({ type: LOGIN_SUCCESSFULLY, user: data });
  } else {
    yield put({ type: AUTO_LOGIN_FAILED });
  }
}

async function logout() {
  try {
    await auth.signOut();
    return { status: true };
  } catch (error) {
    return { status: false };
  }
}

function* logoutSaga() {
  const { status } = yield call(logout);
  if (status) {
    yield put({ type: DELETE_SYNCED_FAVORITES });
    yield put({ type: LOGOUT_SUCCESSFULLY });
  } else {
    yield put({ type: LOGOUT_FAILED });
  }
}

function* watchLogin() {
  yield all([
    yield takeLatest(LOGIN, loginSaga),
    yield takeEvery(LOGIN_CHECK, checkLoginSaga),
    yield takeLatest(LOGOUT, logoutSaga),
  ]);
}

export default watchLogin;
