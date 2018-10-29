import {
  LOAD_USERS,
  LOAD_USERS_FAIL,
  LOAD_USERS_SUCCESS,
  POST_USER,
  POST_USER_FAIL,
  POST_USER_SUCCESS,
  UsersActions
} from '../actions/user.actions';
import { User } from '../../user-list/user-service.interface';

export interface UsersState {
  data: User[];
  loaded?: boolean;
  loading?: boolean;
}

export const initialState: UsersState = {
  data: [],
  loaded: false,
  loading: false,
};

export function userReducer(state: UsersState = initialState, action: UsersActions): UsersState {

  switch (action.type) {

    case LOAD_USERS: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_USERS_FAIL: {
      return {
        ...state
      };
    }

    case LOAD_USERS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        data: action.payload
      };
    }

    case POST_USER: {
      return {
        ...state,
        loaded: false,
        loading: true,
        data: [action.payload]
      };
    }

    case POST_USER_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }


    case POST_USER_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        data: [action.payload]
      };
    }

    default:
      return state;
  }
}

export const getUsersLoading = (state: UsersState) => state.loading;
export const getUsersLoaded = (state: UsersState) => state.loaded;
export const getUsers = (state: UsersState) => state.data;
