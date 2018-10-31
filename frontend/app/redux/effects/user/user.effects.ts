import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  UsersActions,
  LOAD_USERS,
  LoadUsersSuccess,
  LoadUsersFail,
  POST_USER,
  PostUser,
  PostUserSuccess,
  PostUserFail,
  LoadUsers,
  LOAD_CURRENT_USER,
  LoadCurrentUserSuccess,
  LoadCurrentUserFail,
  LOGIN_USER,
  LoginUser,
  LoginUserSuccess,
  LoginUserFail,
} from '../../actions/user/user.actions';
import { catchError, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { User, UserCredentials } from '../../../user-list/user-service.interface';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { STATUS } from '../../../login/login.component';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  @Effect()
  loadUsers$: Observable<UsersActions> = this.actions$.pipe(
    ofType(LOAD_USERS),
    switchMap(() => {
      return this.userService.getUsers()
        .pipe(
          map((users: User[]) => {
            return new LoadUsersSuccess(users);
          }),
          catchError((error: string) => of(new LoadUsersFail(error)))
        );
    })
  );

  @Effect()
  loadCurrentUser$: Observable<UsersActions> = this.actions$.pipe(
    ofType(LOAD_CURRENT_USER),
    switchMap(() => {
      return this.userService.getCurrentUser()
        .pipe(
          map((user: User) => {
            return new LoadCurrentUserSuccess(user);
          }),
          catchError((error: string) => of(new LoadCurrentUserFail(error)))
        );
    })
  );

  @Effect()
  postUser$: Observable<UsersActions> = this.actions$.pipe(
    ofType(POST_USER),
    mergeMap((action: PostUser) => {
      return this.userService.createUser(action.payload as User)
        .pipe(
          map((user: User) => {
            return new PostUserSuccess(user);
          }),
          mapTo(new LoadUsers()),
          catchError((error: string) => of(new PostUserFail(error)))
        );
    })
  );

  @Effect()
  loginUser$: Observable<UsersActions> = this.actions$.pipe(
    ofType(LOGIN_USER),
    mergeMap((action: LoginUser) => {
      return this.authService.login(action.payload as UserCredentials)
        .pipe(
          map((user: User) => {
            return new LoginUserSuccess(user);
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === STATUS.UNAUTHORIZED) {
              return of(new LoginUserFail(STATUS.UNAUTHORIZED));
            } else {
              return of(new LoginUserFail('Unknown reason'));
            }
          })
        );
    })
  );

}


