import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createOrgSaga(action) {
  try {
      yield axios.post(`/api/orgs/profile/create/org`, action.payload)
      yield put({type: 'GET_USER_ORGS'})
  } catch (error) {
      console.log('Error in createOrgSaga', error);
  }
}

function* createOrgRootSaga() {
  yield takeLatest('CREATE_ORG', createOrgSaga);
}

export default createOrgRootSaga;
