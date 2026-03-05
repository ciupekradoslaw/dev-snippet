import { createAction, props } from '@ngrx/store';
import {
  AuthSuccess,
  LoginRequest,
  RegisterRequest
} from '../../core/models/auth.model';

// Register
export const register = createAction(
  '[Auth] Register',
  props<RegisterRequest>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<AuthSuccess>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Login
export const login = createAction('[Auth] Login', props<LoginRequest>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<AuthSuccess>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const checkAuth = createAction('[Auth] Check Auth');
export const checkAuthSuccess = createAction(
  '[Auth] Check Auth Success',
  props<{ email: string }>()
);
export const checkAuthFailure = createAction('[Auth] Check Auth Failure');
