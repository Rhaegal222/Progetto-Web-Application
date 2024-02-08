import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UserManagementService } from '../../services/user.service'; // Importa il servizio per ottenere i dati degli utenti
import { User } from '../../model/user';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: [
    './user-management.component.css',
    '../../styles/grid.css',
    '../../styles/list.css',
    '../../styles/buttons.css',
  ]
})
export class UserManagementComponent {

  constructor(private userService: UserManagementService) {}
  
  users: User[] = [];
  selectedUser: User | undefined;
  length: number = 0;
  
  userDetailsWindow: boolean = false;

  ngOnInit(): void {
     this.observeUserListLenght();
      this.getUsers();
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

  /*
  onSearch(eventData: onSearchEventData) {
    this.searchValue = eventData.searchValue;
    this.role = eventData.role;
    if (this.searchValue === "" && this.role === "all") {
      this.getUsers();
    } else {
      this.userService.getUsers(this.searchValue, this.role).subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error: any) => {
          console.log('There was an error!', error);
        }
      });
    }
  }
  */

  OnOpenUserDetails(user: User) {
    this.selectedUser = user;
    this.userDetailsWindow = true;
  }

  OnCloseUserDetails() {
    this.userDetailsWindow = false;
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error: any) => {
        console.log('There was an error!', error);
      }
    });
  }
  onPromote(user: User) {
    console.log('Utente promosso:', user);
  }

  onLock(user: User) {
    console.log('Utente bannato:', user); 
  }
  onUnlock(user: User) {
    console.log('Utente bannato:', user); 
  }
}
