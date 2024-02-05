import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core'; // New line with Output and EventEmitter

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
  category: string = 'all';

  setCategory(category: string){
    // prende il valore del nome del bottone che la chiama
    this.category = category;
  }

  @Output() onEvent = new EventEmitter<MyEventData>();

  constructor() {}

  emitEvent() {
    const eventData: MyEventData = {
      firstString: this.searchValue,
      secondString: this.category,
    };
    this.onEvent.emit(eventData);
  }
}

export interface MyEventData {
  firstString: string;
  secondString: string;
}
