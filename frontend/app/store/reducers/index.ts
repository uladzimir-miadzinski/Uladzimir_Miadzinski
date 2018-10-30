import { UsersState, userReducer } from './user.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersActions } from '../actions/user.actions';

export interface AppState {
  users: UsersState;
}

export const reducers: ActionReducerMap<AppState, UsersActions> = {
  users: userReducer
};

export const selectUsersFeature = createFeatureSelector<AppState>('users');

export const selectUsers = createSelector(selectUsersFeature, (state: AppState) => state.users);

export const allUsers = createSelector(selectUsers, (state: UsersState) => state.data);
