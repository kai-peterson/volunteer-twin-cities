import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addOrgImageSaga(action) {
  try {
      yield axios.post(`/api/orgs/images/${action.payload.id}`, action.payload)
  } catch (error) {
      console.log('Error in addOrgImageSaga', error);
  }
}

function* orgImageRootSaga() {
  yield takeLatest('ADD_ORG_IMAGE', addOrgImageSaga);
}

export default orgImageRootSaga;
