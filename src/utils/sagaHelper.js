import { put, call } from 'redux-saga/effects';

export function* createCommonSaga(action, prefix, callback, successCallback) {
  const error = yield call(callback, action);
  if (!error) {
    if (successCallback) yield successCallback();
    yield put({ type: `${prefix}_SUCCESS` });
  } else {
    yield put({ type: `${prefix}_ERROR`, error });
  }
}

export function* createRequestCallbackSaga(action, prefix, callback, params) {
  const error = yield call(callback, { action, ...params });

  if (!error) {
    yield put({ ...action, type: `${prefix}_SUCCESS` });
  } else {
    yield put({ type: `${prefix}_ERROR`, error });
  }
}
