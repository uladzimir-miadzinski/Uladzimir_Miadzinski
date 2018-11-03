import {
  LOAD_CURRENT_USER,
  LOAD_CURRENT_USER_FAIL,
  LOAD_CURRENT_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS, UPDATE_CURRENT_USER, UPDATE_CURRENT_USER_FAIL, UPDATE_CURRENT_USER_SUCCESS,
  UsersActions
} from '../../actions/user/user.actions';
import { User } from '../../../user-list/user-service.interface';
import { Map } from 'immutable';

export interface CurrentUserState {
  data: User;
  loaded?: boolean;
  loading?: boolean;
}

export const initialState: CurrentUserState = {
  data: {},
  loaded: false,
  loading: false,
};

export function currentUserReducer(state: CurrentUserState = initialState, action: UsersActions): CurrentUserState {

  switch (action.type) {

    case LOGIN_USER: {
      return Map(state)
        .set('data', action.payload)
        .set('loading', true)
        .set('loaded', false)
        .toJS();
    }

    case LOGIN_USER_FAIL: {
      return Map(state)
        .set('data', action.payload)
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }


    case LOGIN_USER_SUCCESS: {
      return Map(state)
        .set('data', action.payload)
        .set('loading', false)
        .set('loaded', true)
        .toJS();
    }

    case LOGOUT_USER: {
      return Map(state)
        .set('loading', true)
        .set('loaded', false)
        .toJS();
    }

    case LOGOUT_USER_FAIL: {
      return Map(state)
        .set('data', action.payload)
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }


    case LOGOUT_USER_SUCCESS: {
      return Map(state)
        .set('data', {})
        .set('loading', false)
        .set('loaded', true)
        .toJS();
    }

    case LOAD_CURRENT_USER: {
      return Map(state)
        .set('loading', true)
        .set('loaded', false)
        .toJS();
    }

    case LOAD_CURRENT_USER_FAIL: {
      return Map(state)
        .set('data', action.payload)
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }

    case LOAD_CURRENT_USER_SUCCESS: {
      return Map(state)
        .set('data', action.payload)
        .set('loading', false)
        .set('loaded', true)
        .toJS();
    }

    case UPDATE_CURRENT_USER: {
      return Map(state)
        .set('loading', true)
        .set('loaded', false)
        .toJS();
    }

    case UPDATE_CURRENT_USER_FAIL: {
      return Map(state)
        .set('loading', false)
        .set('loaded', false)
        .toJS();
    }

    case UPDATE_CURRENT_USER_SUCCESS: {
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
