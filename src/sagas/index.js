import { all, fork } from 'redux-saga/effects';

import weatherSaga from 'sagas/weatherSaga';
import darkSkySaga from 'sagas/darkSkySaga';

function* rootSaga() {
  yield all([fork(weatherSaga)]);
}

export default rootSaga;
