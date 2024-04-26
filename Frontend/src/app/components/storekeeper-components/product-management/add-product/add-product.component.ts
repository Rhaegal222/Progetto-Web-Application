import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../services/product.service';
import { AnimationsService } from '../../../../services/animations.service';
import { ImgbbService } from '../../../../services/imgbb.service';
import { ErrorService } from '../../../../services/error.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [
    './add-product.component.css',
    '../../../../styles/container.css',
    '../../../styles/content.css',
    '../../../styles/buttons.css',
    '../../../styles/form.css'
  ]
})

export class AddProductComponent {

  constructor(
    private productService: ProductService,
    private animationsService: AnimationsService,
    private imgbbService: ImgbbService,
    private errorService: ErrorService
    ) { }

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

  initObservable(){
    const observable = new Observable((observer) => {
      observer.next(this.image === undefined ? 0 : this.image.length);
    });

    observable.subscribe((length: unknown) => {
      if (typeof length === 'number') {
        const anyLength: any = length;
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
    this.type = suggestion.name;
    this.showCategoriesBox = false;
  }

  selectLocation(suggestion: data) {
    this.location = suggestion.name;
    this.showLocationsBox = false;
  }

  hideSuggestions(event: FocusEvent) {
    setTimeout(() => {
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (relatedTarget && relatedTarget.id !== 'category' && relatedTarget.id !== 'location') {
        this.showCategoriesBox = false;
        this.showLocationsBox = false;
      } else if (!relatedTarget) {
        this.showCategoriesBox = false;
        this.showLocationsBox = false;
      }
    }, 150);
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
        },
        error: (error: any) => {
          this.errorService.handleError(error);
        }
      });
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
    const input = document.getElementById('image') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  onSave(){
    const product = {
      name: this.name,
      type: this.type,
      location: this.location,
      description: this.description,
      assignedUser: this.assigned_user,
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
