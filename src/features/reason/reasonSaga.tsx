import reasonApi from 'api/reasonApi';
import { ListResponse } from 'models/common';
import { Reason } from 'models/reason';
import { all, call, debounce, fork, put, takeEvery } from 'redux-saga/effects';
import { reasonActions } from './reasonSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams } from '../../models/common';

function* fetchReasonList(action: any) {
  try {
    const response: ListResponse<Reason> = yield call(reasonApi.getAll, action.payload);
    console.log(response);
    yield put(reasonActions.fetchReasonListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch Reason List Failed', error);
    yield put(reasonActions.fetchReasonListFailed());
  }
}

function* handleSearch(action: PayloadAction<ListParams>) {
  yield put(reasonActions.setFilter(action.payload));
}

function* reasonList() {
  yield takeEvery(reasonActions.fetchReasonList, fetchReasonList);
  yield debounce(500, reasonActions.setFilterWithDebounce, handleSearch);
}

export function* reasonSaga() {
  yield all([fork(reasonList)]);
}
