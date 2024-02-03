import { Component } from '@angular/core';
import { UserManagementService } from '../../services/user.service'; // Importa il servizio per ottenere i dati degli utenti
import { User } from '../../model/user';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent {


  

  constructor(private userService: UserManagementService) {}
  userList: User[] = []

  ngOnInit(): void {
     this.getUsers();
  }
  
  getUsers(){
    this.userService.getUsers().subscribe({
      next: (response: User[]) => { // Use User[] as the type for response
        return response;
      },
      error: (error: any) => {
        console.log('There was an error!', error);
        return []
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
