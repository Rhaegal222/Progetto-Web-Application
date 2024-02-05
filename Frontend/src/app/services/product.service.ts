import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }

  products: Product[] = [];

  // Get all products
  getAllProducts(){
    this.products = [];
    this.http.get<any>("http://localhost:8080/api/allItems").subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error(error)
      }
    });
    console.log(this.products);
    return this.products;
  }

  // Get a product by id
  getProductById(id: string){
    return this.http.get<any>("http://localhost:8080/api/item/"+id);
  }

  // Get all products with search and filter
  getProducts(fieldContent: string, category: string){
    this.products = [];
    this.http.get<any>("http://localhost:8080/api/items/"+fieldContent+"/"+category).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error(error)
      }
    });
    return this.products;
  }
}
