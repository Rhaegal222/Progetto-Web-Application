import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: [
    './search-bar.component.css',
    '../../styles/buttons.css',
  ]
})
export class SearchBarComponent {

  searchValue: string = '';
  category: string = 'Tutte le categorie';
  key: string = 'all';

  // Array di coppie chiave-valore per il nome della categoria e il boleano per la visibilità
  categories = [
    {key: 'all', name: 'Tutte le categorie', visible: false},
    {key: 'laptop', name: 'Laptop', visible: true},
    {key: 'software', name: 'Software', visible: true},
    {key: 'hardware', name: 'Hardware', visible: true},
    {key: 'accessories', name: 'Accessori', visible: true},
    {key: 'printer', name: 'Stampanti', visible: true},
    {key: 'other', name: 'Altro', visible: true},
  ];

  setCategory(category: string){
    // prende il valore del nome del bottone che la chiama
    this.category = category;
    // setta a true la visibilitá di tutte le categorie
    this.categories.forEach(element => {
      element.visible = true;
    });
    // setta a false la visibilitá della categoria selezionata
    const categoryItem = this.categories.find(element => element.name === category);
    if (categoryItem) {
        categoryItem.visible = false;
    }
    // setta la chiave della categoria
    this.key = this.categories.find(element => element.name === category)?.key || 'all';
  }

  @Output() onEvent = new EventEmitter<MyEventData>();

  constructor() {}

  searchEvent() {
    const eventData: MyEventData = {
      searchValue: this.searchValue,
      category: this.key,
    };
    this.onEvent.emit(eventData);
  }
}

export interface MyEventData {
  searchValue: string;
  category: string;
}
