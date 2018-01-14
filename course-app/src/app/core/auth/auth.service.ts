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
  // private subject = new Subject<any>();
  private subject: BehaviorSubject<any> = new BehaviorSubject<any>({username: 'guest'});
  constructor(
    private localStorageService: LocalStorageService
  ) { }

  login(user: UserInfo) { // stores fake user info and token to local storage
    this.localStorageService.setItem(KEY, JSON.stringify(user));
    this.channelPublish(this.getUserInfo());
  }

  logout() { // wipes fake user info and token from local storage
    this.localStorageService.removeItem(KEY);
    this.channelPublish(this.getUserInfo());
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
        return { username: 'guest' };
    }
  }

  isAuthenticated(): boolean {
    return !(this.getUserInfo().username === 'guest');
  }
}
