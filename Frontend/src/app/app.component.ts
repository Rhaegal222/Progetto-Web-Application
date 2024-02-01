import { Component } from '@angular/core';

var arrow : any;
var router : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  ngOnInit() {
    if (typeof window !== 'undefined') {
      arrow = document.getElementById('arrow');
      arrow.addEventListener('click', this.handleButtonClick.bind(this));

      this.handleInitialBehavior();

      let resizeObserver = new ResizeObserver(entries => {
        this.handleInitialBehavior();      
      });
      resizeObserver.observe(document.body);
    }
  }

  slideOutRouter() {
    router = document.getElementById('router-outlet');
    arrow = document.getElementById('arrow');

    if(router && arrow){
      arrow.style.zIndex = '-1';
      router.classList.toggle('full-width', false);
      router.classList.toggle('sidebar-open', false);

      let pos = 250; 
      router.style.marginLeft = pos + 'px';
      
      function frame() {
        if (pos <= 0) {
          router.style.marginLeft = '0px';
          router.classList.toggle('full-width', true);
          router.classList.toggle('sidebar-open', false);
          router.removeAttribute('style');
        } else {
          pos -= 10; 
          router.style.marginLeft = pos + 'px';
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    }
  }

  slideInRouter() {
    router = document.getElementById('router-outlet');
    arrow = document.getElementById('arrow');

    if(router && arrow){
      arrow.style.zIndex = '-1';
      router.classList.toggle('full-width', false);
      router.classList.toggle('sidebar-open', false);

      let pos = 0; 
      router.style.marginLeft = pos + 'px';
      
      function frame() {
        if (pos >= 250) {
          router.style.marginLeft = '250px';
          router.classList.toggle('full-width', false);
          router.classList.toggle('sidebar-open', true);
          router.removeAttribute('style');
        } else {
          pos += 10; 
          router.style.marginLeft = pos + 'px';
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    };
  }

  handleButtonClick() {
    arrow = document.getElementById('arrow');
    if ((arrow.classList.contains('arrow-right'))) {
      this.slideInRouter();        
    } else if ((arrow?.classList.contains('arrow-left'))){
      this.slideOutRouter();
    }
  }

  handleInitialBehavior() {
    router = document.getElementById('router-outlet');
    if (router) {
      if (window.innerWidth >= 992) {
        router.classList.toggle('full-width', false);
        router.classList.toggle('sidebar-open', true);
      } else if ((window.innerWidth >= 768) && (window.innerWidth < 992)) {
        router.classList.toggle('full-width', true);
        router.classList.toggle('sidebar-open', false);
      } else if (window.innerWidth < 768) {
        router.classList.toggle('full-width', false);
        router.classList.toggle('sidebar-open', false);
      }
    }
  }
}
