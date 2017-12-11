import { Component } from '@angular/core';

import { AuthService, UserInfo } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  loginUser(user: UserInfo) {
    this.authService.login(user);
    console.log(user)
  }  
}
