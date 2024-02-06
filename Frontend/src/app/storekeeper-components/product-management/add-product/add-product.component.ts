import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [
    './add-product.component.css',
    '../../../styles/container.css',
    '../../../styles/content.css',
    '../../../styles/buttons.css',
    '../../../styles/form.css'
  ]
})

export class AddProductComponent {

  constructor() { }

  // Osserva i click e se non sono all'interno del componente, chiudilo
  ngOnInit(): void {
    window.addEventListener('keydown', (event) => {
      const modal = document.getElementById('addProductWindow');
      if (modal != null) {
        if (event.key === 'Escape') {
          this.onCloseEvent();
        }
      }
    });


  }

  addProductWindow: boolean = true;

  images: string[] = [];

  // Chiudi il componente

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
