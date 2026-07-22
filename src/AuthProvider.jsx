import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { AuthContext } from "./auth-context";

// Fornisce lo stato di autenticazione a tutta l'app.
// Se Firebase non è configurato (auth === null) l'auth è "disabilitata":
// l'app resta usabile senza login, coerentemente con isFirebaseConfigured.
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // se Firebase non è configurato non c'è nulla da attendere: loading parte false
  const [loading, setLoading] = useState(Boolean(auth));

  useEffect(() => {
    if (!auth) return;
    // ascolta login/logout e mantiene sincronizzato l'utente corrente
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    enabled: Boolean(auth), // true solo se Firebase è configurato
    signup: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password),
    login: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
