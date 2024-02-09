import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  // Gestione degli errori
  // Errore 401: non autorizzato
  // Errore 402: pagamento richiesto
  // Errore 403: vietato
  // Errore 404: non trovato
  // Errore 500: errore interno del server
  // Errore 501: non implementato
  // Errore 502: gateway non valido
  // Errore 503: servizio non disponibile
  // Errore 504: gateway timeout
  // Errore 505: versione HTTP non supportata
  // Errore 600: errore di connessione
  // Errore 0: errore di rete

  // Gestione degli errori
  handleError(error: any) {
    console.error(error);
    if (error.status === 401) {
      console.error('Non autorizzato');
    } else if (error.status === 402) {
      console.error('Pagamento richiesto');
    } else if (error.status === 403) {
      console.error('Vietato');
    } else if (error.status === 404) {
      console.error('Non trovato');
    } else if (error.status === 500) {
      console.error('Errore interno del server');
    } else if (error.status === 501) {
      console.error('Non implementato');
    } else if (error.status === 502) {
      console.error('Gateway non valido');
    } else if (error.status === 503) {
      console.error('Servizio non disponibile');
    } else if (error.status === 504) {
      console.error('Gateway timeout');
    } else if (error.status === 505) {
      console.error('Versione HTTP non supportata');
    } else if (error.status === 600) {
      console.error('Errore di connessione');
    } else if (error.status === 0) {
      console.error('Errore di rete');
    }
  }
}
