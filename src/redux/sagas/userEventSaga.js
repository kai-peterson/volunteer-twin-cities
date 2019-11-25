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

function* userEventRootSaga() {
  yield takeLatest('GET_USER_EVENTS', getUserEventsSaga);
  yield takeLatest('ADD_USER_EVENT', addUserEventSaga);
}

export default userEventRootSaga;
