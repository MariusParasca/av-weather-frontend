import { all, fork } from 'redux-saga/effects';

import weatherSaga from 'sagas/weatherSaga';
import authSaga from 'sagas/authSaga';
import favoriteSaga from 'sagas/favoritesSaga';
import userSettingsSaga from 'sagas/userSettingsSaga';

function* rootSaga() {
  yield all([fork(weatherSaga), fork(authSaga), fork(favoriteSaga), fork(userSettingsSaga)]);
}

export default rootSaga;
