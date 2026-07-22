import NavIcon from "@/layout/NavIcon";
import { NAV_ITEMS } from "@/layout/navItems";

// Ordine delle icone nella barra inferiore (diverso dall'header: Lavoro in fondo)
const ORDINE = [
  NAV_ITEMS.home,
  NAV_ITEMS.rete,
  NAV_ITEMS.messaggi,
  NAV_ITEMS.notifiche,
  NAV_ITEMS.lavoro,
];

function FooterNav() {
  return (
    <nav className="footerNav d-flex justify-content-around align-items-center d-md-none d-lg-none">
      {ORDINE.map((voce) => (
        <NavIcon key={voce.to} {...voce} />
      ))}
    </nav>
  );
}

export default FooterNav;
