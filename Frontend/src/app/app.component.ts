import { Component } from '@angular/core';
import { AnimationsService } from './services/animations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private animationsService: AnimationsService) { }

  ngOnInit() {
    this.animationsService.initResizeObserver('router-outlet');
  }
}
