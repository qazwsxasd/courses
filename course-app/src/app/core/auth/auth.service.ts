import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';

import { Store } from '@ngrx/store';
import { AUTH_UPDATE_TOKEN, AUTH_UPDATE_INFO, AUTH_REMOVE } from '../../redux/reducer/auth.reducer';

export interface AuthUser {
    name: {
      first: string,
      last: string
    };
}

export interface UserInfo {
    login: string;
    password: string;
}

export const AUTHSTORE = 'auth';

const URL = 'http://localhost:3004/';
const authRoute = 'auth';
const infoRoute = 'userinfo';

const KEY = 'token';

@Injectable()
export class AuthService {
  private subject: BehaviorSubject<any> = new BehaviorSubject<any>({ name: {} });
  isLogined: Subject<boolean> = new Subject<boolean>();
  private userName: AuthUser | null;
  private token: string;
  constructor(
    private http: HttpClient,
    // TODO check if localStorage is available and set a proper service; refactor constructor
    private router: Router,
    private store: Store<any>
  ) {
    this.store.select(state => state[AUTHSTORE]).subscribe(({ token }) => this.token = token);
  }

  login(user: UserInfo) {
    return this.http.post(`${URL}${authRoute}/login`, JSON.stringify(user))
      .map(res => {
        this.store.dispatch({ type: AUTH_UPDATE_TOKEN, payload: { [KEY]: res[KEY]}});
      })
      .switchMap(() => this.getUserInfo())
      .subscribe((userInfo: AuthUser) => {
        this.store.dispatch({ type: AUTH_UPDATE_INFO, payload: { name: userInfo.name } });
      },
          err => {  },
        () => {
      // TODO redirect to prev
      this.router.navigate(['edit']);
    });
  }

  logout() {
    this.store.dispatch({ type: AUTH_REMOVE });
  }

  private getUserInfo() {
    return this.http.post(`${URL}${authRoute}/${infoRoute}`, {}, {
      headers: { 'Authorization': this.token }
    });
  }

  isAuthenticated() {
    return this.getUserInfo();
  }
}
