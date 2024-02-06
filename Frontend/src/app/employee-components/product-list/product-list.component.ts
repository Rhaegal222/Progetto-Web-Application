import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { Observable } from 'rxjs';
import { get } from 'http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [
    './product-list.component.css',
    '../../styles/buttons.css',
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

  onSearch(eventData: MyEventData) {
    // Se la barra di ricerca è vuota e la categoria è "Tutte le categorie", chiamare getAllProducts.
    // Altrimenti, chiamare getProducts con i valori correnti di searchValue e category.
    console.log(eventData);
    if (eventData.searchValue === "" && eventData.category === "all") {
      this.getAllProducts();
    } else {
      this.productService.getProducts(eventData.searchValue, eventData.category).subscribe({
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
        this.products = data;
        console.log(this.products);
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

  isAnImage(image : string): boolean {
    if(image == null || image == "" || !image.startsWith('data:image/')){
      return false;
    }
    return true;
  }
}

export interface MyEventData {
  searchValue: string;
  category: string;
}