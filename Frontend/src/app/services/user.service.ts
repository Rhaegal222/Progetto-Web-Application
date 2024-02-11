import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from '../model/user';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor(private http:HttpClient, private errorService:ErrorService) { }

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

  banUser(user: User) {
    if(user.email != undefined && user.email != null && user.email != "") {
      this.http.post('http://localhost:8080/api/banUser?email='+user.email, null).subscribe({
        next: () => {
          return;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  unbanUser(user: User) {
    if(user.email != undefined && user.email != null && user.email != "") {
      this.http.post('http://localhost:8080/api/unbanUser?email='+user.email, null).subscribe({
        next: () => {
          return;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  promoteUser(user: User) {
    if(user.email != undefined && user.email != null && user.email != "") {
      this.http.post('http://localhost:8080/api/promoteUser?email='+user.email, null).subscribe({
        next: () => {
          return;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  demoteUser(user: User) {
    if(user.email != undefined && user.email != null && user.email != "") {
      this.http.post('http://localhost:8080/api/demoteUser?email='+user.email, null).subscribe({
        next: () => {
          return;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  refuseUser(user: User) {
    if(user.email != undefined && user.email != null && user.email != "") {
      this.http.post('http://localhost:8080/api/refuseUser?email='+user.email, null).subscribe({
        next: () => {
          return;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  acceptUser(user: User) {
    if(user.email != undefined && user.email != null){
      this.http.post('http://localhost:8080/api/acceptUser?email='+user.email, null).subscribe({
        next: () => {
          return;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }
}
