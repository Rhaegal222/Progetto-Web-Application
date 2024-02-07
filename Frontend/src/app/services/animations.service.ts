import { Injectable } from '@angular/core';

var arrow : any;
var component: any;

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {

  constructor() {}

  component: any;

  initResizeObserver(htmlElement: string) {
    if(typeof document !== 'undefined')
      this.component = document.getElementById(htmlElement);
    else
      console.log('document is undefined');
    

    
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

  handleButtonClick() {
    if (typeof document !== 'undefined') {
      arrow = document.getElementById('arrow');
      if ((arrow.classList.contains('arrow-right'))) {
        this.slideInRouter();        
      } else if ((arrow?.classList.contains('arrow-left'))){
        this.slideOutRouter();
      }
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
      } else if (window.innerWidth < 768) {
        this.component.classList.toggle('full-width', false);
        this.component.classList.toggle('sidebar-open', false);
      }
    }
  }

  slideOutRouter() {
    if (typeof document != 'undefined')
      arrow = document.getElementById('arrow');

    if(this.component && arrow){
      arrow.style.zIndex = '-1';
      this.component.classList.toggle('full-width', false);
      this.component.classList.toggle('sidebar-open', false);
      this.component.style.position = 'sticky';

      let pos = 250; 
      this.component.style.marginLeft = pos + 'px';
      
      const frame = () => {
        if (pos <= 0) {
          this.component.style.marginLeft = '0px';
          this.component.classList.toggle('full-width', true);
          this.component.classList.toggle('sidebar-open', false);
          this.component.removeAttribute('style');
        } else {
          pos -= 10; 
          this.component.style.marginLeft = pos + 'px';
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    }
  }

  slideInRouter() {
    if (typeof document != 'undefined')
      arrow = document.getElementById('arrow');

    if(this.component && arrow){
      arrow.style.zIndex = '-1';
      this.component.classList.toggle('full-width', false);
      this.component.classList.toggle('sidebar-open', false);
      this.component.style.position = 'sticky';

      let pos = 0; 
      this.component.style.marginLeft = pos + 'px';
      
      const frame = () => {
        if (pos >= 250) {
          this.component.style.marginLeft = '250px';
          this.component.classList.toggle('full-width', false);
          this.component.classList.toggle('sidebar-open', true);
          this.component.removeAttribute('style');
        } else {
          pos += 10; 
          this.component.style.marginLeft = pos + 'px';
          requestAnimationFrame(frame);
        }
      }
      requestAnimationFrame(frame);
    };
  }


}
