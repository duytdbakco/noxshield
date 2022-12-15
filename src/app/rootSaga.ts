import { authSaga } from 'features/auth/authSaga';
import { profileSaga } from 'features/profile/profileSaga';
import { all } from 'redux-saga/effects';
import { reasonSaga } from 'features/reason/reasonSaga';
import { bannerSaga } from 'features/banner/bannerSaga';
import { producerSaga } from 'features/producer/producerSaga';
import { contentSaga } from 'features/content/contentSaga';
import { caseSaga } from 'features/case/caseSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    reasonSaga(),
    bannerSaga(),
    producerSaga(),
    contentSaga(),
    caseSaga(),
  ]);
}
