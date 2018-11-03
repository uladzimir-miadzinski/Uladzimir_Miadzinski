import { Action } from '@ngrx/store';
import { User, UserCredentials } from '../../../user-list/user-service.interface';

export const LOGIN_USER = '[User] Login User';
export const LOGIN_USER_FAIL = '[User] Login User Fail';
export const LOGIN_USER_SUCCESS = '[User] Login User Success';
export const LOGOUT_USER = '[User] Logout User';
export const LOGOUT_USER_FAIL = '[User] Logout User Fail';
export const LOGOUT_USER_SUCCESS = '[User] Logout User Success';
export const LOAD_USERS = '[User] Load Users';
export const LOAD_USERS_FAIL = '[User] Load Users Fail';
export const LOAD_USERS_SUCCESS = '[User] Load Users Success';
export const POST_USER = '[User] Post User';
export const POST_USER_FAIL = '[User] Post User Fail';
export const POST_USER_SUCCESS = '[User] Post User Success';
export const UPDATE_USER = '[User] Update User';
export const UPDATE_USER_FAIL = '[User] Update User Fail';
export const UPDATE_USER_SUCCESS = '[User] Update User Success';
export const UPDATE_CURRENT_USER = '[User] Update Current User';
export const UPDATE_CURRENT_USER_FAIL = '[User] Update Current User Fail';
export const UPDATE_CURRENT_USER_SUCCESS = '[User] Update Current User Success';
export const LOAD_CURRENT_USER = '[User] Load Current User';
export const LOAD_CURRENT_USER_FAIL = '[User] Load Current User Fail';
export const LOAD_CURRENT_USER_SUCCESS = '[User] Load Current User Success';

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
}

export class LoadUsersFail implements Action {
  readonly type = LOAD_USERS_FAIL;

  constructor(public payload: string) {
  }
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoginUser implements Action {
  readonly type = LOGIN_USER;

  constructor(public payload: UserCredentials) {
  }
}

export class LoginUserFail implements Action {
  readonly type = LOGIN_USER_FAIL;

  constructor(public payload: string | number) {
  }
}

export class LoginUserSuccess implements Action {
  readonly type = LOGIN_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LogoutUser implements Action {
  readonly type = LOGOUT_USER;
}

export class LogoutUserFail implements Action {
  readonly type = LOGOUT_USER_FAIL;

  constructor(public payload: string | number) {
  }
}

export class LogoutUserSuccess implements Action {
  readonly type = LOGOUT_USER_SUCCESS;
}

export class PostUser implements Action {
  readonly type = POST_USER;

  constructor(public payload: User) {
  }
}

export class PostUserFail implements Action {
  readonly type = POST_USER_FAIL;

  constructor(public payload: string) {
  }
}

export class PostUserSuccess implements Action {
  readonly type = POST_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;

  constructor(public payload: User) {
  }
}

export class UpdateUserFail implements Action {
  readonly type = UPDATE_USER_FAIL;

  constructor(public payload: string) {
  }
}

export class UpdateUserSuccess implements Action {
  readonly type = UPDATE_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class UpdateCurrentUser implements Action {
  readonly type = UPDATE_CURRENT_USER;

  constructor(public payload: User) {
  }
}

export class UpdateCurrentUserFail implements Action {
  readonly type = UPDATE_CURRENT_USER_FAIL;

  constructor(public payload: string) {
  }
}

export class UpdateCurrentUserSuccess implements Action {
  readonly type = UPDATE_CURRENT_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoadCurrentUser implements Action {
  readonly type = LOAD_CURRENT_USER;
}

export class LoadCurrentUserFail implements Action {
  readonly type = LOAD_CURRENT_USER_FAIL;

  constructor(public payload: string) {
  }
}

export class LoadCurrentUserSuccess implements Action {
  readonly type = LOAD_CURRENT_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export type UsersActions =
  LoadUsers | LoadUsersFail | LoadUsersSuccess |
  PostUser | PostUserFail | PostUserSuccess |
  LoadCurrentUser | LoadCurrentUserFail | LoadCurrentUserSuccess |
  LoginUser | LoginUserFail | LoginUserSuccess |
  LogoutUser | LogoutUserFail | LogoutUserSuccess |
  UpdateUser | UpdateUserFail | UpdateUserSuccess |
  UpdateCurrentUser | UpdateCurrentUserFail | UpdateCurrentUserSuccess;
