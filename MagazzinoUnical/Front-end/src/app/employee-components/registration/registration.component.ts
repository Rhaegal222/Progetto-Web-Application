import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  firstName: FormControl = new FormControl();
  lastName: FormControl = new FormControl();
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();
  
  passwordInputType: string = 'password';
  passwordVisible: boolean = false;

  togglePasswordVisibility(visible: boolean): void {
    this.passwordVisible = visible;
    this.passwordInputType = this.passwordVisible ? 'text' : 'password';
  }

  constructor(private authService: AuthService) { }

  register(){
    var name = this.firstName.value;
    var surname = this.lastName.value;
    var email = this.email.value;
    var username = this.email.value;
    var password = this.password.value;


    this.authService.register(name, surname, username, password, email);
  }

}
