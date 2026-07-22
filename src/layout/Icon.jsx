import { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import NavIcon from "@/layout/NavIcon";
import User from "@/layout/User";
import { NAV_ITEMS } from "@/layout/navItems";

// Ordine delle icone nell'header
const ORDINE = [
  NAV_ITEMS.home,
  NAV_ITEMS.rete,
  NAV_ITEMS.lavoro,
  NAV_ITEMS.messaggi,
  NAV_ITEMS.notifiche,
];

// Come in Menu/DropdownUser: toggle custom per impilare icona e scritta.
const IconToggle = forwardRef(function IconToggle({ onClick }, ref) {
  return (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="px-1 d-flex flex-column align-items-center iconContainer"
      aria-label="Menu"
    >
      <i className="bi bi-list fs-4"></i>
    </a>
  );
});

function Icon() {
  return (
    <>
      {/* fino a md le icone stanno dentro un menu a tendina */}
      <Dropdown align="end" className="d-md-none">
        <Dropdown.Toggle as={IconToggle} id="menu-icone" />
        <Dropdown.Menu className="iconMenu">
          {ORDINE.map((voce) => (
            <NavIcon key={voce.to} {...voce} />
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* da md in su restano in linea come prima */}
      <div className="d-none d-md-flex align-items-center">
        {ORDINE.map((voce) => (
          <NavIcon key={voce.to} {...voce} />
        ))}
      </div>

      <User />
    </>
  );
}

export default Icon;
