import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(result => {
      if (result.success) {
        // gestire la logica di navigazione in caso di successo
      } else {
        this.errorMessage = 'Login fallito';
      }
    }, error => {
      this.errorMessage = 'Si è verificato un errore';
    });
  }
}
