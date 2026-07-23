import { useEffect, useState } from "react";
import "@/assets/css/Notifiche.css";
import NotificaItem from "@/features/notifications/NotificaItem";
import { EVENTO_NOTIFICA } from "@/features/notifications/notificheData";
import { isSilenzioso } from "@/features/notifications/silenzioso";

// Quanto resta a schermo un toast prima di chiudersi da solo
const DURATA_TOAST = 5000;

// Toast delle notifiche: ascolta lo stesso evento del dropdown e mostra la
// notifica appena arrivata con lo stesso contenuto (NotificaItem).
// Da md in su: sotto c'e' gia' la barra di navigazione in basso.
function NotificheToast() {
  const [visibili, setVisibili] = useState([]);

  useEffect(() => {
    function handleNuova(evento) {
      // in modalita' silenziosa la notifica arriva comunque nell'elenco del
      // dropdown, ma qui non deve comparire nulla
      if (isSilenzioso()) return;

      const notifica = evento.detail;
      setVisibili((precedenti) => [...precedenti, notifica]);

      // ogni toast si chiude da solo dopo qualche secondo
      setTimeout(() => {
        setVisibili((precedenti) =>
          precedenti.filter((voce) => voce.id !== notifica.id)
        );
      }, DURATA_TOAST);
    }

    window.addEventListener(EVENTO_NOTIFICA, handleNuova);
    return () => window.removeEventListener(EVENTO_NOTIFICA, handleNuova);
  }, []);

  function chiudi(id) {
    setVisibili((precedenti) => precedenti.filter((voce) => voce.id !== id));
  }

  if (visibili.length === 0) return null;

  return (
    <>
      {/* da md in su: toast completo in basso a destra */}
      <div className="notificheToast-area d-none d-md-flex flex-column gap-2">
        {visibili.map((notifica) => (
          <div key={notifica.id} className="notificheToast">
            <button
              type="button"
              className="btn-close notificheToast-chiudi"
              aria-label="Chiudi"
              onClick={() => chiudi(notifica.id)}
            ></button>
            <NotificaItem notifica={notifica} />
          </div>
        ))}
      </div>

      {/* fino a md: solo la scritta, poco sotto l'header */}
      <div className="notificheToastMobile-area d-md-none flex-column gap-2">
        {visibili.map((notifica) => (
          <div
            key={notifica.id}
            className="notificheToastMobile"
            onClick={() => chiudi(notifica.id)}
          >
            Nuova notifica
          </div>
        ))}
      </div>
    </>
  );
}

export default NotificheToast;
