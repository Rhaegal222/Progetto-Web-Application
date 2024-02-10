import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient, 
    private router:Router,
    private errorService: ErrorService) { }

  // Stampa tutti i payload del token
  printToken() {
    if (typeof localStorage !== 'undefined') {
      if(localStorage.getItem('token'))
        console.log('token:', localStorage.getItem('token'));
      if(localStorage.getItem('items'))
        console.log('items:', localStorage.getItem('items'));
      if(localStorage.getItem('requests'))
        console.log('requests:', localStorage.getItem('requests'));
      }
    }

  // Prendi l'email dell'utente autenticato
  getUserEmail(): string {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  // Prendi il nome dell'utente autenticato
  getUserFirstName(): string {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.name;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  // Prendi il cognome dell'utente autenticato
  getUserLastName(): string {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.surname;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  // Verifica il ruolo dell'utente autenticato
  isAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 'a';
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isEmployee(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 'e';
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isStorekeeper(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 's';
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token') ? true : false;
    } else {
      return false;
    }
  }

  getToken(): string {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token') || '';
    } else {
      return '';
    }
  }

  loginErrorHandling(error: any){
    if (error.status == 401) {
      console.error('Login failed:', error.error.message);
    } else {
      console.error(error);
    }
  }

  trylogin(email: string, password: string): Observable<any> {
    var user:User = {"email": email, "password": password};
    return this.http.post("http://localhost:8080/api/login", user, {withCredentials: true});  
  }
  

  login(email: string, password: string) {
    this.trylogin(email, password).subscribe({
      next: (response) => {
        if (response.accessToken != '') {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('items', JSON.stringify(response.items));
            localStorage.setItem('requests', JSON.stringify(response.requests));
          }
        }
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.loginErrorHandling(error);
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('token');
        }
      }
    });
  }

  tryRegister(name:string, surname:string, email:string, password:string): Observable<any>{
    var user:User = {"name": name, "surname": surname, "email": email, "password": password};
    return this.http.post("http://localhost:8080/api/registration", user, {withCredentials: true});
  }

  register(name:string, surname:string, email:string, password:string){
    this.tryRegister(name, surname, email, password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }

  logout(){
    if (typeof localStorage !== 'undefined')
    localStorage.removeItem("token");
  }
}
