import { profileApi } from 'api/profileApi';
import { ServiceForm } from 'models';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { profileActions } from './profileSlice';

function* handleGet() {
  try {
    const rs: ServiceForm[] = yield call(profileApi.get);

    yield put(profileActions.postSuccess(rs));
  } catch (error: any) {
    console.log(error);
  }
}
function* getUserWatcher() {
  yield takeEvery(profileActions.get, handleGet);
}
export function* profileSaga() {
  yield all([fork(getUserWatcher)]);
}
