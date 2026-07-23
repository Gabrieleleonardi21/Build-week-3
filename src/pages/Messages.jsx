import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Card from "@/ui/Card";
import "@/features/messages/messages.css";
import ChatList from "@/features/messages/ChatList";
import Conversation from "@/features/messages/Conversation";
import { useChats } from "@/features/messages/useChats";

// Contenuto della rotta /messaggi: pagina con tutte le chat. È l'esperienza
// principale sotto i 992px (da lg in su c'è il dock in fondo allo schermo).
// Si vede una cosa alla volta: elenco oppure conversazione (con "torna indietro").
function Messages() {
  const { chats, inviaMessaggio } = useChats();
  const [attivaId, setAttivaId] = useState(null);
  const attiva = chats.find((c) => c.id === attivaId);

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <Card className="chat-page">
          {!attiva && (
            <>
              <div className="chat-page-header d-flex align-items-center gap-2">
                <i className="bi bi-chat-right-dots-fill text-primary" />
                <h5 className="mb-0">Messaggistica</h5>
                <span className="chat-badge ms-auto">{chats.length}</span>
              </div>
              <ChatList
                chats={chats}
                attivaId={attivaId}
                onSelect={setAttivaId}
              />
            </>
          )}

          {attiva && (
            <Conversation
              chat={attiva}
              onSend={inviaMessaggio}
              onBack={() => setAttivaId(null)}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
}

export default Messages;
