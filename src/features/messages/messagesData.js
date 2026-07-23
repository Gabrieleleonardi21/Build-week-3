import { initialsAvatar } from "@/lib/data";

// Conversazioni di esempio: non esiste un backend di messaggistica, quindi
// partiamo da questi dati finti (avatar generati offline con le iniziali).
export const CHAT_SEED = [
  {
    id: "c1",
    nome: "Giulia Rossi",
    headline: "Frontend Developer @ EPICODE",
    avatar: initialsAvatar("Giulia Rossi"),
    messaggi: [
      {
        id: "c1-m1",
        da: "loro",
        testo: "Ciao! Ho visto il tuo progetto React, complimenti 👏",
        ora: "09:12",
      },
      {
        id: "c1-m2",
        da: "io",
        testo: "Grazie mille! È il progetto della build week.",
        ora: "09:15",
      },
      {
        id: "c1-m3",
        da: "loro",
        testo: "Che stack avete usato per il feed?",
        ora: "09:16",
      },
    ],
  },
  {
    id: "c2",
    nome: "Marco Bianchi",
    headline: "Tech Recruiter",
    avatar: initialsAvatar("Marco Bianchi"),
    messaggi: [
      {
        id: "c2-m1",
        da: "loro",
        testo: "Buongiorno, avrei una posizione interessante per lei.",
        ora: "Ieri",
      },
      {
        id: "c2-m2",
        da: "io",
        testo: "Buongiorno, volentieri: mi può mandare i dettagli?",
        ora: "Ieri",
      },
    ],
  },
  {
    id: "c3",
    nome: "Sara Conti",
    headline: "UX/UI Designer",
    avatar: initialsAvatar("Sara Conti"),
    messaggi: [
      {
        id: "c3-m1",
        da: "loro",
        testo: "Ti ho lasciato dei feedback sul layout della home 🙂",
        ora: "Lun",
      },
    ],
  },
  {
    id: "c4",
    nome: "Luca Ferrari",
    headline: "Backend Developer",
    avatar: initialsAvatar("Luca Ferrari"),
    messaggi: [
      {
        id: "c4-m1",
        da: "io",
        testo: "Ciao Luca, riusciamo a sentirci per l'integrazione API?",
        ora: "Lun",
      },
      {
        id: "c4-m2",
        da: "loro",
        testo: "Certo, domani mattina ti va bene?",
        ora: "Lun",
      },
    ],
  },
];
