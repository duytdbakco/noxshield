import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams } from 'models';
import { Content } from 'models/content';
import { RootState } from '../../app/store';

export interface ContentState {
  loading: boolean;
  list: Content[];
  error?: string;
  filter: ListParams;
  pageCount: number;
}

const initialState: ContentState = {
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

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    fetchContentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchContentListSuccess(state, action: PayloadAction<any>) {
      state.list = action.payload;
      state.pageCount = action.payload.length;
      state.loading = false;
    },
    fetchContentListFailed(state) {
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
export const contentActions = contentSlice.actions;

// selectors
export const selectContentList = (state: RootState) => state.content.list;
export const selectContentLoading = (state: RootState) => state.content.loading;
export const selectContentFilter = (state: RootState) => state.content.filter;
export const selectContentPageCount = (state: RootState) => state.content.pageCount;
// reducers
const contentReducer = contentSlice.reducer;
export default contentReducer;
