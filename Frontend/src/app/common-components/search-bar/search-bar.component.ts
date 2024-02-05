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
  @Output() searchEvent = new EventEmitter<string>(); // New line with Output and EventEmitter

  // Emit the search value
  search(){
    this.searchEvent.emit(this.searchValue);
  }
}
