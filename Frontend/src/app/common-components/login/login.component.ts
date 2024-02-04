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
    '../../styles/form.css'
  ],
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // ripeti fino a quando localStorage non è disponibile
    setTimeout(() => {
      if (typeof localStorage !== 'undefined') {
        console.log('Local storage available');
        console.log('Token:', localStorage.getItem('token'));
      } else {
        console.error('Local storage not available');
      }
    }, 1000);

    //this.test();
  }
  
  email = new FormControl();
  password = new FormControl();

  authtoken: AuthToken = {accessToken: ''};  

  passwordInputType: string = 'password';
  passwordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordInputType = this.passwordVisible ? 'text' : 'password';    
  }
  
  test(){
    var email = 'john_doe@gmail.com';
    var password = 'P@ssw0rd1';

    if (this.authtoken.accessToken == '')  {
      this.authService.login(email, password).subscribe({
        next: (response) => {
        this.authtoken = response;
          if(this.authtoken.accessToken != ''){
            if (typeof localStorage !== 'undefined' ) {
              console.log('Local storage available');
              localStorage.setItem('token', this.authtoken.accessToken);
              this.router.navigate(['/product-list']);
              console.log('Response:', response);
            } else {
              console.error('Local storage not available');
            }
          }
        },
        error: (error) => {
          if (error.status == 401) {
            console.error('Login failed:', error.error.message);
          } else {
            console.error('An error occurred:', error.error.message);
          }
        }
      });
    }
  }

  login(){
    var email = this.email.value;
    var password = this.password.value;

    if (this.authtoken.accessToken == '')  {
      this.authService.login(email, password).subscribe({
        next: (response) => {
        this.authtoken = response;
          if(this.authtoken.accessToken != ''){
            if (typeof localStorage !== 'undefined' ) {
              console.log('Local storage available');
              localStorage.setItem('token', this.authtoken.accessToken);
              this.router.navigate(['/product-list']);
              console.log('Response:', response);
            } else {
              console.error('Local storage not available');
            }
          }
        },
        error: (error) => {
          if (error.status == 401) {
            console.error('Login failed:', error.error.message);
          } else {
            console.error('An error occurred:', error.error.message);
          }
        }
      });
    }
  }
}
