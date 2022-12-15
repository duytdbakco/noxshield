import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams } from 'models';
import { Case } from 'models/case';
import { RootState } from '../../app/store';

export interface CaseState {
  loading: boolean;
  list: Case[];
  error?: string;
  filter: ListParams;
  pageCount: number;
}

const initialState: CaseState = {
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

const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {
    fetchCaseList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchCaseListSuccess(state, action: PayloadAction<any>) {
      state.list = action.payload;
      state.pageCount = action.payload.length;
      state.loading = false;
    },
    fetchCaseListFailed(state) {
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
export const caseActions = caseSlice.actions;

// selectors
export const selectCaseList = (state: RootState) => state.case.list;
export const selectCaseLoading = (state: RootState) => state.case.loading;
export const selectCaseFilter = (state: RootState) => state.case.filter;
export const selectCasePageCount = (state: RootState) => state.case.pageCount;
// reducers
const caseReducer = caseSlice.reducer;
export default caseReducer;
