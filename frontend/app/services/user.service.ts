import { Injectable } from '@angular/core';
import { User } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  updateUser(params: User) {
    return this.http.put(`${this.apiUrl}/users/${params.id}`, params);
  }

}
