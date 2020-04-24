import { all, fork } from 'redux-saga/effects';

import weatherSaga from 'sagas/weatherSaga';
import weatherMapSaga from 'sagas/weatherMapSaga';

function* rootSaga() {
  yield all([fork(weatherSaga), fork(weatherMapSaga)]);
}

export default rootSaga;
