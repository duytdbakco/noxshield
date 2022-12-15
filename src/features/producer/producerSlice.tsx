import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams } from 'models';
import { Producer } from 'models/producer';
import { RootState } from '../../app/store';

export interface ProducerState {
  loading: boolean;
  list: Producer[];
  error?: string;
  filter: ListParams;
  pageCount: number;
}

const initialState: ProducerState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 10,
    _totalRows: 15,
    header_like: '',
  },
  error: '',
  pageCount: 4,
};

const producerSlice = createSlice({
  name: 'producer',
  initialState,
  reducers: {
    fetchProducerList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchProducerListSuccess(state, action: PayloadAction<any>) {
      state.list = action.payload;
      state.pageCount = action.payload.length;
      state.loading = false;
    },
    fetchProducerListFailed(state) {
      state.loading = false;
      state.error = 'err';
    },
    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = {
        ...action.payload,
        _page: action.payload._page > 0 ? action.payload._page : 0,
        header_like: action.payload.header_like,
      };
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

// actions
export const producerActions = producerSlice.actions;

// selectors
export const selectProducerList = (state: RootState) => state.producer.list;
export const selectProducerLoading = (state: RootState) => state.producer.loading;
export const selectProducerFilter = (state: RootState) => state.producer.filter;
export const selectProducerPageCount = (state: RootState) => state.producer.pageCount;
// reducers
const producerReducer = producerSlice.reducer;
export default producerReducer;
