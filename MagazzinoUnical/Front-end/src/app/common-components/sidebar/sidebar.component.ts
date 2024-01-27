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
    let url = this.router.url;
    if(url == "/menu"){
      this.router.navigate([this.lastComponentLoaded]);
    } else {
      this.router.navigate(['/menu']);
    }
  }

  slideInSidebar(sidebar: HTMLElement, arrow: HTMLElement){
    sidebar.style.display = 'block';
    arrow.style.zIndex = '-1';
    setTimeout(() => {
      arrow.style.zIndex = '0';
    }, 1500);
    let pos = -250; 
    let id = setInterval(frame, 0.25);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
      } else {
        pos+=2; 
        sidebar.style.left = pos + 'px';
        arrow.style.left = pos + 'px';
      }
    }
  }

  slideOutSidebar(sidebar: HTMLElement, arrow: HTMLElement){
    arrow.style.zIndex = '-1';
    setTimeout(() => {
      sidebar.style.display = 'none';
      arrow.style.zIndex = '0';    
    }, 1500);
    let pos = 0; 
    let id = setInterval(frame, 0.25);
    function frame() {
      if (pos == -250) {
        clearInterval(id);
      } else {
        pos-=2; 
        sidebar.style.left = pos + 'px';
        arrow.style.left = pos + 'px';
      }
    }
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
        this.slideInSidebar(sidebar, arrow);
      }
      this.rotationArrow(arrow);
    }
  }
}
