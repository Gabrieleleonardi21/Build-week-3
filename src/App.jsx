import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Placeholder from "./components/Placeholder";
import PremiumToast from "./components/PremiumToast";

function App() {
  return (
    <>
      {/* Toast globale Premium: ascolta l'evento showPremiumToast */}
      <PremiumToast />
      <Routes>
        {/* Pagine pubbliche: niente header/footer dell'app */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Profile ha gia' header/footer propri: rotta autonoma */}
        <Route path="/profile" element={<Profile />} />

        {/* Pagine dell'app: condividono header + footer tramite il Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/rete" element={<Placeholder titolo="La mia rete" />} />
          <Route path="/lavoro" element={<Placeholder titolo="Lavoro" />} />
          <Route path="/messaggi" element={<Placeholder titolo="Messaggistica" />} />
          <Route path="/notifiche" element={<Placeholder titolo="Notifiche" />} />
        </Route>

        {/* URL sconosciuti: torna alla landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
