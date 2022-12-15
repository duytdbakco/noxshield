import contentApi from 'api/contentApi';
import { ListResponse } from 'models/common';
import { Content } from 'models/content';
import { all, call, debounce, fork, put, takeEvery } from 'redux-saga/effects';
import { contentActions } from './contentSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams } from '../../models/common';

function* fetchContentList(action: any) {
  try {
    const response: ListResponse<Content> = yield call(contentApi.getAll, action.payload);
    console.log(response);
    yield put(contentActions.fetchContentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch content List Failed', error);
    yield put(contentActions.fetchContentListFailed());
  }
}

function* handleSearch(action: PayloadAction<ListParams>) {
  yield put(contentActions.setFilter(action.payload));
}

function* contentList() {
  yield takeEvery(contentActions.fetchContentList, fetchContentList);
  yield debounce(500, contentActions.setFilterWithDebounce, handleSearch);
}

export function* contentSaga() {
  yield all([fork(contentList)]);
}
