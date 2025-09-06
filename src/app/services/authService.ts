import { Injectable } from '@angular/core';
import { IUser } from '../models/Account';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  public user: IUser | null = null;

  constructor() {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      this.token = savedToken;
      this.user = jwtDecode<IUser>(savedToken);
    }
  }

  loginUser(token: string) {
    this.token = token;
    this.user = jwtDecode<IUser>(token);
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  logoutUser() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('auth_token');
  }
}
