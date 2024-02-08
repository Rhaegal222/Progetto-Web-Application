import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Request } from '../model/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  // Get all requests
  getAllRequests(): Observable<Request[]> {
    return this.http.get<Request[]>("http://localhost:8080/api/allRequests");
  }

  // Get a request by id
  getRequest(idRequest: number) {
    let params = new HttpParams().set('idRequest', idRequest.toString());
  
    return this.http.get('http://localhost:8080/api/getRequest', { params });
  }

  // Get all requests with search and filter
  getRequests(searchValue: string = '', status: string = ''): Observable<Request[]> {
    // Inizializza i parametri di query
    let params = new HttpParams();
    
    // Aggiungi il termine di ricerca ai parametri, se presente
    if (searchValue) {
      params = params.set('search', searchValue);
    }
    
    // Aggiungi lo status ai parametri, se presente e diverso da "Tutti gli stati"
    if (status) {
      params = params.set('status', status);
    }
    
    // Effettua la richiesta GET con i parametri
    return this.http.get<Request[]>('http://localhost:8080/api/requests', { params: params });
  }

  editRequest(id : number, status : string): Observable<Request> {
    let params = new HttpParams().set('idRequest', id.toString()).set('status', status);
    return this.http.put<Request>("http://localhost:8080/api/editRequest", {params : params});
  }
}
