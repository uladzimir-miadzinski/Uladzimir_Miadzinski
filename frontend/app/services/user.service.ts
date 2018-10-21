import { Injectable } from '@angular/core';
import { AuthService, User } from './auth.service';
import { HttpClient } from '@angular/common/http';

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

}
