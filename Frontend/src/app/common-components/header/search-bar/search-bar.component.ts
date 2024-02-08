import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
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
  
  key: string = 'all';

  elements: any[] = [];
  element: string = '';

  ngOnInit(){
    if (this.router.url === '/product-management' || this.router.url === '/product-list' || this.router.url === '/product-details') {
      this.elements = this.categories;
      this.element = 'Tutte le categorie';
    } else if (this.router.url === '/user-management') {
      this.elements = this.roles;
      this.element = 'Tutti i ruoli';
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
