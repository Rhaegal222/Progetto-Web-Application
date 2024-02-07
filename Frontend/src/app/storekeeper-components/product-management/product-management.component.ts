import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: [
    './product-management.component.css',
    '../../styles/grid.css',
    '../../styles/list.css',
    '../../styles/buttons.css',
  ]
})

export class ProductManagementComponent {

  constructor(private productService: ProductService) { }

  products: Product[] = [];
  length: number = 0;

  addProductWindow: boolean = false;

  ngOnInit(): void {
    this.observeProductListLenght();
    this.getAllProducts();
  }

  // create an observable that emits the length of the products list
  observeProductListLenght(){
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
    // Se la barra di ricerca è vuota e la categoria è "Tutte le categorie", chiamare getAllProducts.
    // Altrimenti, chiamare getProducts con i valori correnti di searchValue e category.
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

  onAddProduct(eventData: addProductEventData) {
    this.addProductWindow = eventData.addProductWindow;
    this.getAllProducts();
  }

  onClose(eventData: addProductEventData) {
    this.addProductWindow = eventData.addProductWindow;
    this.getAllProducts();
  }

  onOpen(eventData: addProductEventData) {
    this.addProductWindow = eventData.addProductWindow;
  }

  // Get all products
  getAllProducts(){
    console.log("Getting all products");
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

  // Show the add product window
  showAddProductWindow(){
    this.addProductWindow = true;
  }
}


export interface onSearchEventData {
  searchValue: string;
  category: string;
}

export interface addProductEventData {
  addProductWindow: boolean;
}