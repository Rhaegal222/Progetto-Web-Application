import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { AnimationsService } from '../../../services/animations.service';
import { Product } from '../../../model/product';
import { ImgbbService } from '../../../services/imgbb.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: [
    './edit-product.component.css',
    '../../../styles/container.css',
    '../../../styles/content.css',
    '../../../styles/buttons.css',
    '../../../styles/form.css'
  ]
})
export class EditProductComponent {

  constructor(
    private productService: ProductService, 
    private animationsService: AnimationsService, 
    private imgbbService: ImgbbService,
    private errorService: ErrorService) { }

  editProductWindow: boolean = true;

  @Input() product: Product | undefined;

  idItem: number = 0;  
  name: string = '';
  type: string = '';
  description: string = '';
  location: string = '';
  image: string = '';
  length: number = 0;
  assigned: boolean = false;
  assigned_user: string = '';

  ngOnInit(): void {

    this.animationsService.initResizeObserver('edit-product');
    if (this.product && this.product.idItem) {
      this.productService.getProduct(this.product.idItem).subscribe({
        error: (error) => {
          this.errorService.handleError(error);
        }
      });
      
      this.idItem = this.product.idItem;
      this.name = this.product.name || '';
      this.type = this.product.type || '';
      this.description = this.product.description || '';
      if (this.product.location) {
        this.location = this.product.location;
      }
      this.image = this.product.image || '';
      this.length = this.image ? this.image.length : 0;

      if (this.product.assignedUser && typeof this.product.assignedUser === 'object')
        this.assigned_user = this.product.assignedUser.email;
      else 
        this.assigned_user = '';
      
      if (this.assigned_user && this.assigned_user.length > 0)
        this.assigned = true;
    }
  }

  // Assegna i valori del prodotto ai campi di input
  ngAfterView() {
    if (this.product) {
      this.name = this.product.name || '';
      this.type = this.product.type || '';
      this.description = this.product.description || '';
      if (this.product.location) {
        this.location = this.product.location;
      }
      this.image = this.product.image || '';
      this.length = this.image ? this.image.length : 0;
      
      if (this.product.assignedUser && typeof this.product.assignedUser === 'object')
        this.assigned_user = this.product.assignedUser.email;
      else 
        this.assigned_user = '';

      if (this.assigned_user && this.assigned_user.length > 0)
        this.assigned = true;
    }
  }
  
  categories = [
    {key: 'laptop', name: 'Laptop', visible: true},
    {key: 'software', name: 'Software', visible: true},
    {key: 'hardware', name: 'Hardware', visible: true},
    {key: 'accessories', name: 'Accessori', visible: true},
    {key: 'printer', name: 'Stampanti', visible: true},
    {key: 'other', name: 'Altro', visible: true},
  ];
  filteredCategories : data[] = this.categories;
  showCategoriesBox = false;

  locations = [
    {key: '22B', name: '22B', visible: true},
    {key: '25B', name: 'Centro residenziale', visible: true},
    {key: '7-11B', name: '7-11B', visible: true},
    {key: 'centro_congressi', name: 'Centro congressi', visible: true},
    {key: 'welcome_office', name: 'Welcome office', visible: true},
  ];
  filteredLocations : data[] = this.locations;
  showLocationsBox = false;

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
  
  filterCategories(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredCategories = this.categories.filter(
      data => data.visible && data.name.toLowerCase().includes(query)
    );
    this.showCategoriesBox = true;
  }

  filterLocations(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredLocations = this.locations.filter(
      location => location.visible && location.name.toLowerCase().includes(query)
    );
    this.showLocationsBox = true;
  }  

  selectCategory(suggestion: data) {
    this.type = suggestion.name; // Aggiorna il modello con il valore selezionato
    this.showCategoriesBox = false; // Nasconde il box dei suggerimenti
  }

  selectLocation(suggestion: data) {
    this.location = suggestion.name; // Aggiorna il modello con il valore selezionato
    this.showLocationsBox = false; // Nasconde il box dei suggerimenti
  }

  hideSuggestions(event: FocusEvent) {
    setTimeout(() => {
      // Cast the related target to an HTMLElement to check its id
      const relatedTarget = event.relatedTarget as HTMLElement;
      // Check if the related target is not one of our suggestion boxes or inputs
      if (relatedTarget && relatedTarget.id !== 'category' && relatedTarget.id !== 'location') {
        this.showCategoriesBox = false;
        this.showLocationsBox = false;
      } else if (!relatedTarget) { // If there is no related target, close both suggestion boxes
        this.showCategoriesBox = false;
        this.showLocationsBox = false;
      }
    }, 150); // Ritarda la chiusura dei suggerimenti di 150ms
  }
  
  showSuggestions(inputId: string) {
    if (inputId === 'category' && this.filteredCategories.length > 0) {
      this.showCategoriesBox = true;
    } else if (inputId === 'location' && this.filteredLocations.length > 0) {
      this.showLocationsBox = true;
    }
  }

  addImage(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const file = input.files[0];
      this.imgbbService.upload(file).subscribe({
        next: (response: any) => {
          this.image=response.data.url
          //alert(response.data.url)
        }
      })
    }
  }

  /* 
    addImage(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        this.image = base64String;
      };
  
      reader.onerror = (error) => {
        console.error('Errore nella lettura del file:', error);
      };
  
      reader.readAsDataURL(file);
    }
  }
  */

  removeImage(): void {
    this.image = '';
    // pulire l'input file
    const input = document.getElementById('image') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onSave(){
    if(!this.assigned){
      this.assigned_user = '';
      this.location = '';
    }

    const product = {
      idItem: this.idItem,
      name: this.name,
      type: this.type,
      description: this.description,
      location: this.location,
      image: this.image,
      assignedUser: this.assigned_user
    };

    this.productService.editProduct(product);
    this.onCloseEvent();
  }

  // Invia l'evento a product-management.component.ts
  
  @Output() onEvent = new EventEmitter<editProductEventData>();

  onCloseEvent() {
    const eventData: editProductEventData = {
      editProductWindow: false,
    };
      this.onEvent.emit(eventData);
  }
}

export interface editProductEventData {
  editProductWindow: boolean;
}

export interface data {
  key: string;
  name: string;
  visible: boolean;
}