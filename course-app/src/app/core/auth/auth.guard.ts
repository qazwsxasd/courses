import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route,
  ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild
} from '@angular/router';

import { AUTHSTORE } from './auth.service';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private isLogginedIn: boolean;
  constructor(
    private router: Router,
    private store: Store<any>
  ) {
    this.store.select(state => state[AUTHSTORE]).subscribe(({ name }) => this.isLogginedIn = !!name);
  }

  private checkLogin(url: string = ''): boolean {
    if (this.isLogginedIn) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin();
  }

  canLoad(route: Route): boolean {
    return this.checkLogin();
  }
}
