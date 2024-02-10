import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Product } from '../model/product';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient, private errorService:ErrorService) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:8080/api/allItems");
  }

  getProduct(idItem: number) {
    let params = new HttpParams().set('idItem', idItem.toString());
  
    return this.http.get('http://localhost:8080/api/getItem', { params });
  }
  

  getProducts(searchValue: string = '', category: string = ''): Observable<Product[]> {
    let params = new HttpParams();
   
    if (searchValue) {
      params = params.set('search', searchValue);
    }

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<Product[]>('http://localhost:8080/api/items', { params: params });
  }

  editProduct(product: Product) {
    this.http.post("http://localhost:8080/api/modifyItem", product).subscribe({
      next: () => {
        return;
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }

  addProduct(product: Product) {
    this.http.post("http://localhost:8080/api/insertItem", product).subscribe({
      next: () => {
        return;
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });
  }

  deleteProduct(product: Product) {
    if(product.idItem != undefined && product.idItem != null){
      const params = { params: new HttpParams().set('idItem', product.idItem.toString()) };
      this.http.post('http://localhost:8080/api/deleteItem', null, params).subscribe({
        next: () => {
          return;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  checkIfStoreWorks() {
    let name = "Magazzino";
    let surname = "Unical";
    let email = "magazzino.unical@libero.it";
    let password = "M@gazzino1";

    let user = { name, surname, email, password };

    this.http.post("http://localhost:8080/api/registration", user, { withCredentials: true }).subscribe({
      next: () => {
        return;
      },
      error: (error) => {
        this.errorService.handleError(error);
      }
    });

        
  }
}
