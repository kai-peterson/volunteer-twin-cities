import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getUserEventsSaga(action) {
  try {
      const userEvents = yield axios.get('/api/orgs/user/events');
      yield put({type: 'SET_USER_EVENTS', payload: userEvents.data})
  } catch (error) {
      console.log('Error in getUserEventsSaga', error);
  }
}

function* addUserEventSaga(action) {
  try {
      yield axios.post(`/api/orgs/event/signup/${action.payload}`)
  } catch (error) {
      console.log('Error in addUserEventSaga', error);
  }
}

function* getEventUsersSaga(action) {
  try {
      const eventUsers = yield axios.get(`/api/orgs/event/users/${action.payload}`);
      yield put({type: 'SET_EVENT_USERS', payload: eventUsers.data})
  } catch (error) {
      console.log('Error in getUserEventsSaga', error);
  }
}

function* deleteEventSaga(action) {
  try {
      yield axios.delete(`/api/orgs/event/delete/${action.payload.event_id}`);
      yield put({type: 'GET_ORG_EVENTS', payload: action.payload.org_id})
  } catch (error) {
      console.log('Error in deleteEventSaga', error);
  }
}

function* userEventRootSaga() {
  yield takeLatest('GET_USER_EVENTS', getUserEventsSaga);
  yield takeLatest('ADD_USER_EVENT', addUserEventSaga);
  yield takeLatest('GET_EVENT_USERS', getEventUsersSaga);
  yield takeLatest('DELETE_EVENT', deleteEventSaga);
}

export default userEventRootSaga;
