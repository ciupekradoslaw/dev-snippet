import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthSuccess } from '../../core/models/auth.model';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.authService
          .register({ email: action.email, password: action.password })
          .pipe(
            map((response) => {
              if (response.success) {
                return AuthActions.registerSuccess(response as AuthSuccess);
              }
              return AuthActions.registerFailure({ error: response.error });
            }),
            catchError((error) =>
              of(
                AuthActions.registerFailure({
                  error: error.error?.error ?? 'Registration failed'
                })
              )
            )
          )
      )
    )
  );
}
