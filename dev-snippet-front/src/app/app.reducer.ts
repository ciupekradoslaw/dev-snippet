import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './store/auth';

export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer
};
