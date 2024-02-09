import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: [
    './search-bar.component.css',
    '../../../styles/buttons.css',
  ]
})

export class SearchBarComponent {

  constructor(private router: Router) { }

  searchValue: string = '';

  categories = [
    {key: 'all', name: 'Tutte le categorie', visible: false},
    {key: 'laptop', name: 'Laptop', visible: true},
    {key: 'software', name: 'Software', visible: true},
    {key: 'hardware', name: 'Hardware', visible: true},
    {key: 'accessories', name: 'Accessori', visible: true},
    {key: 'printer', name: 'Stampanti', visible: true},
    {key: 'other', name: 'Altro', visible: true},
  ];
  category: string = 'Tutte le categorie';

  roles = [
    {key: 'all', name: 'Tutti i ruoli', visible: false},
    {key: 'admin', name: 'Amministratore', visible: true},
    {key: 'storekeeper', name: 'Magazziniere', visible: true},
    {key: 'employee', name: 'Dipendente', visible: true},
  ];
  role: string = 'Tutti i ruoli';

  requestStatus = [
    {key: 'all', name: 'Tutti gli stati', visible: false},
    {key: 'pending', name: 'In attesa', visible: true},
    {key: 'approved', name: 'Approvata', visible: true},
    {key: 'rejected', name: 'Rifiutata', visible: true},
  ];
  status: string = 'Tutti gli stati';
  
  key: string = 'all';

  elements: any[] = [];
  element: string = '';

  productRelatedComponents = ['/product-management', '/product-list', '/product-details', '/user-product'];
  requestRelatedComponents = ['/request-management', '/requests-forwarded'];

  ngOnInit(){

    if (this.productRelatedComponents.includes(this.router.url)) {
      this.elements = this.categories;
      this.element = 'Tutte le categorie';
    } else if (this.router.url === '/user-management') {
      this.elements = this.roles;
      this.element = 'Tutti i ruoli';
    } else if (this.requestRelatedComponents.includes(this.router.url)) {
      this.elements = this.requestStatus;
      this.element = 'Tutti gli stati';
    }
  }

  setElement(element: string){
    this.element = element;
    this.elements.forEach(element => {
      element.visible = true;
    });
    const elementItem = this.elements.find(element => element.name === this.element);
    if (elementItem) {
      elementItem.visible = false;
    }
    this.key = this.elements.find(element => element.name === element)?.key || 'all';
    this.onSearch();
  }

  @Output() searchEvent = new EventEmitter<searchEventData>();

  onSearch() {
    const eventData: searchEventData = {
      searchValue: this.searchValue,
      element: this.key,
    };
    this.searchEvent.emit(eventData);
  }
}

export interface searchEventData {
  searchValue: string;
  element: string;
}
