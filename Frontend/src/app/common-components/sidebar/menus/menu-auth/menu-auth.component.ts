import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-auth',
  templateUrl: './menu-auth.component.html',
  styleUrl: '../menus.component.css'
})
export class MenuAuthComponent {
   
  authToken: string = '';
  isAuth: boolean = false;

  constructor(private router: Router) {}

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

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      this.isAuth = false;
      this.router.navigate(['/login']);
    }
  }
}
