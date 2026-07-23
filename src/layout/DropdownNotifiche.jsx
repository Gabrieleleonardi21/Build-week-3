import { forwardRef, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "@/assets/css/Notifiche.css";
import NotificaItem from "@/features/notifications/NotificaItem";
import {
  alternaSilenzioso,
  useSilenzioso,
} from "@/features/notifications/silenzioso";
import { NAV_ITEMS } from "@/layout/navItems";

// Entro quanti ms due click contano come "doppio click"
const SOGLIA_DOPPIO_CLICK = 300;

// L'apertura del menu aspetta un attimo in piu' della soglia: cosi' un doppio
// click fa in tempo a fermarla e cambia solo la modalita' silenziosa.
const RITARDO_APERTURA = 320;

// Toggle personalizzato: come in Menu/DropdownUser serve per non ereditare le
// classi btn di react-bootstrap e mantenere l'icona identica a prima
// (stesse classi di NavIcon), con in piu' il badge del contatore.
const NotificheToggle = forwardRef(function NotificheToggle(
  { onClick, onClickToggle, nuove, attiva, silenzioso },
  ref
) {
  const className = [
    "px-2 px-lg-3 d-flex flex-column align-items-center iconContainer notificheToggle",
    attiva && "iconAttiva",
    silenzioso && "notificheToggle-silenzioso",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        // onClick e' l'apri/chiudi di react-bootstrap: non lo chiamiamo qui,
        // lo passiamo al genitore che decide se e quando eseguirlo.
        onClickToggle(e, onClick);
      }}
      className={className}
      aria-label="Notifiche"
      title={
        silenzioso
          ? "Notifiche silenziose: doppio click per riattivarle"
          : "Notifiche (doppio click: modalita' silenziosa)"
      }
    >
      <img
        src={NAV_ITEMS.notifiche.src}
        alt={NAV_ITEMS.notifiche.alt}
        className="icon"
      />
      <p className="p-0 m-0">{NAV_ITEMS.notifiche.testo}</p>
      {/* il badge esiste solo se ci sono notifiche nuove: alla prima vale 1.
          In modalita' silenziosa "nuove" resta 0, quindi non compare mai. */}
      {nuove > 0 && <span className="notificheBadge">{nuove}</span>}
      {/* al suo posto, la campanella barrata segnala il silenzioso */}
      {silenzioso && (
        <i className="bi bi-bell-slash-fill notificheSilenzioso-segno"></i>
      )}
    </a>
  );
});

// Icona notifiche dell'header: click -> apre/chiude l'elenco completo.
// Niente titolo e niente freccia, come richiesto. Lo stato arriva da Icon,
// che lo condivide con il pallino del menu a tendina mobile.
function DropdownNotifiche({ notifiche, nuove, segnaComeViste }) {
  const { pathname } = useLocation();
  const silenzioso = useSilenzioso();
  // istante dell'ultimo click sul toggle, per riconoscere il doppio click
  const ultimoClick = useRef(0);
  // timer dell'apertura rimandata, da annullare se arriva il secondo click
  const aperturaRimandata = useRef(null);

  useEffect(() => () => clearTimeout(aperturaRimandata.current), []);

  // All'apertura il badge si azzera subito: le notifiche sono "viste".
  function handleToggle(isOpen) {
    if (isOpen) segnaComeViste();
  }

  // Click singolo: il menu si apre/chiude dopo RITARDO_APERTURA.
  // Due click ravvicinati: l'apertura viene annullata e cambia solo la
  // modalita' silenziosa.
  function handleClick(evento, apriChiudi) {
    const adesso = Date.now();

    if (adesso - ultimoClick.current < SOGLIA_DOPPIO_CLICK) {
      clearTimeout(aperturaRimandata.current);
      ultimoClick.current = 0;
      alternaSilenzioso();
      return;
    }

    ultimoClick.current = adesso;
    aperturaRimandata.current = setTimeout(
      () => apriChiudi(evento),
      RITARDO_APERTURA
    );
  }

  return (
    <Dropdown align="end" onToggle={handleToggle}>
      <Dropdown.Toggle
        as={NotificheToggle}
        id="notifiche-dropdown"
        nuove={nuove}
        attiva={pathname === NAV_ITEMS.notifiche.to}
        silenzioso={silenzioso}
        onClickToggle={handleClick}
      />

      <Dropdown.Menu className="notificheMenu dropdownCentrato">
        {notifiche.map((notifica) => (
          <NotificaItem key={notifica.id} notifica={notifica} />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownNotifiche;
