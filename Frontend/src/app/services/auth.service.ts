import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  // Verifica il ruolo dell'utente autenticato
  isAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log(payload.role);
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
        console.log(payload.role);
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
        console.log(payload.role);
        return payload.role === 's';
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  
  // Verifica se l'utente è autenticato
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
      console.error('Error:', error.error.message);
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
            this.router.navigate(['/profile']);
          }
        }
      },
      error: (error) => {
        this.loginErrorHandling(error);
      }
    });
  }

  tryRegister(name:string, surname:string, email:string, password:string): Observable<any>{
    var user:User = {"name": name, "surname": surname, "email": email, "password": password};
    return this.http.post("http://localhost:8080/api/registration", user, {withCredentials: true});
  }

  register(name:string, surname:string, email:string, password:string){
    this.tryRegister(name, surname, email, password).subscribe({
      next: (response) => {
        console.log('Response:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error.error.message);
      }
    });
  }

  logout(){
    localStorage.removeItem("token");
  }
}
