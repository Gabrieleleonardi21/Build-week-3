import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { NavAttivaContext } from "./navAttiva";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Home from "./components/Home";
import PremiumToast from "./components/PremiumToast";

function App() {
  // Voce di nav attiva, condivisa tra Header e FooterNav via context
  const [attiva, setAttiva] = useState("home");

  return (
<<<<<<< HEAD
    <>
      <PremiumToast />
=======
    <NavAttivaContext.Provider value={{ attiva, setAttiva }}>
>>>>>>> main
      <Routes>
        {/* Landing pubblica; il feed (Home) vive su /home */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
<<<<<<< HEAD
    </>
=======
    </NavAttivaContext.Provider>
>>>>>>> main
  );
}

export default App;