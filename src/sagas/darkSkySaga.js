import { takeEvery, put, call } from 'redux-saga/effects';
import { DARK_SKY_API_FAILED, DARK_SKY_API_SEND, DARK_SKY_SET_DATA } from 'store/actionTypes/darkSkyActionTypes';
import darkSkyAxios from 'axios/darkSky';
// sendRequestDarkSky(
//   darkSkyAxios,
//   [`/${latitude},${longitude}`, { params: { units: 'si', exclude: '[minutely]' } }],
//   'get',
// );
async function makeRequest(latitude, longitude) {
  try {
    const response = await darkSkyAxios.get(`/${latitude},${longitude}`, {
      params: {
        units: 'si',
        exclude: '[minutely]',
      },
    });

    return { data: response.data };
  } catch (error) {
    return { error };
  }
}

function* apiRequest(action) {
  const { data, error } = yield call(() => makeRequest(action.latitude, action.longitude));

  if (data) {
    yield put({ type: DARK_SKY_SET_DATA, data });
  } else {
    yield put({ type: DARK_SKY_API_FAILED, error });
  }
}

function* watchApiSend() {
  yield takeEvery(DARK_SKY_API_SEND, apiRequest);
}

export default watchApiSend;
