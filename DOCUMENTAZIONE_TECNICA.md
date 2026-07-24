# Documentazione tecnica — LinkedIn Clone (Build Week 3)

Spiegazione dettagliata del funzionamento, della logica e del flusso dell'applicazione.
Team EPICODE. Stack: React 19 + Vite 8 + React Router 7 + React‑Bootstrap + Firebase 12.

---

## Indice

1. [Panoramica generale](#1-panoramica-generale)
2. [Stack tecnologico](#2-stack-tecnologico)
3. [Struttura delle cartelle](#3-struttura-delle-cartelle)
4. [Bootstrap dell'app: dal browser al primo render](#4-bootstrap-dellapp-dal-browser-al-primo-render)
5. [Sistema di routing](#5-sistema-di-routing)
6. [Autenticazione (Firebase Auth + Context)](#6-autenticazione-firebase-auth--context)
7. [Layout e navigazione](#7-layout-e-navigazione)
8. [Il feed: livello dati (api.js + Realtime Database)](#8-il-feed-livello-dati-apijs--realtime-database)
9. [Il feed: componenti UI](#9-il-feed-componenti-ui)
10. [Sidebar, profilo e persistenza locale](#10-sidebar-profilo-e-persistenza-locale)
11. [La sezione Lavori (API Strive + offerte salvate)](#11-la-sezione-lavori-api-strive--offerte-salvate)
12. [La messaggistica (dock desktop + pagina mobile)](#12-la-messaggistica-dock-desktop--pagina-mobile)
13. [Le notifiche simulate (eventi + modalità silenziosa)](#13-le-notifiche-simulate-eventi--modalità-silenziosa)
14. [Componenti UI riutilizzabili](#14-componenti-ui-riutilizzabili)
15. [Toast e modale Premium (comunicazione via eventi)](#15-toast-e-modale-premium-comunicazione-via-eventi)
16. [Sicurezza (XSS, immagini, avatar)](#16-sicurezza-xss-immagini-avatar)
17. [Configurazione e build](#17-configurazione-e-build)
18. [Flussi end-to-end](#18-flussi-end-to-end)
19. [Possibili miglioramenti](#19-possibili-miglioramenti)

---

## 1. Panoramica generale

L'applicazione è un **clone di LinkedIn** (SPA — Single Page Application) che riproduce
landing page, registrazione/login (email/password e Google), feed sociale in tempo
reale, pagina profilo, una sezione lavori con offerte reali da un'API esterna, una
messaggistica responsive e un sistema di notifiche simulate.

Due concetti reggono tutta l'architettura:

- **Routing basato su URL.** Ogni schermata è una rotta (`/`, `/login`, `/home`,
  `/profile`, …). La navigazione avviene cambiando URL, non mostrando/nascondendo
  componenti con stati locali. Questo rende l'app linkabile, con back/forward del
  browser funzionanti.
- **Dati del feed in tempo reale.** Il feed non ha uno stato "finto": legge e scrive
  su **Firebase Realtime Database**. Ogni modifica (post, like, commento, condivisione)
  si propaga a tutti i client collegati istantaneamente.

L'app è inoltre **degradabile con eleganza**: se Firebase non è configurato
(`.env.local` assente) non va in crash — l'autenticazione viene disattivata e il feed
mostra un messaggio informativo invece di rompersi.

---

## 2. Stack tecnologico

| Ambito            | Tecnologia                                   | Ruolo |
|-------------------|----------------------------------------------|-------|
| UI                | **React 19**                                 | Componenti, stato, hook |
| Build/dev server  | **Vite 8**                                   | Dev server, bundling, code‑splitting, alias `@` |
| Routing           | **react-router-dom 7**                       | Rotte, `Layout`/`Outlet`, guardie, lazy pages |
| Componenti UI     | **react-bootstrap 2** + **Bootstrap 5**      | Modali, dropdown, griglia, form |
| Icone             | **bootstrap-icons**                          | Icone `bi-*` |
| Backend/dati      | **Firebase 12** (Realtime Database + Auth)   | Persistenza feed + autenticazione |
| Offerte di lavoro | **API Strive** (`strive-benchmark.herokuapp.com`) | Elenco offerte (sola lettura, esterna) |
| Carosello         | **swiper**                                   | Componenti a scorrimento (aside/news) |
| Qualità           | **ESLint** + **Prettier**                    | Lint (con regole react-hooks) e formattazione |

Script npm (`package.json`):

- `dev` — avvia Vite in sviluppo
- `build` — build di produzione
- `preview` — anteprima della build
- `lint` — ESLint su tutto il progetto
- `format` / `format:check` — Prettier in scrittura / sola verifica

---

## 3. Struttura delle cartelle

Architettura **a feature-folder**: i file sono raggruppati per dominio, non per tipo.

```
src/
├── main.jsx                  # entry point: monta React, Router e AuthProvider
├── App.jsx                   # tabella delle rotte + Suspense + toast globale
├── App.css / index.css       # stili globali
│
├── pages/                    # una cartella = le "schermate" (rotte di primo livello)
│   ├── Landing.jsx           # "/"     landing pubblica
│   ├── Login.jsx             # "/login"
│   ├── SignUp.jsx            # "/signup"
│   ├── ForgotPassword.jsx    # "/forgot-password" (reset password via email)
│   ├── Home.jsx              # "/home" (le tre colonne del feed)
│   ├── Jobs.jsx              # "/lavoro" (offerte di lavoro, API Strive)
│   ├── Messages.jsx          # "/messaggi" (pagina chat, esperienza < 992px)
│   ├── Profile.jsx           # "/profile"
│   ├── Placeholder.jsx       # sezioni "in costruzione" (rete / notifiche)
│   └── profile/              # sotto-componenti + traduzioni della pagina profilo
│
├── layout/                   # struttura ricorrente: header, footer, nav, logo, ricerca
│   ├── Layout.jsx            # Header + <Outlet/> + FooterNav
│   ├── Header.jsx            # barra superiore
│   ├── Icon.jsx / NavIcon.jsx / navItems.js  # voci di navigazione
│   ├── FooterNav.jsx         # barra inferiore (mobile)
│   ├── DropdownUser.jsx      # menu utente + logout
│   └── ...                   # Logo, Search, Menu, LandingFooter, Footer
│
├── features/                 # domini funzionali
│   ├── auth/                 # autenticazione
│   │   ├── AuthProvider.jsx  # Provider del context (stato utente)
│   │   ├── auth-context.js   # createContext + useAuth + traduzione errori
│   │   ├── useGoogleLogin.js # hook condiviso per l'accesso con Google
│   │   ├── RequireAuth.jsx   # guardia: solo utenti loggati
│   │   └── PublicOnly.jsx    # guardia: solo NON loggati
│   ├── feed/                 # feed sociale
│   │   ├── Feed.jsx          # colonna centrale, orchestratore
│   │   ├── CreatePost.jsx    # composer del post
│   │   ├── Post.jsx / PostActions.jsx / Comments.jsx / Comment.jsx
│   │   ├── Sidebar.jsx / SidebarModals.jsx  # colonna sinistra + modali
│   │   ├── RightAside.jsx / News.jsx        # colonna destra
│   │   └── feed.css
│   ├── jobs/                 # sezione lavori (API Strive)
│   │   ├── JobCard.jsx       # singola offerta + bottone Salva
│   │   ├── SavedJobs.jsx     # pannello laterale offerte salvate
│   │   └── jobs.css
│   ├── messages/             # messaggistica
│   │   ├── ChatDock.jsx      # barra in fondo allo schermo (>= 992px)
│   │   ├── ChatList.jsx      # elenco conversazioni (condiviso)
│   │   ├── Conversation.jsx  # thread + invio messaggio (condiviso)
│   │   ├── useChats.js       # stato chat + persistenza localStorage
│   │   ├── messagesData.js   # conversazioni di esempio
│   │   └── messages.css
│   └── notifications/        # notifiche simulate
│       ├── useNotifiche.js   # elenco + contatore delle nuove
│       ├── NotificheToast.jsx / NotificaItem.jsx
│       ├── notificheData.js  # dati iniziali + simulazione di arrivo
│       └── silenzioso.js     # modalità silenziosa (stato via evento window)
│
├── ui/                       # componenti presentazionali riutilizzabili
│   ├── Card.jsx, ProfileImage.jsx, Banner.jsx, ...
│   ├── PremiumToast.jsx      # toast Premium (evento window)
│   └── PremiumModal.jsx      # modale Premium dopo il login (chiudibile a 5s)
│
└── lib/                      # logica non-React (dati, API, config)
    ├── firebase.js           # init Firebase (db + auth)
    ├── api.js                # tutte le letture/scritture del feed
    ├── data.js               # helper puri (rand, timeAgo, initialsAvatar) + dati seed
    ├── jobs.js               # fetch offerte API Strive + HTML→testo, formattazioni
    └── savedJobs.js          # persistenza offerte salvate (localStorage)
```

**Perché così?** Tutto ciò che riguarda l'auth vive in `features/auth`, tutto il feed
in `features/feed`. Aprendo una cartella si ha l'intero dominio davanti, senza saltare
tra `components/`, `hooks/`, `utils/`. `lib/` isola la logica pura (testabile e
riusabile) dai componenti.

**Alias `@`** → `src/`. Ogni import usa percorsi assoluti (`@/features/feed/Feed`)
invece di relativi fragili (`../../features/feed/Feed`). Configurato in
`vite.config.js` e `jsconfig.json`.

---

## 4. Bootstrap dell'app: dal browser al primo render

`src/main.jsx` è il punto d'ingresso. Monta l'albero React nel `<div id="root">`:

```jsx
createRoot(document.getElementById("root")).render(
  <BrowserRouter>          {/* 1. abilita il routing basato su URL          */}
    <AuthProvider>         {/* 2. rende disponibile lo stato di login ovunque */}
      <App />              {/* 3. la tabella delle rotte                     */}
    </AuthProvider>
  </BrowserRouter>
);
```

L'ordine dei wrapper è importante ed è una **catena di dipendenze**:

1. `BrowserRouter` deve stare più in alto: le guardie e i link usano gli hook del
   router (`useNavigate`, `useLocation`, `Navigate`).
2. `AuthProvider` sta dentro il router ma sopra `App`: così ogni pagina può leggere
   lo stato utente con `useAuth()`, e le guardie (che stanno dentro `App`) possono
   sia leggere l'auth sia reindirizzare.
3. `App` contiene la mappa delle rotte.

---

## 5. Sistema di routing

Definito in `src/App.jsx`. Concetti chiave:

### 5.1 Lazy loading + Suspense

Ogni pagina è caricata **on-demand** con `lazy()`:

```jsx
const Home = lazy(() => import("@/pages/Home"));
```

Vite genera un chunk separato per ogni pagina: il bundle iniziale resta leggero e il
codice del feed/profilo si scarica solo quando serve. `<Suspense fallback={null}>`
avvolge le rotte e gestisce l'attesa del chunk.

### 5.2 Rotte pubbliche, protette e guardie

```jsx
<Routes>
  <Route path="/" element={<Landing />} />            {/* pubblica sempre */}

  {/* Registrazione: raggiungibile anche da loggati (vedi sotto) */}
  <Route path="/signup" element={<SignUp />} />

  <Route element={<PublicOnly />}>                    {/* solo NON loggati */}
    <Route path="/login"           element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
  </Route>

  <Route element={<RequireAuth />}>                   {/* solo loggati */}
    <Route path="/profile" element={<Profile />} />   {/* header/footer propri */}

    <Route element={<Layout />}>                       {/* header/footer condivisi */}
      <Route path="/home"      element={<Home />} />
      <Route path="/rete"      element={<Placeholder titolo="La mia rete" />} />
      <Route path="/lavoro"    element={<Jobs />} />
      <Route path="/messaggi"  element={<Messages />} />
      <Route path="/notifiche" element={<Placeholder titolo="Notifiche" />} />
    </Route>
  </Route>

  <Route path="*" element={<Navigate to="/" replace />} />  {/* URL sconosciuti */}
</Routes>
```

Meccanismo delle **rotte annidate**: un `<Route element={...}>` senza `path` è una
rotta di layout. Il suo elemento (es. `PublicOnly`, `RequireAuth`, `Layout`) viene
renderizzato e, dove mette un `<Outlet/>`, React Router inserisce la rotta figlia
corrispondente all'URL.

- `PublicOnly` e `RequireAuth` fanno da "filtro": renderizzano `<Outlet/>` (lasciano
  passare) oppure `<Navigate/>` (reindirizzano).
- `Layout` è puramente strutturale: header in alto, `<Outlet/>` al centro, footer nav
  in basso. Header e footer restano **montati** navigando tra `/home`, `/rete`, …
  (cambia solo il contenuto centrale — niente flicker).
- `/profile` sta dentro `RequireAuth` ma **fuori** da `Layout`, perché la pagina
  profilo ha header/footer propri.
- `/lavoro` (§11) e `/messaggi` (§12) sono pagine reali; `/rete` e `/notifiche` usano
  ancora il `Placeholder` "in costruzione".
- **`/signup` sta fuori da `PublicOnly`**: è raggiungibile anche da autenticati. Serve
  perché dalla landing il pulsante "Join now" deve mostrare il modulo di
  registrazione (per creare un nuovo account) invece di far entrare direttamente nel
  feed. Il login, al contrario, resta riservato ai non autenticati.
- La catch-all `*` riporta alla landing gli URL inesistenti.

---

## 6. Autenticazione (Firebase Auth + Context)

L'auth usa **Firebase Authentication** (solo Email/Password) ed è esposta a tutta
l'app tramite un **React Context**.

### 6.1 Inizializzazione — `lib/firebase.js`

La config arriva da variabili d'ambiente Vite (`import.meta.env.VITE_FIREBASE_*`),
lette dal file `.env.local` (non committato). Firebase è considerato "configurato"
solo se è presente l'URL del Realtime Database:

```js
export const isFirebaseConfigured = Boolean(cfg.databaseURL);

let db = null, auth = null;
if (isFirebaseConfigured) {
  const app = initializeApp(cfg);
  db   = getDatabase(app);
  auth = getAuth(app);
}
```

Se non configurato, `db` e `auth` restano `null`: tutto il resto del codice controlla
questi valori e degrada senza crashare (mostra un avviso in console).

### 6.2 Il Provider — `features/auth/AuthProvider.jsx`

Tiene lo stato dell'utente e lo distribuisce via context:

- `user` — l'oggetto utente Firebase (o `null` se non loggato).
- `nomeCompleto` — nome e cognome. **Tenuto in uno stato separato** apposta: Firebase
  muta il suo oggetto `User` "in place" quando si chiama `updateProfile`, quindi
  cambiare `displayName` da solo non farebbe ri-renderizzare React. Uno stato dedicato
  forza il refresh.
- `loading` — inizializzato con `useState(Boolean(auth))`. Se Firebase c'è, parte
  `true` (dobbiamo attendere il primo controllo di sessione); se non c'è, parte
  `false` (niente da aspettare). Inizializzarlo così — invece di settarlo dentro un
  `useEffect` — evita il warning ESLint `set-state-in-effect` ed elimina un render
  intermedio.

Il listener `onAuthStateChanged` mantiene sincronizzato l'utente a ogni login/logout:

```js
useEffect(() => {
  if (!auth) return;
  const unsub = onAuthStateChanged(auth, (u) => {
    setUser(u);
    setNomeCompleto(u?.displayName || "");
    setLoading(false);
  });
  return () => unsub();          // cleanup: annulla l'iscrizione allo smontaggio
}, []);
```

Il valore esposto dal context:

```js
const value = {
  user,
  loading,
  nomeCompleto: nomeCompleto || user?.email?.split("@")[0] || "", // fallback: parte prima della @
  enabled: Boolean(auth),        // true solo se Firebase è configurato
  avatar, setAvatar,             // foto profilo unica per tutta l'app (localStorage)
  signup,                        // crea account + salva nome/cognome nel displayName
  loginWithGoogle,               // accesso con Google (popup)
  login:  (email, pw) => signInWithEmailAndPassword(auth, email, pw),
  logout: ()          => signOut(auth),
  resetPassword: (email) => sendPasswordResetEmail(auth, email),
};
```

`avatar`/`setAvatar` stanno qui (e non in un componente) perché la stessa foto serve
in punti lontani dell'albero — sidebar, navbar, composer, banner — ed è persistita in
`localStorage`.

`signup` fa due cose in sequenza: crea l'account, poi scrive `"Nome Cognome"` nel
`displayName` con `updateProfile`, così l'app mostra il nome invece dell'email.

### 6.3 Il context — `features/auth/auth-context.js`

File **separato** dal Provider apposta (per non far scattare il warning di React Fast
Refresh, che si lamenta se un file esporta sia componenti sia valori non-componenti).
Espone:

- `AuthContext` — l'oggetto context.
- `useAuth()` — hook di comodo (`useContext(AuthContext)`).
- `authErrorMessage(code)` — traduce i codici d'errore Firebase
  (`auth/invalid-credential`, `auth/email-already-in-use`, …) in messaggi italiani
  leggibili; fallback generico per codici non mappati.

### 6.4 Le guardie — `RequireAuth.jsx` / `PublicOnly.jsx`

Stessa struttura logica, esiti opposti:

```js
// RequireAuth — protegge le pagine app
if (!enabled) return <Outlet />;               // Firebase off → passa tutti
if (loading)  return null;                     // ancora non so → non mostro nulla (no flash)
if (!user)    return <Navigate to="/login" replace />;
return <Outlet />;

// PublicOnly — login/signup riservati ai NON loggati
if (!enabled) return <Outlet />;
if (loading)  return null;
if (user)     return <Navigate to="/home" replace />;
return <Outlet />;
```

L'ordine dei controlli è essenziale: prima `enabled` (degradazione), poi `loading`
(evita il "flash" di contenuto sbagliato mentre Firebase controlla la sessione), poi
la decisione utente. `replace` evita di sporcare la cronologia del browser con le
redirezioni.

### 6.5 Login / SignUp / Logout

- **Login** (`pages/Login.jsx`) e **SignUp** (`pages/SignUp.jsx`) sono form
  controllati. Al submit: se `!enabled` vanno dritti a `/home` (nessuna auth reale);
  altrimenti chiamano `login`/`signup`, gestiscono `submitting` (disabilita il
  bottone) e mostrano gli errori tradotti. In caso di successo → `navigate("/home")`.
  Entrambi hanno il toggle mostra/nascondi password.
- **Logout** (`layout/DropdownUser.jsx`, voce "Esci"): se `enabled` chiama `logout()`,
  poi `navigate("/")`. Il listener `onAuthStateChanged` azzera `user`, così le guardie
  scattano automaticamente.

Il bottone "Sign in with Apple" resta **decorativo** (porta a `/home` senza auth reale);
Google invece è un accesso vero, vedi sotto.

### 6.6 Accesso con Google — `useGoogleLogin.js`

Il provider espone `loginWithGoogle()`, che apre il popup di Google:

```js
function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
```

Firebase importa automaticamente **nome e foto** dal profilo Google (finiscono in
`displayName`/`photoURL`, già usati dall'app).

Il pulsante "Continue with Google" compare in **tre pagine** (Landing, Login, SignUp):
per non ripetere la stessa logica tre volte c'è l'hook `useGoogleLogin()`, che
incapsula popup, redirect a `/home`, stato di attesa ed errore, e restituisce
`{ handleGoogle, error, loading }`. Dettaglio importante: se l'utente **chiude il
popup** (`auth/popup-closed-by-user`, `auth/cancelled-popup-request`) non viene
mostrato alcun errore, perché non è un vero fallimento.

Lato Firebase serve il provider Google abilitato in console e il dominio tra gli
*Authorized domains* (`localhost` lo è già di default).

### 6.7 Recupero password — `pages/ForgotPassword.jsx`

Form con la sola email che chiama `resetPassword(email)`
(`sendPasswordResetEmail`), poi mostra una schermata di conferma. Scelta di sicurezza:
se Firebase risponde `auth/user-not-found` la pagina **mostra comunque la conferma**,
per non rivelare quali email sono registrate (evita l'enumerazione degli account).

---

## 7. Layout e navigazione

### 7.1 `Layout.jsx`

Il guscio comune delle pagine app: `<Header/>`, un `<Container>` con `<Outlet/>` per il
contenuto della rotta, e `<FooterNav/>`. Header e footer restano montati durante la
navigazione tra le sezioni.

Qui vivono anche i due elementi "flottanti" presenti su tutte le pagine dell'app:
`<NotificheToast/>` (§13) e `<ChatDock/>` (§12). Stanno nel Layout proprio perché
devono sopravvivere al cambio di rotta.

### 7.2 `Header.jsx`

Barra superiore a tutta larghezza con un `Container` interno che allinea il contenuto.
Tiene lo **stato `ricercaAperta`**: quando la ricerca è aperta il logo si nasconde
(fino a `lg`) per far spazio al campo. Ospita `Logo`, `Search`, `Icon` e `Menu`.

### 7.3 Navigazione data-driven — `navItems.js` + `NavIcon.jsx`

Le voci di navigazione sono **un'unica fonte dati** (`NAV_ITEMS`): home, rete, lavoro,
messaggi, notifiche, ognuna con `{ to, src, alt, testo }`.

- `Icon.jsx` (header) e `FooterNav.jsx` (barra inferiore) **mappano** su sottoinsiemi
  ordinati di `NAV_ITEMS` — ognuno sceglie il proprio ordine (nell'header "Lavoro" è
  al centro, nel footer in fondo). Aggiungere una voce = modificare un solo file.
- `NavIcon.jsx` è la singola voce. Usa `useLocation()` per capire se è **attiva**
  (`pathname === to`) e in tal caso aggiunge la classe `iconAttiva` (bordo inferiore).
  La classe è costruita con array+`filter(Boolean)` invece di ternari:

  ```js
  const className = ["...iconContainer", attiva && "iconAttiva"]
    .filter(Boolean)
    .join(" ");
  ```

### 7.4 Responsive

`Icon.jsx` mostra le icone in linea da `md` in su; sotto `md` le raccoglie in un
`Dropdown` (menu ☰). `FooterNav` compare solo su mobile (`d-md-none`). Così la stessa
sorgente dati serve tre presentazioni (header desktop, menu mobile, footer mobile).

### 7.5 Menu utente — `DropdownUser.jsx`

Avatar + "Tu" con dropdown. Mostra `nomeCompleto` (da `useAuth`) e il titolo
dell'ultima esperienza salvata (letta da `localStorage`, la stessa chiave della
Sidebar — rilettura a ogni apertura del menu per restare allineati). Contiene
"Visualizza profilo" (→ `/profile`) e "Esci" (logout).

---

## 8. Il feed: livello dati (api.js + Realtime Database)

Tutta la logica dati del feed è in **`lib/api.js`**: i componenti non toccano mai
Firebase direttamente, chiamano solo queste funzioni. Questo isola la persistenza e
rende i componenti UI "stupidi".

### 8.1 Modello dati su Realtime Database

Struttura ad albero JSON sotto `posts/`:

```
posts/
  <postId>/
    authorName, authorHeadline, authorAvatar
    text, image, createdAt, shares
    likes/    { <clientId>: true, ... }   → il conteggio = numero di chiavi
    comments/ { <commentId>: { authorName, authorAvatar, text, createdAt } }
```

I **like sono modellati come un set di chiavi** (`likes/<clientId> = true`), non come
un numero. Vantaggio: niente race condition sul conteggio e sappiamo *chi* ha messo
like. Il totale è `Object.keys(likes).length`.

### 8.2 Chi è l'utente corrente

- `CURRENT_USER` — mock di fallback (dati dello screenshot, avatar generato offline).
- `getCurrentUser()` — se c'è un login Firebase usa i suoi dati
  (`uid`, `displayName`/`email`, `photoURL`); altrimenti ripiega su `CURRENT_USER`.
  È il ponte tra l'auth e i dati del feed.
- `clientId()` — id stabile salvato in `localStorage`: identifica "chi" mette like
  anche **senza autenticazione** (necessario perché i like sono per-client).

### 8.3 Seed automatico — `seedIfEmpty()`

Alla prima apertura, se `/posts` è vuoto, genera post iniziali realistici:

1. Scarica `n` persone casuali da **randomuser.me** (`fetchPeople`).
2. Per ognuna costruisce un post seed (`buildSeedPost`) con testo/immagine di esempio
   (da `data.js`), like fittizi (`buildSeedLikes`) e qualche commento (`buildSeedComments`),
   con `createdAt` scaglionati nel tempo.
3. Scrive tutto in **un'unica operazione batch** (`update(ref(db), updates)`), per non
   fare N scritture separate.

### 8.4 Lettura in tempo reale — `subscribeFeed(cb)`

Cuore del realtime. Si iscrive a `posts/` con `onValue`: a **ogni** cambiamento del DB
(anche da altri utenti) Firebase richiama la callback con lo snapshot aggiornato. La
funzione converte i nodi grezzi nel formato UI (`toPost`), ordina per data decrescente
(più recenti in cima) e passa l'array a `cb`. Ritorna la funzione di
**annullamento iscrizione**, da chiamare nel cleanup dell'effect.

Se `db` è `null` (Firebase off), chiama `cb([])` e ritorna una no-op: il feed resta
vuoto ma non crasha.

### 8.5 Scritture

Tutte controllano `if (!db) return` (no-op senza Firebase):

- `addPost({text, image})` — crea un nuovo nodo post con `push`, autore = `getCurrentUser()`,
  immagine passata da `sanitizeImage`.
- `addComment(postId, text)` — aggiunge un commento sotto il post.
- `toggleLike(postId, liked)` — se già like → `remove` della propria chiave; altrimenti
  `set(..., true)`. Un like per client.
- `sharePost(postId)` — incrementa il contatore condivisioni in modo **atomico** con
  `runTransaction` (sicuro anche con incrementi concorrenti).

Nota: le scritture **non aggiornano lo stato locale**. Il refresh arriva sempre da
`subscribeFeed` (fonte di verità unica → nessuna divergenza tra UI e DB).

### 8.6 Immagini — `processImage` / `sanitizeImage`

Le immagini dei post sono salvate come **data URL direttamente nel DB** (non c'è uno
storage di file). Per non appesantirlo:

- `validateImageFile` — accetta solo JPEG/PNG e max 30 MB, altrimenti lancia errore.
- `processImage` — carica il file in un `<canvas>`, lo **ridimensiona** mantenendo le
  proporzioni (lato max 1080px) e lo **ricomprime** in JPEG qualità 0.8, restituendo un
  data URL compatto. Rilascia sempre l'`objectURL` temporaneo.
- `sanitizeImage` — accetta solo `data:image/...` o URL `http(s)`, scarta schemi
  pericolosi (es. `javascript:`) → difesa anti-XSS (vedi §16).

---

## 9. Il feed: componenti UI

### 9.1 `Home.jsx` — le tre colonne

Griglia Bootstrap: Sidebar (sx), Feed (centro), RightAside (dx), con una colonna
invisibile per la spaziatura responsive.

### 9.2 `Feed.jsx` — l'orchestratore

Colonna centrale. Nel `useEffect` iniziale: `seedIfEmpty()` poi `subscribeFeed`, con
cleanup che annulla l'iscrizione. Stato `posts` + `loading`. Espone quattro handler
(`publish`, `comment`, `like`, `share`) che **delegano** ad `api.js` — la UI si
riaggiorna da sola tramite la subscription. Mostra messaggi diversi se Firebase non è
configurato o se sta ancora caricando.

### 9.3 `CreatePost.jsx` — il composer

Box "Crea un post". Stati: `open` (composer espanso), `text`, `image` (data URL),
`processing`. Flusso immagine: click su Foto/Video → apre l'input file nascosto →
`onFile` chiama `processImage` (mostra "Elaboro…" durante l'attesa) → anteprima con
bottone di rimozione. `publish()` invia solo se c'è testo o immagine, poi resetta. I
tre bottoni azione sono definiti come **dati** (`actions[]`) per non ripetere markup.

### 9.4 `Post.jsx` + `PostActions.jsx` + `Comments.jsx`

- `Post` — intestazione autore, testo, immagine, contatori (like/commenti/condivisioni,
  `timeAgo` per la data), azioni, e sezione commenti a scomparsa (`showComments`).
- `PostActions` — Mi piace / Commenta / Condividi. Il bottone like si evidenzia in blu
  (`action-btn--active`) se `liked`.
- `Comments` — form per un nuovo commento (input controllato, invio disabilitato se
  vuoto) + elenco commenti renderizzati con `Comment`.

Tutti i callback risalgono al `Feed` che chiama `api.js`.

---

## 10. Sidebar, profilo e persistenza locale

### 10.1 `Sidebar.jsx` (colonna sinistra del feed)

Card profilo con avatar caricabile, nome (`nomeCompleto` da `useAuth`) e **gestione
esperienze**. Le esperienze sono persistite in **`localStorage`** (chiave
`profileExperiences`), non su Firebase — sono dati locali dell'utente.

Punti tecnici:

- Stati inizializzati **lazy** da `localStorage` (`useState(() => …)`): niente
  `setState` dentro un effect (evita il warning ESLint e un render in più).
- CRUD esperienze: aggiungi/modifica (via `ExperienceModal`), elimina (dal modale) e
  rimozione rapida con la "×" (`handleRemoveExperience`, con `stopPropagation` per non
  aprire il modale). Ogni modifica riscrive `localStorage`.
- L'avatar caricato viene letto con `FileReader` come data URL e salvato in
  `localStorage` (`profileAvatar`).

### 10.2 `SidebarModals.jsx` — `ExperienceModal`

Form completo dell'esperienza (titolo, azienda, località, descrizione con contatore,
mese/anno inizio-fine, checkbox "lavoro attuale" che nasconde la data di fine). Liste
`MESI` e `ANNI` (ultimi 60) generate una volta. Un `useEffect` **sincronizza** i campi
all'apertura del modale con `initialData`; su questo effect è disattivata localmente la
regola `set-state-in-effect` con commento di giustificazione (è un uso legittimo:
sync con una prop esterna). Nel file anche i modali secondari (`SavedItemsModal`,
`GroupsModal`, `NewsletterModal`, `EventsModal`), puramente presentazionali.

### 10.3 `Profile.jsx` + `pages/profile/`

Pagina profilo estesa (sezioni editabili, colonna laterale `ProfileAside`, modali
`ProfileModals`, dati in `profileData`). Ha header/footer propri → rotta autonoma fuori
dal `Layout`.

---

## 11. La sezione Lavori (API Strive + offerte salvate)

La rotta `/lavoro` mostra offerte di lavoro reali prese da un'API esterna pubblica
(**Strive**, `https://strive-benchmark.herokuapp.com/api/jobs`). È **sola lettura**:
non scriviamo nulla sull'API. Le uniche scritture riguardano le "offerte salvate", che
restano in `localStorage` (dati locali dell'utente, come le esperienze del profilo).

### 11.1 Livello dati — `lib/jobs.js`

Isola l'accesso all'API dai componenti (stessa filosofia di `api.js` per il feed):

- `fetchJobs({ search, limit })` — costruisce la query con `URLSearchParams`
  (`search` filtra per parola chiave, `limit` limita i risultati) e ritorna l'array
  `data`. Lancia un errore leggibile se la risposta non è ok.
- `htmlToText(html)` — **punto chiave di sicurezza**: la `description` dell'API arriva
  in **HTML**, quindi non va mai iniettata nel DOM. La convertiamo in testo semplice con
  `DOMParser().parseFromString(html, "text/html")` leggendo solo `body.textContent`:
  il documento è **inerte** (non esegue script né carica risorse) e non usiamo mai
  `innerHTML`. Vedi §16.
- `excerpt(text, max)` — accorcia il testo con i puntini di sospensione.
- `jobTypeLabel(type)` — traduce i tipi di contratto in italiano (`full_time` →
  "Tempo pieno", …), con fallback se il valore è vuoto o sconosciuto.
- `formatDate(iso)` — data di pubblicazione in formato italiano (`toLocaleDateString`).
- `safeUrl(url)` — consente solo URL `http(s)`, scartando schemi pericolosi
  (es. `javascript:`) prima di usarli come `href` del link esterno.

### 11.2 La card — `features/jobs/JobCard.jsx`

Singola offerta: ruolo, azienda, badge del tipo di contratto, riga meta
(località / categoria / data), estratto della descrizione (testo semplice) e due
azioni:

- **"Vedi offerta"** — link all'annuncio originale, aperto in nuova scheda con
  `target="_blank"` + `rel="noopener noreferrer"` (URL filtrato da `safeUrl`).
- **"Salva" / "Salvata"** — bottone toggle. Etichetta e icona
  (segnalibro vuoto/pieno) sono calcolate con `if` e la classe con array + `filter`,
  evitando gli operatori ternari nel JSX (coerente con `NavIcon`).

### 11.3 Persistenza — `lib/savedJobs.js`

Le offerte salvate vivono in `localStorage` (chiave `savedJobs`):

- `readSavedJobs()` / `writeSavedJobs(saved)` — lettura/scrittura dell'elenco.
- `toggleSavedJob(saved, job)` — aggiunge o rimuove (in base all'`_id`) e ritorna il
  **nuovo** elenco senza scrivere (la persistenza la decide chi chiama, dopo aver
  aggiornato lo stato). Salva solo una **versione compatta** dei campi
  (`_id`, `title`, `company_name`, località, `url`) per non appesantire lo storage con
  le lunghe descrizioni HTML.

### 11.4 Il pannello laterale — `features/jobs/SavedJobs.jsx`

Colonna destra con l'elenco delle offerte salvate: titolo (link sicuro), azienda e "×"
per rimuovere. Usa la classe `sidebar-fixed` (`position: sticky`), quindi **resta
sempre visibile** scorrendo la lista. Include lo stato vuoto.

### 11.5 La pagina — `pages/Jobs.jsx`

Layout a **tre colonne** dentro il `Layout` condiviso:

```
[ Sidebar profilo (sx) ] [ ricerca + offerte (centro) ] [ Offerte salvate (dx) ]
```

Entrambe le colonne laterali sono **sticky** (`sidebar-fixed`), così restano sempre in
vista. Punti tecnici:

- Lo stato `saved` è **sollevato nella pagina** (unica fonte di verità): un
  `Set(idSalvati)` dice a ogni card se è già salvata, e `handleToggleSave` aggiorna
  stato + `localStorage`. Salvando da una card, il pannello a destra si aggiorna subito;
  rimuovendo dal pannello, la card torna "Salva".
- `saved` è inizializzato **lazy** (`useState(readSavedJobs)`): niente `setState`
  nell'effect.
- Il caricamento offerte usa lo stesso schema di `Feed`: `setState` solo dentro le
  callback della promise (`.then/.catch/.finally`), **non** sincrono nell'effect di
  mount (evita il warning ESLint `set-state-in-effect` e i render a cascata). Il
  `loading` immediato alla ricerca è impostato nell'handler dell'evento, dove è lecito.
- Gestisce gli stati **caricamento / errore / nessun risultato**.

---

## 12. La messaggistica (dock desktop + pagina mobile)

La messaggistica cambia **forma** in base alla larghezza dello schermo, con la soglia
a **992px** (breakpoint `lg` di Bootstrap). I dati sono finti: non esiste un backend
di chat.

### 12.1 Le due esperienze

- **Da 992px in su** → `ChatDock`: una barra fissa in fondo allo schermo, montata nel
  `Layout` quindi presente su **tutte** le pagine dell'app. Cliccando l'intestazione il
  pannello **si alza** e mostra le chat in corso; aprendo una chat la conversazione
  compare dentro il dock, con una freccia per tornare all'elenco.
- **Sotto 992px** → il dock è nascosto (`d-none d-lg-block`) e la rotta `/messaggi`
  mostra `pages/Messages.jsx`, la pagina con **tutte** le chat. Si vede una cosa alla
  volta: elenco → conversazione con "torna indietro" (UX corretta su mobile).

Sulla pagina `/messaggi` il dock si auto-nasconde (`if (pathname === "/messaggi")
return null`) per non mostrare due volte la stessa cosa.

### 12.2 L'animazione "si alza"

Non si può animare `height: auto`, quindi il corpo del dock usa una transizione su
`max-height`: chiuso `0`, aperto `420px`, con `overflow: hidden`. Il risultato è il
pannello che sale e scende in modo fluido.

### 12.3 Posizionamento (convivenza con le notifiche)

I toast delle notifiche sono `position: fixed` a `right: 24px` e larghi `340px`, con
`z-index` più alto del dock: messi entrambi a destra, il dock finiva **coperto**. Per
questo il dock è spostato a sinistra della loro colonna:

```
right: 388px   /* = 24 (margine toast) + 340 (larghezza toast) + 24 (spazio) */
```

### 12.4 Componenti e stato

- `ChatList.jsx` e `Conversation.jsx` sono **condivisi** da dock e pagina: nessuna
  duplicazione di markup: cambia solo il contenitore (e l'altezza, via CSS).
- `useChats()` tiene le conversazioni in stato (init **lazy** da `localStorage`,
  seed da `messagesData.js` la prima volta) ed espone `inviaMessaggio(chatId, testo)`.
  La persistenza serve a far sì che un messaggio scritto nel dock si ritrovi anche
  nella pagina `/messaggi`, e viceversa.
- Le bolle dei messaggi propri sono allineate a destra (classe `chat-bolla--io`),
  quelle dell'interlocutore a sinistra.

---

## 13. Le notifiche simulate (eventi + modalità silenziosa)

Sistema di notifiche **finte** che arrivano nel tempo, in `features/notifications/`.
Come il toast Premium (§15), la comunicazione tra parti lontane dell'albero avviene
con **eventi custom sul `window`** invece che con props o context.

- `notificheData.js` — notifiche iniziali, `EVENTO_NOTIFICA` (`"nuovaNotifica"`),
  `inviaNotifica()` (che fa `dispatchEvent` di una `CustomEvent`) e
  `avviaSimulazioneNotifiche()`, che ne programma l'arrivo con `setTimeout`
  ricorsivi. La cadenza è **progressiva** (`prossimaAttesa`): all'inizio l'attesa è
  estratta tra 5 e 25 secondi, ma quando due estrazioni cadono nella fascia veloce
  (5–10s) quella fascia viene **esclusa per il resto della sessione** e le notifiche
  successive arrivano ogni 10–25 secondi. Così le prime si vedono subito, senza poi
  risultare martellanti. Il flag di modulo `simulazioneAvviata` garantisce che la
  simulazione parta **una sola volta**, anche se l'hook viene montato da più
  componenti.
- `useNotifiche()` — hook che ascolta l'evento, antepone la nuova notifica all'elenco
  e incrementa il contatore delle **non viste**; `segnaComeViste()` lo azzera. Il
  listener è registrato in un `useEffect` con cleanup. È montato in **due punti**
  (`Icon` nell'header e `FooterNav` nella barra in basso): ognuno ha il proprio stato,
  ma essendo in ascolto dello stesso evento restano allineati.
- `NotificheToast.jsx` / `NotificaItem.jsx` — i toast in basso a destra (montati nel
  `Layout`) e la singola riga, riusata anche nel dropdown.
- `layout/DropdownNotifiche.jsx` — il menu a tendina delle notifiche, **responsive**:
  da md in su sta nell'header e scende dal toggle; fino a md la voce vive invece nella
  barra in basso (`FooterNav` la sostituisce a `NavIcon` passando `versioneFooter`) e
  il pannello resta ancorato **sopra la barra aprendosi verso l'alto**. Il contenuto è
  lo stesso nelle due varianti; cambia solo l'indicatore: badge numerico nell'header,
  pallino lampeggiante nella barra in basso. All'apertura il contatore si azzera
  (`segnaComeViste`).
- `silenzioso.js` — **modalità silenziosa**: si attiva con doppio click sull'icona
  notifiche; le notifiche continuano ad arrivare e ad aggiornare l'elenco, ma senza
  toast né badge. Lo stato è una variabile a livello di modulo (`isSilenzioso()`),
  letta dentro i listener per avere sempre il valore aggiornato senza dipendere dalla
  closure dell'effect, più `useSilenzioso()` per i componenti che devono cambiare
  aspetto.

---

## 14. Componenti UI riutilizzabili

In `ui/`: componenti presentazionali senza logica di dominio.

- `Card.jsx` — wrapper `.card` Bootstrap con `className` passabile.
- `ProfileImage.jsx` — avatar circolare con `size` configurabile.
- `Banner.jsx`, `Pubblicta.jsx`, `Puzzle.jsx` — blocchi decorativi dell'aside.
- `PremiumToast.jsx` e `PremiumModal.jsx` — vedi §15.

Riusabili perché non sanno nulla del feed o dell'auth: ricevono tutto via props.

---

## 15. Toast e modale Premium (comunicazione via eventi)

`ui/PremiumToast.jsx` è montato **globalmente** in `App.jsx`, fuori dalle rotte, così è
disponibile ovunque. Comunica con il resto dell'app tramite un **evento custom del
`window`**, non con props o context:

- Chi vuole mostrarlo (es. la Sidebar, link "Prova 1 mese per 0 €") fa:
  `window.dispatchEvent(new Event("showPremiumToast"))`.
- Il toast ascolta con `addEventListener("showPremiumToast", …)` in un `useEffect`
  (con cleanup) e imposta `show = true`.
- Un secondo `useEffect` dipendente da `show` avvia un `setTimeout` che **chiude
  automaticamente il toast dopo 5 secondi** (`DURATA_TOAST = 5000`), con
  `clearTimeout` nel cleanup per non lasciare timer pendenti.

Vantaggio del pattern a eventi: qualsiasi componente, ovunque nell'albero, può aprire
il toast senza dover ricevere una funzione via props attraverso molti livelli.

**`PremiumModal.jsx`** è invece la modale a tutto schermo mostrata in `Home` subito
dopo il login: parte visibile e un `setInterval` fa scorrere un **countdown di 5
secondi**, al termine del quale compare il pulsante di chiusura (`canClose`).
L'intervallo viene sempre ripulito nel cleanup dell'effect.

---

## 16. Sicurezza (XSS, immagini, avatar)

La sicurezza contro XSS è un requisito esplicito del progetto. Misure adottate:

- **Nessun `innerHTML` con dati dinamici.** L'output è sempre via JSX (React fa
  l'escaping automatico del testo). I dati dei post/commenti sono renderizzati come
  testo, mai come HTML.
- **Descrizioni delle offerte (HTML) rese come testo** (`htmlToText`, §11.1): l'API
  Strive restituisce la descrizione in HTML, ma la convertiamo in testo semplice con
  `DOMParser` + `textContent` (documento inerte), senza mai usarla come markup. Anche
  i link esterni delle offerte passano da `safeUrl` (solo `http(s)`) e usano
  `rel="noopener noreferrer"`.
- **Sanitizzazione immagini** (`sanitizeImage`): solo `data:image/...` o URL `http(s)`
  sono ammessi come `src`. Schemi come `javascript:` vengono scartati, impedendo
  l'iniezione di codice tramite l'attributo immagine.
- **Avatar con iniziali sicuro** (`initialsAvatar`): genera un SVG data-URI usando solo
  caratteri "word" (`\w`) per le iniziali, così la stringa non può contenere markup
  iniettabile.
- **Validazione file** (`validateImageFile`): tipo e dimensione controllati prima di
  processare, evitando input malevoli o troppo pesanti.
- **Nessuna enumerazione degli account** (§6.7): la pagina di recupero password mostra
  la conferma anche quando l'email non esiste, così non si può scoprire quali indirizzi
  sono registrati.

---

## 17. Configurazione e build

- **Alias `@` → `src/`**: in `vite.config.js` (`resolve.alias` via `fileURLToPath`) e
  in `jsconfig.json` (per l'autocompletamento dell'IDE). Import assoluti e stabili.
- **Variabili d'ambiente**: `VITE_FIREBASE_*` in `.env.local` (non committato). Vedi
  `.env.example` per l'elenco. Senza queste, `isFirebaseConfigured` è `false` e l'app
  gira in modalità "senza backend".
- **ESLint** (flat config): regole `react-hooks` e `react-refresh` trattate come
  errori; `no-unused-vars` ignora gli identificatori `^[A-Z_]`.
- **Prettier**: `semi: true`, `singleQuote: false`, `printWidth: 80`, `tabWidth: 2`.
- **Code-splitting** automatico via `lazy()` per pagina.

---

## 18. Flussi end-to-end

### 18.1 Registrazione

1. Utente su `/signup` compila nome, cognome, email, password → submit.
2. La rotta è fuori da `PublicOnly`, quindi il modulo si vede sempre — anche arrivandoci
   da loggati con "Join now" dalla landing.
3. `handleSubmit` chiama `signup(email, pw, nome, cognome)`:
   `createUserWithEmailAndPassword` → `updateProfile({displayName})`.
4. `onAuthStateChanged` scatta, popola `user` e `nomeCompleto`.
5. `navigate("/home")`. Tentando ora `/login`, `PublicOnly` reindirizza a `/home`.

### 18.2 Login (email e password)

1. `/login`, credenziali → `signInWithEmailAndPassword`.
2. Errori (credenziali sbagliate, ecc.) tradotti da `authErrorMessage` e mostrati.
3. Successo → `onAuthStateChanged` aggiorna il context → `navigate("/home")`.

### 18.3 Accesso con Google

1. Click su "Continue with Google" (Landing, Login o SignUp) → `handleGoogle`
   dell'hook `useGoogleLogin`.
2. `signInWithPopup` apre il popup Google; `loading` disabilita il pulsante.
3. Successo → Firebase popola `displayName`/`photoURL` → `onAuthStateChanged` aggiorna
   il context → `navigate("/home")`.
4. Se l'utente chiude il popup non viene mostrato alcun errore; gli altri errori
   compaiono sotto il pulsante.

### 18.4 Recupero password

1. Da `/login` → "Forgot password?" → `/forgot-password`.
2. Invio dell'email → `resetPassword(email)` (`sendPasswordResetEmail`).
3. Compare la schermata di conferma — **anche se l'email non è registrata**, per non
   rivelare quali account esistono.

### 18.5 Apertura del feed

1. Rotta `/home` protetta da `RequireAuth` (utente presente → passa).
2. `Feed` monta: `seedIfEmpty()` (semina se DB vuoto) + `subscribeFeed`.
3. `onValue` consegna i post ordinati; `loading` diventa `false`; render.
4. Da qui ogni scrittura (propria o di altri client) riaggiorna il feed in tempo reale.

### 18.6 Pubblicare un post con immagine

1. Click su "Foto" in `CreatePost` → input file → `processImage` (valida, ridimensiona,
   comprime) → anteprima.
2. "Pubblica" → `Feed.publish` → `api.addPost` → `push` + `set` su Firebase (immagine
   sanitizzata).
3. `onValue` rileva il nuovo nodo → il post appare in cima a tutti i client.

### 18.7 Like / Commento / Condivisione

- **Like**: `toggleLike` aggiunge/rimuove `likes/<clientId>`. Il conteggio e lo stato
  "liked" si ricalcolano al prossimo snapshot.
- **Commento**: `addComment` fa `push` sotto `comments/`. `toPost` li ordina per data.
- **Condivisione**: `sharePost` incrementa `shares` con `runTransaction` (atomico).

### 18.8 Cercare e salvare un'offerta di lavoro

1. Rotta `/lavoro` (protetta): `Jobs` monta e `caricaOfferte("")` scarica le offerte di
   default da `fetchJobs`.
2. L'utente digita nel campo e invia → `handleSearch` rilancia `fetchJobs` con il
   termine; la lista si aggiorna con gli stati loading / errore / vuoto.
3. Click su "Salva" in una card → `handleToggleSave` aggiorna lo stato `saved` e scrive
   in `localStorage`; l'offerta compare subito nel pannello "Offerte salvate" a destra.
4. La "×" nel pannello rimuove l'offerta (stesso toggle) e la card torna "Salva".

### 18.9 Scrivere un messaggio

1. **Da 992px in su**: click sull'intestazione del `ChatDock` → il pannello si alza e
   mostra l'elenco chat; si sceglie una conversazione.
2. **Sotto 992px**: si va su `/messaggi` (il dock è nascosto) e si tocca una chat.
3. In entrambi i casi si usa lo stesso `Conversation`: al submit parte
   `inviaMessaggio(chatId, testo)` di `useChats`.
4. Lo stato viene aggiornato e scritto in `localStorage`, quindi il messaggio si
   ritrova passando dal dock alla pagina e viceversa.

### 18.10 Logout

1. Menu utente → "Esci" → `handleLogout`.
2. Se `enabled`: `signOut`. `onAuthStateChanged` azzera `user`.
3. `navigate("/")`. Le pagine protette ora reindirizzano a `/login`.

---

## 19. Possibili miglioramenti

> Come da preferenza di progetto, segnalo miglioramenti con la relativa motivazione.
> Sono proposte, non modifiche già applicate.

1. **Unificare la persistenza dei dati utente.** Avatar, esperienze, offerte salvate e
   chat vivono in `localStorage`, mentre nome/login stanno su Firebase. Portarli su
   Firebase (nodo `users/<uid>`) darebbe dati coerenti tra dispositivi e allineati
   all'utente loggato, invece che legati al singolo browser.

2. **Centralizzare la lettura delle esperienze.** `Sidebar` e `DropdownUser` leggono la
   stessa chiave `localStorage` con codice duplicato e nessuna sincronizzazione live
   (serve riaprire il menu). Un piccolo hook `useExperiences()` con un evento di
   aggiornamento (stesso pattern del `PremiumToast`) eliminerebbe la duplicazione e
   terrebbe le due viste allineate in tempo reale.

3. **Hook `useSavedJobs()` + sync tra schede.** Oggi lo stato delle offerte salvate vive
   solo in `pages/Jobs.jsx`. Estrarlo in un hook dedicato (con l'evento `window "storage"`)
   permetterebbe di mostrarle anche altrove (profilo, header) senza duplicare
   lettura/scrittura, e terrebbe due schede aperte allineate senza refresh.

4. **Ricerca dei lavori nell'URL.** Coerentemente con la navigazione basata su URL, il
   termine di ricerca potrebbe stare nella query string (`/lavoro?q=react`) con
   `useSearchParams`: la ricerca diventerebbe linkabile e sopravviverebbe a refresh e
   tasti avanti/indietro del browser.

5. **Estrarre la logica del feed in un hook `useFeed()`.** Oggi `Feed` mescola
   subscription, seed e handler. Un hook dedicato renderebbe il componente puramente
   presentazionale e la logica riutilizzabile/testabile.

6. **Gestione errori delle scritture.** `addPost`/`addComment` non gestiscono un
   eventuale fallimento di rete: un `try/catch` con un feedback all'utente (toast di
   errore) migliorerebbe la robustezza percepita.

7. **`clientId` vs utente loggato per i like.** Con l'auth attiva, legare i like a
   `uid` invece che a `clientId` (localStorage) impedirebbe di "moltiplicare" i like
   cambiando browser e renderebbe il dato più corretto.

8. **Il bottone Apple è ancora "decorativo".** Ora che Google fa un accesso vero, il
   pulsante "Sign in with Apple" che porta a `/home` senza autenticazione stona:
   andrebbe implementato (provider Apple) oppure rimosso/segnalato come demo, per non
   confondere l'utente.

9. **Auto-scroll della conversazione.** In `Conversation.jsx` il thread non scorre da
   solo: con chat lunghe, dopo "Invia" il messaggio nuovo finisce sotto l'area visibile
   e bisogna scorrere a mano. Basterebbe un `useRef` sul contenitore `.chat-messaggi` e
   portarlo a `scrollHeight` quando cambia l'elenco dei messaggi.

10. **Le chat sono solo locali.** `useChats` non ha un backend: i messaggi restano nel
    browser e l'interlocutore non risponde mai. Appoggiando le conversazioni al
    Realtime Database (come il feed, con `onValue`) diventerebbero reali e in tempo
    reale tra utenti diversi.
```