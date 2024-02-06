import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:8080/api/allItems");
  }

  // Get a product by id
  getProductById(id: string){
    return this.http.get<any>("http://localhost:8080/api/item/"+id);
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


    console.log('Parametri', params.get('search'), params.get('category'));
    
    // Effettua la richiesta GET con i parametri
    return this.http.get<Product[]>('http://localhost:8080/api/items', { params: params });
  }


}
