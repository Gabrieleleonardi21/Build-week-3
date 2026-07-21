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
  const [attiva, setAttiva] = useState("home");

  return (
    <NavAttivaContext.Provider value={{ attiva, setAttiva }}>
      <PremiumToast />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </NavAttivaContext.Provider>
  );
}

export default App;