import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-storekeeper',
  templateUrl: './menu-storekeeper.component.html',
  styleUrl: '../menus.component.css'
})
export class MenuStorekeeperComponent {

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
