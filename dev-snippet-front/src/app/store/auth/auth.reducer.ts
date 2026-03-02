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
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: action.data.email
  })),
  on(AuthActions.registerFailure, (state, action) => ({
    ...state,
    loading: false,
    user: action.error
  }))
);
