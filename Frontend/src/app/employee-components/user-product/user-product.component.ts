import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { AuthService } from '../../services/auth.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: [ 
    './user-product.component.css',
    '../../styles/grid.css',
    '../../styles/list.css',
    '../../styles/buttons.css',
  ]
})
export class UserProductComponent {

  constructor(
    private productService: ProductService, private errorService: ErrorService) { }

  products: Product[] = [];
  selectedProduct: Product | undefined;
  length: number = 0;

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
        },
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
    }
  }

  getAllProducts() {
    // Ottieni la lista di prodotti dell'utente da localStorage
    const items = localStorage.getItem('items');
    if (items !== null && items !== undefined) {
      this.products = JSON.parse(items);
    }
  }

  // Salva il prodotto selezionato in localStorage e reindirizza l'utente alla pagina del dettaglio del prodotto
  openDetail(product: Product) {
    //Riumuovo se c'é qualche prodotto in localStorage
    localStorage.removeItem('product');

    // Salva il prodotto selezionato in localStorage
    localStorage.setItem('product', JSON.stringify(product));
    window.location.href = '/product-detail';
  }

  isAnImage(image : string): boolean {
    if(image == null || image == "" || !image.startsWith('http')){
      return false;
    }
    return true;
  }
}

interface onSearchEventData {
  searchValue: string;
  element: string;
}