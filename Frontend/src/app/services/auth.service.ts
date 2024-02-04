import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

  login(email: string, password: string): Observable<any> {
    var user:User = {"email": email, "password": password};
    return this.http.post("http://localhost:8080/api/login", user, {withCredentials: true});  
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  register(name:string, surname:string, email:string, password:string){
    var user:User = {"name": name, "surname": surname, "email": email, "password": password};
    return this.http.post("http://localhost:8080/api/registration", user, {withCredentials: true});
  }
}
