import { all, fork } from 'redux-saga/effects';

import weatherSaga from 'sagas/weatherSaga';
import weatherMapSaga from 'sagas/weatherMapSaga';
import accountSaga from 'sagas/authSaga';
// import favoritesSaga from 'sagas/favoritesSaga';

function* rootSaga() {
  yield all([fork(weatherSaga), fork(weatherMapSaga), fork(accountSaga)]);
}

export default rootSaga;
