import { Component } from '@angular/core';
import { UserManagementService } from '../../services/user.service'; // Importa il servizio per ottenere i dati degli utenti
import { User } from '../../model/user';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: [
    './user-management.component.css',
    '../../styles/container.css',
    '../../styles/buttons.css'
  ]
})
export class UserManagementComponent {

  constructor(private userService: UserManagementService) {}
  
  userList: User[] = [];

  ngOnInit(): void {
     this.getUsers();
  }
  
  getUsers(){
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.userList = data;
        console.log(data);
      },
      error: (error: any) => {
        console.log('There was an error!', error);
      }
    });
  }
  promoteUser(user: any) {
    console.log('Utente promosso:', user);
  }

  banUser(user: any) {
    console.log('Utente bannato:', user); 
  }
}
