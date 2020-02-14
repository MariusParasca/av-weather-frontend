import { all, fork } from 'redux-saga/effects';

import ipStackSaga from 'sagas/ipStackSaga';
import darkSkySaga from 'sagas/darkSkySaga';

function* rootSaga() {
  yield all([fork(ipStackSaga), fork(darkSkySaga)]);
}

export default rootSaga;
