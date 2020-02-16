import { all, fork } from 'redux-saga/effects';

import weatherSaga from 'sagas/weatherSaga';
import authSaga from 'sagas/authSaga';

function* rootSaga() {
  yield all([fork(weatherSaga), fork(authSaga)]);
}

export default rootSaga;
