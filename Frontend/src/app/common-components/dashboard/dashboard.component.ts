import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    '../../styles/container.css',
    './dashboard.component.css',
    '../../styles/buttons.css'
  ]
})
export class DashboardComponent {
  displayContent = false;

  toggleDisplay(): void {
    this.displayContent = !this.displayContent;
  }

  admin = false;

  ngAfterContentChecked() {
    this.admin = false;
  }
}
