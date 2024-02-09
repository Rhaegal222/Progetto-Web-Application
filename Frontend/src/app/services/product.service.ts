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

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:8080/api/allItems");
  }

  // Get a product by id
  getProduct(idItem: number) {
    let params = new HttpParams().set('idItem', idItem.toString());
  
    return this.http.get('http://localhost:8080/api/getItem', { params });
  }
  

  // Get all products with search and filter
  getProducts(searchValue: string = '', category: string = ''): Observable<Product[]> {
    // Inizializza i parametri di query
    let params = new HttpParams();
    
    // Aggiungi il termine di ricerca ai parametri, se presente
    if (searchValue) {
      params = params.set('search', searchValue);
    }
    
    // Aggiungi la categoria ai parametri, se presente e diversa da "Tutte le categorie"
    if (category) {
      params = params.set('category', category);
    }
    
    // Effettua la richiesta GET con i parametri
    return this.http.get<Product[]>('http://localhost:8080/api/items', { params: params });
  }

  // POST
  // Edit a product
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

  // Add a product
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

  // Delete a product
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
