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
  PostUserFail, LoadUsers, UserPostActions
} from '../actions/user.actions';
import { catchError, map, mapTo, mergeMap, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../user-list/user-service.interface';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
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
  postUser$: Observable<UserPostActions> = this.actions$.pipe(
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

}


