import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* eventDetailsSaga(action) {
  try {
      const eventDetails = yield axios.get(`/api/orgs/event/details/${action.payload}`);
      yield put({type: 'SET_EVENT_DETAILS', payload: eventDetails.data[0]})
  } catch (error) {
      console.log('Error in eventDetailsSaga', error);
  }
}

function* eventDetailsRootSaga() {
  yield takeLatest('GET_EVENT_DETAILS', eventDetailsSaga);
}

export default eventDetailsRootSaga;
