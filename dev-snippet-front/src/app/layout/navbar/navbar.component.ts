import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { Store } from '@ngrx/store';
import { logout, selectIsLoggedIn, selectUser } from '../../store/auth';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    MatButton,
    RouterModule,
    LogoComponent,
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    MatMenuItem,
    MatMenu
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private store = inject(Store);

  isLoggedIn = this.store.selectSignal(selectIsLoggedIn);
  user = this.store.selectSignal(selectUser);

  logout() {
    this.store.dispatch(logout());
  }
}
