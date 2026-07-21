import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Landing from "./components/Landing";
import Register from "./components/Register";

function App() {
  const [attiva, setAttiva] = useState("home");

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
