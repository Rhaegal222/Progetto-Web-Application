import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrl: '../menus.component.css'
})
export class MenuAdminComponent {

  authToken: string = '';
  isAuth: boolean = false;

  constructor() {}

  ngDoCheck() {
    if (typeof localStorage !== 'undefined') {
      this.authToken = localStorage.getItem('token') || '';
      if (this.authToken) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    } else {
      this.isAuth = false;
    }
  }
  
}
