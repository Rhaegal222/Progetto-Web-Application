import { Component } from '@angular/core';
import { AnimationsService } from './services/animations.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private animationsService: AnimationsService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.animationsService.initResizeObserver('router-outlet');
    }, 0);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.animationsService.initResizeObserver('router-outlet');
      }
    });
  }
}
