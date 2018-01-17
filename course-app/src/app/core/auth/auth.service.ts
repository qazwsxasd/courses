import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from '../local-storage/local-storage.service';

export interface AuthUser {
    username: string;
    token: string;
}

export interface UserInfo {
    name: string;
    password: string;
}

const KEY = 'user';

@Injectable()
export class AuthService {
  private subject: BehaviorSubject<any> = new BehaviorSubject<any>({ username: '' });
  isLogined: Subject<boolean> = new Subject<boolean>();
  constructor(
    // TODO check if localStorage is available and set a proper service; refactor constructor
    private localStorageService: LocalStorageService
  ) {
    if (this.getUserInfo().username) {
      this.logout(false);
    }
  }

  login(user: UserInfo) { // stores fake user info and token to local storage
    this.localStorageService.setItem(KEY, JSON.stringify(user));
    this.channelPublish(this.getUserInfo());
  }

  logout(send = true) { // wipes fake user info and token from local storage
    this.localStorageService.removeItem(KEY);
    if (send) {
      this.channelPublish(this.getUserInfo());
    }
  }
  channelPublish(data) {
    this.subject.next(data);
  }

  channelSubscribe(callback) { // to hide channel
    this.subject.subscribe(callback);
  }

  private getUserInfo() { //  returns user login
    const userInfo = this.localStorageService.getItem(KEY);
    if (userInfo) {
        return { username: JSON.parse(userInfo).name };
    } else {
        return { username: '' };
    }
  }

  isAuthenticated(): string {
    return this.getUserInfo().username || '';
  }
}
