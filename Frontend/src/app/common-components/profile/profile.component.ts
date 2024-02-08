import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service'; 
import { User } from '../../model/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    '../../styles/container.css',
    '../../styles/buttons.css'
  ]
})
export class ProfileComponent {

  constructor(private profileService : ProfileService) {}
  

  ngOnInit(): void {
     this.getUsers();
  }
  
  getUsers(){
    this.profileService.getProfile().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log('There was an error!', error);
      }
    });
  }
  salva(user: any) {
    console.log('modifiche salvate:', user);
  }

  annulla(user: any) {
    console.log('modifiche annullate:', user); 
  }

}
