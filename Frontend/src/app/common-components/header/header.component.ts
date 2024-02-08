import { Component, Output, EventEmitter } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';
import { searchEventData } from './search-bar/search-bar.component';
import { addProductEventData } from './tools-bar/tools-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private animationsService: AnimationsService) {}

  searchValue: string = '';
  category: string = '';
  addProductWindow: boolean = false;

  ngOnInit() {
    setTimeout(() => {
      this.animationsService.initResizeObserver('header');
    }, 0);
  }

  @Output() searchEvent = new EventEmitter<searchEventData>();
  // Metodo per emettere l'evento di ricerca
  onSearch(evenData: searchEventData) {
    this.searchEvent.emit(evenData);
  }

  @Output() addProductEvent = new EventEmitter<addProductEventData>();
  // Metodo per emettere l'evento di apertura della finestra di aggiunta prodotto
  onOpen(eventData: addProductEventData) {
    this.addProductEvent.emit(eventData);
  }
}