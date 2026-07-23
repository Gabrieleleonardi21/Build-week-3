import { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import NavIcon from "@/layout/NavIcon";
import DropdownNotifiche from "@/layout/DropdownNotifiche";
import { useNotifiche } from "@/features/notifications/useNotifiche";
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

// Nella riga in linea le notifiche non sono un link ma un dropdown, quindi
// le altre voci si fermano prima e l'icona notifiche la aggiunge DropdownNotifiche.
const ORDINE_IN_LINEA = ORDINE.filter((voce) => voce !== NAV_ITEMS.notifiche);

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
  // stato delle notifiche tenuto qui: lo condividono il dropdown (da md in su)
  // e il pallino della voce Notifiche nel menu a tendina mobile.
  const { notifiche, nuove, segnaComeViste } = useNotifiche();

  return (
    <>
      {/* fino a md le icone stanno dentro un menu a tendina */}
      <Dropdown align="end" className="d-md-none">
        <Dropdown.Toggle as={IconToggle} id="menu-icone" />
        <Dropdown.Menu className="iconMenu">
          {ORDINE.map((voce) => (
            <NavIcon
              key={voce.to}
              {...voce}
              pallino={voce === NAV_ITEMS.notifiche && nuove > 0}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* da md in su restano in linea come prima */}
      <div className="d-none d-md-flex align-items-center">
        {ORDINE_IN_LINEA.map((voce) => (
          <NavIcon key={voce.to} {...voce} />
        ))}
        <DropdownNotifiche
          notifiche={notifiche}
          nuove={nuove}
          segnaComeViste={segnaComeViste}
        />
      </div>

      <User />
    </>
  );
}

export default Icon;
