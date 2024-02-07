import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: [
    './search-bar.component.css',
    '../../../styles/buttons.css',
  ]
})
export class SearchBarComponent {

  searchValue: string = '';
  category: string = 'Tutte le categorie';
  key: string = 'all';

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
    this.category = category;
    this.categories.forEach(element => {
      element.visible = true;
    });
    const categoryItem = this.categories.find(element => element.name === category);
    if (categoryItem) {
        categoryItem.visible = false;
    }
    this.key = this.categories.find(element => element.name === category)?.key || 'all';
    this.onSearch();
  }

  @Output() searchEvent = new EventEmitter<searchEventData>();

  onSearch() {
    const eventData: searchEventData = {
      searchValue: this.searchValue,
      category: this.key,
    };
    this.searchEvent.emit(eventData);
  }
}

export interface searchEventData {
  searchValue: string;
  category: string;
}
