import { Action } from '@ngrx/store';
import { User } from '../../user-list/user-service.interface';

export const LOAD_USERS = '[Users] Load Users';
export const LOAD_USERS_FAIL = '[Users] Load Users Fail';
export const LOAD_USERS_SUCCESS = '[Users] Load Users Success';

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
}

export class LoadUsersFail implements Action {
  readonly type = LOAD_USERS_FAIL;
  constructor(public payload: User[]) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

export type UsersActions = LoadUsers | LoadUsersFail | LoadUsersSuccess;
