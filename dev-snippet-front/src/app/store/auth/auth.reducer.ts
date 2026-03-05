import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  loading: boolean;
  error: string | null;
  user: string | null;
}

export const initialState: AuthState = {
  loading: false,
  error: null,
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.register,
    AuthActions.login,
    AuthActions.checkAuth,
    (state) => ({
      ...state,
      loading: true,
      error: null
    })
  ),
  on(
    AuthActions.registerSuccess,
    AuthActions.loginSuccess,
    (state, action) => ({
      ...state,
      loading: false,
      user: action.data.email
    })
  ),
  on(
    AuthActions.registerFailure,
    AuthActions.loginFailure,
    (state, action) => ({
      ...state,
      loading: false,
      error: action.error
    })
  ),
  on(AuthActions.checkAuthSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.email
  })),
  on(AuthActions.checkAuthFailure, AuthActions.logout, (state) => ({
    ...state,
    loading: false,
    user: null
  }))
);
