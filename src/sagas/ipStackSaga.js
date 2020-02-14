import { takeEvery, put, call } from 'redux-saga/effects';
import { IP_STACK_API_SEND, IP_STACK_SET_DATA, IP_STACK_API_FAILED } from 'store/actionTypes/ipStackActionTypes';
import ipStackAxios from 'axios/ipStack';

async function makeRequest() {
  try {
    const response = await ipStackAxios.get('/check');

    return { data: response.data };
  } catch (error) {
    return { error };
  }
}

function* apiRequest() {
  const { data, error } = yield call(makeRequest);

  if (data) {
    yield put({ type: IP_STACK_SET_DATA, data });
  } else {
    yield put({ type: IP_STACK_API_FAILED, error });
  }
}

function* watchApiSend() {
  yield takeEvery(IP_STACK_API_SEND, apiRequest);
}

export default watchApiSend;
