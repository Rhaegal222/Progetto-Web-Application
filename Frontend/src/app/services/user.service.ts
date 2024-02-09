import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(private http:HttpClient) { }

  // Get all products
  getAllUsers(): Observable<any[]>{
     return this.http.get<any[]>("http://localhost:8080/api/allUsers");
  }

  // Get users by search value and role
  getUsers(searchValue: string = '', role: string = ''): Observable<any[]>{
    let params = new HttpParams();
    if (searchValue) {
      params = params.set('search', searchValue);
    }
    if (role) {
      params = params.set('role', role);
    }
    return this.http.get<User[]>('http://localhost:8080/api/users', { params: params });
  }


}
