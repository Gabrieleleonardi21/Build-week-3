import { useState } from "react";
import { Container } from "react-bootstrap";
import Logo from "./Logo";
import Icon from "./Icon";
import Menu from "./Menu";
import Search from "./Search";

function Header() {
  // lo stato sta qui perche' aprendo la ricerca il logo deve sparire
  const [ricercaAperta, setRicercaAperta] = useState(false);

  return (
    <>
      <Container
        fluid
        className="headerNav border-bottom d-flex align-items-center justify-content-around"
      >
        <div
          className={
            ricercaAperta
              ? "d-flex align-items-center flex-grow-1 minWidth0"
              : "d-flex align-items-center"
          }
        >
          {/* fino a md il logo lascia spazio al campo di ricerca aperto */}
          <div className={ricercaAperta ? "d-none d-md-block" : ""}>
            <Logo />
          </div>
          <Search aperta={ricercaAperta} onToggle={setRicercaAperta} />
        </div>
        <div className="d-flex align-items-center flex-shrink-0">
          <Icon />
          <Menu />
        </div>
      </Container>
    </>
  );
}

export default Header;
