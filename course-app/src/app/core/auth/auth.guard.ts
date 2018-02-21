import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route,
  ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private redirectUrl: string;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private checkLogin(url: string = ''): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const url: string = state.url;
    // console.log('route=', route, 'state=', state);
    return this.checkLogin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const url: string = state.url;
    // return this.checkLogin(url);
    return true;
  }

  canLoad(route: Route): boolean {
    // const url = `/${route.path}`;
    // return this.checkLogin(url);
    return true;
  }
}
