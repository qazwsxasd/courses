import {  Action } from '@ngrx/store';
import { AuthUser } from './../../core/auth/auth.service';

export const GETAUTH = '[auth] UpdateAll';

export class GetAuthAction implements Action {
  type = GETAUTH;

  constructor(public payload: AuthUser) {}
}

export function reducer(state = {}, action: GetAuthAction) {
  switch (action.type) {
    case GETAUTH:
      return action.payload;
    default:
      return state;
  }
}
