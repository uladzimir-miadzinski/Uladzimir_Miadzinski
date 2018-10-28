import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../user-list/user-service.interface';


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
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.authService.getCurrentUser()
      .subscribe((user: User | null) => {
        this.user = user;
      });
  }

  updateCurrentUser(params: User) {
    return this.http.put(`${this.apiUrl}/current-user`, params);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUsersByName(name: string) {
    return this.http.get<User[]>(`${this.apiUrl}/users?name=${name}`);
  }

}
