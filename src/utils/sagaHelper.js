import { put, call } from 'redux-saga/effects';

export function* createCommonSaga(action, prefix, callback) {
  const error = yield call(callback, action);
  if (!error) {
    yield put({ type: `${prefix}_SUCCESS` });
  } else {
    yield put({ type: `${prefix}_ERROR`, error });
  }
}

export function* createPostSaga(action, prefix, callback, params) {
  const error = yield call(callback, { action, ...params });
  if (!error) {
    yield put({ type: `${prefix}_SUCCESS`, ...action });
  } else {
    yield put({ type: `${prefix}_ERROR`, error });
  }
}
