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

    this.http.post<AuthToken>("http://localhost:8080/api/login", user, {withCredentials: true}).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => {
        this.router.navigate(["/login"]);
      }
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  register(name:string, surname:string, email:string, password:string){
    var user:User = {"name": name, "surname": surname, "email": email, "password": password};
    this.http.post("http://localhost:8080/api/registration", user, {withCredentials: true}).subscribe({
      next: (response) => {
        this.router.navigate(["/login"]);
        console.log(response);
      },
      error: (error) => {
        this.router.navigate(["/location-map"]);
        console.log(error);
      }
    });
  }

  debug(){
    this.http.get("http://localhost:4200/api/debug").subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
