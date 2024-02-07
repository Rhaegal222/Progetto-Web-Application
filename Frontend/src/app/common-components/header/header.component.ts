import { Component, Output, EventEmitter } from '@angular/core';
import { AnimationsService } from '../../services/animations.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private animationsService:AnimationsService) {}

  ngOnInit() {
    this.animationsService.initResizeObserver('header');
  }

  @Output() onEvent = new EventEmitter<addProductEventData>();

  onOpen(){
    const eventData: addProductEventData = {
      addProductWindow: true,
    };
    this.onEvent.emit(eventData);
  }


}

export interface addProductEventData {
  addProductWindow: boolean;
}

