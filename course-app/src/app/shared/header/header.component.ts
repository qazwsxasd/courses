import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.channelSubscribe(name => this.user = name || { name: {} });
  }

  isLogined(): boolean {
    return this.user && !!this.user.name.first;
  }

  toggleLogin(event: any): void {
    event.preventDefault();
    if (this.isLogined()) {
      this.authService.logout();
    }
  }

  private get Welcome() {
    return this.user.name && !!this.user.name.first ? this.user.name.first : this.welcomeString;
  }
}
