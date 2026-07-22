import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth-context";

// Pagine riservate ai non autenticati (login / signup):
// se sei già loggato vieni mandato al feed.
function PublicOnly() {
  const { user, loading, enabled } = useAuth();

  if (!enabled) return <Outlet />;
  if (loading) return null;
  if (user) return <Navigate to="/home" replace />;
  return <Outlet />;
}

export default PublicOnly;
