import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model'; // Assicurati di definire la classe User

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'api/auth'; // URL del tuo endpoint di autenticazione

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.authUrl + '/login', { username, password });
  }

  // Aggiungi altri metodi come needed per logout, verifica dello stato di login, ecc.
}
