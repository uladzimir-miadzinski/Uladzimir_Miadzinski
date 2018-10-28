export interface UserService {
  getUsers(): User[];
}

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
