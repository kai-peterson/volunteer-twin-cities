import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* orgDetailsSaga(action) {
  try {
      console.log('in ORG DETAILS saga', action.payload);
      
      const orgDetails = yield axios.get(`/api/orgs/details/${action.payload}`) 
      yield put({type: 'SET_ORG_DETAILS', payload: orgDetails.data[0]})
      
      // dispatch info to reducer from here
  } catch (error) {
      console.log('Error in getOrgsSaga:', error);
  }
}

function* getDetailsRootSaga() {
  yield takeLatest('GET_ORG_DETAILS', orgDetailsSaga);
}

export default getDetailsRootSaga;
