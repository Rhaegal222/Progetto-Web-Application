# Inventario-ITC

Applicazione web per la gestione del magazzino dell’ufficio ITC dell’UNICAL.
Lo scopo è quello di facilitare la gestione dell’inventario, l’organizzazione e la ricerca dei prodotti presenti in magazzino o assegnati ai dipendenti dell’università.
I prodotti sono suddivisi per tipologia: prodotti hardware, software, laptop, pc, accessori (mouse, keyboard, telecamere, monitor), ecc…
Sono previste 3 tipologie di utente: amministratore, dipendente dell’università e addetto al magazzino. Di seguito le funzionalità previste.

Funzionalità comuni:

- Esiste già un utente amministratore nel db
- Tutti gli utenti:
  - possono registrarsi
  - per ogni prodotto, possono vedere:
    - nome
    - descrizione
    - tipologia (hw, sw, laptop, pc)
    - diponibilità in magazzino

- Amministratore:
  - Ha gli stessi permessi degli addetti al magazzino (modifica, visibilità locazione, ecc…)
  - Inoltre:
    - Può modificare/cancellare tutto
    - Può bannare utenti
    - Può nominare altri utenti come addetto al magazzino

- Dipendente dell’università:
  - Può vedere i prodotti presenti in magazzino:
    - può vedere le caretteristiche del prodotto
    - può vedere se un prodotto è disponibile o no
    - Può avanzare delle richieste agli addetti del magazzino (si aprirà un modulo di contatto avente come oggetto la richiesta relativa ad un prodotto)
    - Se il prodotto è disponibile, può richiederlo
    - Se il prodotto non è disponibile, può fare una segnalazione
    - Può chiedere il cambio o il reso di un prodotto di cui è in possesso

- Addetti del magazzino:
  - Possono aggiungere o rimuovere un prodotto
  - Possono assegnare un prodotto ad una persona
  - Possono vedere a chi è assegnato e dove si trova ogni prodotto
  - Possono modificare le caratteristiche dei prodotti
  - Possono essere contattati dai dipendenti dell’università tramite un modulo di contatto
  - Possono aggiungere note ai prodotti

**Componenti per l'Amministratore:**

1. **UserManagement**: Componente per la gestione degli utenti, inclusa l'aggiunta, la modifica e la cancellazione degli utenti, nonché la gestione dei ruoli.
2. **LocationManagement**: Componente per la gestione delle posizioni, inclusa l'aggiunta, la modifica e la cancellazione delle posizioni.

**Componenti per l'Addetto al Magazzino:**

1. **LocationMap**: Componente per la visualizzazione della mappa con la posizione dei prodotti.
2. **RequestManagement**: Componente per la gestione delle richieste dei dipendenti dell'università.
3. **ProductManagement**: Componente per la gestione dei prodotti, inclusa l'aggiunta, la modifica e la cancellazione dei prodotti, nonché la gestione delle note.
4. **Report**: Componente per le statistiche sui prodotti.

**Componenti per il Dipendente dell'Università:**

1. **Registration**: Componente per la gestione della registrazione degli utenti.
2. **ProductList**: Componente per la visualizzazione dei prodotti in magazzino.
3. **ProductDetail**: Componente per la visualizzazione dei dettagli di un prodotto.
4. **ProductRequest**: Componente per richiedere un prodotto.
5. **ProductReturn**: Componente per richiedere il reso di un prodotto.

**Componenti Comuni a Tutti:**

1. **Sidebar**: Componente per l'intestazione dell'applicazione.
2. **Dashboard**: Componente per la visualizzazione dei prodotti in magazzino.
3. **Settings**: Componente per la gestione delle impostazioni.
4. **Menu**: Componente per il menu a tendina su dispositivi mobili.
5. **Login**: Componente per la gestione dell'autenticazione e dell'accesso degli utenti.
