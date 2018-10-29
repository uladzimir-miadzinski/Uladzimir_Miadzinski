import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { UsersActions, LOAD_USERS, LoadUsersSuccess, LoadUsersFail } from '../actions/user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
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
          catchError(error => of(new LoadUsersFail(error)))
        );
    })
  );

}


