import { Action } from '@ngrx/store';
import { User } from '../../user-list/user-service.interface';

export const LOAD_USERS = '[User] Load Users';
export const LOAD_USERS_FAIL = '[User] Load Users Fail';
export const LOAD_USERS_SUCCESS = '[User] Load Users Success';
export const POST_USER = '[User] Post User';
export const POST_USER_FAIL = '[User] Post User Fail';
export const POST_USER_SUCCESS = '[User] Post User Success';

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
}

export class LoadUsersFail implements Action {
  readonly type = LOAD_USERS_FAIL;
  constructor(public payload: string) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: User[]) {}
}

export class PostUser implements Action {
  readonly type = POST_USER;
  constructor(public payload: User) {}
}

export class PostUserFail implements Action {
  readonly type = POST_USER_FAIL;
  constructor(public payload: string) {}
}

export class PostUserSuccess implements Action {
  readonly type = POST_USER_SUCCESS;
  constructor(public payload: User) {}
}

export type UsersActions = LoadUsers | LoadUsersFail | LoadUsersSuccess;

export type UserPostActions = PostUser | PostUserFail | PostUserSuccess;
