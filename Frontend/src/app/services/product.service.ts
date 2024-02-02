import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }

  // Get all products
  getProducts(){
    return this.http.get<Product[]>("http://localhost:8080/api/products", {withCredentials: true});
  }
}
