import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, authErrorMessage } from "@/features/auth/auth-context";

// Incapsula l'accesso con Google, riutilizzato da Login, SignUp e Landing.
// Espone: il gestore del click, lo stato di attesa e l'eventuale messaggio
// d'errore. Se Firebase non è configurato ripiega sul redirect demo a /home.
export function useGoogleLogin() {
  const navigate = useNavigate();
  const { loginWithGoogle, enabled } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    if (!enabled) {
      navigate("/home");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (err) {
      // popup chiuso dall'utente: non è un vero errore da mostrare
      if (
        err.code !== "auth/popup-closed-by-user" &&
        err.code !== "auth/cancelled-popup-request"
      ) {
        setError(authErrorMessage(err.code));
      }
    } finally {
      setLoading(false);
    }
  }

  return { handleGoogle, error, loading };
}
