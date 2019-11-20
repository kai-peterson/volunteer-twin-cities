import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* orgImagesSaga(action) {
  try {
      const orgImages = yield axios.get(`/api/orgs/details/images/${action.payload}`) 
      yield console.log('in ORG IMAGES saga', orgImages);
      yield put({type: 'SET_ORG_IMAGES', payload: orgImages.data})

  } catch (error) {
      console.log('Error in orgImagesSaga:', error);
  }
}

function* getImagesRootSaga() {
  yield takeLatest('GET_ORG_DETAILS', orgImagesSaga);
}

export default getImagesRootSaga;
