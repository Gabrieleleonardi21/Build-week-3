import { useEffect, useState } from "react";
import {
  EVENTO_NOTIFICA,
  NOTIFICHE_INIZIALI,
  avviaSimulazioneNotifiche,
} from "@/features/notifications/notificheData";
import { isSilenzioso } from "@/features/notifications/silenzioso";

export function useNotifiche() {
  const [notifiche, setNotifiche] = useState(NOTIFICHE_INIZIALI);
  const [nuove, setNuove] = useState(0);

  useEffect(() => {
    function handleNuova(evento) {
      const notifica = evento.detail;
      setNotifiche((precedenti) => [notifica, ...precedenti]);
      if (!isSilenzioso()) setNuove((precedente) => precedente + 1);
    }

    window.addEventListener(EVENTO_NOTIFICA, handleNuova);
    avviaSimulazioneNotifiche();
    return () => window.removeEventListener(EVENTO_NOTIFICA, handleNuova);
  }, []);

  function segnaComeViste() {
    setNuove(0);
  }

  return { notifiche, nuove, segnaComeViste };
}
