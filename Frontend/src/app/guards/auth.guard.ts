import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated(); // Il metodo `isAuthenticated` dovrebbe verificare la presenza del token JWT e la sua validità

    // Se l'utente non è autenticato, se chiede una pagina che non sia login o registrazione, lo reindirizziamo alla pagina di login
    if (!isAuthenticated) {
      // Se l'utente non è autenticato, lo reindirizziamo alla pagina di login se chiede una pagina che non sia login o registrazione
      if (state.url !== '/login' && state.url !== '/registration') {
        this.router.navigate(['/login']);
      } else if (state.url === '/login' || state.url === '/registration') {
        return true;
      }
      return false;
    } else {
      if (state.url === '/login' || state.url === '/registration') {
        this.router.navigate(['/profile']);
        return false;
      }
      return true;
    }
  }
}
