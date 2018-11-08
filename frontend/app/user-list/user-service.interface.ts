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

export interface UserCredentials {
  name: string;
  password: string;
}
