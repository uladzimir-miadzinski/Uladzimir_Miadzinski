import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User, UserCredentials} from '../user-list/user-service.interface';
import {config} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = config.serverUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  isLoggedIn(): Observable<object> {
    return this.http.get(`${this.apiUrl}/login-check`);
  }

  login(userCredentials: UserCredentials) {
    const {name, password} = userCredentials;

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

  getCurrentUser(): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/current-user`).pipe(
      map((user: User) => user),
      catchError(() => of(null))
    );
  }

  getUserByUsername(username: string) {
    const params = new URLSearchParams();
    params.append('name', username);

    return this.http.get<User[]>(`${this.apiUrl}/user-exists?${params.toString()}`);
  }
}
