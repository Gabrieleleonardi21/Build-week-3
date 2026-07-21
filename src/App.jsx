import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Landing from "./components/Landing";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      {/* Landing pubblica; il feed (Home) vive su /home */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
