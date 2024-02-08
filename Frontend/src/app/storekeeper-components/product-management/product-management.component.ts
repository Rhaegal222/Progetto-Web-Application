import { Component, Output, EventEmitter, Input } from '@angular/core';
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
  selectedProduct: Product | undefined;
  length: number = 0;

  addProductWindow: boolean = false;
  editProductWindow: boolean = false;

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

  searchValue: string = '';
  category: string = 'all';

  onSearch(eventData: onSearchEventData) {
    // Se la barra di ricerca è vuota e la categoria è "Tutte le categorie", chiamare getAllProducts.
    // Altrimenti, chiamare getProducts con i valori correnti di searchValue e category.
    this.searchValue = eventData.searchValue;
    this.category = eventData.element;
    if (this.searchValue === "" && this.category === "all") {
      this.getAllProducts();
    } else {
      this.productService.getProducts(this.searchValue, this.category).subscribe({
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
  
  // Open the add product window
  onOpen(evenData: addProductEventData) {
    this.addProductWindow = evenData.addProductWindow;
  }

  // Close the add product window or the edit product window
  onClose(eventData: addProductEventData | editProductEventData) {
    if ('addProductWindow' in eventData) {
      this.addProductWindow = eventData.addProductWindow;
    } else {
      this.editProductWindow = eventData.editProductWindow;
    }
    this.getAllProducts();
  }

  @Output() editEvent = new EventEmitter<Product>();

  // Apre la finestra di modifica del prodotto e invia il prodotto selezionato
  onEdit(product: Product) {
    this.editProductWindow = true;
    this.editEvent.emit(product);
    this.selectedProduct = product;
  }

  onDelete(product: Product) {
    this.selectedProduct = product;
    if(this.selectedProduct != undefined){
      this.productService.deleteProduct(this.selectedProduct)
      this.getAllProducts();
    }
  }

  // Get all products
  getAllProducts(){
    console.log("Getting all products");
    setTimeout(() => {
      this.productService.getAllProducts().subscribe({
        next: (data) => {
          this.products = data;
          console.log(this.products);
        },
        error: (error) => {
          console.error(error)
        }
      });
    }, 500);
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
  element: string;
}

export interface addProductEventData {
  addProductWindow: boolean;
}

export interface editProductEventData {
  editProductWindow: boolean;
}