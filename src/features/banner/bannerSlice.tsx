import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, PaginationParams } from 'models';
import { Banner } from 'models/banner';
import { RootState } from '../../app/store';

export interface BannerState {
  loading: boolean;
  list: Banner[];
  error?: string;
  filter: ListParams;
  pageCount: number;
}

const initialState: BannerState = {
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

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    fetchBannerList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchBannerListSuccess(state, action: PayloadAction<any>) {
      state.list = action.payload;
      state.pageCount = action.payload.length;
      state.loading = false;
    },
    fetchBannerListFailed(state) {
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
export const bannerActions = bannerSlice.actions;

// selectors
export const selectBannerList = (state: RootState) => state.banner.list;
export const selectBannerLoading = (state: RootState) => state.banner.loading;
export const selectBannerFilter = (state: RootState) => state.banner.filter;
export const selectBannerPageCount = (state: RootState) => state.banner.pageCount;
// reducers
const bannerReducer = bannerSlice.reducer;
export default bannerReducer;
