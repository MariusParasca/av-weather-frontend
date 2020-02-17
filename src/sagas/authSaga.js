import { takeLatest, put, call, select } from 'redux-saga/effects';

import { LOGIN, LOGIN_SUCCESSFULLY, LOGIN_FAILED } from 'store/actionTypes/authActionTypes';
import { EMAIL_ALREADY_USED } from 'constants/constants';
import firebase from 'utils/firebaseInstance';
import ipStackAxios from 'axios/ipStack';

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
    console.log('data', data);
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
  } else if (error.code === EMAIL_ALREADY_USED) {
    const { data: dataLogin, error: errorLogin } = yield call(login, email, password);
    if (dataLogin) {
      yield put({ type: LOGIN_SUCCESSFULLY, user: dataLogin });
    } else {
      yield put({ type: LOGIN_FAILED, error: errorLogin });
    }
  } else {
    yield put({ type: LOGIN_FAILED, error });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN, loginSaga);
}

export default watchLogin;
