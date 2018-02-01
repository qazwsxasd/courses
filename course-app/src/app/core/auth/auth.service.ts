import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

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
  constructor(
    private http: HttpClient,
    // TODO check if localStorage is available and set a proper service; refactor constructor
    private localStorageService: LocalStorageService
  ) {
    if (this.getLocalInfo()) {
      this.logout(false);
    }
  }

  login(user: UserInfo) {
    this.http.post(`${URL}${authRoute}/login`, JSON.stringify(user))
      .subscribe(
        res => {
          console.log(res); // token
          this.localStorageService.setItem(KEY, res[KEY]);

          this.getUserInfo()
            .subscribe( (userInfo: AuthUser) => {
              console.log('login-> userInfo: ', userInfo.name);
              this.channelPublish({ name: userInfo.name });
            },
              err => console.log('getUser err: ', err));
        },
        // TODO add error handlers
        err => {
          console.error('login err: ', err);
          this.channelPublish(null);
        }
      );
  }

  logout(send = true) {
    this.localStorageService.removeItem(KEY);
    if (send) {
      // this.channelPublish(this.getLocalInfo());
    }
  }

  channelPublish(data) {
    this.subject.next(data); // username
  }

  channelSubscribe(callback) {
    this.subject.subscribe(callback);
  }

  private getUserInfo() {
    const userInfo = this.localStorageService.getItem(KEY);
    return this.http.post(`${URL}${authRoute}/${infoRoute}`, {}, {
      headers: { 'Authorization': userInfo }
    });
  }

  private getLocalInfo(): boolean {
    return !!this.localStorageService.getItem(KEY);
  }

  isAuthenticated(): void {
    this.getUserInfo().subscribe((res: AuthUser) => {
      console.log('isAuthenticated? ', res);
      this.channelPublish({ name: res.name });
    }, err => this.channelPublish(null));
  }
}
