import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthorized = this.authService.isAdmin();
    console.log(this.isAuthorized);
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
