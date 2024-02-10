import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-employee',
  templateUrl: './menu-employee.component.html',
  styleUrl: '../menus.component.css'
})
export class MenuEmployeeComponent {

  authToken: string = '';
  isAuth: boolean = false;

  ngDoCheck() {
    if (typeof localStorage !== 'undefined') {
      this.authToken = localStorage.getItem('token') || '';
      if (localStorage.getItem('role') === 'employee' ||
        localStorage.getItem('role') === 'admin' ||
        localStorage.getItem('role') === 'storekeeper') {
        this.isAuth = true;
      } else {
      this.isAuth = false;
      }
    }
  }

}
