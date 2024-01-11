import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Assicurati di avere un AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  login(): void {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        success => {
          // Logica per quando il login ha successo, ad esempio reindirizzare l'utente
        },
        error => {
          this.errorMessage = 'Login fallito. Si prega di controllare le credenziali.';
        }
      );
    } else {
      this.errorMessage = 'Inserire username e password.';
    }
  }
}
