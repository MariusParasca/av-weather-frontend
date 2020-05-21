import { all, fork } from 'redux-saga/effects';

import weatherSaga from 'sagas/weatherSaga';
import weatherMapSaga from 'sagas/weatherMapSaga';
import accountSaga from 'sagas/authSaga';
import favoritesSaga from 'sagas/favoritesSaga';
import userSettingsSaga from 'sagas/userSettingsSaga';
import suggestionSaga from 'sagas/suggestionSaga';

function* rootSaga() {
  yield all([
    fork(weatherSaga),
    fork(weatherMapSaga),
    fork(accountSaga),
    fork(favoritesSaga),
    fork(userSettingsSaga),
    fork(suggestionSaga),
  ]);
}

export default rootSaga;
