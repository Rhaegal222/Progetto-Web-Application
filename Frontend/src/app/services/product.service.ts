import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }

  // Get all products
  getProducts(): Observable<any>{
     return this.http.get<any>("http://localhost:8080/api/allItems");
  }
}
