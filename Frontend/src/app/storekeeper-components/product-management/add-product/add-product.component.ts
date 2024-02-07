import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { AnimationsService } from '../../../services/animations.service';

var arrow : any;
var addProductWindow : any;

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

  constructor(private productService: ProductService, private animationsService: AnimationsService) { }

  addProductWindow: boolean = true;

  name: string = '';
  type: string = '';
  description: string = '';
  location: string = '';
  image: string = '';
  length: number = 0;
  assigned: boolean = false;
  assigned_user: string = '';
  
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

  // Osserva i click e se non sono all'interno del componente, chiudilo
  ngOnInit(): void {
    this.initObservable();
    this.initObserveEnterKey();
    this.animationsService.initResizeObserver('addProductWindow');    
  }

  initObserveEnterKey() {
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
    console.log(suggestion);
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

  removeImage(): void {
    this.image = '';
    // pulire l'input file
    const input = document.getElementById('image') as HTMLInputElement;
    if (input) {
      input.value = '';
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
    this.onCloseEvent();
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

export interface data {
    key: string;
    name: string;
    visible: boolean;
  }
