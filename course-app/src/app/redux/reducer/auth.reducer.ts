import { Action } from '@ngrx/store';
import { AuthUser, AUTHSTORE } from './../../core/auth/auth.service';

export const AUTH_UPDATE = `[${AUTHSTORE}] update`;
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
    case AUTH_UPDATE:
      return Object.assign({}, state, action.payload);
    case AUTH_REMOVE:
      return {};
    default:
      return state;
  }
}
