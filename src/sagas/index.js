import { all, fork } from 'redux-saga/effects';

import weatherSaga from 'sagas/weatherSaga';
import authSaga from 'sagas/authSaga';
import favoriteSaga from 'sagas/favoritesSaga';

function* rootSaga() {
  yield all([fork(weatherSaga), fork(authSaga), fork(favoriteSaga)]);
}

export default rootSaga;
