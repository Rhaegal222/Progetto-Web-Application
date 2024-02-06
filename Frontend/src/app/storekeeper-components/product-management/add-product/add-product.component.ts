import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [
    './add-product.component.css',
    '../../../styles/container.css',
    '../../../styles/content.css',
    '../../../styles/buttons.css',
    '../../../styles/form.css'
  ]
})

export class AddProductComponent {

  constructor(private productService: ProductService) { }

  addProductWindow: boolean = true;

  name: string = '';
  type: string = '';
  description: string = '';
  location: string = '';
  image: string = '';
  length: number = 0;
  assigned: boolean = false;
  assigned_user: string = '';

  // Osserva i click e se non sono all'interno del componente, chiudilo
  ngOnInit(): void {
    this.initObservable();
    window.addEventListener('keydown', (event) => {
      const modal = document.getElementById('addProductWindow');
      if (modal != null) {
        if (event.key === 'Escape') {
          this.onCloseEvent();
        }
      }
    });
  }

  // create an observable that emits the length of the products list
  initObservable(){
    const observable = new Observable((observer) => {
      observer.next(this.image === undefined ? 0 : this.image.length);
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

  addImage(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        this.image = base64String;
        // Qui puoi fare ulteriori operazioni con la stringa base64
      };
  
      reader.onerror = (error) => {
        console.error('Errore nella lettura del file:', error);
      };
  
      reader.readAsDataURL(file);
    }
  }

  onSave(){
    // Creare un oggetto con i dati del prodotto
    const product = {
      name: this.name,
      type: this.type,
      location: this.location,
      description: this.description,
      assigned_user: this.assigned_user,
      image: this.image
    };

    this.productService.addProduct(product);
  }
  
  @Output() onEvent = new EventEmitter<addProductEventData>();

  onCloseEvent() {
    const eventData: addProductEventData = {
      addProductWindow: false,
    };
      this.onEvent.emit(eventData);
  }
}

export interface addProductEventData {
  addProductWindow: boolean;
}
