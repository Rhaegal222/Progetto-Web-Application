import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: '../menus.component.css'
})
export class MenuAdminComponent {

  constructor(private authService: AuthService) {}

  authToken: string = '';
  isAuth: boolean = false;

  ngDoCheck() {
    if(this.authService.isAuthenticated() && this.authService.isAdmin()) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

}
