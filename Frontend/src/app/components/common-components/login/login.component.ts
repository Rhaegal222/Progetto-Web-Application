import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { AuthToken } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../styles/container.css',
    '../../styles/content.css',
    '../../styles/form.css',
    '../../styles/buttons.css'
  ],
})
export class LoginComponent {

  constructor(private authService: AuthService) { }
  
  email = new FormControl();
  password = new FormControl();

  authtoken: AuthToken = {accessToken: ''};  

  passwordInputType: string = 'password';
  passwordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordInputType = this.passwordVisible ? 'text' : 'password';    
  }

  login(){
    var email = this.email.value;
    var password = this.password.value;

    this.authService.login(email, password);
  }
}
