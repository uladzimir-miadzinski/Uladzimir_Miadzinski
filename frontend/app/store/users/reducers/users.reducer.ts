import * as fromUsers from '../actions/users.action';
import { User } from '../../../user-list/user-service.interface';

export interface UserState {
  users: User[];
  loaded?: boolean;
  loading?: boolean;
}

export const initialState: UserState = {
  users: [],
  loaded: false,
  loading: false,
};

export function reducer(state: UserState = initialState, action: fromUsers.UsersAction): UserState {

  switch (action.type) {

    case fromUsers.LOAD_USERS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromUsers.LOAD_USERS_FAIL: {
      return {
        ...state
      };
    }

    case fromUsers.LOAD_USERS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        users: action.payload
      };
    }

    default:
      return state;
  }
}

export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
export const getUsers = (state: UserState) => state.users;
