import { Component, OnInit, Inject } from '@angular/core';

import { AuthService, UserInfo } from '../../core/auth/auth.service';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              // @Inject('StorageService') private storageService: any,
              private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {

  }

  loginUser(user: UserInfo) {
    this.authService.login(user);
  }

  // isLogined(): boolean {
  //   return !!this.authService.isAuthenticated();
  // }
}
