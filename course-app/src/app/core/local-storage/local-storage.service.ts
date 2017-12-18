import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Injectable } from '@angular/core';

export interface AuthUser {
  username: string;
  token: string;
}

export interface UserInfo {
  name: string;
  password: string;
}

//MOCK
const USER: AuthUser = { username: 'John', token: 'sdfWD23s' };

@Injectable()
export class LocalStorageService {
  private cache: Object;
  private browser: boolean;

  constructor(
     @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.browser = isPlatformBrowser(this.platformId);
    console.log('local storage');
  }

  getItem(key) {
    if (this.browser) {
    return localStorage.getItem(key);
    } else {
     return this.cache[key] || null;
    }
  }

  setItem(key, value) {
    if (this.browser){
      localStorage.setItem(key, value);
    } else {
     this.cache[key] = value;
    }
  }

  removeItem(key) {
    if (this.browser){
      localStorage.removeItem(key);
    } else {
      delete this.cache[key];
    }
  }

  clear(){
    if (this.browser) {
      localStorage.clear();
    } else {
      this.cache = {};
    }
  }
}
