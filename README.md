# Inventario-ITC

## Introduzione

Applicazione web per la gestione del magazzino dell’ufficio ITC dell’UNICAL. Lo scopo è quello di facilitare la gestione dell’inventario, l’organizzazione e la ricerca dei prodotti presenti in magazzino o assegnati ai dipendenti dell’università. I prodotti sono suddivisi per tipologia: prodotti hardware, software, laptop, pc, accessori (mouse, keyboard, telecamere, monitor) e altri. Sono previste 3 tipologie di utente: amministratore, dipendente dell’università e addetto al magazzino. Di seguito le funzionalità previste.

### Amministratore

L'amministratore è un utente con privilegi elevati all'interno dell'applicazione. Oltre ad avere gli stessi permessi degli addetti al magazzino, come la possibilità di modificare i prodotti e visualizzare la loro posizione, l'amministratore ha ulteriori funzionalità. Può modificare e cancellare qualsiasi elemento all'interno dell'applicazione, inclusi utenti e prodotti. Inoltre, ha il potere di bannare utenti e nominare altri utenti come addetti al magazzino. Questo ruolo è fondamentale per la gestione e l'amministrazione completa dell'inventario e delle operazioni all'interno dell'applicazione.

### Addetto al Magazzino

L'addetto al magazzino è un utente con specifici privilegi all'interno dell'applicazione di gestione dell'inventario. Le sue responsabilità includono la gestione dei prodotti presenti in magazzino, l'assegnazione dei prodotti alle persone, la visualizzazione delle informazioni sulle assegnazioni e le posizioni dei prodotti, la modifica delle caratteristiche dei prodotti e l'aggiunta di note ad essi.

Inoltre, l'addetto al magazzino può essere contattato dai dipendenti dell'università tramite un modulo di contatto dedicato. Questo modulo consente ai dipendenti di inviare richieste specifiche relative ai prodotti, come la disponibilità di un prodotto, la richiesta di un prodotto o la segnalazione di un problema. L'addetto al magazzino è responsabile di gestire queste richieste in modo tempestivo e fornire assistenza ai dipendenti.

Complessivamente, l'addetto al magazzino svolge un ruolo cruciale nella gestione e nell'organizzazione dell'inventario, garantendo che i prodotti siano correttamente assegnati, mantenuti e che le informazioni siano aggiornate per consentire un'efficace gestione del magazzino.

### Dipendente dell'Università

Il dipendente dell'università è un utente con accesso limitato all'applicazione di gestione dell'inventario. Le sue principali responsabilità sono legate alla visualizzazione dei prodotti presenti in magazzino e all'interazione con essi.

Il dipendente può:

1. Visualizzazione dei prodotti presenti in magazzino: Il dipendente può accedere a una lista di prodotti disponibili nel magazzino dell'ufficio ITC dell'università. Questa lista include informazioni come il nome del prodotto, la descrizione, la tipologia (hardware, software, laptop, pc), e la disponibilità in magazzino.

2. Visualizzazione delle caratteristiche del prodotto: Il dipendente può visualizzare le caratteristiche dettagliate di ciascun prodotto, come specifiche tecniche, dimensioni, peso, e altre informazioni pertinenti.

3. Verifica della disponibilità del prodotto: Il dipendente può verificare se un determinato prodotto è disponibile o meno nel magazzino. Questo è utile per pianificare l'utilizzo dei prodotti e per evitare richieste inutili.

4. Avanzamento delle richieste: Il dipendente ha la possibilità di avanzare richieste specifiche agli addetti al magazzino tramite un modulo di contatto dedicato. Questo modulo consente al dipendente di inviare richieste relative ai prodotti, come la disponibilità di un prodotto, la richiesta di un prodotto o la segnalazione di un problema.

5. Richiesta di un prodotto disponibile: Se un prodotto è disponibile, il dipendente può richiederlo direttamente tramite l'applicazione. Questo semplifica il processo di assegnazione dei prodotti e garantisce che i prodotti siano correttamente assegnati ai dipendenti.

6. Segnalazione di un prodotto non disponibile: Nel caso in cui un prodotto non sia disponibile nel magazzino, il dipendente può fare una segnalazione tramite l'applicazione. Questo aiuta a identificare i prodotti mancanti o danneggiati e a prendere le opportune azioni correttive.

7. Richiesta di cambio o reso di un prodotto: Se il dipendente è in possesso di un prodotto e desidera richiedere un cambio o un reso, può farlo tramite l'applicazione. Questo semplifica il processo di gestione dei prodotti e garantisce che i dipendenti abbiano accesso ai prodotti adeguati alle loro esigenze.

### Componenti dell'applicazione

**Componenti per l'Amministratore:**

1. **UserManagement**: Componente per la gestione degli utenti, inclusa l'aggiunta, la modifica e la cancellazione degli utenti, nonché la gestione dei ruoli.
2. **LocationManagement**: Componente per la gestione delle posizioni, inclusa l'aggiunta, la modifica e la cancellazione delle posizioni.

**Componenti per l'Addetto al Magazzino:**

1. **RequestManagement**: Componente per la gestione delle richieste dei dipendenti dell'università.
2. **ProductManagement**: Componente per la gestione dei prodotti, inclusa l'aggiunta, la modifica e la cancellazione dei prodotti, nonché la gestione delle note.
3. **LocationMap**: Componente per la visualizzazione della mappa con la posizione dei prodotti.
4. **Report**: Componente per le statistiche sui prodotti.

**Componenti per il Dipendente dell'Università:**

1. **Registration**: Componente per la gestione della registrazione degli utenti.
2. **ProductList**: Componente per la visualizzazione dei prodotti in magazzino.
3. **ProductDetail**: Componente per la visualizzazione dei dettagli di un prodotto.
4. **ProductRequest**: Componente per richiedere un prodotto.
5. **ProductReturn**: Componente per richiedere il reso di un prodotto.
6. **RequestForawarded**: Componente per visualizzare le richieste inoltrate.

**Componenti Comuni a Tutti:**

1. **Sidebar**: Componente per l'intestazione dell'applicazione.
2. **Dashboard**: Componente per la visualizzazione dei prodotti in magazzino.
3. **Settings**: Componente per la gestione delle impostazioni.
4. **Menu**: Componente per il menu a tendina su dispositivi mobili.
5. **Login**: Componente per la gestione dell'autenticazione e dell'accesso degli utenti.
