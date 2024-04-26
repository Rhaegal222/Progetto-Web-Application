import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-menu-storekeeper',
  templateUrl: './menu-storekeeper.component.html',
  styleUrl: '../menus.component.css'
})
export class MenuStorekeeperComponent {
  isAuth: boolean = false;

  constructor(private authService: AuthService) {}

  ngDoCheck() {
    if(this.authService.isAuthenticated() && (this.authService.isStorekeeper() || this.authService.isAdmin())) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

}
