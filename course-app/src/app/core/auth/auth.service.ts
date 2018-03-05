import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';

import { LocalStorageService } from '../local-storage/local-storage.service';

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

const URL = 'http://localhost:3004/';
const authRoute = 'auth';
const infoRoute = 'userinfo';

const KEY = 'token';

@Injectable()
export class AuthService {
  private subject: BehaviorSubject<any> = new BehaviorSubject<any>({ name: {} });
  isLogined: Subject<boolean> = new Subject<boolean>();
  private userName: AuthUser | null;
  constructor(
    private http: HttpClient,
    // TODO check if localStorage is available and set a proper service; refactor constructor
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.getLocalInfo()) {
      this.logout(false);
    }
  }

  login(user: UserInfo) {
    return this.http.post(`${URL}${authRoute}/login`, JSON.stringify(user))
      .map(res => {
        this.localStorageService.setItem(KEY, res[KEY]);
      })
      .switchMap(() => this.getUserInfo())
      .subscribe((userInfo: AuthUser) => {
        this.userName = userInfo;
        console.log(userInfo);
        this.channelPublish({ name: userInfo.name });
      },
          err => { this.channelPublish(null); },
        () => {
      // TODO redirect to prev
      this.router.navigate(['']);
    });
  }

  logout(send = true) {
    this.localStorageService.removeItem(KEY);
    this.userName = null;
    if (send) {
      this.channelPublish(this.userName);
    }
  }

  channelPublish(data) {
    this.subject.next(data); // username
  }

  channelSubscribe(callback) {
    this.subject.subscribe(callback);
  }

  private getUserInfo() {
    const userInfo = this.localStorageService.getItem(KEY) || {};
    return this.http.post(`${URL}${authRoute}/${infoRoute}`, {}, {
      headers: { 'Authorization': userInfo }
    });
  }

  private getLocalInfo(): boolean {
    return !!this.localStorageService.getItem(KEY);
  }

  isAuthenticated(): void {
    this.getUserInfo().subscribe(
      (res: AuthUser) => {
      console.log('isAuthenticated? ', res);
      this.channelPublish({ name: res.name });
    },
     err => {
       this.channelPublish(null);
       console.error('getUserInfo: ', err);
     });
  }

  // isAuthenticated() {
  //   return this.getUserInfo();
  // }

  isLoggedIn(): boolean {
    return !!this.userName && !!this.userName.name.first;
  }
}
