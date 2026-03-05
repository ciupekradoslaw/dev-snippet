import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login, register, registerSuccess } from '../../store/auth';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-auth',
  imports: [
    LogoComponent,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);
  private actions$ = inject(Actions);
  private destroyRef = inject(DestroyRef);

  mode: AuthMode = 'login';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['']
  });

  ngOnInit(): void {
    this.actions$
      .pipe(ofType(registerSuccess), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.toggleMode();
        this.form.reset();
      });
  }

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';

    const confirmPassword = this.form.get('confirmPassword');
    if (this.mode === 'register') {
      confirmPassword?.setValidators([Validators.required]);
      this.form.setValidators(passwordMatchValidator);
    } else {
      confirmPassword?.clearValidators();
      this.form.clearValidators();
    }

    confirmPassword?.updateValueAndValidity();
    this.form.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    if (!email || !password) return;

    if (this.mode === 'register') {
      this.store.dispatch(register({ email, password }));
    } else {
      this.store.dispatch(login({ email, password }));
    }
  }
}
