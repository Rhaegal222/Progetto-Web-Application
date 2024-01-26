import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {  
  password: string = '';
  passwordInputType: string = 'password';
  passwordVisible: boolean = false;

  togglePasswordVisibility(visible: boolean): void {
    this.passwordVisible = visible;
    this.passwordInputType = this.passwordVisible ? 'text' : 'password';
  }
}
