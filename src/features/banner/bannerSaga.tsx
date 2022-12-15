import bannerApi from 'api/bannerApi';
import { ListResponse } from 'models/common';
import { Banner } from 'models/banner';
import { all, call, debounce, fork, put, takeEvery } from 'redux-saga/effects';
import { bannerActions } from './bannerSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams } from '../../models/common';

function* fetchBannerList(action: any) {
  try {
    const response: ListResponse<Banner> = yield call(bannerApi.getAll, action.payload);
    console.log(response);
    yield put(bannerActions.fetchBannerListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch banner List Failed', error);
    yield put(bannerActions.fetchBannerListFailed());
  }
}

function* handleSearch(action: PayloadAction<ListParams>) {
  yield put(bannerActions.setFilter(action.payload));
}

function* bannerList() {
  yield takeEvery(bannerActions.fetchBannerList, fetchBannerList);
  yield debounce(500, bannerActions.setFilterWithDebounce, handleSearch);
}

export function* bannerSaga() {
  yield all([fork(bannerList)]);
}
