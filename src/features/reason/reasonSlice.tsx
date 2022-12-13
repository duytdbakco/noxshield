import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, PaginationParams } from 'models';
import { Reason } from 'models/reason';
import { RootState } from '../../app/store';

export interface ReasonState {
  loading: boolean;
  list: Reason[];
  error?: string;
  filter: ListParams;
  pageCount: number;
  pagination: PaginationParams;
}

const initialState: ReasonState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 10,
    header_like: '',
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
  error: '',
  pageCount: 4,
};

const reasonSlice = createSlice({
  name: 'reason',
  initialState,
  reducers: {
    fetchReasonList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchReasonListSuccess(state, action: PayloadAction<any>) {
      state.list = action.payload.data;
      state.pageCount = action.payload.data.length;
      state.loading = false;
    },
    fetchReasonListFailed(state) {
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
export const reasonActions = reasonSlice.actions;

// selectors
export const selectReasonList = (state: RootState) => state.reason.list;
export const selectReasonLoading = (state: RootState) => state.reason.loading;
export const selectReasonFilter = (state: RootState) => state.reason.filter;
export const selectReasonPageCount = (state: RootState) => state.reason.pageCount;
// reducers
const reasonReducer = reasonSlice.reducer;
export default reasonReducer;
