import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import Header from "./componets/Header";
import Home from "./componets/Home";
import FooterNav from "./componets/FooterNav";

function App() {
  return (
    <>
      <Header />
      <Home/>
      <FooterNav />
    </>
  );
}

export default App;
