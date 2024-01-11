import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model'; // Assicurati di avere un modello User

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'your-backend-api-url'; // Sostituisci con il tuo URL API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/login`, { username, password });
  }

  logout(): void {
    // Implementa la logica di logout
  }

  // Aggiungi altri metodi come necessario
}
