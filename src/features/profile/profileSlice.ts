import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ServiceForm, User } from 'models';

export interface userProfile {
  isLoading: Boolean;
  userInfor?: User;
  ListServicesForm: ServiceForm[];
  error?: string;
}

const initialState: userProfile = {
  isLoading: false,
  userInfor: undefined,
  ListServicesForm: [],
  error: undefined,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    get(state) {
      state.isLoading = true;
      state.error = undefined;
    },
    postSuccess(state, action: PayloadAction<ServiceForm[]>) {
      state.isLoading = false;
      state.ListServicesForm = action.payload;
      state.error = 'saveSuccess';
    },
    postFailed(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.error = '401: saveFailed';
    },
  },
});

export const profileActions = profileSlice.actions;
export const selectListServicesForm = (state: RootState) => state.profile.ListServicesForm;
const profileReducer = profileSlice.reducer;
export default profileReducer;
