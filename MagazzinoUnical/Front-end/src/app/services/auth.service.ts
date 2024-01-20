import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private showLoginSubject = new BehaviorSubject<boolean>(false);
  showLogin$ = this.showLoginSubject.asObservable();

  toggleLogin() {
    this.showLoginSubject.next(!this.showLoginSubject.value);
  }
}
