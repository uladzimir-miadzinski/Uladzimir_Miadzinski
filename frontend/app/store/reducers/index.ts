import { UsersState, userReducer, getUsers } from './user.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersActions } from '../actions/user.actions';

export interface AppState {
  users: UsersState;
}

export const reducers: ActionReducerMap<AppState, UsersActions> = {
  users: userReducer
};

export const getUsersState = createFeatureSelector<UsersState>(
  'users'
);

export const allUsers = createSelector(getUsersState, getUsers);
