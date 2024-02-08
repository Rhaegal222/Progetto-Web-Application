import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService{
  constructor(private http:HttpClient) { }

  // Get all products
  getProfile(): Observable<any[]>{
     return this.http.get<any[]>("http://localhost:8080/api/Profile");
  }
}
