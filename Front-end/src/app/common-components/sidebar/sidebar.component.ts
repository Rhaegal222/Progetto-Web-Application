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

    // se la finestra è più grande di 768px, il menu è sempre aperto
    if (window.innerWidth >= 992) {
      let sidebar = document.getElementById('menu');
      let arrow = document.getElementById('arrow');

      sidebar?.classList.toggle('menu-open');
      arrow?.classList.toggle('arrow-left');
    } else if ((window.innerWidth >= 768) && (window.innerWidth < 992)) {
      let sidebar = document.getElementById('menu');
      let arrow = document.getElementById('arrow');

      sidebar?.classList.toggle('menu-close');
      arrow?.classList.toggle('arrow-right');
    }
  }

  toggleMenuClose(){
    let url = this.router.url;
    if(url == "/menu"){
      this.router.navigate([this.lastComponentLoaded]);
    } else {
      this.router.navigate(['/menu']);
    }
  }

  slideInSidebar(sidebar: HTMLElement, arrow: HTMLElement){
    sidebar.classList.remove('menu-close');
    sidebar.classList.toggle('menu-open');
    let pos = -250; 
    sidebar.style.left = pos + 'px';
    
    let id = setInterval(frame, 0.25);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos+=2; 
        sidebar.style.left = pos + 'px';
        arrow.style.left = (pos + 250 + 10) + 'px';
      }
    }  
    setTimeout(() => {
      arrow.classList.remove('arrow-right');
      arrow.classList.toggle('arrow-left');

      sidebar.removeAttribute('style');
      arrow.removeAttribute('style');
    }, 1500);
  }

  slideOutSidebar(sidebar: HTMLElement, arrow: HTMLElement){
    let pos = 0; 
    sidebar.style.left = pos + 'px';

    let id = setInterval(frame, 0.25);
    function frame() {
      if (pos == -250) {
        clearInterval(id);
      } else {
        pos-=2; 
        sidebar.style.left = pos + 'px';
        arrow.style.left = (pos - 10) + 'px';
      }
    } 

    setTimeout(() => {
      sidebar.classList.remove('menu-open');
      sidebar.classList.toggle('menu-close');
  
      arrow.classList.remove('arrow-left');
      arrow.classList.toggle('arrow-right');

      sidebar.removeAttribute('style');
      arrow.removeAttribute('style');
    }, 1500);
   
  }

  rotationArrow(arrow: HTMLElement){
    arrow.style.transform = window.getComputedStyle(arrow).transform;
    if (arrow.style.transform == 'matrix(1, 0, 0, 1, 0, 0)') {
      let pos = 0;
      let id = setInterval(frame, 0.25);
      function frame() {
        if (pos == 180) {
          clearInterval(id);
        } else {
          pos+=2; 
          arrow.style.transform = 'matrix(1, 0, 0, 1, 0, 0) rotate(' + pos + 'deg)';
        }
      }
    } else {
      let pos = 180;
      let id = setInterval(frame, 0.25);
      function frame() {
        if (pos == 0) {
          clearInterval(id);
        } else {
          pos-=2; 
          arrow.style.transform = 'matrix(1, 0, 0, 1, 0, 0) rotate(' + pos + 'deg)';
        }
      }
    }
  }

  hideSidebar() {
    let sidebar = document.getElementById('menu');
    let arrow = document.getElementById('arrow');

    if (sidebar && arrow) {
      sidebar.style.display = window.getComputedStyle(sidebar).display; 
      if (sidebar.style.display == 'block') {
        this.slideOutSidebar(sidebar, arrow);
      } else {
        sidebar.style.display = 'block';
        this.slideInSidebar(sidebar, arrow);
      }
      this.rotationArrow(arrow);
    }
  }
}
