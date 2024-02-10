import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<any[]>{
     return this.http.get<any[]>("http://localhost:8080/api/allUsers");
  }

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

  banUser(email: String): Observable<any> {
    return this.http.post('http://localhost:8080/api/banUser', email);
  }

  unbanUser(email: String): Observable<any> {
    return this.http.post('http://localhost:8080/api/unbanUser', email);
  }

  promoteUser(email: String): Observable<any> {
    return this.http.post('http://localhost:8080/api/promoteUser', email);
  }

  demoteUser(email: String): Observable<any> {
    return this.http.post('http://localhost:8080/api/demoteUser', email);
  }

  refuseUser(email: String): Observable<any> {
    return this.http.post('http://localhost:8080/api/refuseUser', email);
  }

  acceptUser(email: String): Observable<any> {
    return this.http.post('http://localhost:8080/api/acceptUser', email);
  }


}
