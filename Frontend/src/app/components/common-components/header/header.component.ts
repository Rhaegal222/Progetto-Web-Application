import { Component, Output, EventEmitter } from '@angular/core';
import { AnimationsService } from '../../../services/animations.service';
import { addProductEventData } from './tools-bar/tools-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private animationsService: AnimationsService) {}

  searchValue: string = '';
  element: string = '';
  addProductWindow: boolean = false;

  ngOnInit() {
    this.animationsService.initResizeObserver('header');
  }

  ngAfterViewInit() {
    this.animationsService.initResizeObserver('header');
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

export interface searchEventData {
  searchValue: string;
  element: string;
}
