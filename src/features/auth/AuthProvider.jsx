import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthContext } from "@/features/auth/auth-context";

// Fornisce lo stato di autenticazione a tutta l'app.
// Se Firebase non è configurato (auth === null) l'auth è "disabilitata":
// l'app resta usabile senza login, coerentemente con isFirebaseConfigured.
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Nome e cognome tenuti a parte: l'oggetto User di Firebase e' mutato in
  // place da updateProfile, quindi cambiarlo non farebbe ri-renderizzare.
  const [nomeCompleto, setNomeCompleto] = useState("");
  // se Firebase non è configurato non c'è nulla da attendere: loading parte false
  const [loading, setLoading] = useState(Boolean(auth));
  // Foto profilo unica per tutta l'app (sidebar, navbar, composer, banner
  // premium): stato inizializzato da localStorage, niente setState nell'effect.
  const [avatar, setAvatarState] = useState(() =>
    localStorage.getItem("profileAvatar")
  );

  function setAvatar(dataUrl) {
    setAvatarState(dataUrl);
    localStorage.setItem("profileAvatar", dataUrl);
  }

  useEffect(() => {
    if (!auth) return;
    // ascolta login/logout e mantiene sincronizzato l'utente corrente
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setNomeCompleto(u?.displayName || "");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Registrazione: dopo aver creato l'account salva nome e cognome nel
  // displayName, cosi' l'app puo' mostrarli al posto dell'email.
  async function signup(email, password, nome = "", cognome = "") {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = `${nome} ${cognome}`.trim();
    if (displayName) {
      await updateProfile(cred.user, { displayName });
      setNomeCompleto(displayName);
    }
    return cred;
  }

  // Accesso con Google tramite popup: Firebase importa nome e foto dal profilo
  // Google. Richiede che il provider Google sia abilitato in console Firebase.
  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const value = {
    user,
    loading,
    // nome e cognome se impostati, altrimenti la parte prima della @
    nomeCompleto: nomeCompleto || user?.email?.split("@")[0] || "",
    enabled: Boolean(auth), // true solo se Firebase è configurato
    avatar,
    setAvatar,
    signup,
    loginWithGoogle,
    login: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth),
    resetPassword: (email) => sendPasswordResetEmail(auth, email),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
