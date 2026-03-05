import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth', component: AuthComponent }
];
