import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isUserEmployee = this.authService.isEmployee() || this.authService.isStorekeeper() || this.authService.isAdmin(); // Verifica se l'utente è un dipendente

    if (!isUserEmployee) {
      // Se l'utente non è un dipendente, reindirizziamo alla pagina "Not Found"
      this.router.navigate(['/page-not-found']);
      return false;
    }

    // Se l'utente è un dipendente, permettiamo l'accesso alla rotta
    return true;
  }
}
