import { createContext, useContext } from "react";

// Context dell'autenticazione: espone utente corrente, stato di caricamento
// e le azioni (signup / login / logout). Tenuto separato dal Provider (.jsx)
// per non generare warning di React Fast Refresh.
export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

// Traduce i codici d'errore di Firebase Auth in messaggi leggibili in italiano
export function authErrorMessage(code) {
  const messaggi = {
    "auth/invalid-email": "Email non valida.",
    "auth/user-not-found": "Nessun account con questa email.",
    "auth/wrong-password": "Password errata.",
    "auth/invalid-credential": "Email o password errate.",
    "auth/email-already-in-use": "Esiste già un account con questa email.",
    "auth/weak-password": "La password deve avere almeno 6 caratteri.",
    "auth/too-many-requests": "Troppi tentativi, riprova più tardi.",
    "auth/operation-not-allowed":
      "Accesso email/password non abilitato nel progetto Firebase.",
  };
  return messaggi[code] || "Si è verificato un errore. Riprova.";
}
