import { Component } from '@angular/core';
import { User } from '../../model/user';
import { ErrorService } from '../../services/error.service';
import { AuthService } from '../../services/auth.service';
import { UserManagementService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.css',
    '../../styles/form.css',
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
        this.role = this.users[0].role || '';
        if (this.users[0].banned === true) {
          this.role = 'Utente bannato';
        } else if (this.role === '' || this.role === null) {
          this.role = 'In attesa di approvazione';
        }
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }
}
