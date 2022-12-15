import caseApi from 'api/caseApi';
import { ListResponse } from 'models/common';
import { Case } from 'models/case';
import { all, call, debounce, fork, put, takeEvery } from 'redux-saga/effects';
import { caseActions } from './caseSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams } from '../../models/common';

function* fetchCaseList(action: any) {
  try {
    const response: ListResponse<Case> = yield call(caseApi.getAll, action.payload);
    console.log(response);
    yield put(caseActions.fetchCaseListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch case List Failed', error);
    yield put(caseActions.fetchCaseListFailed());
  }
}

function* handleSearch(action: PayloadAction<ListParams>) {
  yield put(caseActions.setFilter(action.payload));
}

function* caseList() {
  yield takeEvery(caseActions.fetchCaseList, fetchCaseList);
  yield debounce(500, caseActions.setFilterWithDebounce, handleSearch);
}

export function* caseSaga() {
  yield all([fork(caseList)]);
}
