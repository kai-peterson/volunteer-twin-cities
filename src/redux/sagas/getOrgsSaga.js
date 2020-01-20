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

function* getPendingOrgsSaga(action) {
  try {
      // console.log('hit pending orgs saga');
      
      const pendingOrgs = yield axios.get('/api/orgs/pending')
      yield put({type: 'SET_PENDING_ORGS', payload: pendingOrgs.data})
  } catch (error) {
      console.log('Error in getOrgsSaga:', error);
  }
}

function* getPendingDetailsSaga(action) {
  try {
      const pendingOrgDetails = yield axios.get(`/api/orgs/pending/details/${action.payload}`)
      yield put({type: 'SET_PENDING_DETAILS', payload: pendingOrgDetails.data[0]})
  } catch (error) {
      console.log('Error in getOrgsSaga:', error);
  }
}


function* getRootSaga() {
  yield takeLatest('GET_ORGS', getOrgsSaga);
  yield takeLatest('GET_PENDING_ORGS', getPendingOrgsSaga);
  yield takeLatest('GET_PENDING_DETAILS', getPendingDetailsSaga);
}

export default getRootSaga;
