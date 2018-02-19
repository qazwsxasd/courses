import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route,
  ActivatedRouteSnapshot, NavigationExtras,
  RouterStateSnapshot, CanActivateChild
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
    if (this.authService.isLoggedIn()) { return true; }

    // Store the attempted URL for redirecting
    this.redirectUrl = url;

    const navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': 111 },
      fragment: 'anchor'
    };

    // Navigate to the login page
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const url: string = state.url;
    console.log('route=', route, 'state=', state);
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
