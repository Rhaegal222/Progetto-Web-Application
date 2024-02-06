import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

var box : any;

@Component({
  selector: 'app-tools-bar',
  templateUrl: './tools-bar.component.html',
  styleUrls: [
    './tools-bar.component.css',
    '../../styles/buttons.css',
  ]
})

export class ToolsBarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // isAuthorized diventa true se siamo nella pagina dei prodotti;
    // altrimenti, diventa false
    if (this.router.url === '/product-management') {
      if (this.authService.isStorekeeper() || this.authService.isAdmin())
        this.isAuthorized = true; 
      else
      this.isAuthorized = false;
    }
  }

  
  isActive : boolean = true;
  isAuthorized : boolean = false;

  changeView() {
    this.isActive = !this.isActive;

    box = document.getElementById('box');
    
    if (box == null) return;

    if(this.isActive) {
      box.classList.toggle('list', false);
      box.classList.toggle('grid', true);
    }
    else {
      box.classList.toggle('list', true);
      box.classList.toggle('grid', false);
    }
  }

  @Output() onEvent = new EventEmitter<addProductEventData>();

  addProductEvent() {
    const eventData: addProductEventData = {
      addProductWindow: true,
    };
    this.onEvent.emit(eventData);
  }
}

export interface addProductEventData {
  addProductWindow: boolean;
}
