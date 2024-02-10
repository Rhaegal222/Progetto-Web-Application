import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorekeeperGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isUserStorekeeper = this.authService.isStorekeeper() || this.authService.isAdmin(); // Verifica se l'utente è un addetto al magazzino

    if (!isUserStorekeeper) {
      // Se l'utente non è un addetto al magazzino, reindirizziamo alla pagina "Not Found"
      this.router.navigate(['/page-not-found']);
      return false;
    }

    // Se l'utente è un addetto al magazzino, permettiamo l'accesso alla rotta
    return true;
  }
}
