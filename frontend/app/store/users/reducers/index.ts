import { UserState, reducer } from './users.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { UsersAction } from '../actions/users.action';

export interface UsersState {
  users: UserState;
}

export const reducers: ActionReducerMap<UsersState, UsersAction> = {
  users: reducer
};
