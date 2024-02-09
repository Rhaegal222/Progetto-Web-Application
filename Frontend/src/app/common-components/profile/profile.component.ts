import { Component } from '@angular/core';
import { User } from '../../model/user';
import { ErrorService } from '../../services/error.service';
import { AuthService } from '../../services/auth.service';
import { UserManagementService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    '../../styles/container.css',
    '../../styles/content.css',
    '../../styles/buttons.css',
    '../../styles/form.css'
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
  users: User[] = [];

  ngAfterViewInit() {
    this.email = this.authService.getUserEmail();

    this.userService.getUsers(this.email, '').subscribe({
      next: (data) => {
        this.users = data;
        this.firstName = this.users[0].name || '';
        this.lastName = this.users[0].surname || '';
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }
}
