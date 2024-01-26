import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  password: string = '';
  passwordInputType: string = 'password';
  passwordVisible: boolean = false;

  togglePasswordVisibility(visible: boolean): void {
    this.passwordVisible = visible;
    this.passwordInputType = this.passwordVisible ? 'text' : 'password';
  }
}
