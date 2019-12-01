import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateOrgSaga(action) {
  try {
    yield axios.put(`/api/orgs/details/${action.payload.id}`, action.payload)
    yield put({type: 'GET_ORG_DETAILS', payload: action.payload.id})
  } catch (error) {
      console.log('Error in updateOrgSaga', error);
  }
}

function* updatePendingStatusSaga(action) {
  try {
    yield axios.put(`/api/orgs/pending/details/${action.payload.id}`, action.payload)
    yield put({type: 'GET_PENDING_ORGS'})
  } catch (error) {
      console.log('Error in updatePendingStatusSaga', error);
  }
}

function* updateOrgRootSaga() {
  yield takeLatest('UPDATE_ORG', updateOrgSaga);
  yield takeLatest('UPDATE_PENDING_STATUS', updatePendingStatusSaga);
}

export default updateOrgRootSaga;
