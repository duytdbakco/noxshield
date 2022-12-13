import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { push } from 'connected-react-router';
import { LoginPayload } from 'models';
import { User } from 'models/user';
import { call, fork, put, take } from 'redux-saga/effects';
import { authActions } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    const rs: User = yield call(authApi.login, payload);
    if (payload.rememberMe) {
      localStorage.setItem('access_token', rs.access_token);
      localStorage.setItem('expires_in', rs.expires_in.toString());
    } else {
      sessionStorage.setItem('access_token', rs.access_token);
      sessionStorage.setItem('expires_in', rs.expires_in.toString());
    }
    yield put(authActions.loginSuccess(rs));
    yield put(push('/home'));
  } catch (error: any) {
    console.log(error);
    yield put(authActions.logout());
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');
  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn =
      Boolean(localStorage.getItem('access_token')) ||
      Boolean(sessionStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
