import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor(private router:Router) {}

  component: any;
  arrow : any;

  initResizeObserver(htmlElement: string) {
    if(typeof window !== 'undefined'){
      this.component = document.getElementById(htmlElement);
      this.arrow = document.getElementById('arrow');
      
      this.arrow.addEventListener('click', this.handleButtonClick.bind(this));

      this.handleInitialBehavior();

      let resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.contentBoxSize) {
            this.handleInitialBehavior();
          }
        }
      });
      resizeObserver.observe(document.body);
    }
  }

  handleButtonClick() {
    if ((this.arrow.classList.contains('arrow-right'))) {
      this.slideInRouter();        
    } else if ((this.arrow.classList.contains('arrow-left'))){
      this.slideOutRouter();
    }
  }

  handleInitialBehavior() {
    if (this.component) {
      if (window.innerWidth >= 992) {
        this.component.classList.toggle('full-width', false);
        this.component.classList.toggle('sidebar-open', true);
      } else if ((window.innerWidth >= 768) && (window.innerWidth < 992)) {
        this.component.classList.toggle('full-width', true);
        this.component.classList.toggle('sidebar-open', false);
        if(this.router.url === '/menu'){
          this.router.navigate(['/profile']);
        }
      } else if (window.innerWidth < 768) {
        this.component.classList.toggle('full-width', false);
        this.component.classList.toggle('sidebar-open', false);
      }
    }
  }

  slideOutRouter() {
    if(this.component && this.arrow){
      this.arrow.style.zIndex = '-1';
      this.component.classList.toggle('sidebar-open', false);
      this.component.classList.toggle('full-width', false);
      this.component.style.position = 'sticky';

      let pos = 250; 
      this.component.style.paddingLeft = pos + 'px';
      
      const frame = () => {
        if (pos <= 0) {
          this.component.classList.toggle('sidebar-open', false);
          this.component.classList.toggle('full-width', true);
          this.component.style.paddingLeft = '0px';
          this.component.removeAttribute('style');
        } else {
          pos -= 10; 
          this.component.style.paddingLeft = pos + 'px';
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    }
  }

  slideInRouter() {
    if(this.component && this.arrow){
      this.arrow.style.zIndex = '-1';
      this.component.classList.toggle('full-width', false);
      this.component.classList.toggle('sidebar-open', false);
      this.component.style.position = 'sticky';

      let pos = 0; 
      this.component.style.paddingLeft = pos + 'px';
      
      const frame = () => {
        if (pos >= 250) {
          this.component.style.paddingLeft = '250px';
          this.component.classList.toggle('full-width', false);
          this.component.classList.toggle('sidebar-open', true);
          this.component.removeAttribute('style');
        } else {
          pos += 10; 
          this.component.style.paddingLeft = pos + 'px';
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    };
  }
}
