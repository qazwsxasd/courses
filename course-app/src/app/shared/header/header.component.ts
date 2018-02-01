import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private name: {};
  private welcomeString: string = 'guest';
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.channelSubscribe(({ name }) => this.name = name);
  }

  isLogined(): boolean {
    return this.name && !!this.name.first;
  }

  toggleLogin(event: any): void {
    event.preventDefault();
    if (this.isLogined()) {
      this.authService.logout();
    }
  }

  private get Welcome() {
    return this.name && this.name.first ? this.name.first : this.welcomeString;
  }
}
