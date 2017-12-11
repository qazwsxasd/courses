import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string;
  isLogined: boolean;

  constructor(private authService: AuthService) {
    this.isLogined = false;
    this.username = '';
   }

  ngOnInit() {
    this.username = this.authService.getUserInfo().username;
    this.authService.isAuthenticated((res) => {      
      this.isLogined = res.logined;
      this.username = res.user;
    });
  }

  toggleLogin(event: any): void {
    this.isLogined 
    ? this.authService.logout()
    : this.authService.login({ name: 'John', password: 'sdfWD23s' });
  }

  ngOnDestroy() {
    this.authService.clearChanel();
  }
}
