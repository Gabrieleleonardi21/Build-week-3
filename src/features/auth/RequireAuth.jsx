import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth/auth-context";

// Protegge le rotte dell'app: senza login si viene rimandati a /login.
// Se l'auth è disabilitata (Firebase non configurato) lascia passare tutti,
// così l'app resta usabile in locale senza credenziali.
function RequireAuth() {
  const { user, loading, enabled } = useAuth();

  if (!enabled) return <Outlet />;
  if (loading) return null; // evita il flash finché non sappiamo se c'è l'utente
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default RequireAuth;
