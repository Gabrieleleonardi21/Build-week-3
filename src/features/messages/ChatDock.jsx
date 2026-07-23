import { useState } from "react";
import { useLocation } from "react-router-dom";
import "@/features/messages/messages.css";
import ChatList from "@/features/messages/ChatList";
import Conversation from "@/features/messages/Conversation";
import { useChats } from "@/features/messages/useChats";

// Barra della messaggistica agganciata in fondo allo schermo: cliccando
// l'intestazione il pannello "si alza" e mostra le chat in corso.
// Visibile solo da lg (>= 992px) in su: sotto quella soglia si usa la pagina
// /messaggi. Sulla pagina stessa il dock è nascosto per non duplicarla.
function ChatDock() {
  const { pathname } = useLocation();
  const { chats, inviaMessaggio } = useChats();
  const [aperto, setAperto] = useState(false);
  const [chatApertaId, setChatApertaId] = useState(null);

  if (pathname === "/messaggi") return null;

  const chatAperta = chats.find((c) => c.id === chatApertaId);

  // Freccia dell'intestazione: giù quando è aperto, su quando è chiuso
  let iconaChevron = "bi-chevron-up";
  if (aperto) iconaChevron = "bi-chevron-down";

  const classeBody = ["chat-dock-body", aperto && "chat-dock-body--aperto"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="chat-dock d-none d-lg-block">
      <button
        type="button"
        className="chat-dock-header"
        onClick={() => setAperto((v) => !v)}
        aria-expanded={aperto}
      >
        <span className="d-flex align-items-center gap-2">
          <i className="bi bi-chat-right-dots-fill" />
          <span className="fw-semibold">Messaggistica</span>
          <span className="chat-badge">{chats.length}</span>
        </span>
        <i className={`bi ${iconaChevron}`} />
      </button>

      <div className={classeBody}>
        {!chatAperta && (
          <ChatList
            chats={chats}
            attivaId={chatApertaId}
            onSelect={setChatApertaId}
          />
        )}
        {chatAperta && (
          <Conversation
            chat={chatAperta}
            onSend={inviaMessaggio}
            onBack={() => setChatApertaId(null)}
          />
        )}
      </div>
    </div>
  );
}

export default ChatDock;
