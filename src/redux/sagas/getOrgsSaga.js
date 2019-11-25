import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getOrgsSaga(action) {
  try {
      const orgsInfo = yield axios.get('/api/orgs')
      yield put({type: 'SET_ORGS', payload: orgsInfo.data})
  } catch (error) {
      console.log('Error in getOrgsSaga:', error);
  }
}

function* getRootSaga() {
  yield takeLatest('GET_ORGS', getOrgsSaga);
}

export default getRootSaga;
