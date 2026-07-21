import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { NavAttivaContext } from "./navAttiva";
import "./App.css";
import "./feed.css";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Feed from "./components/Feed";
import NewsCard from "./components/NewsCard";
import Home from "./components/Home";
import FooterNav from "./components/FooterNav";

function App() {
  const [attiva, setAttiva] = useState("home");

  return (
    <NavAttivaContext value={{ attiva, setAttiva }}>
      <Header />
      <Container className="mt-3">
        <Home />
      </Container>
      <FooterNav />
    </NavAttivaContext>
  );
}

export default App;
