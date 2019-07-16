import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user-list/user-service.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:3000';
  public user!: User | null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.getCurrentUser();
  }

  getCurrentUser(): Observable<User | null> {
    return this.authService.getCurrentUser();
  }

  updateCurrentUser(params: User) {
    return this.http.put(`${this.apiUrl}/current-user`, params);
  }

  updateUser(params: User) {
    return this.http.put(`${this.apiUrl}/users/${params.id}`, params);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  createUser(params: User) {
    return this.http.post(`${this.apiUrl}/users`, params);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

}
