import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import "./feed.css";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import Feed from "./components/Feed";
import NewsCard from "./components/NewsCard";
import Home from "./components/Home";
import FooterNav from "./components/FooterNav";

function App() {
  return (
    <>
      <Header />
      <Container className="mt-3">
        <Home />
      </Container>
      <FooterNav />
    </>
  );
}

export default App;
