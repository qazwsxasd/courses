import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthUser, AUTHSTORE } from '../../core/auth/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private user: AuthUser;
  private welcomeString = 'guest';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.store.select(AUTHSTORE).subscribe(name => this.user = name || { name: {} });
  }

  isLogined(): boolean {
    return !!this.user.name;
  }

  toggleLogin(event: any): void {
    event.preventDefault();
    if (this.isLogined()) {
      this.authService.logout();
    }
    this.router.navigate(['login']);
  }

  private get Welcome() {
    return this.isLogined() ? this.user.name.first : this.welcomeString;
  }

  private get loginButtonLabel(): string {
    return this.isLogined() ? 'logout' : 'login';
  }
}
