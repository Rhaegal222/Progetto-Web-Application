import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
    const router = document.getElementById('router-outlet');
    const arrow = document.getElementById('arrow'); // Sostituisci 'arrow' con l'ID del tuo pulsante

    // anima lo spostamento del router-outlet
    const slideInRouter = () => {
      router?.classList.toggle('full-width', false);
      router?.classList.toggle('sidebar-open', false);
      if(router){
        let pos = 0; 
        router.style.marginLeft = pos + 'px';
        
        let id = setInterval(frame, 0.25);
        function frame() {
          if (pos == 250) {
            clearInterval(id);
          } else {
            pos+=2; 
            router!.style.marginLeft = pos + 'px';
          }
        }
        setTimeout(() => {
          router?.classList.toggle('full-width', false);
          router?.classList.toggle('sidebar-open', true);
          router?.removeAttribute('style');
        }, 1500);
      };
    }

    const slideOutRouter = () => {
      router?.classList.toggle('full-width', false);
      router?.classList.toggle('sidebar-open', false);
      if(router){
        let pos = 250; 
        router.style.marginLeft = pos + 'px';
        
        let id = setInterval(frame, 0.25);
        function frame() {
          if (pos == 0) {
            clearInterval(id);
          } else {
            pos-=2; 
            router!.style.marginLeft = pos + 'px';
          }
        }
        setTimeout(() => {
          router?.classList.toggle('full-width', true);
          router?.classList.toggle('sidebar-open', false);
          router?.removeAttribute('style');
        }, 1500);
      };
    }

  
    // Funzione per gestire il clic sul pulsante
    const handleButtonClick = () => {
      if ((arrow?.classList.contains('arrow-right'))) {
        slideInRouter();        
      } else if ((arrow?.classList.contains('arrow-left'))){
        slideOutRouter();
      }
    };
  
    // Aggiungi un gestore di eventi al pulsante per rilevare il clic
    arrow?.addEventListener('click', handleButtonClick);
  
    // Funzione per gestire il comportamento iniziale
    // ritarda di 1 secondo per consentire al pulsante di caricarsi
    
    const handleInitialBehavior = () => {
      setTimeout(() => {
        if ((arrow?.classList.contains('arrow-left'))) {
          router?.classList.toggle('full-width', false);
          router?.classList.toggle('sidebar-open', true);
        } else if ((arrow?.classList.contains('arrow-right'))){
          router?.classList.toggle('full-width', false);
          router?.classList.toggle('sidebar-open', true);
        }
      }, 100);
    };
  
    // Chiama la funzione per gestire il comportamento iniziale
    handleInitialBehavior();
  }    
}
