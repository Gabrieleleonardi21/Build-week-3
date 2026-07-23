// Modalita' silenziosa delle notifiche.
// Si attiva con un doppio click rapido sull'icona notifiche: le notifiche
// continuano ad arrivare e ad aggiornare l'elenco, ma non compaiono ne' i
// toast ne' il badge/pallino.
//
// Lo stato sta qui e non in un componente perche' serve in due punti lontani
// dell'albero (Icon -> DropdownNotifiche e Layout -> NotificheToast): come per
// le notifiche, si usa un evento su window invece di passare props ovunque.
import { useEffect, useState } from "react";

export const EVENTO_SILENZIOSO = "notificheSilenziose";

let silenzioso = false;

// Letto dentro i listener delle notifiche: cosi' si ha sempre il valore
// aggiornato, senza dipendere dalla closure dell'useEffect.
export function isSilenzioso() {
  return silenzioso;
}

export function alternaSilenzioso() {
  silenzioso = !silenzioso;
  window.dispatchEvent(
    new CustomEvent(EVENTO_SILENZIOSO, { detail: silenzioso })
  );
  return silenzioso;
}

// Versione React dello stesso stato, per chi deve cambiare aspetto (l'icona).
export function useSilenzioso() {
  const [attivo, setAttivo] = useState(isSilenzioso);

  useEffect(() => {
    function handleCambio(evento) {
      setAttivo(evento.detail);
    }

    window.addEventListener(EVENTO_SILENZIOSO, handleCambio);
    return () => window.removeEventListener(EVENTO_SILENZIOSO, handleCambio);
  }, []);

  return attivo;
}
