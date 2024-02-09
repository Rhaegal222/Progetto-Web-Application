import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [
    './product-list.component.css',
    '../../styles/grid.css',
    '../../styles/list.css',
    '../../styles/buttons.css'
  ]
})
export class ProductListComponent{
  
  constructor(private productService: ProductService) { }

  products: Product[] = [];
  length: number = 0;

  ngOnInit(): void {
    this.initObservable();
    this.getAllProducts();
  }

  // create an observable that emits the length of the products list
  initObservable(){
    const observable = new Observable((observer) => {
      observer.next(this.products.length);
    });

    // Iscriversi all'observable
    observable.subscribe((length: unknown) => {
      if (typeof length === 'number') {
        const anyLength: any = length;
        // Ora è possibile utilizzare anyLength come valore di tipo any
        this.length = anyLength;
      }
    });
  }

  onSearch(eventData: onSearchEventData) {
    console.log(eventData);
    // Se la barra di ricerca è vuota e la categoria è "Tutte le categorie", chiamare getAllProducts.
    // Altrimenti, chiamare getProducts con i valori correnti di searchValue e category.
    if (eventData.searchValue === "" && eventData.element === "all") {
      this.getAllProducts();
    } else {
      this.productService.getProducts(eventData.searchValue, eventData.element).subscribe({
        next: (data) => {
          this.products = data;
          console.log(this.products);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }  
  
  // Get all products
  getAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = this.removeAssignedProducts(data);
        console.log(this.products);
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

  // Rimuove dalla lista dei prodotti quelli che hanno l'attributo assignedUser di tipo utente e la restituisce
  removeAssignedProducts(products: Product[]): Product[] {
    return products.filter(product => product.assignedUser == null);
  }

  isAnImage(image : string): boolean {
    if(image == null || image == "" || !image.startsWith('data:image/')){
      return false;
    }
    return true;
  }

  openDetail(product: Product) {
  }
}

export interface onSearchEventData {
  searchValue: string;
  element: string;
}