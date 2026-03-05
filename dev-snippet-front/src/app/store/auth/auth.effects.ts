import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthSuccess } from '../../core/models/auth.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

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

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.authService
          .login({
            email: action.email,
            password: action.password
          })
          .pipe(
            map((response) => {
              if (response.success) {
                localStorage.setItem('token', response.data.token);
                this.router.navigate(['/']);
                return AuthActions.loginSuccess(response as AuthSuccess);
              }
              return AuthActions.loginFailure({ error: response.error });
            }),
            catchError((error) =>
              of(
                AuthActions.loginFailure({
                  error: error.error?.error ?? 'Login failed'
                })
              )
            )
          )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}
