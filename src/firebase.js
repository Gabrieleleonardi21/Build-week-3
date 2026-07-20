// Inizializzazione di Firebase (Realtime Database + Storage).
// La configurazione arriva dalle variabili d'ambiente Vite (file .env.local,
// NON committato). Vedi .env.example per l'elenco delle variabili.
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Consideriamo Firebase configurato solo se c'è l'URL del Realtime Database
export const isFirebaseConfigured = Boolean(cfg.databaseURL)

let db = null
let storage = null
if (isFirebaseConfigured) {
  const app = initializeApp(cfg)
  db = getDatabase(app)
  storage = getStorage(app)
} else {
  console.warn(
    'Firebase non configurato: copia .env.example in .env.local e inserisci le VITE_FIREBASE_*'
  )
}

export { db, storage }
