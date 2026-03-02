import { Component } from '@angular/core';
import { LogoComponent } from '../../shared/logo/logo.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

export type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-auth',
  imports: [LogoComponent, MatFormField, MatLabel, MatInput, MatButton],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  protected mode: AuthMode = 'login';

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }
}
