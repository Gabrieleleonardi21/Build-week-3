// Elenco delle conversazioni, riutilizzato dal dock (da lg in su) e dalla
// pagina /messaggi (sotto lg). Mostra avatar, nome, anteprima e ora.
function ChatList({ chats, attivaId, onSelect }) {
  return (
    <div className="chat-list">
      {chats.map((chat) => {
        const ultimo = chat.messaggi[chat.messaggi.length - 1];
        // niente ternari: la classe attiva si aggiunge solo se serve
        const classe = ["chat-list-item", chat.id === attivaId && "chat-list-item--attiva"]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={chat.id}
            type="button"
            className={classe}
            onClick={() => onSelect(chat.id)}
          >
            <img src={chat.avatar} alt={chat.nome} className="chat-avatar" />
            <span className="chat-list-testo">
              <span className="chat-nome">{chat.nome}</span>
              <span className="chat-anteprima">{ultimo.testo}</span>
            </span>
            <span className="chat-ora">{ultimo.ora}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ChatList;
