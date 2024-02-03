import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

var arrow : any;
var sidebar : any;
var resizeObserver : any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  lastComponentLoaded: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.toggleMenuClose();
    this.handleInitialBehavior();

    if ( typeof window !== 'undefined' ) {
      resizeObserver = new ResizeObserver(entries => {
        this.handleInitialBehavior();
      });
      resizeObserver.observe(document.body);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url != '/menu') {
          this.toggleMenuClose();
        }
      }
    });
  }

  // se la finestra è più grande di 768px, il menu è sempre aperto
  windowsSize(){
    sidebar = document.getElementById('menu');
    arrow = document.getElementById('arrow');
    if (sidebar && arrow) {
      if (window.innerWidth >= 992) {
        sidebar.classList.toggle('menu-open');
        arrow.classList.toggle('arrow-left');
      } else if ((window.innerWidth >= 768) && (window.innerWidth < 992)) {
        sidebar.classList.toggle('menu-close');
        arrow.classList.toggle('arrow-right');
      } 
    }
  }

  isOpen : boolean = false;
  previousUrl: string = '';

  toggleMenuOpen(){
    if (this.router.url != '/menu') {
      this.previousUrl = this.router.url;
    }

    let lineTop = document.getElementById('lineTop');
    let lineMid = document.getElementById('lineMid');
    let lineBot = document.getElementById('lineBot');

    if (lineTop && lineMid && lineBot) {
      if (!this.isOpen) {
        lineTop.classList.toggle('line-top', true);
        lineMid.classList.toggle('line-mid', true);
        lineBot.classList.toggle('line-bot', true);
        this.isOpen = true;
        this.router.navigate(['/menu']);
      }
      else {
        this.toggleMenuClose();
        this.isOpen = false;
        this.router.navigate([this.previousUrl]);
      }
    }
  }

  toggleMenuClose(){
    if ( typeof window !== 'undefined' ) {
      let lineTop = document.getElementById('lineTop');
      let lineMid = document.getElementById('lineMid');
      let lineBot = document.getElementById('lineBot');
    

      if (lineTop && lineMid && lineBot) {
        lineTop.classList.toggle('line-top', false);
        lineMid.classList.toggle('line-mid', false);
        lineBot.classList.toggle('line-bot', false);
      }
    }
  }

  slideInSidebar(sidebar: HTMLElement, arrow: HTMLElement){
    sidebar.style.zIndex = '-1';

    let pos = -250; 
    sidebar.style.left = pos + 'px';

    function frame() {
      if (pos == 0) {
        sidebar.classList.toggle('menu-open', true);
        sidebar.classList.toggle('menu-close', false);
        sidebar.removeAttribute('style');
      } else {
        pos+=10; 
        sidebar.style.left = pos + 'px';
        arrow.style.left = (pos + 250 + 10) + 'px';
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }

  slideOutSidebar(sidebar: HTMLElement, arrow: HTMLElement){
    sidebar.style.zIndex = '-1';

    let pos = 0; 
    sidebar.style.left = pos + 'px';

    function frame() {
      if (pos == -250) {
        sidebar.classList.toggle('menu-open', false);
        sidebar.classList.toggle('menu-close', true);
        sidebar.removeAttribute('style');
      } else {
        pos-=10; 
        sidebar.style.left = pos + 'px';
        arrow.style.left = (pos - 10) + 'px';
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);   
  }

  rotationArrow(arrow: HTMLElement){
    if (arrow.classList.contains('arrow-right')) {
      let pos = 180;
      let id = setInterval(frame, 5);
      function frame() {
        if (pos == 0) {
          clearInterval(id);
          arrow.classList.toggle('arrow-left', true);
          arrow.classList.toggle('arrow-right', false);
          arrow.removeAttribute('style');
        } else {
          pos-=3; 
          arrow.style.transform = 'matrix(1, 0, 0, 1, 0, 0) rotate(' + pos + 'deg)';
        }
      }
    } else if (arrow.classList.contains('arrow-left')){
      let pos = 0;
      let id = setInterval(frame, 5);
      function frame() {
        if (pos == 180) {
          clearInterval(id);
          arrow.classList.toggle('arrow-left', false);
          arrow.classList.toggle('arrow-right', true);
          arrow.removeAttribute('style');
        } else {
          pos+=3;
          arrow.style.transform = 'matrix(1, 0, 0, 1, 0, 0) rotate(' + pos + 'deg)';
        }
      }
    }
  }

  hideSidebar() {
    sidebar = document.getElementById('menu');
    arrow = document.getElementById('arrow');

    if (sidebar && arrow) {
      this.rotationArrow(arrow);
      if (sidebar.classList.contains('menu-open')) {
        this.slideOutSidebar(sidebar, arrow);
      } else {
        this.slideInSidebar(sidebar, arrow);
      }
    }
  }

  handleInitialBehavior(){
    if ( typeof window !== 'undefined' ) {
      sidebar = document.getElementById('menu');
      arrow = document.getElementById('arrow');
    }

    if (sidebar && arrow) {
      if (window.innerWidth >= 992) {
        sidebar.classList.toggle('menu-open', true);
        sidebar.classList.toggle('menu-close', false);
        arrow.classList.toggle('arrow-left', true);
        arrow.classList.toggle('arrow-right', false);
      } else if ((window.innerWidth >= 768) && (window.innerWidth < 992)) {
        sidebar.classList.toggle('menu-close', true);
        sidebar.classList.toggle('menu-open', false);
        arrow.classList.toggle('arrow-left', false);
        arrow.classList.toggle('arrow-right', true);
      } else {
        sidebar.classList.toggle('menu-close', false);
        sidebar.classList.toggle('menu-open', false);
        arrow.classList.toggle('arrow-left', false);
        arrow.classList.toggle('arrow-right', false);
      }
    }
  }
}
