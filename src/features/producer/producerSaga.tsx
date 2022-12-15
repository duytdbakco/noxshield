import producerApi from 'api/producerApi';
import { ListResponse } from 'models/common';
import { Producer } from 'models/producer';
import { all, call, debounce, fork, put, takeEvery } from 'redux-saga/effects';
import { producerActions } from './producerSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams } from '../../models/common';

function* fetchproducerList(action: any) {
  try {
    const response: ListResponse<Producer> = yield call(producerApi.getAll, action.payload);
    console.log(response);
    yield put(producerActions.fetchProducerListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch producer List Failed', error);
    yield put(producerActions.fetchProducerListFailed());
  }
}

function* handleSearch(action: PayloadAction<ListParams>) {
  yield put(producerActions.setFilter(action.payload));
}

function* producerList() {
  yield takeEvery(producerActions.fetchProducerList, fetchproducerList);
  yield debounce(500, producerActions.setFilterWithDebounce, handleSearch);
}

export function* producerSaga() {
  yield all([fork(producerList)]);
}
