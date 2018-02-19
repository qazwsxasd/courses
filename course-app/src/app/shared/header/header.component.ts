import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private user: AuthUser;
  private welcomeString: string = 'guest';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.channelSubscribe(name => this.user = name || { name: {} });
  }

  isLogined(): boolean {
    return this.authService.isLoggedIn();
  }

  toggleLogin(event: any): void {
    event.preventDefault();
    if (this.isLogined()) {
      this.authService.logout();
      this.router.navigate(['login']);
    }
  }

  private get Welcome() {
    return this.isLogined() ? this.user.name.first : this.welcomeString;
  }

  private get loginButtonLabel(): string {
    return this.isLogined() ? 'logout' : 'login';
  }
}
