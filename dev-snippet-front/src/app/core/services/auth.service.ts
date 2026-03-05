import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../tokens/api.token';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from '../models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url = inject(API_URL);

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.url}/auth/register`,
      registerRequest
    );
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/auth/login`, loginRequest);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  me(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.url}/auth/me`);
  }
}
