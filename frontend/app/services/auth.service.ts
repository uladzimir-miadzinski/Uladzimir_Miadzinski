import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  isLoggedIn(): Observable<object> {
    return this.http.get('https://localhost:3000/login-check');
  }

  login(name: string, password: string) {
    return this.http.post('https://localhost:3000/login', {
      name,
      password
    });
  }

  logout() {
    return this.http.post('https://localhost:3000/logout', {});
  }
}
