import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  lastComponentLoaded: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(event.urlAfterRedirects != "/menu"){
          this.lastComponentLoaded = event.urlAfterRedirects;
        }
      }
    });
  }

  toggleMenuClose(){
    // get the actual component loaded
    let url = this.router.url;
    // if the current url is menu, then redirect to home
    if(url == "/menu"){
      this.router.navigate([this.lastComponentLoaded]);
    } else {
      this.router.navigate(['/menu']);
    }
  }

  slideInSidebar(sidebar: HTMLElement, arrow: HTMLElement){
    sidebar.style.display = 'block';
    let pos = -250; 
    let id = setInterval(frame, 5);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos++; 
        if (sidebar && arrow) {
          sidebar.style.left = pos + 'px';
          arrow.style.left = pos + 'px';
        }
      }
    }
  }

  slideOutSidebar(sidebar: HTMLElement, arrow: HTMLElement){
    let pos = 0; 
    let id = setInterval(frame, 5);
    function frame() {
      if (pos == -260) {
        clearInterval(id);
      } else {
        pos--; 
        if (sidebar) {
          sidebar.style.left = pos + 'px';
          arrow.style.left = pos + 'px';
        }
      }
    }
    // aspetta che la sidebar sia uscita e poi la nasconde
    setTimeout(() => {
      sidebar.style.display = 'none';
    }, 2000);
  }

  rotationArrow(arrow: HTMLElement){
    // se la rotazione è 0, allora ruota di 180 gradi
    if(arrow.style.transform == 'rotate(180deg)'){
      // anima la rotazione
      let pos = 180;
      let id = setInterval(frame, 5);
      function frame() {
        if (pos == 0) {
          clearInterval(id);
        } else {
          pos--; 
          arrow.style.transform = 'rotate(' + pos + 'deg)';
        }
      }
    } else {
      let pos = 0;
      let id = setInterval(frame, 5);
      function frame() {
        if (pos == 180) {
          clearInterval(id);
        } else {
          pos++; 
          arrow.style.transform = 'rotate(' + pos + 'deg)';
        }
      }
    }
  }



  hideSidebar() {
    console.log('hideSidebar');

    let sidebar = document.getElementById('menu');
    let arrow = document.getElementById('arrow');
    
    if (sidebar && arrow) {
      if (sidebar.style.display == 'none') {
        this.slideInSidebar(sidebar, arrow);
      } else {
        this.slideOutSidebar(sidebar, arrow);
      }
      this.rotationArrow(arrow);
    }
  }
}
