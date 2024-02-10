import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';


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

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private errorService: ErrorService) { }

  products: Product[] = [];
  selectedProduct: Product | undefined;
  length: number = 0;

  addProductWindow: boolean = false;
  editProductWindow: boolean = false;

  ngOnInit(): void {
    this.observeProductListLenght();
    this.productService.checkIfStoreWorks();
    this.getAllProducts();
  }

  observeProductListLenght(){
    const observable = new Observable((observer) => {
      observer.next(this.products.length);
    });

    observable.subscribe((length: unknown) => {
      if (typeof length === 'number') {
        const anyLength: any = length;
        this.length = anyLength;
      }
    });
  }

  searchValue: string = '';
  category: string = 'all';

  onSearch(eventData: onSearchEventData) {
    // Se la barra di ricerca è vuota e la categoria è "Tutte le categorie", chiamare getAllProducts
    // Altrimenti, chiamare getProducts con i valori correnti di searchValue e category
    this.searchValue = eventData.searchValue;
    this.category = eventData.element;
    if (this.searchValue === "" && this.category === "all") {
      this.getAllProducts();
    } else {
      this.productService.getProducts(this.searchValue, this.category).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }
  
  onOpen(evenData: addProductEventData) {
    this.addProductWindow = evenData.addProductWindow;
  }

  onClose(eventData: addProductEventData | editProductEventData) {
    if ('addProductWindow' in eventData) {
      this.addProductWindow = eventData.addProductWindow;
    } else {
      this.editProductWindow = eventData.editProductWindow;
    }
    this.getAllProducts();
  }

  @Output() editEvent = new EventEmitter<Product>();

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

  onOpenDetails(product: Product){
    this.selectedProduct = product;
    localStorage.setItem('selectedProduct', JSON.stringify(this.selectedProduct));
    this.router.navigate(['/product-detail']);    
  }

  getAllProducts(){
    console.log("Getting all products");
    setTimeout(() => {
      this.productService.getAllProducts().subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }, 500);
  }

  isAnImage(image : string): boolean {
    if(image == null || image == "" || !image.startsWith('http')){
      return false;
    }
    return true;
  }

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