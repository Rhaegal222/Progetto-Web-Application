// dash.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  displayContent = false;

  toggleDisplay(): void {
    this.displayContent = !this.displayContent;
  }
}
