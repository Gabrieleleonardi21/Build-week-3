import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { NavAttivaContext } from "./navAttiva";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  // Voce di nav attiva, condivisa tra Header e FooterNav via context
  const [attiva, setAttiva] = useState("home");

  return (
    <NavAttivaContext.Provider value={{ attiva, setAttiva }}>
      <Routes>
        {/* Landing pubblica; il feed (Home) vive su /home */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </NavAttivaContext.Provider>
  );
}

export default App;
