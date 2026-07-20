import { Container } from "react-bootstrap";
import Logo from "./Logo";
import Icon from "./Icon";
import Menu from "./Menu";
import Search from "./Search";

function Header() {
  return (
    <>
      <Container fluid className="border-bottom d-flex align-items-center justify-content-evenly">
        <div className="d-flex">
        <Logo />
        <Search/>
        </div>
        <div className="d-flex align-items-center">
          <Icon />
          <Menu />
        </div>
      </Container>
    </>
  );
}

export default Header;
