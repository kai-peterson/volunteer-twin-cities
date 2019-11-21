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

function* updateOrgRootSaga() {
  yield takeLatest('UPDATE_ORG', updateOrgSaga);
}

export default updateOrgRootSaga;
