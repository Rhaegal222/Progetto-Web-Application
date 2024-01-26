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

**Componenti Comuni a Entrambi:**

1. **Sidebar**: Componente per l'intestazione dell'applicazione.
2. **Dashboard**: Componente per la visualizzazione dei prodotti in magazzino.
3. **Menu**: Componente per il piè di pagina dell'applicazione.
4. **Login**: Componente per la gestione dell'autenticazione e dell'accesso degli utenti.
5. **Registration**: Componente per la gestione della registrazione degli utenti.

**Componenti per l'Amministratore:**

1. **UserManagement**: Componente per la gestione degli utenti, inclusa l'aggiunta, la modifica e la cancellazione degli utenti, nonché la gestione dei ruoli.
2. **InventoryManagement**: Componente per la gestione dell'inventario, inclusa l'aggiunta, la rimozione e la modifica dei prodotti, nonché l'assegnazione dei prodotti.

**Componenti per il Dipendente:**

1. **ProductList**: Componente per visualizzare l'elenco dei prodotti in magazzino.
2. **ProductDetail**: Componente per visualizzare i dettagli di un prodotto specifico.
3. **RequestManagement**: Componente per l'avanzamento delle richieste relative ai prodotti, inclusi ordini, segnalazioni e richieste di reso o cambio.
4. **LocationMap**: Componente per visualizzare una mappa con la posizione degli uffici e le informazioni sui prodotti consegnati a ciascun ufficio.
5. **Reports**: Componente per generare rapporti e statistiche sull'inventario e sull'utilizzo dei prodotti.