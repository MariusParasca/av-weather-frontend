import { takeEvery, put, call, all, fork } from 'redux-saga/effects';
import { LOGIN_SEND, LOGIN, REGISTER, REGISTER_SEND, SIGN_OUT, SIGN_OUT_SEND } from 'store/actionTypes/authActionTypes';
import firebase from 'firebase/app';

function* createCommonSaga(action, prefix, callback) {
  const error = yield call(callback, action);
  if (!error) {
    yield put({ type: `${prefix}_SUCCESS` });
  } else {
    yield put({ type: `${prefix}_ERROR`, error });
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
    await firebase.auth().createUserWithEmailAndPassword(action.email, action.password);
  } catch (error) {
    return error;
  }
  return null;
}

function* registerSaga(action) {
  yield createCommonSaga(action, REGISTER, register);
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
  yield createCommonSaga(action, LOGIN, login);
}

function* watchLogin() {
  yield takeEvery(LOGIN_SEND, loginSaga);
}

function* watchAll() {
  yield all([fork(watchLogin), fork(watchRegister), fork(watchSignOut)]);
}

export default watchAll;
