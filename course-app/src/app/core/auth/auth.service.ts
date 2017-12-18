import { Injectable } from '@angular/core';
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
    constructor(
      private localStorageService: LocalStorageService
    ) { }

    login(user: UserInfo) { // stores fake user info and token to local storage
      this.localStorageService.setItem(KEY, JSON.stringify(user));
    }

    logout() { // wipes fake user info and token from local storage
      this.localStorageService.removeItem(KEY);
    }

    getUserInfo() { //  returns user login
      const userInfo = this.localStorageService.getItem(KEY);
      if (userInfo) {
          return { username: JSON.parse(userInfo).name };
      } else {
          return { username: 'guest' };
      }
    }

    isAuthenticated(): boolean {
      return this.getUserInfo().username === 'guest' ? false : true;
    }
}
