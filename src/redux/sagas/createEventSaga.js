import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createEventSaga(action) {
  try {
      yield axios.post(`/api/orgs/profile/create/event`, action.payload);
      yield put({type: 'GET_ORG_EVENTS', payload: action.payload.org_id})
  } catch (error) {
      console.log('Error in createEventSaga', error);
  }
}

function* getOrgEventsSaga(action) {
    try {
        const orgEvents = yield axios.get(`/api/orgs/events/${action.payload}`);
        yield put({type: 'SET_ORG_EVENTS', payload: orgEvents.data})
    }
    catch (error) {
        console.log('Error in getOrgEventsSaga', error);
    }
}

function* createEventRootSaga() {
  yield takeLatest('CREATE_EVENT', createEventSaga);
  yield takeLatest('GET_ORG_EVENTS', getOrgEventsSaga);
}

export default createEventRootSaga;
