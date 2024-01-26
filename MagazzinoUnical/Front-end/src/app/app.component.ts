import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  opened = true;
  toggleSideBar() {
    this.opened = !this.opened;

    // Anima la sidebar
    let sidebar = document.querySelector('.sidebar');
    sidebar!.classList.toggle('active');
  }
}
