# Build Week 3 — Clone di LinkedIn

Applicazione web che riproduce le pagine principali di LinkedIn (landing, autenticazione, feed, profilo) con un feed in tempo reale su Firebase.

---

## Stack tecnologico

| Ambito | Tecnologia |
|--------|-----------|
| UI | React 19 |
| Build tool | Vite 8 |
| Routing | react-router-dom 7 |
| Stile | Bootstrap 5 + Bootstrap Icons + react-bootstrap |
| Backend dati | Firebase Realtime Database |
| Caroselli | Swiper |
| Lint | ESLint |

---

## Come avviare il progetto

```bash
# 1. Installa le dipendenze
npm install

# 2. Configura Firebase (opzionale ma consigliato)
#    copia .env.example in .env.local e inserisci le variabili VITE_FIREBASE_*
cp .env.example .env.local

# 3. Avvia in sviluppo
npm run dev
```

Script disponibili:
- `npm run dev` — server di sviluppo con hot reload
- `npm run build` — build di produzione in `dist/`
- `npm run preview` — anteprima della build
- `npm run lint` — controllo ESLint

> **Firebase è opzionale.** Se `.env.local` non è configurato, l'app parte
> comunque: il feed mostra un messaggio che invita a configurare Firebase
> (vedi `isFirebaseConfigured` in `src/firebase.js`).

---

## Struttura delle cartelle

```
src/
├── main.jsx            # entry point: monta App dentro <BrowserRouter>
├── App.jsx             # definizione di tutte le rotte
├── firebase.js         # init Firebase Realtime Database da variabili .env
├── api.js              # data layer: CRUD del feed, seed, utente corrente
├── data.js             # dati statici e helper puri (headline, testi seed)
├── App.css / feed.css / index.css   # stili globali
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
| `/home` | `Home` (feed) | app (sotto `Layout`) |
| `/rete` | `Placeholder` "La mia rete" | app (sotto `Layout`) |
| `/lavoro` | `Placeholder` "Lavoro" | app (sotto `Layout`) |
| `/messaggi` | `Placeholder` "Messaggistica" | app (sotto `Layout`) |
| `/notifiche` | `Placeholder` "Notifiche" | app (sotto `Layout`) |
| `/profile` | `Profile` | autonoma (header/footer propri) |
| `*` | redirect a `/` | catch-all |

### Navigazione
La navigazione è **guidata dall'URL**: `NavIcon` usa `Link` + `useLocation`
e evidenzia (classe `iconAttiva`) la voce la cui rotta combacia con l'URL
corrente. Non c'è più un context condiviso per lo stato attivo.

---

## Data layer (`src/api.js`)

Il feed vive sul **Realtime Database** di Firebase: ci si iscrive con
`subscribeFeed` e la UI si aggiorna in tempo reale a ogni scrittura, anche
da altri utenti.

Funzioni principali:
- `CURRENT_USER` — l'utente corrente (finto): nome, headline, avatar, ecc.
- `subscribeFeed(cb)` — ascolta il feed in tempo reale
- `seedIfEmpty()` — popola il DB con post di esempio se vuoto (usa
  randomuser.me per gli autori e i testi in `data.js`)
- `addPost`, `addComment`, `toggleLike`, `sharePost` — mutazioni del feed
- `validateImageFile`, `processImage`, `sanitizeImage` — gestione immagini
  dei post (ridimensionamento client-side, limiti di tipo/peso)

---

## Componenti principali

### Layout e navigazione
- `Layout` — struttura condivisa: `Header` + `Container`/`Outlet` + `FooterNav`
- `Header` — barra superiore sticky (logo, ricerca, icone, menu utente)
- `Search` — ricerca a scomparsa: sotto `lg` è solo una lente, si espande al click
- `Icon` — icone di navigazione (dropdown su mobile, in linea da `md`)
- `Menu` — menu a tendina "Per le aziende"
- `DropdownUser` / `User` — menu utente (Visualizza profilo → `/profile`, logout → `/`)
- `NavIcon` + `HomeIcon`/`NetworkIcon`/`JobIcon`/`ChatIcon`/`NotificationIcon` — voci nav riusabili
- `FooterNav` — barra inferiore in stile mobile (visibile solo sotto `lg`)
- `Logo` — logo cliccabile che riporta a `/home`

### Feed
- `Feed` — colonna centrale: si iscrive al DB e mostra i post
- `CreatePost` — box per pubblicare un nuovo post (testo + immagine)
- `Post` / `PostActions` — singolo post e barra azioni (like, commento, condividi)
- `Comments` / `Comment` — commenti di un post
- `RightAside` / `News` / `NewsCard` — colonna destra con news
- `Sidebar` / `ProfileCard` — colonna sinistra (profilo + scorciatoie)

### Pagine
- `Landing` — home pubblica (accesso, link a signup/login)
- `SignUp` / `Login` — form di registrazione e accesso (senza backend reale:
  portano direttamente al feed)
- `Profile` — pagina profilo utente completa
- `Placeholder` — pagina segnaposto riusabile per le sezioni non ancora sviluppate
- `LandingFooter` / `Footer` — footer delle pagine

### Extra
- `PremiumToast` — toast promozionale Premium (vedi sotto)
- `Puzzle` / `Banner` / `Pubblicta` — elementi decorativi/pubblicitari

---

## PremiumToast (toast Premium)

Toast promozionale mostrato in basso a destra. È montato globalmente in
`App.jsx` e reagisce all'evento personalizzato `showPremiumToast`, lanciato
dalla `Sidebar` (`window.dispatchEvent(new Event('showPremiumToast'))`).

- **Si chiude automaticamente dopo un timer di 5 secondi** (costante
  `DURATA_TOAST = 5000` in `src/components/PremiumToast.jsx`); il timer
  viene azzerato in modo pulito allo smontaggio o alla chiusura manuale.
- Può essere chiuso anche manualmente con la ✕ o col pulsante "Prova ora".

---

## Note

- `src/components/Sidebar.jsx` ha un warning ESLint noto (`setState` dentro
  `useEffect`) legato al ripristino dei dati da `localStorage`: non
  bloccante per il build.
- Le variabili Firebase stanno in `.env.local` (non committato); l'elenco è
  in `.env.example`.
