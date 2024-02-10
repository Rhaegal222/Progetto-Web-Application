import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-menu-employee',
  templateUrl: './menu-employee.component.html',
  styleUrl: '../menus.component.css'
})
export class MenuEmployeeComponent {

  constructor(private authService: AuthService) {}

  authToken: string = this.authService.getToken();
  isAuth: boolean = false;

  ngDoCheck() {
    if(this.authService.isAuthenticated()) {
      if(this.authService.isEmployee() || this.authService.isAdmin() || this.authService.isStorekeeper()) {
        this.isAuth = true;
      } else {
      this.isAuth = false;
      }
    } else {
      this.isAuth = false;
    }
  }

}
