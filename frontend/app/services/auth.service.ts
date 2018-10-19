import { Injectable, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  deleted: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit, OnChanges {
  @Input()
  userLoggedIn!: boolean;

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.updateAuthStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  getUserByUsername(username: string) {
    const params = new URLSearchParams();
    params.append('name', username);

    return this.http.get<User[]>(`https://localhost:3000/user-exists?${params.toString()}`);
  }

  updateAuthStatus() {
    this.isLoggedIn().subscribe(() => {
      this.userLoggedIn = true;
      console.log(true);
    }, () => {
      this.userLoggedIn = false;
    });
  }
}
