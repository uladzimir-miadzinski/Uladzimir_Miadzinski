import {
  ASSIGN_USER_PASSWORD, ASSIGN_USER_PASSWORD_FAIL, ASSIGN_USER_PASSWORD_SUCCESS,
  CREATE_USER, CREATE_USER_FAIL, CREATE_USER_SUCCESS, DELETE_USER, DELETE_USER_FAIL, DELETE_USER_SUCCESS,
  LOAD_USERS,
  LOAD_USERS_FAIL,
  LOAD_USERS_SUCCESS, RESET_DATA_STATE,
  UPDATE_USER, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS,
  UsersActions
} from '../../actions/user/user.actions';
import { User } from '../../../user-list/user-service.interface';
import { Map } from 'immutable';

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

    case RESET_DATA_STATE: {
      return Map(state)
        .set('data', [])
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }

    case LOAD_USERS: {
      return Map(state)
        .set('loading', true)
        .set('loaded', false)
        .toJS();
    }

    case LOAD_USERS_FAIL: {
      return Map(state)
        .set('data', action.payload)
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }

    case LOAD_USERS_SUCCESS: {
      return Map(state)
        .set('data', action.payload)
        .set('loading', false)
        .set('loaded', true)
        .toJS();
    }

    case CREATE_USER: {
      return Map(state)
        .set('loading', true)
        .set('loaded', false)
        .toJS();
    }

    case CREATE_USER_FAIL: {
      return Map(state)
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }

    case CREATE_USER_SUCCESS: {
      return Map(state)
        .set('loading', false)
        .set('loaded', true)
        .toJS();
    }

    case UPDATE_USER: {
      return Map(state)
        .set('loading', true)
        .set('loaded', false)
        .toJS();
    }

    case UPDATE_USER_FAIL: {
      return Map(state)
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }

    case UPDATE_USER_SUCCESS: {
      return Map(state)
        .set('loading', false)
        .set('loaded', true)
        .toJS();
    }

    case ASSIGN_USER_PASSWORD: {
      return Map(state)
        .set('loading', true)
        .set('loaded', false)
        .toJS();
    }

    case ASSIGN_USER_PASSWORD_FAIL: {
      return Map(state)
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }

    case ASSIGN_USER_PASSWORD_SUCCESS: {
      return Map(state)
        .set('loading', false)
        .set('loaded', true)
        .toJS();
    }

    case DELETE_USER: {
      return Map(state)
        .set('loading', true)
        .set('loaded', false)
        .toJS();
    }

    case DELETE_USER_FAIL: {
      return Map(state)
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }

    case DELETE_USER_SUCCESS: {
      return Map(state)
        .set('loading', false)
        .set('loaded', true)
        .toJS();
    }

    default: {
      return state;
    }
  }
}
