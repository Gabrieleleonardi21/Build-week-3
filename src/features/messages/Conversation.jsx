import { useState } from "react";

// Conversazione aperta: intestazione con il contatto, elenco dei messaggi
// (bolle allineate a destra se scritte da noi) e campo per rispondere.
// `onBack` torna all'elenco: usato sia nel dock sia nella pagina.
function Conversation({ chat, onSend, onBack }) {
  const [testo, setTesto] = useState("");

  function submit(e) {
    e.preventDefault();
    onSend(chat.id, testo);
    setTesto("");
  }

  return (
    <div className="chat-conversazione">
      <div className="chat-conv-header">
        <button
          type="button"
          className="chat-back"
          onClick={onBack}
          aria-label="Torna alle conversazioni"
        >
          <i className="bi bi-arrow-left" />
        </button>
        <img src={chat.avatar} alt={chat.nome} className="chat-avatar-piccolo" />
        <span className="chat-conv-testo">
          <span className="chat-nome">{chat.nome}</span>
          <span className="chat-headline">{chat.headline}</span>
        </span>
      </div>

      <div className="chat-messaggi">
        {chat.messaggi.map((m) => {
          const classe = ["chat-bolla", m.da === "io" && "chat-bolla--io"]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={m.id} className={classe}>
              <p className="mb-0">{m.testo}</p>
              <span className="chat-ora-bolla">{m.ora}</span>
            </div>
          );
        })}
      </div>

      <form className="chat-input-riga" onSubmit={submit}>
        <input
          className="chat-input"
          placeholder="Scrivi un messaggio…"
          value={testo}
          onChange={(e) => setTesto(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm rounded-pill px-3"
          disabled={!testo.trim()}
        >
          Invia
        </button>
      </form>
    </div>
  );
}

export default Conversation;
