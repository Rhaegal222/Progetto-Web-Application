import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthToken, User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient, private router:Router) { }

  login(username: string, password: string){
    var user:User = {"username": username, "password": password};

    this.http.post<AuthToken>("http://localhost:4200/login", user, {withCredentials: true}).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
        this.router.navigate(["/dashboard"]);
      },
      error: (error) => {
        console.log(error);
      }
    });

   console.log("Provo a fare il login");
  }
}
