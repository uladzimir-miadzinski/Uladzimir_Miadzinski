/*import * as jwt from 'jsonwebtoken';*/
import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface JwtUser {
  token: string;
}

export interface JwtPayload {
  iat: number;
  exp: number;
  sub: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  private static setSession(params: JwtUser) {
    localStorage.setItem('token', params.token);
  }

  public static getToken(): string | null {
    const token = localStorage.getItem('token');
    return token === null || token.trim() === '' ? null : token;
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static isLoggedIn() {
    return moment().isBefore(AuthService.tokenExpiredIn());
  }

  static tokenExpiredIn() {
    /*const token = AuthService.getToken();
    return token !== null ? moment((jwt.decode(token) as JwtPayload).exp) : moment(0);*/
    return moment();
  }

  login(name: string, password: string) {
    return this.http.post<JwtUser>('https://localhost:3000/login', {
      name,
      password
    })
      .pipe(map(result => {
          AuthService.setSession(result);
          return true;
        })
      );
  }
}
