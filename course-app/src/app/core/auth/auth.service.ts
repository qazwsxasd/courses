import { Injectable, EventEmitter } from '@angular/core';

export interface AuthUser {
    username: string;
    token: string;
}

export interface UserInfo {
    name: string;
    password: string;
}

type LoginEvent = { user: string, logined: boolean };

//MOCK
const USER: AuthUser = { username: 'John', token: 'sdfWD23s' };
const INIT_USER: LoginEvent = { user: 'guest', logined: false };

@Injectable()
export class AuthService {
    private isLogined: EventEmitter<LoginEvent> = new EventEmitter;
    constructor() {
        this.setAuthenticated(INIT_USER);
    }

    login(user: UserInfo) { // stores fake user info and token to local storage
        // should be post
        return Promise.resolve(USER)
            .then(response => {
                if (response && response.token) {
                    const userData: AuthUser = { username: user.name, token: response.token};
                    localStorage.setItem('user', JSON.stringify(userData));
                    this.setAuthenticated({ user: user.name, logined: true});
                }
            })
            .catch(this.handleError);        
    }

    logout() { // wipes fake user info and token from local storage 
        localStorage.removeItem('user');
        this.setAuthenticated(INIT_USER);
    }

    getUserInfo() { //  returns user login
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            return { username: JSON.parse(userInfo).username };
        } else {
            return { username: 'guest' };
        }
    }
    
    isAuthenticated(callback: (event: LoginEvent) => void): void {
        this.isLogined.subscribe(callback);
    }

    clearChanel(): void {
        this.isLogined.unsubscribe();
    }

    private setAuthenticated(event: LoginEvent) {
        this.isLogined.emit(event);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        this.setAuthenticated(INIT_USER);
        return Promise.reject(error.message || error);
    }
}
