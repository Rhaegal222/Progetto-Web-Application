import { Component } from '@angular/core';
import { AnimationsService } from './services/animations.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private animationsService: AnimationsService, private router: Router, private productService : ProductService) { }

  loading = false;

  ngOnInit() {
    setTimeout(() => {
      this.animationsService.initResizeObserver('router-outlet');
    }, 0);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.animationsService.initResizeObserver('router-outlet');
        }, 100);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd || 
                 event instanceof NavigationCancel || 
                 event instanceof NavigationError) {
        this.loading = false;
      }
    });

    this.productService.checkIfStoreWorks()
  }
}
