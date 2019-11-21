import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import orgsSaga from './getOrgsSaga';
import orgDetailsSaga from './orgDetailsSaga';
import getImagesRootSaga from './orgImagesSaga';
import createOrgRootSaga from './createOrgSaga';
import manageOrgsRootSaga from './manageOrgsSaga';
import updateOrgRootSaga from './updateOrgSaga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    orgsSaga(),
    orgDetailsSaga(),
    getImagesRootSaga(),
    createOrgRootSaga(),
    manageOrgsRootSaga(),
    updateOrgRootSaga(),
  ]);
}
