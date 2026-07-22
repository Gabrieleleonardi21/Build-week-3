// Voci di navigazione condivise tra header (Icon) e barra inferiore (FooterNav):
// unica fonte dati, ogni consumer sceglie l'ordine in cui mostrarle.
export const NAV_ITEMS = {
  home: {
    to: "/home",
    src: "house-door-fill.svg",
    alt: "icona house",
    testo: "Home",
  },
  rete: {
    to: "/rete",
    src: "people-fill.svg",
    alt: "la mia rete",
    testo: "La mia rete",
  },
  lavoro: {
    to: "/lavoro",
    src: "briefcase-fill.svg",
    alt: "lavoro",
    testo: "Lavoro",
  },
  messaggi: {
    to: "/messaggi",
    src: "chat-right-dots-fill.svg",
    alt: "messaggistica",
    testo: "Messaggistica",
    classeTesto: "px-2 p-0 m-0",
  },
  notifiche: {
    to: "/notifiche",
    src: "bell-fill.svg",
    alt: "notifica",
    testo: "Notifica",
  },
};
