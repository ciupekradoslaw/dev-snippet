export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {}

export interface AuthSuccess {
  success: true;
  data: {
    email: string;
    token: string;
  };
}

export interface AuthError {
  success: false;
  error: string;
}

export type AuthResponse = AuthSuccess | AuthError;
