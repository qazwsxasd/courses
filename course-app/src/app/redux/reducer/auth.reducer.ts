import { Action } from '@ngrx/store';
import { AuthUser, AUTHSTORE } from './../../core/auth/auth.service';

export const AUTH_UPDATE_TOKEN = `[${AUTHSTORE}] update token`;
export const AUTH_UPDATE_INFO = `[${AUTHSTORE}] update info`;
export const AUTH_REMOVE = `[${AUTHSTORE}] remove`;

export interface AuthActions extends Action {
  payload: AuthUser;
}

export const initialState = {
  token: '',
  name: {
    first: '',
    last: ''
  }
};

export function reducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AUTH_UPDATE_TOKEN:
      return Object.assign({}, state, action.payload);
    case AUTH_UPDATE_INFO:
      return Object.assign({}, state, action.payload);
    case AUTH_REMOVE:
      return {};
    default:
      return state;
  }
}
