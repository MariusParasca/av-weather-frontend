import { takeLatest, put, call, select } from 'redux-saga/effects';

import { REGISTER, REGISTER_SUCCESSFULLY, REGISTER_FAILED } from 'store/actionTypes/authActionTypes';
import firebase from 'utils/firebaseInstance';
import ipStackAxios from 'axios/ipStack';

const getCurrentStateData = state => state.data;

async function register(email, password) {
  const auth = firebase.auth();
  try {
    const data = await auth.createUserWithEmailAndPassword(email, password);
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

function* registerSaga(action) {
  const { email } = action;
  let password;
  const state = yield select(getCurrentStateData);

  if (!state.dataLoaded) {
    const { ip, error } = yield call(makeIpRequest);
    if (ip) {
      password = ip;
    } else {
      yield put({ type: REGISTER_FAILED, error });
      return;
    }
  } else {
    password = state.ipStack.ip;
  }

  const { data, error } = yield call(register, email, password);

  if (data) {
    yield put({ type: REGISTER_SUCCESSFULLY, user: data });
  } else {
    yield put({ type: REGISTER_FAILED, error });
  }
}

function* watchRegister() {
  yield takeLatest(REGISTER, registerSaga);
}

export default watchRegister;
