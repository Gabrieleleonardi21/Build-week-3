# Build Week 3 — Clone di LinkedIn

Applicazione web che riproduce le pagine principali di LinkedIn (landing,
autenticazione, feed, profilo) con un **feed in tempo reale** su Firebase
Realtime Database. Progetto di gruppo (Build Week EPICODE).

---

## Indice

- [Funzionalità](#funzionalità)
- [Stack tecnologico](#stack-tecnologico)
- [Requisiti](#requisiti)
- [Avvio rapido](#avvio-rapido)
- [Configurazione Firebase](#configurazione-firebase)
- [Script disponibili](#script-disponibili)
- [Struttura del progetto](#struttura-del-progetto)
- [Routing](#routing)
- [Data layer](#data-layer)
- [Componenti](#componenti)
- [Scelte architetturali](#scelte-architetturali)
- [Deploy](#deploy)
- [Problemi noti](#problemi-noti)

---

## Funzionalità

- **Landing** pubblica con accesso rapido e link a registrazione/login
- **Autenticazione simulata**: `SignUp` e `Login` (senza backend reale)
  portano direttamente al feed
- **Feed in tempo reale** su Firebase:
  - pubblicazione di post con **testo e immagini** (ridimensionate lato client)
  - **like** (con identità del client via `localStorage`, senza login)
  - **commenti** e **condivisioni**
  - aggiornamento istantaneo per tutti i client collegati
- **Header** sticky con:
  - ricerca **a scomparsa** (sotto `lg` è solo una lente, si espande al click)
  - menu **"Per le aziende"**
  - menu utente (Visualizza profilo, logout)
- **Navigazione via URL** (react-router) con `Layout` condiviso e **barra
  inferiore** su mobile
- **Pagina profilo** utente completa
- **Toast Premium** con **chiusura automatica dopo 5 secondi**
- **Sidebar** con dati persistiti in `localStorage`

---

## Stack tecnologico

| Ambito | Tecnologia | Versione |
|--------|-----------|----------|
| UI | React | 19 |
| Build tool | Vite | 8 |
| Routing | react-router-dom | 7 |
| Stile | Bootstrap + Bootstrap Icons | 5 / 1.13 |
| Componenti UI | react-bootstrap | 2.10 |
| Backend dati | Firebase (Realtime Database) | 12 |
| Caroselli | Swiper | 14 |
| Lint | ESLint | 10 |

---

## Requisiti

- **Node.js** 18+ (consigliato 20+)
- **npm** 9+
- (Opzionale) un progetto **Firebase** con Realtime Database attivo

---

## Avvio rapido

```bash
# 1. Installa le dipendenze
npm install

# 2. (Opzionale) Configura Firebase
cp .env.example .env.local
#    poi apri .env.local e inserisci le variabili VITE_FIREBASE_*

# 3. Avvia in sviluppo
npm run dev
```

> **Firebase è opzionale per l'avvio.** Se `.env.local` non è configurato,
> l'app parte comunque: il feed mostra un messaggio che invita a configurare
> Firebase (vedi `isFirebaseConfigured` in `src/firebase.js`). Landing,
> autenticazione, profilo e navigazione funzionano anche senza.

---

## Configurazione Firebase

1. Crea un progetto su [Firebase Console](https://console.firebase.google.com/).
2. Attiva **Realtime Database** (non Firestore).
3. Copia `.env.example` in `.env.local` e compila le variabili
   (le trovi in *Impostazioni progetto → Le tue app → config web*):

| Variabile | Descrizione |
|-----------|-------------|
| `VITE_FIREBASE_API_KEY` | API key del progetto |
| `VITE_FIREBASE_AUTH_DOMAIN` | dominio di autenticazione |
| `VITE_FIREBASE_DATABASE_URL` | **URL del Realtime Database** (obbligatorio: senza questo l'app considera Firebase non configurato) |
| `VITE_FIREBASE_PROJECT_ID` | id progetto |
| `VITE_FIREBASE_STORAGE_BUCKET` | bucket storage |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | sender id |
| `VITE_FIREBASE_APP_ID` | app id |

> Il prefisso `VITE_` è obbligatorio perché Vite esponga le variabili al client.
> `.env.local` **non va committato** (è già in `.gitignore`).

Le regole del database sono in [database.rules.json](database.rules.json).
Al primo avvio con DB vuoto, `seedIfEmpty()` popola automaticamente il feed
con post di esempio.

---

## Script disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | server di sviluppo con hot reload |
| `npm run build` | build di produzione in `dist/` |
| `npm run preview` | anteprima locale della build |
| `npm run lint` | controllo ESLint su tutto il progetto |

---

## Struttura del progetto

```
Build-week-3/
├── public/                 # asset statici (logo, icone SVG, immagini)
├── database.rules.json     # regole del Realtime Database
├── firebase.json           # configurazione deploy Firebase
├── .env.example            # template variabili d'ambiente
├── index.html
└── src/
    ├── main.jsx            # entry point: monta <App> dentro <BrowserRouter>
    ├── App.jsx             # definizione di tutte le rotte
    ├── firebase.js         # init Firebase Realtime Database da .env
    ├── api.js              # data layer: CRUD feed, seed, utente, immagini
    ├── data.js             # dati statici e helper puri (headline, testi seed)
    ├── App.css             # stili globali (header, footer, nav, toast, landing)
    ├── feed.css            # stili del feed
    ├── index.css           # reset/base
    ├── assets/css/         # CSS specifici (Menu, DropdownUser)
    └── components/         # tutti i componenti React
```

---

## Routing

Le rotte sono definite in `src/App.jsx`. Le pagine dell'app condividono
header e footer tramite il componente `Layout` (pattern con `<Outlet>`),
così header e footer **non si rimontano** navigando tra le sezioni.

| Rotta | Pagina | Tipo |
|-------|--------|------|
| `/` | `Landing` | pubblica |
| `/signup` | `SignUp` | pubblica |
| `/login` | `Login` | pubblica |
| `/home` | `Home` (feed) | app — sotto `Layout` |
| `/rete` | `Placeholder` "La mia rete" | app — sotto `Layout` |
| `/lavoro` | `Placeholder` "Lavoro" | app — sotto `Layout` |
| `/messaggi` | `Placeholder` "Messaggistica" | app — sotto `Layout` |
| `/notifiche` | `Placeholder` "Notifiche" | app — sotto `Layout` |
| `/profile` | `Profile` | autonoma (header/footer propri) |
| `*` | redirect a `/` | catch-all |

**Navigazione via URL:** `NavIcon` usa `Link` + `useLocation` e evidenzia
(classe `iconAttiva`) la voce la cui rotta combacia con l'URL corrente.

---

## Data layer

Il feed vive sul **Realtime Database** di Firebase: ci si iscrive con
`subscribeFeed` e la UI si aggiorna in tempo reale a ogni scrittura, anche
da altri utenti. Tutte le mutazioni passano da `src/api.js`.

### Funzioni principali (`src/api.js`)

| Funzione | Descrizione |
|----------|-------------|
| `CURRENT_USER` | utente corrente (finto): id, nome, headline, location, avatar |
| `subscribeFeed(cb)` | iscrizione al feed in tempo reale |
| `seedIfEmpty(n = 6)` | popola il DB con post di esempio se vuoto |
| `fetchPeople(n)` | persone casuali da randomuser.me (autori seed) |
| `addPost({ text, image })` | crea un nuovo post |
| `addComment(postId, text)` | aggiunge un commento |
| `toggleLike(postId, liked)` | mette/toglie like |
| `sharePost(postId)` | incrementa le condivisioni |
| `validateImageFile(file)` | valida tipo e peso dell'immagine |
| `processImage(file, maxSize=1080, quality=0.8)` | ridimensiona l'immagine lato client |
| `sanitizeImage(url)` | consente solo `data:image/...` o URL http(s) (anti-XSS) |
| `MAX_IMAGE_BYTES` / `ALLOWED_IMAGE_TYPES` | limiti: 30 MB, `image/jpeg` e `image/png` |

### Modello dati

```js
// Post (normalizzato da toPost)
{
  id, author: { name, headline, avatar },
  text, image, createdAt,
  likes,        // numero di like
  likedByMe,    // se il client corrente ha messo like
  shares,
  comments: [ { id, author: { name, avatar }, text, createdAt } ]
}
```

Non essendoci autenticazione, l'identità di "chi mette like" è un id stabile
del client salvato in `localStorage` (`clientId()`).

---

## Componenti

### Layout e navigazione
- `Layout` — struttura condivisa: `Header` + `Container`/`Outlet` + `FooterNav`
- `Header` — barra superiore sticky (logo, ricerca, icone, menu)
- `Search` — ricerca a scomparsa (lente → campo)
- `Icon` — icone di navigazione (dropdown su mobile, in linea da `md`)
- `Menu` — menu a tendina "Per le aziende"
- `DropdownUser` / `User` — menu utente (profilo, logout)
- `NavIcon` + `HomeIcon`/`NetworkIcon`/`JobIcon`/`ChatIcon`/`NotificationIcon`
- `FooterNav` — barra inferiore mobile
- `Logo` — logo cliccabile verso `/home`

### Feed
- `Feed` — colonna centrale, iscritta al DB
- `CreatePost` — box di pubblicazione (testo + immagine)
- `Post` / `PostActions` — post singolo e barra azioni
- `Comments` / `Comment` — commenti
- `RightAside` / `News` / `NewsCard` — colonna destra (news)
- `Sidebar` / `ProfileCard` — colonna sinistra (profilo + scorciatoie)

### Pagine
- `Landing` — home pubblica
- `SignUp` / `Login` — registrazione e accesso
- `Profile` — pagina profilo
- `Placeholder` — segnaposto riusabile per le sezioni non sviluppate
- `LandingFooter` / `Footer` — footer

### Extra
- `PremiumToast` — toast Premium (chiusura automatica a 5 s)
- `Puzzle` / `Banner` / `Pubblicta` — elementi decorativi/pubblicitari

---

## Scelte architetturali

- **Layout condiviso (`<Outlet>`):** header e footer restano montati mentre si
  naviga tra le pagine dell'app → nessun flicker, stato preservato.
- **Navigazione guidata dall'URL:** la voce attiva deriva da `useLocation`,
  senza stato/context globale da tenere sincronizzato.
- **Firebase opzionale:** l'app degrada con eleganza se non configurato.
- **Sicurezza immagini:** `sanitizeImage` accetta solo `data:image/...` o
  URL http(s), scartando schemi pericolosi (es. `javascript:`) per prevenire XSS.
- **Nessun backend di autenticazione:** login/registrazione sono simulati e
  portano al feed; l'identità del client per i like è un id in `localStorage`.

---

## Deploy

Il progetto include la configurazione per le regole del Realtime Database
([firebase.json](firebase.json) + [database.rules.json](database.rules.json)):

```bash
# richiede firebase-tools installato e login effettuato
firebase deploy --only database
```

Per pubblicare il frontend, esegui `npm run build` e servi la cartella `dist/`
(es. Firebase Hosting, Netlify, Vercel).

---

## Problemi noti

- `src/components/Sidebar.jsx` ha un warning ESLint (`setState` dentro
  `useEffect`, per il ripristino da `localStorage`): non bloccante per il build.
- Le regole del Realtime Database sono **aperte** (`.read`/`.write` = `true`):
  vanno bene per la Build Week, ma **non** per la produzione.
- L'autenticazione è simulata: non c'è verifica reale delle credenziali.
