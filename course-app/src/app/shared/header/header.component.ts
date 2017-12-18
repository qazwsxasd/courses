import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string;

  constructor(
    private authService: AuthService
  ) {  }

  ngOnInit() {
    this.username = this.authService.getUserInfo().username;
  }

  isLogined(): boolean {
    return this.authService.isAuthenticated();
  }

  toggleLogin(event: any): void {
    event.preventDefault();
    if (this.isLogined()) {
      this.authService.logout();
      this.username = this.authService.getUserInfo().username;
    } else {
      this.authService.login({ name: 'John', password: 'sdfWD23s' });
    }
  }
}
