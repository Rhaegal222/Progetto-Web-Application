import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../styles/container.css',
    '../../styles/content.css',
    '../../styles/form.css'
  ],
})
export class LoginComponent {
  
  email = new FormControl();
  password = new FormControl();

  passwordInputType: string = 'password';
  passwordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordInputType = this.passwordVisible ? 'text' : 'password';    
  }
  
  constructor(private authService: AuthService) { }

  login(){
    var email = this.email.value;
    var password = this.password.value;

    this.authService.login(email, password);
  }
}
