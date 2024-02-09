import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service'; 
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    '../../styles/container.css',
    '../../styles/buttons.css'
  ]
})
export class ProfileComponent {

  constructor(
    private profileService : ProfileService,
    private errorService: ErrorService
    ) {}
  

  ngOnInit(): void {
     this.getUsers();
  }
  
  getUsers(){
    this.profileService.getProfile();
  }
  salva(user: any) {
    console.log('modifiche salvate:', user);
  }

  annulla(user: any) {
    console.log('modifiche annullate:', user); 
  }

}
