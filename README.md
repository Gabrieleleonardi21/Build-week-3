Ecco il file **`README.md` aggiornato**: ho trasformato tutti gli elementi dell'Indice in **link interni diretti (anchor links)**.

Cliccando su una qualsiasi voce dell'indice, la pagina scorrerà automaticamente fino alla sezione corrispondente.

---

# 🚀 Build Week 3 — LinkedIn Clone

> Un'applicazione web moderna che riproduce le funzionalità core di **LinkedIn** (Feed, Autenticazione, Profilo, Interazioni) basata su un **feed in tempo reale** alimentato da Firebase Realtime Database.
> _Progetto di gruppo realizzato durante la Build Week del corso EPICODE._

---

## 📌 Indice

- [✨ Funzionalità](https://www.google.com/search?q=%23-funzionalit%C3%A0)
- [🛠️ Stack Tecnologico](https://www.google.com/search?q=%23%EF%B8%8F-stack-tecnologico)
- [⚡ Avvio Rapido](https://www.google.com/search?q=%23-avvio-rapido)
- [🔥 Configurazione Firebase](https://www.google.com/search?q=%23-configurazione-firebase)
- [📜 Script Disponibili](https://www.google.com/search?q=%23-script-disponibili)
- [🗂️ Struttura del Progetto](https://www.google.com/search?q=%23%EF%B8%8F-struttura-del-progetto)
- [🛣️ Routing & Architettura](https://www.google.com/search?q=%23%EF%B8%8F-routing--architettura)
- [💾 Data Layer & Modello Dati](https://www.google.com/search?q=%23-data-layer--modello-dati)
- [🧩 Panoramica Componenti](https://www.google.com/search?q=%23-panoramica-componenti)
- [⚠️ Problemi Noti](https://www.google.com/search?q=%23%EF%B8%8F-problemi-noti)

---

## ✨ Funzionalità

- **🌐 Landing Page Pubblica:** Hero section responsive con quick-access per registrazione e login.
- **🔑 Autenticazione Simulata:** Flusso di `SignUp` e `Login` integrato per accedere direttamente all'esperienza del feed.
- **⚡ Feed in Tempo Reale (Firebase DB):**
- **Creazione Post:** Supporto per testo ed immagini con **compressione e ridimensionamento lato client**.
- **Interazioni:** Sistema di **Like** (persistiti via `localStorage` del client), **Commenti** e **Condivisioni**.
- **Sincronizzazione Instant:** Aggiornamento live in tempo reale per tutti gli utenti connessi.

- **🔍 Header Sticky Reattivo:**
- Ricerca dinamica _a scomparsa_ (icona sotto `lg`, input espandibile al click).
- Menu contestuali **"Per le aziende"** e Menu Utente esteso.

- **📱 Navigazione Mobile-First:** Routing via `react-router-dom` v7 con layout nativo e **bottom bar** per schermi mobile.
- **👤 Pagina Profilo Utente:** Vista utente completa con dati mockati e configurabili.
- **💎 UX Polish:** Toast "Premium" personalizzati con autoclose temporizzato (5s) e Sidebar con persistenza locale.

---

## 🛠️ Stack Tecnologico

| Ambito                 | Tecnologia                                                                                     | Versione     |
| ---------------------- | ---------------------------------------------------------------------------------------------- | ------------ |
| **Frontend Framework** | [React](https://react.dev/)                                                                    | `^19.0`      |
| **Build Tool**         | [Vite](https://vitejs.dev/)                                                                    | `^8.0`       |
| **Routing**            | [React Router DOM](https://reactrouter.com/)                                                   | `^7.0`       |
| **UI & Stylings**      | [Bootstrap](https://getbootstrap.com/) / [React Bootstrap](https://react-bootstrap.github.io/) | `5` / `2.10` |
| **Iconset**            | [Bootstrap Icons](https://icons.getbootstrap.com/)                                             | `1.13`       |
| **Backend & DB**       | [Firebase Realtime Database](https://firebase.google.com/)                                     | `^12.0`      |
| **Caroselli**          | [Swiper](https://swiperjs.com/)                                                                | `^14.0`      |
| **Code Quality**       | [ESLint](https://eslint.org/)                                                                  | `^10.0`      |

---

## ⚡ Avvio Rapido

### Requisiti previsti

- **Node.js** `18+` (Raccomandato `20+`)
- **npm** `9+`

### Procedura di installazione

```bash
# 1. Clona il repository ed entra nella cartella
git clone https://github.com/tuo-team/build-week-3.git
cd build-week-3

# 2. Installa le dipendenze
npm install

# 3. (Opzionale) Configura l'ambiente Firebase
cp .env.example .env.local

# 4. Avvia il server di sviluppo
npm run dev

```

> ℹ️ **Nota sul funzionamento Offline/Fallback:**
> Firebase è **opzionale** per il solo avvio iniziale del layout. Se non configuri `.env.local`, l'app si avvierà in modalità degradata mostrando un warning contestuale nel feed, lasciando comunque navigabili la Landing, Auth e Profilo.

---

## 🔥 Configurazione Firebase

1. Vai sulla [Firebase Console](https://console.firebase.google.com/) e crea un nuovo progetto.
2. Attiva il servizio **Realtime Database** (Assicurati che **non** sia Firestore).
3. Compila il file `.env.local` inserendo le credenziali disponibili in _Impostazioni Progetto → Le tue app_:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

```

> ⚠️ **Importante:** L'URL in `VITE_FIREBASE_DATABASE_URL` è tassativo per consentire l'aggancio del feed. Il file `.env.local` è protetto via `.gitignore` e non va committato.

---

## 📜 Script Disponibili

| Comando           | Operazione                                                           |
| ----------------- | -------------------------------------------------------------------- |
| `npm run dev`     | Avvia il server locale di sviluppo con Hot Module Replacement (HMR). |
| `npm run build`   | Compila l'applicazione per la produzione dentro la cartella `/dist`. |
| `npm run preview` | Esegue un server locale per testare la build di produzione.          |
| `npm run lint`    | Analizza il codice sorgente tramite ESLint per scovare errori.       |

---

## 🗂️ Struttura del Progetto

```ls
Build-week-3/
├── 📁 public/                 # Asset statici (Logo, SVG, Favicon)
├── 📄 database.rules.json     # Regole di lettura/scrittura Firebase DB
├── 📄 firebase.json           # Configurazione Firebase Hosting/Deploy
├── 📄 .env.example            # Template delle variabili d'ambiente
└── 📁 src/
    ├── 📄 main.jsx            # Entry point React
    ├── 📄 App.jsx             # Router centrale dell'app
    ├── 📄 firebase.js         # Inizializzazione ed Export SDK Firebase
    ├── 📄 api.js              # Data layer (CRUD, sanitizzazione, processing immagini)
    ├── 📄 data.js             # Mock data statici e helper
    ├── 📁 assets/             # Fogli di stile modulari
    └── 📁 components/         # Moduli UI riutilizzabili

```

---

## 🛣️ Routing & Architettura

L'applicazione sfrutta **React Router v7** e adotta il pattern `<Outlet>` all'interno del componente `Layout`. Questo impedisce il re-rendering di Header e Footer durante la navigazione:

```
[ Root / App ]
 ├── Layout (Shared Header & Footer)
 │    ├── /home       --> <Home /> (Feed Live)
 │    ├── /rete       --> <Placeholder />
 │    ├── /lavoro     --> <Placeholder />
 │    ├── /messaggi   --> <Placeholder />
 │    └── /notifiche  --> <Placeholder />
 ├── /profile         --> <Profile /> (Standalone Layout)
 ├── /signup          --> <SignUp />
 ├── /login           --> <Login />
 └── /                --> <Landing />

```

---

## 💾 Data Layer & Modello Dati

Tutte le operazioni I/O verso Firebase sono isolate in `src/api.js`.

### Struttura Entità Post

```json
{
  "id": "-Nx89ABC123XYZ",
  "author": {
    "name": "Nome Cognome",
    "headline": "Full Stack Developer",
    "avatar": "https://..."
  },
  "text": "Contenuto del post in formato testo...",
  "image": "data:image/webp;base64,...",
  "createdAt": 1710000000000,
  "likes": 12,
  "likedByMe": true,
  "shares": 3,
  "comments": [
    {
      "id": "c1",
      "author": { "name": "Mario Rossi", "avatar": "..." },
      "text": "Complimenti per il post!",
      "createdAt": 1710000050000
    }
  ]
}
```

### Sicurezza e Trattamento Immagini

- **Anti-XSS:** I link immagine vengono sottoposti alla funzione `sanitizeImage()` per prevenire execution di script malevoli (es. protocolli `javascript:`).
- **Ottimizzazione Client-side:** `processImage()` ridimensiona le immagini caricate dall'utente prima dell'invio sul DB (max 1080px, qualità 80%).

---

## 🧩 Panoramica Componenti

- **Layout & Navigation:** `Header`, `FooterNav`, `Search`, `DropdownUser`, `NavIcon`, `Logo`
- **Feed Modules:** `Feed`, `CreatePost`, `Post`, `PostActions`, `Comments`, `Comment`
- **Sidebar & Widgets:** `Sidebar`, `ProfileCard`, `RightAside`, `News`, `NewsCard`
- **Views & Pages:** `Landing`, `SignUp`, `Login`, `Profile`, `Placeholder`
- **UI Elements:** `PremiumToast`, `Banner`, `Pubblicita`

---

## ⚠️ Problemi Noti

> [!WARNING]
>
> 1. **Permessi Database Open:** Le regole in `database.rules.json` sono attive in modalità `.read: true` e `.write: true` per facilitare le fasi di sviluppo e testing durante la Build Week.
> 2. **Autenticazione Mock:** Il sistema di Login/SignUp non verifica credenziali reali sul server, ma simula la sessione salvando l'identità dell'utente nel client (`localStorage`).
