import { authSaga } from 'features/auth/authSaga';
import { profileSaga } from 'features/profile/profileSaga';
import { all } from 'redux-saga/effects';
import { reasonSaga } from 'features/reason/reasonSaga';

export default function* rootSaga() {
  yield all([authSaga(), profileSaga(), reasonSaga()]);
}
