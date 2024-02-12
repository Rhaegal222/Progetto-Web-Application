import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, timeout } from 'rxjs'
import { Request } from '../model/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  requests: Request[] = [];

  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>("http://localhost:8080/api/allRequests");
  }

  getRequest(idRequest: number) {
    let params = new HttpParams().set('idRequest', idRequest.toString());
    return this.http.get('http://localhost:8080/api/getRequest', { params });
  }

  getRequests(searchValue: string = '', status: string = ''): Observable<Request[]> {
    let params = new HttpParams();
    if (searchValue) {
      params = params.set('search', searchValue);
    }
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Request[]>('http://localhost:8080/api/requests', { params: params });
  }

  rejectRequest(id : number){
    if(id != undefined && id != null) {
      this.http.post('http://localhost:8080/api/changeStatusRequest?idEmployeeRequest='+id+'&newStatus=r', null).subscribe({
        next: () => {
          return;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  acceptRequest(id : number){
    console.log('sto accettando la richiesta con id: ' + id);
    if(id != undefined && id != null) {
      this.http.post('http://localhost:8080/api/changeStatusRequest?idEmployeeRequest='+id+'&newStatus=a', null).subscribe({
        next: () => {
          return;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  sendRequest(request: Request){
    console.log(request);
    this.http.post('http://localhost:8080/api/sendRequest', request).subscribe({
      next: () => {
        return;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateLocalRequests(request: Request){
    const requests = localStorage.getItem('requests')
    if(requests !== null && requests !== undefined){
      this.requests = JSON.parse(requests);
      this.requests.push(request);
      localStorage.removeItem('requests')
      localStorage.setItem('requests', JSON.stringify(this.requests))
      console.log('aggiornate local requests', localStorage.getItem('requests'))
    }
  }
}
