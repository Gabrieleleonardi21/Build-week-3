import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      {/* Landing pubblica; il feed (Home) vive su /home */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
