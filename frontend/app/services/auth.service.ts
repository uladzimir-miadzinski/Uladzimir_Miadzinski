import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoadingService } from './loading.service';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id?: number;
  age: number;
  birthday?: string;
  firstLogin?: string;
  nextNotify?: string;
  info?: string;
  password?: string;
  name: string;
  deleted?: number;
  [key: string]: number | string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
  }

  isLoggedIn(): Observable<object> {
    return this.http.get(`${this.apiUrl}/login-check`);
  }

  login(name: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      name,
      password
    });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  assignNewPassword(name: string, password: string) {
    return this.http.put<User>(`${this.apiUrl}/reassign-password`, {
      name,
      password
    });
  }

  getCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}/current-user`).pipe(
      map((user: User) => {
        return user;
      }),
      catchError(() => {
        return of(null);
      }));
  }

  getUserByUsername(username: string) {
    const params = new URLSearchParams();
    params.append('name', username);

    return this.http.get<User[]>(`${this.apiUrl}/user-exists?${params.toString()}`);
  }
}
