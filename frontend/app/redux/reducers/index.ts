import { UsersState, userReducer } from './user/user.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersActions } from '../actions/user/user.actions';
import { currentUserReducer, CurrentUserState } from './user/current-user.reducer';

export interface DataState {
  users: UsersState;
}

export interface SessionState {
  currentUser: CurrentUserState;
}

export const dataReducers: ActionReducerMap<DataState, UsersActions> = {
  users: userReducer
};

export const sessionReducers: ActionReducerMap<SessionState, UsersActions> = {
  currentUser: currentUserReducer
};

export const selectData = createFeatureSelector<DataState>('Data');
export const selectSession = createFeatureSelector<SessionState>('Session');

export const selectUsers = createSelector(selectData, (state: DataState) => state.users);
export const selectCurrentUser = createSelector(selectSession, (state: SessionState) => state.currentUser);

export const allUsers = createSelector(selectUsers, (state: UsersState) => state.data);
export const currentUser = createSelector(selectCurrentUser, (state: CurrentUserState) => state.data);
