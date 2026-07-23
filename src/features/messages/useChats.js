import { useState } from "react";
import { CHAT_SEED } from "@/features/messages/messagesData";

const KEY = "chats";

// Legge le conversazioni salvate, altrimenti parte dai dati di esempio.
function leggiChat() {
  const raw = localStorage.getItem(KEY);
  if (raw) return JSON.parse(raw);
  return CHAT_SEED;
}

// Ora corrente in formato breve (es. "14:05") per i messaggi inviati.
function oraCorrente() {
  return new Date().toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Stato delle conversazioni con persistenza in localStorage: così i messaggi
// inviati dal dock si ritrovano anche nella pagina /messaggi (e viceversa).
export function useChats() {
  const [chats, setChats] = useState(leggiChat);

  // Aggiunge un messaggio dell'utente alla conversazione indicata
  function inviaMessaggio(chatId, testo) {
    const pulito = testo.trim();
    if (!pulito) return;

    const aggiornate = chats.map((chat) => {
      if (chat.id !== chatId) return chat;
      const nuovo = {
        id: `m-${Date.now()}`,
        da: "io",
        testo: pulito,
        ora: oraCorrente(),
      };
      return { ...chat, messaggi: [...chat.messaggi, nuovo] };
    });

    setChats(aggiornate);
    localStorage.setItem(KEY, JSON.stringify(aggiornate));
  }

  return { chats, inviaMessaggio };
}
