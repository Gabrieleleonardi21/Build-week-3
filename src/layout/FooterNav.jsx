import NavIcon from "@/layout/NavIcon";
import DropdownNotifiche from "@/layout/DropdownNotifiche";
import { useNotifiche } from "@/features/notifications/useNotifiche";
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
  // fino a md le notifiche vivono qui: stesso dropdown dell'header, con badge,
  // elenco completo e doppio click per la modalita' silenziosa.
  const { notifiche, nuove, segnaComeViste } = useNotifiche();

  return (
    <nav className="footerNav d-flex justify-content-around align-items-center d-md-none d-lg-none">
      {ORDINE.map((voce) => {
        if (voce === NAV_ITEMS.notifiche) {
          return (
            <DropdownNotifiche
              key={voce.to}
              notifiche={notifiche}
              nuove={nuove}
              segnaComeViste={segnaComeViste}
              versioneFooter
            />
          );
        }

        return <NavIcon key={voce.to} {...voce} />;
      })}
    </nav>
  );
}

export default FooterNav;
