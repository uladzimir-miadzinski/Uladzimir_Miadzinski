import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user-list/user-service.interface';
import { select, Store } from '@ngrx/store';
import { currentUser, SessionState } from './redux/reducers';
import { LoadCurrentUser } from './redux/actions/user/user.actions';

@Injectable()
export class SharedService {
  public currentUser$: Observable<User | null>;

  constructor(
    private sessionStore: Store<SessionState>
  ) {
    this.sessionStore.dispatch(new LoadCurrentUser());
    this.currentUser$ = this.sessionStore.pipe(select(currentUser));
  }
}

export function isEmptyObject(obj: Object): boolean {
  return Object.keys(obj).length === 0;
}
