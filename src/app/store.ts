import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import profileReducer from 'features/profile/profileSlice';
import reasonReducer from 'features/reason/reasonSlice';
import bannerReducer from 'features/banner/bannerSlice';
import producerReducer from 'features/producer/producerSlice';
import contentReducer from 'features/content/contentSlice';
import caseReducer from 'features/case/caseSlice';

import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSaga';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  profile: profileReducer,
  reason: reasonReducer,
  banner: bannerReducer,
  producer: producerReducer,
  content: contentReducer,
  case: caseReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
