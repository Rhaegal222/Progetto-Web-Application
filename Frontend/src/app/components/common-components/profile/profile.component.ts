import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { ErrorService } from '../../../services/error.service';
import { AuthService } from '../../../services/auth.service';
import { UserManagementService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.css',
    '../../../styles/form.css',
    '../../styles/container.css',
    '../../styles/content.css',
    '../../styles/buttons.css'
  ]
})
export class ProfileComponent {

  constructor(
    private errorService: ErrorService,
    private authService: AuthService,
    private userService: UserManagementService
    ) {}

  firstName : string = '';
  lastName : string = '';
  email : string = '';
  role : string = '';
  users: User[] = [];

  ngAfterViewInit() {
    this.email = this.authService.getUserEmail();

    this.userService.getUsers(this.email, '').subscribe({
      next: (data) => {
        this.users = data;
        this.firstName = this.users[0].name || '';
        this.lastName = this.users[0].surname || '';

        if (this.users[0].banned === true) {
          this.users[0].role = 'Utente bannato';
        } else if ( this.users[0].role === '' ||  this.users[0].role === null) {
          this.role = 'In attesa di approvazione';
        } else if (this.users[0].role === 'a') {
          this.role = 'Amministratore';
        } else if (this.users[0].role === 'e') {
          this.role = 'Dipendente';
        } else if (this.users[0].role === 's') {
          this.role = 'Magazziniere';
        }
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }
}
