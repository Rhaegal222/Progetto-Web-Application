import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { UserManagementService } from '../../../services/user.service'; // Servizio per ottenere i dati degli utenti
import { ErrorService } from '../../../services/error.service'; // Servizio per gestire gli errori
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: [
    './user-management.component.css',
    '../../../styles/grid.css',
    '../../styles/list.css',
    '../../styles/buttons.css',
  ]
})
export class UserManagementComponent {

  constructor(
    private userService: UserManagementService,
    private errorService: ErrorService
    ) {}

  users: User[] = [];
  selectedUser: User | undefined;
  length: number = 0;

  userDetailsWindow: boolean = false;

  ngOnInit(): void {
      this.observeUserListLenght();
      this.getAllUsers();
  }

  observeUserListLenght(){
    const observable = new Observable((observer) => {
      observer.next(this.users.length);
    });

    observable.subscribe((length: unknown) => {
      if (typeof length === 'number') {
        const anyLength: any = length;
        this.length = anyLength;
      }
    });
  }

  searchValue: string = '';
  role: string = 'all';

  onSearch(eventData: onSearchEventData) {
    this.searchValue = eventData.searchValue;
    this.role = eventData.element;
    if (this.searchValue === "" && this.role === "all") {
      this.getAllUsers();
    } else {
      this.userService.getUsers(this.searchValue, this.role).subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error: any) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  OnOpenUserDetails(user: User) {
    this.selectedUser = user;
    this.userDetailsWindow = true;
  }

  OnCloseUserDetails() {
    this.userDetailsWindow = false;
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error: any) => {
        this.errorService.handleError(error);
      }
    });
  }

  onPromote(user: User) {
    this.userService.promoteUser(user);
    window.location.reload();
    //this.getAllUsers();
  }

  onLock(user: User) {
    this.userService.banUser(user);
    window.location.reload();
    //this.getAllUsers();
  }

  onUnlock(user: User) {
    this.userService.unbanUser(user);
    window.location.reload();
    //this.getAllUsers();
  }

  onAccept(user: User) {
    this.userService.acceptUser(user);
    window.location.reload();
    //this.getAllUsers();
  }

  onReject(user: User) {
    this.userService.refuseUser(user);
    window.location.reload();
    //this.getAllUsers();
  }
}

export interface onSearchEventData {
  searchValue: string;
  element: string;
}
