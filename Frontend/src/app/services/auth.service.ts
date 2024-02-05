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
