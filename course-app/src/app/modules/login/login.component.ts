import { Component, OnInit } from '@angular/core';

import { AuthService, UserInfo } from '../../core/auth/auth.service';
import { LocalStorageService } from '../../core/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginModel;

  constructor(private authService: AuthService,
              // @Inject('StorageService') private storageService: any,
              private localStorageService: LocalStorageService
  ) {
    this.loginModel = { login: 'Warner', password: 'ea' }; // mock
  }

  ngOnInit() { }

  loginUser(user: UserInfo) {
    this.authService.login(user);
  }

  submit(form) {
    this.authService.login({
      login: form.controls.loginName.value,
      password: form.controls.passwordName.value
    });

  }
}
