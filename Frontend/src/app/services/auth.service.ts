import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthToken, User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient, private router:Router) { }

  login(email: string, password: string){
    var user:User = {"email": email, "password": password};
    return this.http.post<AuthToken>("http://localhost:8080/api/login", user, {withCredentials: true})
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
