import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

var box : any;

@Component({
  selector: 'app-tools-bar',
  templateUrl: './tools-bar.component.html',
  styleUrls: [
    './tools-bar.component.css',
    '../../../styles/buttons.css',
  ]
})

export class ToolsBarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.router.url === '/product-management') {
      if (this.authService.isStorekeeper() || this.authService.isAdmin())
        this.isAuthorized = true; 
      else
      this.isAuthorized = false;
    }

    if (this.pages.includes(this.router.url)) {
      if (this.authService.isStorekeeper() || this.authService.isAdmin())
        this.isShowing = false;
    }
  }

  pages : string[] = ['/request-management', '/requests-forwarded'];
  
  isActive : boolean = true;
  isAuthorized : boolean = false;
  isShowing : boolean = true;

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

  @Output() addProductEvent = new EventEmitter<addProductEventData>();

  addProduct() {
    const eventData: addProductEventData = {
      addProductWindow: true,
    };
    this.addProductEvent.emit(eventData);
  }
}

export interface addProductEventData {
  addProductWindow: boolean;
}
