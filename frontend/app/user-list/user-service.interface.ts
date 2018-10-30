import { Observable } from 'rxjs';

export interface UserService {
  getUsers(): User[];
  getUsersByName(name: string): Observable<User[]>;
}

export interface User {
  id?: number;
  age?: number;
  birthday?: string;
  firstLogin?: string;
  nextNotify?: string;
  info?: string;
  password?: string;
  name?: string;
  deleted?: number;
  role?: string;
}
