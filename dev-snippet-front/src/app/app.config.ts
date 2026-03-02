import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { API_URL } from './core/tokens/api.token';
import { environment } from '../environments/environment';
import { provideStore } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(appReducer),
    provideEffects([AuthEffects]),
    { provide: API_URL, useValue: environment.apiUrl }
  ]
};
