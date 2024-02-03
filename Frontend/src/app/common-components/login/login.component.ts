import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { AuthToken } from '../../model/user';


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

  authtoken: AuthToken = {accessToken: ''};
  

  passwordInputType: string = 'password';
  passwordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordInputType = this.passwordVisible ? 'text' : 'password';    
  }
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.test();
  }

  test(){
    var email = 'john_doe@gmail.com';
    var password = 'P@ssw0rd1';
    
    this.authService.login(email, password).subscribe({
      next: (response) => {
      this.authtoken = response;
        if(this.authtoken.accessToken != ''){
          console.log('Login successful:', this.authtoken.accessToken);
        } else {
          console.log('Login failed:', response);
        }
      },
      error: (error) => {
        console.error(error)
      }
    });  
  }

  login(){
    var email = this.email.value;
    var password = this.password.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
      // Handle successful response
      console.log('Login successful:', response);
      this.authtoken = response;
      },
      error: (error) => {
        console.error(error)
      }
    });
  }
}
