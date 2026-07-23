import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/App.css";
import Layout from "@/layout/Layout";
import PremiumToast from "@/ui/PremiumToast";
import RequireAuth from "@/features/auth/RequireAuth";
import PublicOnly from "@/features/auth/PublicOnly";

// Pagine caricate on-demand (code-splitting): alleggeriscono il bundle iniziale
const Landing = lazy(() => import("@/pages/Landing"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const Login = lazy(() => import("@/pages/Login"));
const Home = lazy(() => import("@/pages/Home"));
const Profile = lazy(() => import("@/pages/Profile"));
const Jobs = lazy(() => import("@/pages/Jobs"));
const Messages = lazy(() => import("@/pages/Messages"));
const Placeholder = lazy(() => import("@/pages/Placeholder"));

function App() {
  return (
    <>
      {/* Toast globale Premium: ascolta l'evento showPremiumToast */}
      <PremiumToast />
      <Suspense fallback={null}>
        <Routes>
          {/* Landing pubblica, sempre accessibile */}
          <Route path="/" element={<Landing />} />

          {/* Registrazione: accessibile anche se sei loggato. Dalla landing
              "Join now" devi poterti iscrivere (nuovo account), non entrare
              direttamente nel feed. */}
          <Route path="/signup" element={<SignUp />} />

          {/* Login riservato ai non autenticati: se sei loggato vai a /home */}
          <Route element={<PublicOnly />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Pagine protette: richiedono il login */}
          <Route element={<RequireAuth />}>
            {/* Profile ha gia' header/footer propri: rotta autonoma */}
            <Route path="/profile" element={<Profile />} />

            {/* Il resto delle pagine app condivide header + footer tramite il Layout */}
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route
                path="/rete"
                element={<Placeholder titolo="La mia rete" />}
              />
              <Route path="/lavoro" element={<Jobs />} />
              <Route path="/messaggi" element={<Messages />} />
              <Route
                path="/notifiche"
                element={<Placeholder titolo="Notifiche" />}
              />
            </Route>
          </Route>

          {/* URL sconosciuti: torna alla landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
