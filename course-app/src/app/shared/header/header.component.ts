import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private username: string;
  constructor(
    private authService: AuthService
  ) {  }

  ngOnInit() {
    this.authService.channelSubscribe(({ username }) => this.username = username);
  }

  isLogined(): boolean {
    return this.username !== 'guest';
  }

  toggleLogin(event: any): void {
    event.preventDefault();
    if (this.isLogined()) {
      this.authService.logout();
    } else {
      this.authService.login({ name: 'John', password: 'sdfWD23s' });
    }
  }
}
