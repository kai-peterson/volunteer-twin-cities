import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* manageOrgsSaga(action) {
  try {
      const userOrgs = yield axios.get(`/api/orgs/user`) 
      yield put({type: 'SET_USER_ORGS', payload: userOrgs.data});
      
  } catch (error) {
      console.log('Error in manageOrgsSaga', error);
  }
}

function* manageOrgsRootSaga() {
  yield takeLatest('GET_USER_ORGS', manageOrgsSaga);
}

export default manageOrgsRootSaga;
