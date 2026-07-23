
export const EVENTO_NOTIFICA = "nuovaNotifica";

function casuale(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function tempoCasuale() {
  const unita = ["min", "h", "g"][casuale(0, 2)];
  if (unita === "min") return `${casuale(1, 59)} min`;
  if (unita === "h") return `${casuale(1, 23)} h`;
  return `${casuale(1, 6)} g`;
}

export const NOTIFICHE_INIZIALI = [
  {
    id: "n-1",
    avatar: "https://i.pravatar.cc/150?img=31",
    autore: "Giulia Rossi",
    testo: "ha commentato il tuo post: «Complimenti, ottimo lavoro!»",
    tempo: tempoCasuale(),
  },
  {
    id: "n-2",
    avatar: "https://i.pravatar.cc/150?img=15",
    autore: "Marco Bianchi",
    testo: "ha iniziato a seguirti. Guarda il suo profilo per saperne di piu'.",
    tempo: tempoCasuale(),
  },
  {
    id: "n-3",
    avatar: "https://i.pravatar.cc/150?img=47",
    autore: "Epicode",
    testo:
      "ha pubblicato 3 nuove offerte di lavoro in linea con il tuo profilo.",
    tempo: tempoCasuale(),
  },
];

const FINTE = [
  {
    avatar: "https://i.pravatar.cc/150?img=5",
    autore: "Laura Conti",
    testo: "ha messo mi piace al tuo ultimo post.",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=52",
    autore: "Davide Ferri",
    testo: "ti ha inviato una richiesta di collegamento.",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=68",
    autore: "LinkedIn News",
    testo: "Le 5 competenze piu' richieste del mese: scopri la classifica.",
  },
];

let progressivo = 0;

export function inviaNotifica(notifica) {
  progressivo += 1;
  const completa = {
    id: `n-nuova-${progressivo}`,
    tempo: "adesso",
    ...notifica,
  };
  window.dispatchEvent(new CustomEvent(EVENTO_NOTIFICA, { detail: completa }));
  return completa;
}

const ATTESA_MIN = 10000;
const ATTESA_MAX = 25000;
let simulazioneAvviata = false;

export function avviaSimulazioneNotifiche() {
  if (simulazioneAvviata) return;
  simulazioneAvviata = true;

  let indice = 0;
  const prossima = () => {
    setTimeout(() => {
      inviaNotifica(FINTE[indice % FINTE.length]);
      indice += 1;
      prossima();
    }, casuale(ATTESA_MIN, ATTESA_MAX));
  };
  prossima();
}
